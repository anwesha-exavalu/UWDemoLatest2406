import React, { useState } from 'react';
import { Table, Input, Typography, Button, Tooltip, Row, Col, Select, Collapse } from 'antd';
import { EditOutlined, SaveOutlined, FileTextOutlined } from '@ant-design/icons';
import TableComponent from '../../components/Table';
import { StyledLocationText, StyledCollapse } from "../../styles/index";
import {
  WorkSection,
} from '../../styles/pages/Dashboard/MyDashboardStyle';
import {
  NextButtonContainer,
  NextButton,
  ButtonGroup,
  IconButton,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import NextArrow from "../../assets/img/nextArrow.png";
import { NotesWrapper, NotesHeader } from "../../styles/index";
import { Container } from '../../styles/components/Layout';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const { Panel } = Collapse;

const PremiumSummary = ({ onNext }) => {
  const [editing, setEditing] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("Location 1");

  // Data for each building
  const buildingData = {
    'Location 1': [
      { key: 1, description: 'Property Damage Coverage', coverageAmount: '$15,000,000', premium: '$22,000' },
      { key: 2, description: 'Business Personal Property', coverageAmount: '$500,000', premium: '$5,000' },
      { key: 3, description: 'Business Income Coverage', coverageAmount: '$1,000,000', premium: '$3,000' },
      { key: 4, description: 'Flood Coverage', coverageAmount: '$500,000', premium: '$7,000' },
      { key: 5, description: 'Earthquake Coverage', coverageAmount: '$1,000,000', premium: '$5,000' },
      { key: 6, description: 'Annual Rental and fees', coverageAmount: '$250,000', premium: '$2,000' },
      { key: 7, description: 'Ord/ Law Blanket Limits', coverageAmount: '$100,000', premium: '$3,000' },
    ],
    'Location 2': [
      { key: 1, description: 'Property Damage Coverage', coverageAmount: '$500,000', premium: '$5000' },
      { key: 2, description: 'Business Personal Property', coverageAmount: '$400,000', premium: '$4000' },
      { key: 3, description: 'Business Income Coverage', coverageAmount: '$400,000', premium: '$4000' },
      { key: 4, description: 'Flood Coverage', coverageAmount: '$300,000', premium: '$3000' },
      { key: 5, description: 'Earthquake Coverage', coverageAmount: '$300,000', premium: '$3000' },
      { key: 6, description: 'Annual Rental and fees', coverageAmount: '$500,000', premium: '$5000' },
      { key: 7, description: 'Ord/ Law Blanket Limits', coverageAmount: '$400,000', premium: '$4000' },
    ],
  };

  const [data, setData] = useState(buildingData["Location 1"]);

  const toggleEditing = () => setEditing(!editing);

  const handleFieldChange = (key, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const handleBuildingChange = (value) => {
    setSelectedBuilding(value);
    setData(buildingData[value] || []);
  };

  const columns = [
    {
      title: 'Coverages',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Coverage Amount',
      dataIndex: 'coverageAmount',
      key: 'coverageAmount',
      render: (text, record) =>
        editing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleFieldChange(record.key, 'coverageAmount', e.target.value)
            }
            style={{ 
              fontSize: '14px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          />
        ) : (
          <span style={{ 
            fontSize: '14px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>{text}</span>
        ),
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
      render: (text, record) =>
        editing ? (
          <Input
            value={text}
            onChange={(e) =>
              handleFieldChange(record.key, 'premium', e.target.value)
            }
            style={{ 
              fontSize: '14px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          />
        ) : (
          <span style={{ 
            fontSize: '14px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>{text}</span>
        ),
    },
  ];

  const containerStyle = {
    fontSize: '14px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
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

  return (
    <Container>
    <div className="premium-summary" id="premiumSummary" style={containerStyle}>
      
      {/* Location Selection Row */}
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '10px', marginLeft:'12px' }}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px' }}>
            <span style={labelStyle}>Select Location:</span>
            <Select
              value={selectedBuilding}
              onChange={handleBuildingChange}
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

      {/* Coverage Table Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <WorkSection>
            <div className="work-content">
              <StyledCollapse defaultActiveKey={['1']}>
                <Panel 
                  header={
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: '500',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Building No: 123-05
                    </span>
                  } 
                  key="1"
                >
                  <div className="modern-table" style={{ marginTop: '16px' }}>
                    <Table
                      columns={columns.map(col => ({
                        ...col,
                        title: <span style={{ 
                          fontSize: '14px', 
                          fontWeight: '600',
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}>{col.title}</span>
                      }))}
                      dataSource={data}
                      pagination={{ pageSize: 7 }}
                      style={{ width: '100%' }}
                      className="custom-table-header"
                      tableLayout="fixed"
                    />
                  </div>
                </Panel>
              </StyledCollapse>
            </div>
          </WorkSection>
        </Col>
      </Row>

      {/* Summary Table Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <WorkSection>
            <div className="work-content">
              <div className="modern-table">
                <Table
                  columns={[
                    { 
                      title: <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '600',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}></span>, 
                      dataIndex: 'label', 
                      key: 'label',
                      render: (text) => <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>{text}</span>
                    },
                    { 
                      title: <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '200',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}></span>, 
                      dataIndex: 'value', 
                      key: 'value',
                      render: (text) => <span style={{ 
                        fontSize: '14px', 
                        
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>{text}</span>
                    }
                  ]}
                  dataSource={[
                    { key: 'totalPremium', label: 'Total Premium', value: '$47,000' },
                    { key: 'feeTaxes', label: 'Fees & Taxes', value: '$2,350.00' },
                    { key: 'totalPayable', label: 'Total Payable', value: '$49,350.00' }
                  ]}
                  pagination={false}
                  style={{ width: '100%' }}
                  className="custom-table-header"
                  tableLayout="fixed"
                />
              </div>
            </div>
          </WorkSection>
        </Col>
      </Row>

      {/* Notes Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24}>
          <NotesHeader style={{ marginBottom: '16px' }}>
            <FileTextOutlined className="icon" />
            <span className="title" style={{ 
              fontSize: '22px', 
              fontWeight: '600',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Notes
            </span>
          </NotesHeader>
          <WorkSection>
            <Input.TextArea
              placeholder="Enter notes here"
              rows={4}
              style={{ 
                fontSize: '14px',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                resize: 'vertical'
              }}
            />
          </WorkSection>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row gutter={[16, 16]} justify="end" align="middle">
        <Col xs={24} sm={24} md={12} lg={8}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: { xs: 'stretch', md: 'flex-end' }[0] || 'flex-end',
            flexWrap: 'wrap'
          }}>
            <NextButton
              type="primary"
              style={{
                backgroundColor: "white",
                border: "2px solid #004A77",
                color: "#004A77",
                fontWeight: "500",
                fontSize: '14px',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                height: '40px',
                minWidth: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Recalculate
            </NextButton>
            <NextButton 
              style={{
                height: '40px',
                minWidth: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: '500'
              }}
            >
              <div className="step-content-box" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '14px',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Next
                <img
                  src={NextArrow}
                  alt="Next"
                  title="Next"
                  className="logobox"
                  style={{ width: '16px', height: '16px' }}
                />
              </div>
            </NextButton>
          </div>
        </Col>
      </Row>
    </div>
    </Container>
  );
};

export default PremiumSummary;