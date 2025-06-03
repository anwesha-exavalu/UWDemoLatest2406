import React, { useState, useEffect } from "react";
import styles from './LocationComponent.module.css';
import { Col, Row, Select, Button, Radio, Checkbox } from "antd";
import FormInput from "../../components/FormInput";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "../../styles/components/Layout";
import NextArrow from "../../assets/img/nextArrow.png";
import Rpa from "./Rpa";
import DropdownSelect from "../../components/FormDropdown";
import {
WelcomeSection,
  WorkSection,

} from '../../styles/pages/Dashboard/MyDashboardStyle';
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

  FormField,
  Label,
  Input,

  NextButtonContainer,
  NextButton,
  ActionButton,
  IconButton,
  Modal,
  ModalContent,
  UploadArea
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';

import useMetaData from "../../context/metaData";
const { Option } = Select;

export function LocationBuildingTab() {
  const [selectedLocation, setSelectedLocation] = useState("123-05 84th Avenue");
  const [activeTab, setActiveTab] = useState("Tab1");
  const [locationData, setLocationData] = useState({});
  const [formData, setFormData] = useState({
    yearBuilt: "",
    squareFootage: "",
    unitsCount: "",
    storiesCount: "",
    freePlacesCount: "",
    roomsCount: "",
    parkingSpacesCount: "",
    protectiveDevices: "",
    freePlacesCount2: "",
    constructionType: "",
    fireSprinkler: "",
    sprinkleredArea: "",
    roofType: "",
    estimatedrcv: "",
    propertyClass: "",
    coverages: "",
    rateType: "",
    causeofLoss: "",
    excludeVandalism: "",
    excludeSprinkler: "",
    windDeductable: "",
    valuationMethod: "",
    autoIncrease: "",
    coinsurance: "",
    buildingLimit: "",
    buildingDeductable: "",
    bppl: "",
    bppd: "",
    causeofLoss2: "",
    excludeVandalism2: "",
    excludeSprinkler2: "",
    windDeductable2: "",
    valuationMethod2: "",
    reportingForm: "",
    coinsurance2: "",
    incomeLimitManufacture: "",
    incomeLimitMfg: "",
    incomeLimitrental: "",
    coinsurance3: "",
    causeofLoss3: "",
    waitingPeriod: "",
    periodOfCoverages: "",
    floodCoveragelimit: "",
    floodCoveragemonthlyLimit: "",
    earthquakeCoveragelimit: "",
    earthquakeCoveragemonthlylimit: "",
    showFloodFields: false,
    showEarthquakeFields: false,
  });
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);






  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    setSelectedBuildingIndex(null);
    setIsEditing(false);

    // Set form data to blank for the new location if no data exists
    setFormData({
      yearBuilt: "",
      squareFootage: "",
      unitsCount: "",
      storiesCount: "",
      freePlacesCount: "",
      roomsCount: "",
      parkingSpacesCount: "",
      protectiveDevices: "",
      freePlacesCount2: "",
      constructionType: "",
      fireSprinkler: "",
      sprinkleredArea: "",
      roofType: "",
      estimatedrcv: "",
      propertyClass: "",
      coverages: "",
      rateType: "",
      causeofLoss: "",
      excludeVandalism: "",
      excludeSprinkler: "",
      windDeductable: "",
      valuationMethod: "",
      autoIncrease: "",
      coinsurance: "",
      buildingLimit: "",
      buildingDeductable: "",
      bppl: "",
      bppd: "",
      causeofLoss2: "",
      excludeVandalism2: "",
      excludeSprinkler2: "",
      windDeductable2: "",
      valuationMethod2: "",
      reportingForm: "",
      coinsurance2: "",
      incomeLimitManufacture: "",
      incomeLimitMfg: "",
      incomeLimitrental: "",
      coinsurance3: "",
      causeofLoss3: "",
      waitingPeriod: "",
      periodOfCoverages: "",
      floodCoveragelimit: "",
      floodCoveragemonthlyLimit: "",
      earthquakeCoveragelimit: "",
      earthquakeCoveragemonthlylimit: "",
      showFloodFields: false,
      showEarthquakeFields: false,
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const addOrUpdateBuilding = () => {
    const updatedBuildings = locationData[selectedLocation] || [];
    if (isEditing) {
      // Update existing building
      updatedBuildings[selectedBuildingIndex] = formData;
      setIsEditing(false);
      setSelectedBuildingIndex(null);
    } else {
      // Add new building
      updatedBuildings.push(formData);
    }

    setLocationData({
      ...locationData,
      [selectedLocation]: updatedBuildings,
    });

    // Reset form
    setFormData({
      yearBuilt: "",
      squareFootage: "",
      unitsCount: "",
      storiesCount: "",
      freePlacesCount: "",
      roomsCount: "",
      parkingSpacesCount: "",
      protectiveDevices: "",
      freePlacesCount2: "",
      constructionType: "",
      fireSprinkler: "",
      sprinkleredArea: "",
      roofType: "",
      estimatedrcv: "",
      propertyClass: "",
      coverages: "",
      rateType: "",
      causeofLoss: "",
      excludeVandalism: "",
      excludeSprinkler: "",
      windDeductable: "",
      valuationMethod: "",
      autoIncrease: "",
      coinsurance: "",
      buildingLimit: "",
      buildingDeductable: "",
      bppl: "",
      bppd: "",
      causeofLoss2: "",
      excludeVandalism2: "",
      excludeSprinkler2: "",
      windDeductable2: "",
      valuationMethod2: "",
      reportingForm: "",
      coinsurance2: "",
      incomeLimitManufacture: "",
      incomeLimitMfg: "",
      incomeLimitrental: "",
      coinsurance3: "",
      causeofLoss3: "",
      waitingPeriod: "",
      periodOfCoverages: "",
      floodCoveragelimit: "",
      floodCoveragemonthlyLimit: "",
      earthquakeCoveragelimit: "",
      earthquakeCoveragemonthlylimit: "",
      showFloodFields: false,
      showEarthquakeFields: false,
    });
  };
  const { theme } = useMetaData();
  const selectBuilding = (index) => {
    const buildings = locationData[selectedLocation] || [];
    setSelectedBuildingIndex(index);
    setFormData(buildings[index]);
    setIsEditing(true);
  };

  const deleteBuilding = (index) => {
    const updatedBuildings = locationData[selectedLocation] || [];
    updatedBuildings.splice(index, 1);

    setLocationData({
      ...locationData,
      [selectedLocation]: updatedBuildings,
    });

    if (selectedBuildingIndex === index) {
      setFormData({
        yearBuilt: "2001",
        squareFootage: "12000sq ft",
        unitsCount: "25",
        storiesCount: "7",
        freePlacesCount: "2",
        roomsCount: "10",
        parkingSpacesCount: "10",
        protectiveDevices: "yes",
        freePlacesCount2: "2",
        constructionType: "commercial",
        fireSprinkler: "yes",
        sprinkleredArea: "5000sq ft",
        roofType: "",
        estimatedrcv: "",
        propertyClass: "",
        coverages: "",
        rateType: "",
        causeofLoss: "",
        excludeVandalism: "",
        excludeSprinkler: "",
        windDeductable: "",
        valuationMethod: "",
        autoIncrease: "",
        coinsurance: "",
        buildingLimit: "",
        buildingDeductable: "",
        bppl: "",
        bppd: "",
        causeofLoss2: "",
        excludeVandalism2: "",
        excludeSprinkler2: "",
        windDeductable2: "",
        valuationMethod2: "",
        reportingForm: "",
        coinsurance2: "",
        incomeLimitManufacture: "",
        incomeLimitMfg: "",
        incomeLimitrental: "",
        coinsurance3: "",
        causeofLoss3: "",
        waitingPeriod: "",
        periodOfCoverages: "",
        floodCoveragelimit: "",
        floodCoveragemonthlyLimit: "",
        earthquakeCoveragelimit: "",
        earthquakeCoveragemonthlylimit: "",
        showFloodFields: false,
        showEarthquakeFields: false,

      });
      setIsEditing(false);
      setSelectedBuildingIndex(null);
    }
  };

  const nextTab = () => {
    setActiveTab("Tab2");
  };

  const handleAdditionalCoverageInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };
  useEffect(() => {
    // Trigger the button's functionality on component load
    addOrUpdateBuilding();
  }, [])
  return (
   <Container>
  <Row gutter={[16, 16]} align="middle" style={{ marginTop: "16px" }}>
    {/* Dropdown in first column */}
    <Col flex="auto">
      <WelcomeSection>
   <div className="filter-group">
        <span className="filter-label">Please select the location:</span>
        <Select
          placeholder="Select Location"
          onChange={handleLocationChange}
          value={selectedLocation}
          style={{ width: 220, height: 45, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <Option value="123-05 84th Avenue">123-05 84th Avenue, Kew Gardens, NY 11415</Option>
        
        </Select>
      </div>
      </WelcomeSection>
    </Col>
    
    {/* Tabs in second column - only show when location is selected */}
    {selectedLocation && (
      <Col flex="none">
<WelcomeSection>
        <div className="tab-navigation">
          <Button
            className={`nav-tab ${activeTab === "Tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("Tab1")}
          >
            Add Buildings
          </Button>
          <Button
            className={`nav-tab ${activeTab === "Tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("Tab2")}
          >
            Other Insights
          </Button>
        </div></WelcomeSection>
      </Col>
    )}
  </Row>

  {/* Tab content covers full width below */}
  {selectedLocation && (
    <Row gutter={[24, 24]}>
      <Col span={24}>
      
        <div className={styles.container}>
          {activeTab === "Tab1" && (
            <div id="Tab1" >
              <WorkSection>
                <div className="work-header">Building Management</div>
                <div className="work-content">
                  <div>
                    <h5>Building List for {selectedLocation}</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>SL.</th>
                          <th>Location Details</th>
                          <th>Year Built</th>
                          <th>Square Footage</th>
                          <th>Roof Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(locationData[selectedLocation] || []).map((building, index) => (
                          <tr key={index}>
                            <td>
                              <Radio
                                checked={selectedBuildingIndex === index}
                                onChange={() => selectBuilding(index)}
                              />
                            </td>
                            <td>{index + 1}</td>
                            <td>{selectedLocation}</td>
                            <td>1952</td>
                            <td>45,000</td>
                            <td>Flat Roof with Gravel</td>
                            <td>
                              <a href="#" onClick={(e) => {
                                e.preventDefault();
                                deleteBuilding(index);
                              }}>
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </WorkSection>
              
              <Container>
                <MainContainer>
                  <Row gutter={[24, 24]}>
                    <Col flex="1"></Col>
                    <Col flex="none">
                      <HeaderContainer>
                        <ButtonGroup>
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
                            </CardHeader>
                            <CardContent>
                              <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Year Built</span>}
                                    value="1952"
                                    required={true}
                                    onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Square Footage</span>}
                                    value="45,000"
                                    required={true}
                                    onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Units Count</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("unitsCount", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px", marginRight: "40px" }}>Stories Count</span>}
                                    value="5"
                                    required={true}
                                    onChange={(e) => handleInputChange("storiesCount", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>FreePlacesCount</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("freePlacesCount", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Rooms Count</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("roomsCount", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Parking Spaces Count</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("parkingSpacesCount", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Protective devices</span>}
                                    value="Alarm system, CCTV"
                                    required={true}
                                    onChange={(e) => handleInputChange("protectiveDevices", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Construction Type</span>}
                                    value="Masonry"
                                    required={true}
                                    onChange={(e) => handleInputChange("constructionType", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Fire Sprinkler</span>}
                                    value="yes"
                                    required={true}
                                    onChange={(e) => handleInputChange("fireSprinkler", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Sprinklered area</span>}
                                    value="100%"
                                    required={true}
                                    onChange={(e) => handleInputChange("sprinkleredArea", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Roof type</span>}
                                    value="Flat roof with gravel"
                                    required={true}
                                    onChange={(e) => handleInputChange("roofType", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Estimated replacement cost value</span>}
                                    value="$15,000,000"
                                    required={true}
                                    onChange={(e) => handleInputChange("estimatedrcv", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Property class</span>}
                                    value="Residental Building"
                                    required={true}
                                    onChange={(e) => handleInputChange("propertyClass", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Coverages</span>}
                                    value="Property damage, Fire, Liability"
                                    required={true}
                                    onChange={(e) => handleInputChange("coverages", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Rate Type</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("rateType", e.target.value)}
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
                              <h3>Property Damage Coverage</h3>
                            </CardHeader>
                            <CardContent>
                              <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Exclude Vandalism</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("excludeVandalism", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Exclude sprinkler</span>}
                                    value="No"
                                    required={true}
                                    onChange={(e) => handleInputChange("excludeSprinkler", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Wind % deductable</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("windDeductable", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Valuation Method</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("valuationMethod", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Auto increase %</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("autoIncrease", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Coinsurance</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("coinsurance", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Building Limit</span>}
                                    value="$15,000,000"
                                    required={true}
                                    onChange={(e) => handleInputChange("buildingLimit", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Building Deductible</span>}
                                    value="$5,000"
                                    required={true}
                                    onChange={(e) => handleInputChange("buildingDeductable", e.target.value)}
                                  />
                                </Col>
                              </Row>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <h3>Business Personal Property</h3>
                            </CardHeader>
                            <CardContent>
                              <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Business Personal Property Limit</span>}
                                    value="$5,00,000"
                                    required={true}
                                    onChange={(e) => handleInputChange("bppl", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Business Personal Property Deductable</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("bppd", e.target.value)}
                                  />
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Exclude Vandalism</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("excludeVandalism2", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Exclude Sprinkler</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("excludeSprinkler2", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Wind % deductable</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("windDeductable2", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Valuation Method</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("valuationMethod2", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Reporting form</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("reportingForm", e.target.value)}
                                  />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Coinsurance</span>}
                                    value=" "
                                    required={true}
                                    onChange={(e) => handleInputChange("coinsurance2", e.target.value)}
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
                            </div>
                            <h3>Business Income Coverage</h3>
                          </CardHeader>
                          <CardContent>
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                                <FormInput
                                  label={<span style={{ fontSize: "15px" }}>Income Limit $</span>}
                                  value=" "
                                  required={true}
                                  onChange={(e) => handleInputChange("incomeLimitrental", e.target.value)}
                                />
                              </Col>
                              <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                                <FormInput
                                  label={<span style={{ fontSize: "15px" }}>Coinsurance</span>}
                                  value=" "
                                  required={true}
                                  onChange={(e) => handleInputChange("coinsurance3", e.target.value)}
                                />
                              </Col>

                              <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                                <FormInput
                                  label={<span style={{ fontSize: "15px" }}>Waiting Period</span>}
                                  value=" "
                                  required={true}
                                  onChange={(e) => handleInputChange("waitingPeriod", e.target.value)}
                                />
                              </Col>
                              <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                                <FormInput
                                  label={<span style={{ fontSize: "15px" }}>Period of coverages</span>}
                                  value=""
                                  required={true}
                                  onChange={(e) => handleInputChange("periodOfCoverages", e.target.value)}
                                />
                              </Col>
                            </Row>
                          </CardContent>
                        </Card>
                      </Col>

                      <Col span={24}>
                        <Card>
                          <CardHeader>
                            <div className="step-content-box">
                            </div>
                            <h3>Additional Information</h3>
                          </CardHeader>
                          <CardContent>
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                                <Checkbox
                                  checked={formData.showFloodFields}
                                  onChange={() => handleCheckboxChange('showFloodFields')}
                                >
                                  Flood Coverage
                                </Checkbox>
                              </Col>
                              <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                                <Checkbox
                                  checked={formData.showEarthquakeFields}
                                  onChange={() => handleCheckboxChange('showEarthquakeFields')}
                                >
                                  Earthquake Coverage
                                </Checkbox>
                              </Col>
                            </Row>

                            {formData.showFloodFields && (
                              <Row gutter={22}>
                                <Col span={6}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Flood Coverage Limit</span>}
                                    value="$5,00,000"
                                    required={true}
                                    onChange={(e) => handleAdditionalCoverageInputChange("floodCoveragelimit", e.target.value)}
                                  />
                                </Col>
                                <Col span={6}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Flood Coverage Deductable</span>}
                                    value="$25,000"
                                    required={true}
                                    onChange={(e) => handleAdditionalCoverageInputChange("floodCoveragemonthlyLimit", e.target.value)}
                                  />
                                </Col>
                              </Row>
                            )}

                            {formData.showEarthquakeFields && (
                              <Row gutter={22}>
                                <Col span={6}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Earthquake Coverage Limit</span>}
                                    value="$10,00,000"
                                    required={true}
                                    onChange={(e) => handleAdditionalCoverageInputChange("floodCoveragelimit", e.target.value)}
                                  />
                                </Col>
                                <Col span={6}>
                                  <FormInput
                                    label={<span style={{ fontSize: "15px" }}>Earthquake Coverage Deductable</span>}
                                    value="$50,000"
                                    required={true}
                                    onChange={(e) => handleAdditionalCoverageInputChange("floodCoveragemonthlyLimit", e.target.value)}
                                  />
                                </Col>
                              </Row>
                            )}
                          </CardContent>
                        </Card>
                      </Col>
                    </Row>
                  </ContentContainer>

                  <Row gutter={[24, 24]}>
                    <Col flex="1"></Col>
                    <Col flex="None">
                      <NextButtonContainer style={{ marginBottom: "20px" }}>
                        <NextButton type="primary" onClick={addOrUpdateBuilding} style={{ marginRight: "10px" }}>
                          {isEditing ? "OK" : "Add Building"}
                        </NextButton>
                        <NextButton onClick={nextTab}>
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
                </MainContainer>
              </Container>
            </div>
          )}

          {activeTab === "Tab2" && (
            <div id="Tab2" >
              <Container>
              <Rpa /></Container>
            </div>
          )}
        </div>
      </Col>
    </Row>
  )}
</Container>
  );
}

export default LocationBuildingTab;
