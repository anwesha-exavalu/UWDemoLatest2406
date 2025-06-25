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
  message,
  Progress,
  notification
} from "antd";
import FormInput from "../components/FormInput";
import DropdownSelect from "../components/FormDropdown";

import {
  EditOutlined,
  SaveOutlined,
  SearchOutlined,
  UploadOutlined,

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

import useMetaData from "../context/metaData";

const BASE_URL = 'http://localhost:5000';

const CreateSubmission = ({ onNext,
  prefillLoading,
  setPrefillLoading,
  basicInfo,
  setBasicInfo,
  locationInfo,
  setLocationInfo,
  insuredInfo,
  setInsuredInfo }) => {

  const { theme } = useMetaData();
  // Separate state for each widget section's form data and editing state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Separate state for each widget section's form data and editing state


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

  const accountInfo = {
    accountHolder: "Wilson Properties", // Full name as "Account Holder" from AccountInfo
  };

  // Extract first name and last name from accountHolder for comparison
  const [accountFirstName, accountLastName] =
    accountInfo.accountHolder.split(" ");

  // Function to check if names match and navigate or show a pop-up
  const handleSearchClick = () => {
    const { firstName, lastName } = insuredInfo; // Fixed: should be insuredInfo, not basicInfo

    if (firstName === accountFirstName && lastName === accountLastName) {
      navigate("/accountInfo"); // Navigate if names match
    } else {
      setIsErrorModalOpen(true);
    }
  };

  // Function to open modal
  const onUpload = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handlePrefill = async () => {
    try {
      setPrefillLoading(true);
      setError(null);
      setSuccess(false);

      // Check if a file has been uploaded
      if (!uploadedFile) {
        // If no file uploaded, use the default PDF
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

        const apiResponse = await fetch(`${BASE_URL}/api/prefill_upload`, {
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

        updateFormStates(responseData.application_details[0]);
      } else {
        // Use uploaded file for API call
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const apiResponse = await fetch(`${BASE_URL}/api/prefill_upload`, {
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

        updateFormStates(responseData.application_details[0]);
      }

      setSuccess(true);
      message.success("Form prefilled successfully");
    } catch (error) {
      console.error("Prefill Error:", error);
      setError(error.message);
      message.error(`Failed to prefill form: ${error.message}`);
    } finally {
      setPrefillLoading(false);
    }
  };

  // Handle file upload (only upload, no API processing)
  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    console.log("Starting upload for file:", file.name);

    // Basic file validation
    if (file.type !== "application/pdf") {
      message.error("Please upload a valid PDF file");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Complete the progress
      setUploadProgress(100);
      clearInterval(progressInterval);

      // Store the uploaded file
      setUploadedFile(file);
      setFileList([file]);

      // Show success notification
      notification.success({
        message: 'Upload Successful',
        description: `${file.name} has been uploaded successfully. Click 'Prefill' to process the document.`,
        duration: 4,
        placement: 'topRight'
      });

      // Close modal after a short delay
      setTimeout(() => {
        setIsModalOpen(false);
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);

    } catch (error) {
      console.error("Upload Error:", error);
      message.error(`Upload failed: ${error.message}`);
      setUploadProgress(0);
      setIsUploading(false);
    }

    // Reset file input
    event.target.value = '';
  };

  // Function to handle file upload (if you need this for other purposes)
  const handleUploadFile = ({ file, fileList }) => {
    setFileList(fileList);
    message.success(`${file.name} uploaded successfully`);
  };

  // Fixed updateFormStates function to match API response structure
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
    if (insuredMailingAddress && insuredMailingAddress.length > 0) {
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
                <ActionButton onClick={handlePrefill} disabled={prefillLoading}>
                  {prefillLoading ? "Loading..." : "Prefill"}
                </ActionButton>
                <Tooltip title={isEditMode ? "Save" : "Edit"}>
                  <IconButton onClick={handleEditInsured}>
                    {isEditMode ? <SaveOutlined /> : <EditOutlined />}
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Search">
                  <IconButton onClick={handleSearchClick}>
                    <SearchOutlined />
                  </IconButton>
                </Tooltip> */}
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
                          value={basicInfo.orgType} // Added value prop
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
                            handleInputChange(value, "basicInfo", "orgType")
                          }
                          layout="vertical"
                        // disabled={!basicInfo.isEditing}
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
                            handleInputChange(e, "basicInfo", "tin") // Fixed field name
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
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
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
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
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
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
                        />
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                        <FormInput
                          label="Business Email ID"
                          value={insuredInfo.emailId}
                          required={true}
                          onChange={(e) =>
                            handleInputChange(e, "insuredInfo", "emailId") // Fixed field name
                          }
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
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
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
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
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
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
                          readOnly={!insuredInfo.isEditing} // Fixed: should be insuredInfo.isEditing
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
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "pinCode")
                        }
                        readOnly={!locationInfo.isEditing}
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="Address Line 1"
                        value={locationInfo.addressLine1}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "addressLine1")
                        }
                        readOnly={!locationInfo.isEditing}
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="Address Line 2"
                        value={locationInfo.addressLine2}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "addressLine2")
                        }
                        readOnly={!locationInfo.isEditing}
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="County"
                        value={locationInfo.county}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "county")
                        }
                        readOnly={!locationInfo.isEditing}
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="City"
                        value={locationInfo.city}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "city")
                        }
                        readOnly={!locationInfo.isEditing}
                        required
                      />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                      <FormInput
                        label="State"
                        value={locationInfo.state}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "state")
                        }
                        readOnly={!locationInfo.isEditing}
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
              {!isUploading ? (
                <UploadArea>
                  <UploadOutlined className="upload-icon" />
                  <div className="upload-text">Click or Drag File to Upload</div>
                  <div className="upload-hint">Only PDF files are allowed</div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUpload}
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
              ) : (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <div className="upload-text" style={{ marginBottom: '16px' }}>
                    Uploading PDF...
                  </div>
                  <Progress
                    percent={uploadProgress}
                    status={uploadProgress === 100 ? "success" : "active"}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                  {uploadProgress === 100 && (
                    <div style={{ marginTop: '12px', color: '#52c41a' }}>
                      Upload completed successfully!
                    </div>
                  )}
                </div>
              )}
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <ActionButton onClick={handleCancel} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Cancel'}
                </ActionButton>
              </div>
            </ModalContent>
          </Modal>
        )}

        {isErrorModalOpen && (
          <Modal>
            <ModalContent>
              <div className="upload-text">No such account, the person is not insured.</div>
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <ActionButton onClick={handleCancel}>Close</ActionButton>
              </div>
            </ModalContent>
          </Modal>
        )}
      </MainContainer>
    </Container>
  );
}

export default CreateSubmission;