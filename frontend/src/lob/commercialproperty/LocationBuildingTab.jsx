import React, { useState, useEffect } from "react";
import styles from './LocationComponent.module.css';
import { Col, Row, Select, Button, Radio, Checkbox, Table } from "antd";
import FormInput from "../../components/FormInput";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "../../styles/components/Layout";
import NextArrow from "../../assets/img/nextArrow.png";
import Rpa from "./Rpa";
import DropdownSelect from "../../components/FormDropdown";
import propertyicon from "../../assets/img/property-icon.png";
import businessicon from "../../assets/img/business-icon.png";
import mailAdd from "../../assets/img/mailingAddress.png";
import homeicon from "../../assets/img/home-icon.png";
import addDetails from "../../assets/img/addDetails-icon.png";
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
import { useLocationBuildingConfig } from './locationBuildingData';

const { Option } = Select;

export function LocationBuildingTab() {
  // Get configuration data
  const config = useLocationBuildingConfig();

  // State management
  const [selectedLocation, setSelectedLocation] = useState(config.locations[0]?.value || "");
  const [activeTab, setActiveTab] = useState(config.ui.tabs.tab1.id);
  const [locationData, setLocationData] = useState({});
  const [formData, setFormData] = useState({ ...config.defaultFormData });
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { theme } = useMetaData();

  // Icon mapping
  const iconMap = {
    homeicon: homeicon,
    propertyicon: propertyicon,
    businessicon: businessicon,
    mailAdd: mailAdd,
    addDetails: addDetails
  };

  // Event handlers
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    setSelectedBuildingIndex(null);
    setIsEditing(false);
    setFormData({ ...config.defaultFormData });
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAdditionalCoverageInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Building management functions
  const addOrUpdateBuilding = () => {
    const updatedBuildings = locationData[selectedLocation] || [];

    if (isEditing && selectedBuildingIndex !== null) {
      updatedBuildings[selectedBuildingIndex] = { ...formData };
      setIsEditing(false);
      setSelectedBuildingIndex(null);
    } else {
      updatedBuildings.push({ ...formData });
    }

    setLocationData(prev => ({
      ...prev,
      [selectedLocation]: updatedBuildings,
    }));

    setFormData({ ...config.defaultFormData });
  };

  const selectBuilding = (index) => {
    const buildings = locationData[selectedLocation] || [];
    setSelectedBuildingIndex(index);
    setFormData({ ...buildings[index] });
    setIsEditing(true);
  };

  const deleteBuilding = (index) => {
    const updatedBuildings = [...(locationData[selectedLocation] || [])];
    updatedBuildings.splice(index, 1);

    setLocationData(prev => ({
      ...prev,
      [selectedLocation]: updatedBuildings,
    }));

    if (selectedBuildingIndex === index) {
      setFormData({ ...config.deleteFormData });
      setIsEditing(false);
      setSelectedBuildingIndex(null);
    }
  };

  const nextTab = () => {
    setActiveTab(config.ui.tabs.tab2.id);
  };

  // Table configuration
  const buildingColumns = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      width: 80,
      render: (_, record, index) => (
        <Radio
          checked={selectedBuildingIndex === index}
          onChange={(e) => {
            e.stopPropagation();
            selectBuilding(index);
          }}
        />
      )
    },
    {
      title: 'SL.',
      dataIndex: 'serial',
      key: 'serial',
      width: 60,
      render: (_, record, index) => index + 1
    },
    {
      title: 'Location Details',
      dataIndex: 'location',
      key: 'location',
      render: (text) => text || selectedLocation
    },
    {
      title: config.fieldLabels.yearBuilt,
      dataIndex: 'yearBuilt',
      key: 'yearBuilt',
      render: (text) => text || config.tableDefaults.yearBuilt
    },
    {
      title: config.fieldLabels.squareFootage,
      dataIndex: 'squareFootage',
      key: 'squareFootage',
      render: (text) => {
        const value = text || config.tableDefaults.squareFootage;
        return typeof value === 'number' ? value.toLocaleString() : value;
      }
    },
    {
      title: config.fieldLabels.roofType,
      dataIndex: 'roofType',
      key: 'roofType',
      render: (text) => text || config.tableDefaults.roofType
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 80,
      render: (_, record, index) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteBuilding(record.originalIndex || index);
          }}
          style={{
            color: '#204FC2',
            border: '1px solid #204FC2',
            padding: '4px 8px',
            borderRadius: '50px'
          }}
        >
          {config.buttonLabels.delete}
        </a>
      )
    }
  ];

  // Transform building data for table
  const buildingData = (locationData[selectedLocation] || []).map((building, index) => ({
    key: `building-${index}`,
    originalIndex: index,
    location: selectedLocation,
    yearBuilt: building.yearBuilt || config.tableDefaults.yearBuilt,
    squareFootage: building.squareFootage || config.tableDefaults.squareFootage,
    roofType: building.roofType || config.tableDefaults.roofType,
    ...building
  }));

  // Table component
  const MyTableComponent = ({ columns, dataSource, handleRowClick, handleChange }) => (
    <div className="modern-table">
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={handleChange}
        onRow={(record, index) => ({
          onClick: (event) => {
            if (!event.target.closest('a, button, input[type="radio"]')) {
              handleRowClick(record, index);
            }
          },
          className: 'clickable-row',
        })}
        pagination={{
          pageSize: config.ui.tablePageSize,
          showSizeChanger: false
        }}
        size="middle"
        rowKey={(record, index) => record.key || index}
      />
    </div>
  );

  // Form section renderer
  const renderFormSection = (sectionKey, fields) => {
    const sectionConfig = config.ui.sections[sectionKey];

    return (
      <Card>
        <CardHeader>
          <div className="step-content-box">
            <img
              src={iconMap[sectionConfig.icon]}
              alt="Exavalu"
              title="Exavalu"
              className="logobox"
            />
          </div>
          <h3>{sectionConfig.title}</h3>
        </CardHeader>
        <CardContent>
          <Row gutter={[16, 16]}>
            {fields.map((fieldKey) => (
              <Col xs={24} sm={24} md={12} lg={24} xl={12} key={fieldKey}>
                <FormInput
                  label={
                    <span >
                      {config.fieldLabels[fieldKey]}
                    </span>
                  }
                  value={formData[fieldKey] || config.sampleValues[fieldKey] || ""}
                  required={true}
                  onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                />
              </Col>
            ))}
          </Row>
        </CardContent>
      </Card>
    );
  };

  // Form field groups configuration
  const formSections = {
    propertyDetails: [
      'yearBuilt', 'squareFootage', 'unitsCount', 'storiesCount',
      'freePlacesCount', 'roomsCount', 'parkingSpacesCount',
      'protectiveDevices', 'constructionType', 'fireSprinkler',
      'sprinkleredArea', 'roofType', 'estimatedrcv', 'propertyClass',
      'coverages', 'rateType'
    ],
    propertyDamage: [
      'excludeVandalism', 'excludeSprinkler', 'windDeductable',
      'valuationMethod', 'autoIncrease', 'coinsurance',
      'buildingLimit', 'buildingDeductable'
    ],
    businessProperty: [
      'bppl', 'bppd', 'excludeVandalism2', 'excludeSprinkler2',
      'windDeductable2', 'valuationMethod2', 'reportingForm', 'coinsurance2'
    ],
    businessIncome: [
      'incomeLimitrental', 'coinsurance3', 'waitingPeriod', 'periodOfCoverages'
    ]
  };

  // Event handlers for table
  const handleBuildingRowClick = (record, index) => {
    selectBuilding(index);
  };

  const handleBuildingChange = (pagination, filters, sorter) => {
    console.log('Table changed:', { pagination, filters, sorter });
  };

  // Effect hook
  useEffect(() => {
    // Initialize with default data if needed
    if (selectedLocation && !locationData[selectedLocation]?.length) {
      addOrUpdateBuilding();
    }
  }, [selectedLocation]);

  return (
    <Container>

      <Row gutter={[24, 24]} style={{ marginTop: "16px" }}>
        <Col flex="auto">
          <WelcomeSection>
            <div className="filter-group">
              <span className="filter-label">Please select the location:</span>
              <Select
                placeholder="Select Location"
                onChange={handleLocationChange}
                value={selectedLocation}
                style={{
                  width: config.ui.selectWidth,
                  height: config.ui.selectHeight,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  width: 350
                }}
              >
                {config.locations.map((location) => (
                  <Option key={location.value} value={location.value}>
                    {location.label}
                  </Option>
                ))}
              </Select>
            </div>
          </WelcomeSection>
        </Col>

        {/* Tab Navigation */}
        {selectedLocation && (
          <Col flex="none" >
            <WelcomeSection style={{ marginLeft: '2px' }} >
              <div className="tab-navigation">
                <Button
                  className={`nav-tab ${activeTab === config.ui.tabs.tab1.id ? "active" : ""}`}
                  onClick={() => setActiveTab(config.ui.tabs.tab1.id)}
                >
                  {config.ui.tabs.tab1.label}
                </Button>
                <Button
                  className={`nav-tab ${activeTab === config.ui.tabs.tab2.id ? "active" : ""}`}
                  onClick={() => setActiveTab(config.ui.tabs.tab2.id)}
                >
                  {config.ui.tabs.tab2.label}
                </Button>
              </div>
            </WelcomeSection>
          </Col>
        )}
      </Row>

      {/* Main Content */}
      {selectedLocation && (
        <Row gutter={[24, 24]}>
          <Col flex="auto">

            {/* Tab 1: Add Buildings */}
            {activeTab === config.ui.tabs.tab1.id && (
              <div id={config.ui.tabs.tab1.id}>
                {/* Building List Section */}

                <WorkSection style={{ marginLeft: '2px', marginRight: '10px' }}>
                  <div className="work-header">{config.ui.tabs.tab1.title}</div>
                  <div className="work-content">
                    <div>
                      <h5>Building List for {selectedLocation}</h5>
                      <MyTableComponent
                        columns={buildingColumns}
                        dataSource={buildingData}
                        handleRowClick={handleBuildingRowClick}
                        handleChange={handleBuildingChange}
                      />
                    </div>
                  </div>
                </WorkSection>

                <Row gutter={[24, 24]}>
                  <Col flex="1"></Col>
                  <Col flex="none">
                    <HeaderContainer>
                      <ButtonGroup></ButtonGroup>
                    </HeaderContainer>
                  </Col>
                </Row>

                {/* Form Content */}
                <ContentContainer>
                  <Row gutter={[24, 24]}>
                    {/* Left Column */}
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <LeftColumn>
                        {renderFormSection('propertyDetails', formSections.propertyDetails)}
                      </LeftColumn>
                    </Col>

                    {/* Right Column */}
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <RightColumn>
                        {renderFormSection('propertyDamage', formSections.propertyDamage)}
                        {renderFormSection('businessProperty', formSections.businessProperty)}
                      </RightColumn>
                    </Col>

                    {/* Business Income Section */}
                    <Col span={24}>
                      <Card>
                        <CardHeader>
                          <div className="step-content-box">
                            <img
                              src={iconMap[config.ui.sections.businessIncome.icon]}
                              alt="Exavalu"
                              title="Exavalu"
                              className="logobox"
                            />
                          </div>
                          <h3>{config.ui.sections.businessIncome.title}</h3>
                        </CardHeader>
                        <CardContent>
                          <Row gutter={[16, 16]}>
                            {formSections.businessIncome.map((fieldKey) => (
                              <Col xs={24} sm={24} md={6} lg={24} xl={6} key={fieldKey}>
                                <FormInput
                                  label={
                                    <span >
                                      {config.fieldLabels[fieldKey]}
                                    </span>
                                  }
                                  value={formData[fieldKey] || config.sampleValues[fieldKey] || ""}
                                  required={true}
                                  onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                                />
                              </Col>
                            ))}
                          </Row>
                        </CardContent>
                      </Card>
                    </Col>

                    {/* Additional Information Section */}
                    <Col span={24}>
                      <Card>
                        <CardHeader>
                          <div className="step-content-box">
                            <img
                              src={iconMap[config.ui.sections.additionalInfo.icon]}
                              alt="Exavalu"
                              title="Exavalu"
                              className="logobox"
                            />
                          </div>
                          <h3>{config.ui.sections.additionalInfo.title}</h3>
                        </CardHeader>
                        <CardContent>
                          {/* Checkboxes */}
                          <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={7} lg={24} xl={7} >
                              <Checkbox
                                checked={formData.showFloodFields}
                                onChange={() => handleCheckboxChange('showFloodFields')}
                              >
                                {config.checkboxLabels.showFloodFields}
                              </Checkbox>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={24} xl={6}>
                              <Checkbox
                                checked={formData.showEarthquakeFields}
                                onChange={() => handleCheckboxChange('showEarthquakeFields')}
                              >
                                {config.checkboxLabels.showEarthquakeFields}
                              </Checkbox>
                            </Col>
                          </Row>
                          <Row gutter={22}>
                            <Col span={7}>
                              {/* Conditional Fields - Flood */}
                              {formData.showFloodFields && (
                                <>
                                  <Row gutter={22}>
                                    <Col span={18}>
                                      <FormInput
                                        label={
                                          <span >
                                            {config.fieldLabels.floodCoveragelimit}
                                          </span>
                                        }
                                        value={formData.floodCoveragelimit || config.sampleValues.floodCoveragelimit}
                                        required={true}
                                        onChange={(e) => handleAdditionalCoverageInputChange("floodCoveragelimit", e.target.value)}
                                      />
                                    </Col> </Row>
                                  <Row gutter={22}>
                                    <Col span={18}>
                                      <FormInput
                                        label={
                                          <span >
                                            {config.fieldLabels.floodCoveragemonthlyLimit}
                                          </span>
                                        }
                                        value={formData.floodCoveragemonthlyLimit || config.sampleValues.floodCoveragemonthlyLimit}
                                        required={true}
                                        onChange={(e) => handleAdditionalCoverageInputChange("floodCoveragemonthlyLimit", e.target.value)}
                                      />
                                    </Col>
                                  </Row>
                                </>
                              )}
                            </Col>
                            <Col span={9}>
                              {/* Conditional Fields - Earthquake */}
                              {formData.showEarthquakeFields && (
                                <>
                                  <Row gutter={22}>
                                    <Col span={18}>
                                      <FormInput
                                        label={
                                          <span>
                                            {config.fieldLabels.earthquakeCoveragelimit}
                                          </span>
                                        }
                                        value={formData.earthquakeCoveragelimit || config.sampleValues.earthquakeCoveragelimit}
                                        required={true}
                                        onChange={(e) => handleAdditionalCoverageInputChange("earthquakeCoveragelimit", e.target.value)}
                                      />
                                    </Col></Row>
                                  <Row gutter={22}>
                                    <Col span={18}>
                                      <FormInput
                                        label={
                                          <span >
                                            {config.fieldLabels.earthquakeCoveragemonthlylimit}
                                          </span>
                                        }
                                        value={formData.earthquakeCoveragemonthlylimit || config.sampleValues.earthquakeCoveragemonthlylimit}
                                        required={true}
                                        onChange={(e) => handleAdditionalCoverageInputChange("earthquakeCoveragemonthlylimit", e.target.value)}
                                      />
                                    </Col>
                                  </Row>
                                </>
                              )}
                            </Col>
                          </Row>
                        </CardContent>
                      </Card>
                    </Col>
                  </Row>
                </ContentContainer>

                {/* Action Buttons */}
                <Row gutter={[24, 24]}>
                  <Col flex="1"></Col>
                  <Col flex="None">
                    <NextButtonContainer style={{ marginBottom: "20px" }}>
                      <NextButton
                        type="primary"
                        onClick={addOrUpdateBuilding}
                        style={{ marginRight: "10px" }}
                      >
                        {isEditing ? config.buttonLabels.editBuilding : config.buttonLabels.addBuilding}
                      </NextButton>
                      <NextButton onClick={nextTab}>
                        <div className="step-content-box">
                          {config.buttonLabels.next}
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
              </div>
            )}

            {/* Tab 2: Other Insights */}
            {activeTab === config.ui.tabs.tab2.id && (
              <div id={config.ui.tabs.tab2.id}>
                <Container>
                  <Rpa />
                </Container>
              </div>
            )}

          </Col>
        </Row>
      )}
    </Container>
  );
}

export default LocationBuildingTab;