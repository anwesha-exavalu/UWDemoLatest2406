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
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import NextArrow from "../../assets/img/nextArrow.png";
import { NotesWrapper, NotesHeader } from "../../styles/index";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const { Panel } = Collapse;

const PremiumSummary = ({ onNext }) => {
  const [editing, setEditing] = useState(false); // Global editing state
  const [selectedBuilding, setSelectedBuilding] = useState("Location 1"); // Default to "Location 1"

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

  // Initialize data for the default selected building
  const [data, setData] = useState(buildingData["Location 1"]);

  // Toggles editing mode for the entire table
  const toggleEditing = () => setEditing(!editing);

  // Updates data for the specific row and field
  const handleFieldChange = (key, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  // Handles building selection change
  const handleBuildingChange = (value) => {
    setSelectedBuilding(value);
    setData(buildingData[value] || []);
  };

  // Column configuration for the table
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
          />
        ) : (
          text
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
          />
        ) : (
          text
        ),
    },
  ];

  return (
    <div className="premium-summary" id="premiumSummary">
      <span style={{ marginRight: '10px', fontSize: '18px' }}>Select Location:</span>
      <Select
        value={selectedBuilding} // Default value set to "Location 1"
        onChange={handleBuildingChange}
        style={{ width: 350, height: 50, marginTop: 40 }}
      >
        <Option value="Location 1">123-05 84th Avenue, Kew Gardens, NY 11415</Option>
        {/* <Option value="Location 2">1234 Elm Street, Apt 101, California, 90210, USA</Option> */}
      </Select>

      {/* Edit/Save button */}
      <Row gutter={16}>
        <Col span={22}></Col>
        <Col span={2}>
          <Button
            shape="circle"
            icon={
              editing ? (
                <Tooltip title="Save">
                  <SaveOutlined style={{ fontSize: '20px' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Edit">
                  <EditOutlined style={{ fontSize: '20px' }} />
                </Tooltip>
              )
            }
            onClick={toggleEditing}
            style={{ marginBottom: 10, marginLeft: 16, fontSize: 20, marginTop: 1 }}
          />
        </Col>
      </Row>
      <WorkSection>
        <div className="work-content">
          <StyledCollapse defaultActiveKey={['1']}>
            <Panel header="Building No: 123-05" key="1">
             
              <div className="modern-table" style={{ marginTop: '10px' }}>
                <Table
                  columns={columns}
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
        <div className="work-content">

          <div className="modern-table">
            <Table
              columns={[
                { title: '', dataIndex: 'label', key: 'label' },
                { title: '', dataIndex: 'value', key: 'value' }
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

      {/* Total Premiums */}


      {/* Notes Section */}
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <NotesHeader>
          <FileTextOutlined className="icon" />
          <span className="title">Notes</span>
        </NotesHeader>
        <WorkSection>
          <Input.TextArea
            placeholder="Enter notes here"
            rows={4}
          />
        </WorkSection>
      </div>
      <Row gutter={16}>
        <Col span={20}></Col>
        <Col span={4}>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Button
              type="primary"

              style={{
                width: "10rem",
                marginBottom: "1rem",
                marginTop: "2rem",
                marginRight: "15px",
                backgroundColor: "white",
                border: "2px solid #004A77", // deep blue border
                color: "#004A77",            // matching text color
                fontWeight: "bold",
                borderRadius: "8px",         // rounded corners
              }}
            >
              Recalculate
            </Button>

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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PremiumSummary;
