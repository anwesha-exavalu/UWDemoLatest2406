import React, { useState, useEffect } from "react";
import styles from "./CreateSubmission.module.css";
import { Col, Row, Tooltip, Button, Radio, Form, Select } from "antd";
import FormInput from "../components/FormInput";
import Documents from "../layout/RightSidebar";
import { EditOutlined, PlusCircleOutlined, SearchOutlined,UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Modal,message,Upload } from 'antd';
import axios from 'axios';
function CreateSubmission({ onNext }) {
    // Separate state for each widget section's form data and editing state
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    // Separate state for each widget section's form data and editing state
    const [basicInfo, setBasicInfo] = useState({
        orgName: "",
        orgType: "",
        dba: "",
        fein: "",
        tin: "",
        businessActivity: "",
        sicCode: "",
        sicDescription: "",
        naics: "",
        naicsDescription: "",
        yearsInBusiness: "",
        status: "active",
        isEditing: false,
    });

    const [locationInfo, setLocationInfo] = useState({
        pinCode: "",
        addressLine1: "",
        addressLine2: "",
        county: "",
        city: "",
        state: "",
        country: "",
        isEditing: false,
    });

    const [insuredInfo, setInsuredInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        emailId: "",
        countryCode: "",
        phoneNumber: "",
        website: " ",
        isEditing: false,
    });

    // Toggle editing mode for Basic Information
    const handleEditInsured = () => {
        handleEditBasicInfo();
        handleEditLocationInfo();
        handleEditInsuredInfo();
    };
    const handleEditBasicInfo = () => {
        console.log("Edit icon clicked!"); // Log for debugging
        setBasicInfo((prevState) => ({
            ...prevState,
            isEditing: !prevState.isEditing, // Toggle edit mode
        }));
        console.log("After Edit Toggle: ", !basicInfo.isEditing); // Log toggled state
    };

    const handleCreateNewBasicInfo = () => {
        console.log("Edit icon clicked!"); // Log for debugging
        setBasicInfo({
            insuredName: "",
            insuredType: "",
            firstName: "",
            isEditing: true, // Enable editing for new entries
        });
    };

    const handleEditLocationInfo = () => {
        setLocationInfo((prevState) => ({
            ...prevState,
            isEditing: !prevState.isEditing, // Toggle edit mode
        }));
    };

    const handleCreateNewLocationInfo = () => {
        setLocationInfo({
            baseState: "",
            zipCode: "",
            isEditing: true, // Enable editing for new entries
        });
    };

    const handleEditInsuredInfo = () => {
        setInsuredInfo((prevState) => ({
            ...prevState,
            isEditing: !prevState.isEditing, // Toggle edit mode
        }));
    };

    const handleCreateNewInsuredInfo = () => {
        setInsuredInfo({
            primaryNameInsured: "",
            isEditing: true, // Enable editing for new entries
        });
    };

    const handleInputChange = (e, section, field) => {
        if (section === "basicInfo") {
            setBasicInfo({
                ...basicInfo,
                [field]: e.target.value,
            });
        } else if (section === "locationInfo") {
            setLocationInfo({
                ...locationInfo,
                [field]: e.target.value,
            });
        } else if (section === "insuredInfo") {
            setInsuredInfo({
                ...insuredInfo,
                [field]: e.target.value,
            });
        }
    };
    const handleClick = () => {
        navigate('/accountinfo'); // Navigate to accountinfo with row data
    };
    const accountInfo = {
        accountHolder: "Wilson Properties", // Full name as "Account Holder" from AccountInfo
    };

    // Extract first name and last name from accountHolder for comparison
    const [accountFirstName, accountLastName] = accountInfo.accountHolder.split(' ');

    // Function to check if names match and navigate or show a pop-up
    const handleSearchClick = () => {
        const { firstName, lastName } = basicInfo;

        if (firstName === accountFirstName && lastName === accountLastName) {
            navigate('/accountInfo'); // Navigate if names match
        } else {
            // Show a pop-up if names don't match
            Modal.error({
                title: "No such account",
                content: "The person is not insured.",
            });
        }
    };

    
    // Function to open modal
  const onUpload = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Function to handle file upload
  const handleUpload = ({ file, fileList }) => {
    setFileList(fileList);
    message.success(`${file.name} uploaded successfully`);
  };
  const fetchInsuredData = async () => {
    try {
        setLoading(true);
        const response = await fetch('/data/insuredData.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const insuredData = await response.json();
        return insuredData;
    } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load prefill data');
        return null;
    } finally {
        setLoading(false);
    }
};
const handlePrefill = async () => {
    const insuredData = await fetchInsuredData();
    if (!insuredData) return;

    try {
        // Update basicInfo state
        setBasicInfo(prevState => ({
            ...prevState,
            orgName: insuredData.insuredInfo.orgName || "",
            orgType: insuredData.insuredInfo.orgType || "",
            dba: insuredData.insuredInfo.dba || "",
            fein: insuredData.insuredInfo.fein || "",
            tin: insuredData.insuredInfo.tin || "",
            businessActivity: insuredData.insuredInfo.businessActivity || "",
            sicCode: insuredData.insuredInfo.sicCode || "",
            sicDescription: insuredData.insuredInfo.sicDescription || "",
            naics: insuredData.insuredInfo.naics || "",
            naicsDescription: insuredData.insuredInfo.naicsDescription || "",
            yearsInBusiness: insuredData.insuredInfo.yearsInBusiness || "",
            status: insuredData.insuredInfo.partyStatus || "active"
        }));

        // Update locationInfo state
        const mailingAddress = insuredData.insuredMailingAddress[0];
        setLocationInfo(prevState => ({
            ...prevState,
            pinCode: mailingAddress.pinCode || "",
            addressLine1: mailingAddress.addressLine1 || "",
            addressLine2: mailingAddress.addressLine2 || "",
            county: mailingAddress.county || "",
            city: mailingAddress.city || "",
            state: mailingAddress.state || "",
            country: mailingAddress.country || ""
        }));

        // Update insuredInfo state
        setInsuredInfo(prevState => ({
            ...prevState,
            firstName: insuredData.insuredContactPerson.firstName || "",
            middleName: insuredData.insuredContactPerson.middleName || "",
            lastName: insuredData.insuredContactPerson.lastName || "",
            emailId: insuredData.insuredContactPerson.emailId || "",
            countryCode: insuredData.insuredContactPerson.countryCode || "",
            phoneNumber: insuredData.insuredContactPerson.phoneNumber || "",
            website: insuredData.insuredContactPerson.website || ""
        }));

        message.success('Form prefilled successfully');
    } catch (error) {
        console.error('Error prefilling form:', error);
        message.error('Failed to prefill form');
    }
};


    return (
        <>
        <Row>
            <Col span={24}>

                <div className={styles.maincontainer}>

                    <Row gutter={16}>
                        <Col span={22}></Col>
                        <Col span={2}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" ,marginTop: "0.5rem"}}>
                                <Button type="primary" onClick={onUpload} style={{ width: "5rem", backgroundColor: "blue" }}>
                                    Upload
                                </Button>
                                <Button type="primary" onClick={handlePrefill}  loading={loading} style={{ width: "5rem", backgroundColor: "blue" }}>
                                    Prefill
                                </Button>
                                <Tooltip title="Edit">
                                    <Button shape="circle" onClick={handleEditInsured} icon={<EditOutlined style={{ fontSize: "20px" }} />} style={{ fontSize: "20px" }} />
                                </Tooltip>
                                <Tooltip title="Search">
                                    <Button shape="circle" onClick={handleSearchClick} icon={<SearchOutlined style={{ fontSize: "20px" }} />} style={{ fontSize: "20px" }} />
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        {/* First Widget Section: Basic Information */}
                        <Col span={24}>
                            <div className={styles.widgetBox}>

                                <div className={styles.widgetHeader} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <h3 className={styles.widgetTitle}>Primary Insured</h3>

                                </div>

                                <Row gutter={24}>
                                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Party ID</span>}
                                            value={basicInfo.partyId}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "partyId")}
                                            disabled// Allow editing based on state
                                        />
                                    </Col> */}
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Name</span>}
                                            value={basicInfo.orgName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "insuredName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Type</span>}
                                            value={basicInfo.insuredType}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "insuredType")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured First Name</span>}
                                            value={basicInfo.firstName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "firstName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Middle Name</span>}
                                            value={basicInfo.middleName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "middleName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Last Name</span>}
                                            value={basicInfo.lastName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "lastName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>*/}
                                    <Col span={6}>
                                        <label style={{ fontSize: "40px", marginRight: "40px", }}>Organisation Type</label>
                                        <Select

                                            value={basicInfo.orgType}
                                            onChange={(value) => handleInputChange({ target: { value } }, "basicInfo", "orgType")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                            required
                                            style={{ fontSize: "15px", width: "15.2rem", marginTop: "11px" }}
                                            placeholder="Select Organisation Type"

                                        >
                                            <Select.Option value="proprietary" >Proprietary
                                            </Select.Option>
                                            <Select.Option value="partnership">Partnership</Select.Option>
                                            <Select.Option value="llp">LLP</Select.Option>
                                            <Select.Option value="privateLimitedCompany">Private Limited Company</Select.Option>
                                            <Select.Option value="publicLimitedCompany">Public Limited Company</Select.Option>
                                            <Select.Option value="affinityGroup">Affinity Group</Select.Option>
                                            {/* Add more options as needed */}
                                        </Select></Col>

                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>DBA</span>}
                                            value={basicInfo.dba}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "dba")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>


                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>FEIN</span>}
                                            value={basicInfo.fein}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "fein")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Tax Identification Number</span>}
                                            value={basicInfo.tin}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "taxIdentificationNumber")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Business Activity</span>}
                                            value={basicInfo.businessActivity}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "businessActivity")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>SIC Code</span>}
                                            value={basicInfo.sicCode}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "sicCode")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>SIC Description</span>}
                                            value={basicInfo.sicDescription}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "sicDescription")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>NAICS</span>}
                                            value={basicInfo.naics}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "naics")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>NAICS Description</span>}
                                            value={basicInfo.naicsDescription}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "naicsDescription")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Year in Business</span>}
                                            value={basicInfo.yearsInBusiness}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "yearInBusiness")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>Status</span>}
                                            value={basicInfo.status}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "status")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col> */}

                                </Row>
                            </div>
                        </Col>

                        {/* Second Widget Section: Location Information */}

                        <Col span={24}>
                            <div className={styles.widgetBox}>
                                <div className={styles.widgetHeader} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <h3 className={styles.widgetTitle}>Mailing Address</h3>
                                    {/*<div  style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip title="Edit">
                                        <Button  shape="circle" onClick={handleEditBasicInfo} icon={<EditOutlined />} />
                                       </Tooltip>
                                       
                                        <Tooltip title="Create">
                                        <Button  shape="circle"  onClick={handleCreateNewBasicInfo} icon={<PlusCircleOutlined />} />
                                       </Tooltip>
                                       
                                    </div>*/}
                                </div>

                                <Row gutter={22}>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Postal Code</span>}
                                            value={locationInfo.pinCode}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "pinCode")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Addess Line 1</span>}
                                            value={locationInfo.addressLine1}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "addressLine1")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Addess Line 2</span>}
                                            value={locationInfo.addressLine2}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "addressLine2")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>County</span>}
                                            value={locationInfo.county}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "country")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>City</span>}
                                            value={locationInfo.city}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "city")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>State</span>}
                                            value={locationInfo.state}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "state")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>Country</span>}
                                            value={locationInfo.country}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "country")}
                                            readOnly={!locationInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>

                                    {/* <Col span={6}>
                                        <label style={{ fontSize: "15px", marginRight: "40px" }}>Risk Location Same as Mailing Address</label>
                                        <Radio.Group
                                            value={locationInfo.riskLocation}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "riskLocation")}
                                            readOnly={!locationInfo.isEditing} 

                                        >
                                            <Radio value={true} >Yes</Radio>
                                            <Radio value={false}>No</Radio>

                                            
                                        </Radio.Group>
                                    </Col> */}

                                </Row>
                            </div>


                            {/* Third Widget Section: Insured Information */}

                            <div className={styles.widgetBox}>
                                <div className={styles.widgetHeader} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <h3 className={styles.widgetTitle}>Contact Information</h3>
                                    {/*<div  style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip title="Edit">
                                        <Button  shape="circle" onClick={handleEditBasicInfo} icon={<EditOutlined />} />
                                       </Tooltip>
                                       
                                        <Tooltip title="Create">
                                        <Button  shape="circle"  onClick={handleCreateNewBasicInfo} icon={<PlusCircleOutlined />} />
                                       </Tooltip>
                                       
                                    </div>*/}
                                </div>

                                <Row gutter={22}>
                                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>PartyId</span>}
                                            value={insuredInfo.partyId}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "partyId")}
                                            disabled // Allow editing based on state
                                        />
                                    </Col> */}
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>First Name</span>}
                                            value={insuredInfo.firstName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "firstName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Middle Name</span>}
                                            value={insuredInfo.middleName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "middleName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Last Name</span>}
                                            value={insuredInfo.lastName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "lastName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Business Email ID</span>}
                                            value={insuredInfo.emailId}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "businessEmailId")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Country Code</span>}
                                            value={insuredInfo.countryCode}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "countryCode")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Phone Number</span>}
                                            value={insuredInfo.phoneNumber}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "phoneNumber")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Website</span>}
                                            value={insuredInfo.website}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "website")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                </Row>
                            </div>

                        </Col>
                        

                    </Row>
                    

                    <Row gutter={16}>
                        <Col span={20}></Col>
                        <Col span={4}>
                            <div >
                                <Button type="primary" onClick={onNext} style={{ width: "10rem", marginBottom: "1rem", marginTop: "1rem", marginRight: "3px", backgroundColor: "blue" }}>
                                    Next
                                </Button></div></Col>
                        {/*} <Col span={4}>
            <div >
            <button type="account" style={{width: "10rem"}} onClick={() => handleClick()}><b>Go To Account</b></button>
          </div></Col>*/}
                    </Row>
                </div>
            </Col>
            {/* <Col span={4}>
                <Documents />
            </Col> */}
            
        </Row>
         {/* Upload Modal */}
         <Modal 
  title="Upload File" 
  open={isModalOpen} 
  onCancel={handleCancel} 
  footer={[
    <Button key="cancel" onClick={handleCancel}>
      Close
    </Button>
  ]}
  centered
>
  <div style={{ textAlign: "center", padding: "20px" }}>
    <Upload.Dragger 
      beforeUpload={() => false} // Prevents auto-upload
      fileList={fileList}
      onChange={handleUpload}
      multiple={false} // Allow only one file
      maxCount={1} // Restrict to one file
      showUploadList={true}
      style={{ padding: "20px", border: "2px dashed #1890ff", borderRadius: "8px" }}
    >
      <p className="ant-upload-drag-icon">
        <UploadOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
      </p>
      <p className="ant-upload-text">Click or Drag File to Upload</p>
      <p className="ant-upload-hint">Only one file is allowed. Ensure it is in the correct format.</p>
    </Upload.Dragger>
  </div>
</Modal>

  </>
        
    );
}

export default CreateSubmission;
