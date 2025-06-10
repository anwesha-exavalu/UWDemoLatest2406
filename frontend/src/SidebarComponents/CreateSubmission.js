import React, { useState, useEffect } from "react";
import styles from "./CreateSubmission.module.css";
import ContactInfo from "../assets/img/contactInfo.png";
import PrimaryInsured from "../assets/img/primaryInsured.png";
import mailAdd from "../assets/img/mailingAddress.png";
import NextArrow from "../assets/img/nextArrow.png";
import { Container } from "../styles/components/Layout";

import {
  Col,
  Row,
  Tooltip,
  Button,
  Radio,
  Form,

  AutoComplete, message
} from "antd";
import FormInput from "../components/FormInput";
import DropdownSelect from "../components/FormDropdown";
import Documents from "../layout/RightSidebar";
import {
  EditOutlined,
  SaveOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  RightOutlined
} from "@ant-design/icons";
import {
  MainContainer,
  HeaderContainer,
  ButtonGroup,
  ContentContainer,
  LeftColumn,
  RightColumn,
  Card,
  CardHeader,
  CardContent,
  FormRow,
  FormField,
  Label,
  Input,
  Select,
  NextButtonContainer,
  NextButton,
  ActionButton,
  IconButton,
  Modal,
  ModalContent,
  UploadArea
} from '../styles/pages/CreateSubmission/InsuredInfoStyle'; // Adjust the import path as needed
import { useNavigate } from "react-router-dom"; // Import useNavigate

import pdfData from "../assets/documents/DocumentForExtraction02.pdf";
import axios from "axios";
import useMetaData from "../context/metaData";

const PROD_URL = process.env.REACT_APP_PREFILL_URL;
function CreateSubmission({ onNext }) {
  const { theme } = useMetaData();
  // Separate state for each widget section's form data and editing state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
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
    if (isEditMode) {
      // Save functionality - you can add API calls or other save logic here
      setBasicInfo((prev) => ({ ...prev, isEditing: false }));
      setLocationInfo((prev) => ({ ...prev, isEditing: false }));
      setInsuredInfo((prev) => ({ ...prev, isEditing: false }));
    } else {
      // Edit functionality - existing logic
      setBasicInfo((prev) => ({ ...prev, isEditing: true }));
      setLocationInfo((prev) => ({ ...prev, isEditing: true }));
      setInsuredInfo((prev) => ({ ...prev, isEditing: true }));
    }
    // Toggle edit mode
    setIsEditMode(!isEditMode);
  };
  useEffect(() => {
    console.log("Edit Mode State:", {
      basicInfo: basicInfo.isEditing,
      locationInfo: locationInfo.isEditing,
      insuredInfo: insuredInfo.isEditing,
    });
  }, [basicInfo.isEditing, locationInfo.isEditing, insuredInfo.isEditing]);



  const handleCreateNewBasicInfo = () => {
    console.log("Edit icon clicked!"); // Log for debugging
    setBasicInfo({
      insuredName: "",
      insuredType: "",
      firstName: "",
      isEditing: true, // Enable editing for new entries
    });
  };



  const handleCreateNewLocationInfo = () => {
    setLocationInfo({
      baseState: "",
      zipCode: "",
      isEditing: true, // Enable editing for new entries
    });
  };



  const handleCreateNewInsuredInfo = () => {
    setInsuredInfo({
      primaryNameInsured: "",
      isEditing: true, // Enable editing for new entries
    });
  };
  const handleInputChange = (e, section, field) => {
    const value = e.target ? e.target.value : e;
    if (section === "basicInfo") {
      setBasicInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "locationInfo") {
      setLocationInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "insuredInfo") {
      setInsuredInfo((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleClick = () => {
    navigate("/accountinfo"); // Navigate to accountinfo with row data
  };
  const accountInfo = {
    accountHolder: "Wilson Properties", // Full name as "Account Holder" from AccountInfo
  };

  // Extract first name and last name from accountHolder for comparison
  const [accountFirstName, accountLastName] =
    accountInfo.accountHolder.split(" ");

  // Function to check if names match and navigate or show a pop-up
  const handleSearchClick = () => {
    const { firstName, lastName } = basicInfo;

    if (firstName === accountFirstName && lastName === accountLastName) {
      navigate("/accountInfo"); // Navigate if names match
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



  const handlePrefill = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const pdfResponse = await fetch(pdfData);
      if (!pdfResponse.ok) {
        throw new Error("Failed to load PDF file");
      }

      const pdfBlob = await pdfResponse.blob();
      const file = new File([pdfBlob], "DocumentForExtraction02.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("file", file);

      const apiResponse = await fetch(`${PROD_URL}/api/process_doc`, {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || "Failed to process PDF");
      }

      const responseData = await apiResponse.json();
      console.log("API Response:", responseData);

      if (!responseData.application_details) {
        throw new Error("Invalid response data received");
      }

      // Update form states with response data
      updateFormStates(responseData.application_details);

      setSuccess(true);
      message.success("Form prefilled successfully");
    } catch (error) {
      console.error("Prefill Error:", error);
      setError(error.message);
      message.error(`Failed to prefill form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleUpload = async ({ file }) => {
    console.log("Starting upload for file:", file.name);
    try {
      setLoading(true);
      setError(null);

      // Basic file validation
      if (!file || file.type !== "application/pdf") {
        throw new Error("Please upload a valid PDF file");
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log("Sending request to:", `${PROD_URL}/api/process_doc`);

      const response = await fetch(`${PROD_URL}/api/process_doc`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Upload failed with status: ${response.status}`
        );
      }

      const responseData = await response.json();
      console.log("Upload API Response:", responseData);

      if (!responseData.application_details) {
        throw new Error("Invalid response format from API");
      }

      // Update form states with response data
      updateFormStates(responseData.application_details);

      setFileList([file]);
      message.success(`${file.name} processed successfully`);
      setSuccess(true);
    } catch (error) {
      console.error("Upload Error:", error);
      message.error(`Upload failed: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Function to handle file upload
  // Replace your current handleUploadFile function with this corrected version:

  const handleUploadFile = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (!file) {
      console.log("No file selected");
      return;
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      message.error("Please select a PDF file only");
      return;
    }

    // Update file list state
    setFileList([file]);
    message.success(`${file.name} uploaded successfully`);

    // Close the modal
    setIsModalOpen(false);

    // Optionally, you can call the handleUpload function to process the file immediately
    // handleUpload({ file });
  };

  // Alternative approach: If you want to process the file immediately after upload,
  // you can combine both functions:

  const handleUploadFileAndProcess = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    if (file.type !== "application/pdf") {
      message.error("Please select a PDF file only");
      return;
    }

    // Update file list state
    setFileList([file]);
    message.success(`${file.name} selected successfully`);

    // Close the modal
    setIsModalOpen(false);

    // Process the file immediately
    await handleUpload({ file });
  };

  // Also, make sure your input element in JSX is updated:
  // Replace the input in your modal with:
  /*
  <input
    type="file"
    accept=".pdf"
    onChange={handleUploadFile} // or handleUploadFileAndProcess if you want immediate processing
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer'
    }}
  />
  */

  const updateFormStates = (data) => {
    if (!data) return;

    const { insuredInfo, insuredMailingAddress, insuredContactPerson } = data;

    // Update basicInfo state - handle all fields from insuredInfo
    if (insuredInfo) {
      setBasicInfo((prevState) => ({
        ...prevState,
        orgName: insuredInfo.orgName || "",
        orgType: insuredInfo.orgType || "",
        dba: insuredInfo.dba || "",
        fein: insuredInfo.fein || "",
        tin: insuredInfo.tin || "",
        businessActivity: insuredInfo.businessActivity || "",
        sicCode: insuredInfo.sicCode || "",
        sicDescription: insuredInfo.sicDescription || "",
        naics: insuredInfo.naics || "",
        naicsDescription: insuredInfo.naicsDescription || "",
        yearsInBusiness: insuredInfo.yearsInBusiness || "",
        status: insuredInfo.partyStatus || "active",
      }));
    }

    // Update locationInfo state - handle first address from insuredMailingAddress array
    if (insuredMailingAddress && insuredMailingAddress[0]) {
      const address = insuredMailingAddress[0];
      setLocationInfo((prevState) => ({
        ...prevState,
        pinCode: address.pinCode || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        county: address.county || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
      }));
    }

    // Update insuredInfo state - handle all fields from insuredContactPerson
    if (insuredContactPerson) {
      setInsuredInfo((prevState) => ({
        ...prevState,
        firstName: insuredContactPerson.firstName || "",
        middleName: insuredContactPerson.middleName || "",
        lastName: insuredContactPerson.lastName || "",
        emailId: insuredContactPerson.emailId || "",
        countryCode: insuredContactPerson.countryCode || "",
        phoneNumber: insuredContactPerson.phoneNumber || "",
        website: insuredContactPerson.website || "",
      }));
    }
  };
  return (
    <Container>
      <MainContainer>
        <Row gutter={[24, 24]}>
          <Col flex="1"></Col>
          <Col flex="none">
            <HeaderContainer>
              <ButtonGroup>
                <ActionButton onClick={onUpload}>Upload</ActionButton>
                <ActionButton onClick={handlePrefill} disabled={loading}>
                  {loading ? "Loading..." : "Prefill"}
                </ActionButton>
                <Tooltip title={isEditMode ? "Save" : "Edit"}>
                  <IconButton onClick={handleEditInsured}>
                    {isEditMode ? <SaveOutlined /> : <EditOutlined />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Search">
                  <IconButton onClick={handleSearchClick}>
                    <SearchOutlined />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </HeaderContainer>
          </Col>
        </Row>

        <ContentContainer>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <LeftColumn>
                <Card>
                  <CardHeader>
                    <div className="step-content-box">
                      <img
                        src={PrimaryInsured}
                        alt="Exavalu"
                        title="Exavalu"
                        className="logobox"
                      />
                    </div>
                    <h3>Primary Insured</h3>
                  </CardHeader>
                  <CardContent>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Insured Name"
                          value={basicInfo.orgName}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "orgName")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <DropdownSelect
                          theme={theme}
                          label="Organisation Type"
                          name="organizationType"
                          options={[
                            { label: "Proprietary", value: "proprietary" },
                            { label: "Partnership", value: "partnership" },
                            { label: "llb", value: "LLB" },
                            {
                              label: "Private Limited Company",
                              value: "privateLimitedCompany",
                            },
                            {
                              label: "Public Limited Company",
                              value: "publicLimitedCompany",
                            },
                          ]}
                          required={false}
                          onChange={(value) =>
                            handleInputChange(
                              { target: { value } },
                              "basicInfo",
                              "orgType"
                            )
                          }
                          layout="vertical"
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="DBA"
                          value={basicInfo.dba}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "dba")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="FEIN"
                          value={basicInfo.fein}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "fein")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Tax Identification Number"
                          value={basicInfo.tin}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "basicInfo",
                              "taxIdentificationNumber"
                            )
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Business Activity"
                          value={basicInfo.businessActivity}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "businessActivity")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="SIC Code"
                          value={basicInfo.sicCode}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "sicCode")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="SIC Description"
                          value={basicInfo.sicDescription}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "sicDescription")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="NAICS"
                          value={basicInfo.naics}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "naics")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="NAICS Description"
                          value={basicInfo.naicsDescription}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "naicsDescription")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Year in Business"
                          value={basicInfo.yearsInBusiness}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "basicInfo", "yearsInBusiness")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>
                    </Row>
                  </CardContent>
                </Card>
              </LeftColumn>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <RightColumn>
                <Card>
                  <CardHeader>
                    <div className="step-content-box">
                      <img
                        src={ContactInfo}
                        alt="Exavalu"
                        title="Exavalu"
                        className="logobox"
                      />
                    </div>
                    <h3>Contact Information</h3>
                  </CardHeader>
                  <CardContent>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="First Name"
                          value={insuredInfo.firstName}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "firstName")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Middle Name"
                          value={insuredInfo.middleName}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "middleName")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Last Name"
                          value={insuredInfo.lastName}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "lastName")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Business Email ID"
                          value={insuredInfo.emailId}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "businessEmailId")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Country Code"
                          value={insuredInfo.countryCode}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "countryCode")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Phone Number"
                          value={insuredInfo.phoneNumber}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "phoneNumber")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Website"
                          value={insuredInfo.website}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "website")
                          }
                          readOnly={!basicInfo.isEditing}
                        />
                      </Col>
                    </Row>
                  </CardContent>
                </Card>
              </RightColumn>
            </Col>

            <Col span={24}>
              <Card>
                <CardHeader>
                  <div className="step-content-box">
                    <img
                      src={mailAdd}
                      alt="Exavalu"
                      title="Exavalu"
                      className="logobox"
                    />
                  </div>
                  <h3>Mailing Address</h3>
                </CardHeader>
                <CardContent>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="Postal Code"
                        value={locationInfo.pinCode}
                        field="pinCode"
                        section="locationInfo"
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="Address Line 1"
                        value={locationInfo.addressLine1}
                        field="addressLine1"
                        section="locationInfo"
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="Address Line 2"
                        value={locationInfo.addressLine2}
                        field="addressLine2"
                        section="locationInfo"
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="County"
                        value={locationInfo.county}
                        field="county"
                        section="locationInfo"
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="City"
                        value={locationInfo.city}
                        field="city"
                        section="locationInfo"
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="State"
                        value={locationInfo.state}
                        field="state"
                        section="locationInfo"
                        required
                      />
                    </Col>
                  </Row>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </ContentContainer>

        <Row gutter={[24, 24]}>
          <Col flex="1"></Col>
          <Col flex="None">
            <NextButtonContainer>
              <NextButton onClick={onNext}>
                <div className="step-content-box">
                  {"Next "}
                  <img
                    src={NextArrow}
                    alt="Exavalu"
                    title="Exavalu"
                    className="logobox"
                  />
                </div>
              </NextButton>
            </NextButtonContainer>
          </Col>
        </Row>

        {isModalOpen && (
          <Modal>
            <ModalContent>
              <h3>Upload File</h3>
              <UploadArea>
                <UploadOutlined className="upload-icon" />
                <div className="upload-text">Click or Drag File to Upload</div>
                <div className="upload-hint">Only PDF files are allowed</div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleUploadFile} // or handleUploadFileAndProcess if you want immediate processing
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
              </UploadArea>
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <ActionButton onClick={handleCancel}>OK</ActionButton>
              </div>
            </ModalContent>
          </Modal>
        )}
      </MainContainer>
    </Container>
  );
}

export default CreateSubmission;
