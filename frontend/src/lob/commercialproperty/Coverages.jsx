import React, { useState } from 'react';
import { Table, Input, Typography, Button, Select, Row, Col, Tooltip, Collapse } from 'antd';
import { EditOutlined, SaveOutlined, FileTextOutlined } from '@ant-design/icons';
import styles from './LocationComponent.module.css';
import { StyledDropdownWrapper } from "../../styles/index"
import {
  WorkSection,
} from '../../styles/pages/Dashboard/MyDashboardStyle';
import { StyledLocationText, StyledCollapse } from "../../styles/index";
import { NotesWrapper, NotesHeader } from "../../styles/index";
import { RoundedAddButton } from "../../styles/index";
import {
  NextButtonContainer,
  NextButton,
  ButtonGroup,
  IconButton,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import NextArrow from "../../assets/img/nextArrow.png";
import { Container } from '../../styles/components/Layout';

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const Coverages = ({ onNext }) => {
  const [editing, setEditing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Location 1");

  // Define table data for each location
  const locationData = {
    'Location 1': [
      { key: 1, label: 'Property Damage Coverage', coverageAmount: '$15,000,000', deductible: '$5,000', approvedCoverage: '$15,000,000', approvedDeductible: '$5,000' },
      { key: 2, label: 'Business Personal Property', coverageAmount: '$500,000', deductible: '$2,500', approvedCoverage: '$500,000', approvedDeductible: '$2,500' },
      { key: 3, label: 'Business Income Coverage', coverageAmount: '$1,000,000', deductible: '$10,000', approvedCoverage: '$1,000,000', approvedDeductible: '$10,000' },
      { key: 4, label: 'Flood Coverage', coverageAmount: '$500,000', deductible: '$25,000', approvedCoverage: '$500,000', approvedDeductible: '$25,000' },
      { key: 5, label: 'Earthquake Coverage', coverageAmount: '$1,000,000', deductible: '$50,000', approvedCoverage: '$1,000,000', approvedDeductible: '$50,000' },
      { key: 6, label: 'Annual Rental and fees', coverageAmount: '$250,000', deductible: '$1,000', approvedCoverage: '$250,000', approvedDeductible: '$1,000' },
      { key: 7, label: 'Ord/ Law Blanket Limits', coverageAmount: '$100,000', deductible: '$5,000', approvedCoverage: '$100,000', approvedDeductible: '$5,000' }
    ]
  };

  // State to hold current table data based on selected location
  const [rowData, setRowData] = useState(locationData["Location 1"]);

  const toggleEditing = () => setEditing(!editing);

  const handleFieldChange = (key, field, value) => {
    setRowData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  // Update table data when location is selected
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setRowData(locationData[location] || []); // Set data based on selected location
  };

  // Global font styles
  const globalFontStyle = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px'
  };

  const headerFontStyle = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '22px'
  };

  const labelStyle = {
    ...headerFontStyle,
    fontWeight: '500',
    marginBottom: '8px',
    marginRight: '12px',
    display: 'inline-block',
    lineHeight: '1.2'
  };

  const containerStyle = {
    ...globalFontStyle,
    padding: '20px',
  };

  const columns = [
    {
      title: 'Coverage Type',
      dataIndex: 'label',
      width: 250,
      fixed: 'left',
      align: 'center',
      render: (text) => (
        <span 
          className="header-label" 
          style={{ 
            ...globalFontStyle,
            textAlign: 'center', 
            display: 'block',
            fontWeight: '500'
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Client Requested Coverage Amount',
      dataIndex: 'coverageAmount',
      width: 290,
      align: 'center',
      render: (text) => (
        <span 
          className="coverageAmount" 
          style={{ 
            ...globalFontStyle,
            textAlign: 'center', 
            display: 'block' 
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Client Requested Deductible',
      dataIndex: 'deductible',
      width: 250,
      align: 'center',
      render: (text) => (
        <span 
          className="deductible" 
          style={{ 
            ...globalFontStyle,
            textAlign: 'center', 
            display: 'block' 
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Approved Coverage Amount',
      dataIndex: 'approvedCoverage',
      width: 250,
      align: 'center',
      render: (text, record) => (
        editing ? (
          <Input
            value={text}
            onChange={(e) => handleFieldChange(record.key, 'approvedCoverage', e.target.value)}
            style={{ 
              ...globalFontStyle,
              textAlign: 'center' 
            }}
          />
        ) : (
          <span style={{ 
            ...globalFontStyle,
            textAlign: 'center', 
            display: 'block' 
          }}>
            {text}
          </span>
        )
      ),
    },
    {
      title: 'Approved Deductible Amount',
      dataIndex: 'approvedDeductible',
      width: 250,
      align: 'center',
      render: (text, record) => (
        editing ? (
          <Input
            value={text}
            onChange={(e) => handleFieldChange(record.key, 'approvedDeductible', e.target.value)}
            style={{ 
              ...globalFontStyle,
              textAlign: 'center' 
            }}
          />
        ) : (
          <span style={{ 
            ...globalFontStyle,
            textAlign: 'center', 
            display: 'block' 
          }}>
            {text}
          </span>
        )
      ),
    },
  ];

  return (
    <Container style={globalFontStyle}>
      <div className="premium-summary" id="premiumSummary" style={containerStyle}>
        <div className="coverages-screen" id="coverages">
          {/* Location selection row with consistent alignment */}
           <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '34px', marginLeft:'12px' }}>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px' }}>
                      <span style={labelStyle}>Select Location:</span>
                      <Select
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        style={{ 
                          minWidth: '300px',
                          maxWidth: '400px',
                          flex: '1',
                          height: '40px'
                        }}
                      >
                        <Option value="Location 1">123-05 84th Avenue, Kew Gardens, NY 11415</Option>
                        {/* <Option value="Location 2">1234 Elm Street, Apt 101, California, 90210, USA</Option> */}
                      </Select>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} >
                    <div style={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }[0] || 'flex-end' }}>
                      <ButtonGroup>
                  
                  <Tooltip title={editing ? "Save" : "Edit"}>
                    <IconButton onClick={toggleEditing}>
                      {editing ? <SaveOutlined /> : <EditOutlined />}
                    </IconButton>
                  </Tooltip>
                  
                </ButtonGroup>
                     
                    </div>
                  </Col>
                </Row>
          

          {/* Table section */}
          {selectedLocation && (
            <>
              <WorkSection style={globalFontStyle}>
                <div className="work-content">
                  <StyledCollapse defaultActiveKey={['1']}>
                    <Panel 
                      header={<span style={headerFontStyle}>Coverages</span>} 
                      key="1"
                    >
                      <StyledLocationText style={globalFontStyle}>
                        Location – 123–05 84th Avenue, Kew Gardens, NY 11415
                      </StyledLocationText>
                      <div className="modern-table" style={{ overflowX: 'auto' }}>
                        <Table
                          columns={columns}
                          dataSource={rowData.map(item => ({ ...item, key: item.key }))}
                          pagination={{ pageSize: 4 }}
                          className="custom-table-header"
                          size="middle"
                          style={{ 
                            minWidth: '1250px',
                            ...globalFontStyle,
                            '.ant-table-thead > tr > th': {
                              whiteSpace: 'nowrap',
                              padding: '12px 8px',
                              textAlign: 'center',
                              ...globalFontStyle
                            },
                            '.ant-table-tbody > tr > td': {
                              whiteSpace: 'nowrap',
                              padding: '8px',
                              textAlign: 'center',
                              ...globalFontStyle
                            }
                          }}
                        />
                      </div>
                    </Panel>
                  </StyledCollapse>
                </div>
              </WorkSection>

              {/* Notes section */}
              <div style={{ 
                marginTop: '20px', 
                marginBottom: '20px',
                ...globalFontStyle
              }}>
                <NotesHeader style={{
                  marginBottom: '22px',
                  marginLeft: '20px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <FileTextOutlined className="icon" style={{ marginRight: '8px' }} />
                  <span className="title" style={headerFontStyle}>
                    Notes
                  </span>
                </NotesHeader>
                <WorkSection>
                  <Input.TextArea
                    placeholder="Enter notes here"
                    rows={4}
                    style={{ 
                      ...globalFontStyle,
                      resize: 'vertical'
                    }}
                  />
                </WorkSection>
              </div>

              {/* Next button */}
              <Row 
                gutter={[16, 16]} 
                justify="end" 
                align="middle"
                style={{ 
                  marginTop: '20px',
                  marginBottom: '20px'
                }}
              >
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <NextButtonContainer>
                      <NextButton 
                        onClick={onNext}
                        style={{
                          ...globalFontStyle,
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '500'
                        }}
                      >
                        <div 
                          className="step-content-box"
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            justifyContent: 'center'
                          }}
                        >
                          <span>Next</span>
                          <img
                            src={NextArrow}
                            alt="Next"
                            title="Next"
                            className="logobox"
                            style={{ width: '16px', height: '16px' }}
                          />
                        </div>
                      </NextButton>
                    </NextButtonContainer>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Coverages;