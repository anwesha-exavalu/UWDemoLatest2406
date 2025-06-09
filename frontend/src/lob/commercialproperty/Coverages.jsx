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
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import NextArrow from "../../assets/img/nextArrow.png";

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
    ,
    // 'Location 2': [
    //   { key: 1, label: 'Property Damage Coverage', coverageAmount: '$400,000', deductible: '$4000', approvedCoverage: '', approvedDeductible: '' },
    //   { key: 2, label: 'Business Personal Property', coverageAmount: '$500,000', deductible: '$5000', approvedCoverage: '', approvedDeductible: '' },
    //   { key: 3, label: 'Business Income Coverage', coverageAmount: '$500,000', deductible: '$5000', approvedCoverage: '', approvedDeductible: '' },
    //   { key: 4, label: 'Flood Coverage', coverageAmount: '$300,000', deductible: '$3000', approvedCoverage: '', approvedDeductible: '' },
    //   { key: 5, label: 'Earthquake Coverage', coverageAmount: '$500,000', deductible: '$5000', approvedCoverage: '', approvedDeductible: '' },
    //   { key: 6, label: 'Annual Rental and fees', coverageAmount: '$400,000', deductible: '$4000', approvedCoverage: '', approvedDeductible: '' },
    //   { key: 7, label: 'Ord/ Law Blanket Limits', coverageAmount: '$400,000', deductible: '$4000', approvedCoverage: '', approvedDeductible: '' },

    // ],
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

  const columns = [
    {
      title: '',
      dataIndex: 'label',
      render: (text) => <span className="header-label">{text}</span>,
    },
    {
      title: 'Client Requested Coverage Amount',
      dataIndex: 'coverageAmount',
      render: (text) => <span className="coverageAmount">{text}</span>,
      // render: (text, record) => (
      //   editing ? (
      //     <Input
      //       value={text}
      //       onChange={(e) => handleFieldChange(record.key, 'coverageAmount', e.target.value)}
      //     />
      //   ) : (
      //     text
      //   )
      // ),
    },
    {
      title: 'Client Requested Deductible',
      dataIndex: 'deductible',
      render: (text) => <span className="deductible">{text}</span>,
      // render: (text, record) => (


    },
    {
      title: 'Approved Coverage Amount',
      dataIndex: 'approvedCoverage',
      render: (text, record) => (
        editing ? (
          <Input
            value={text}
            onChange={(e) => handleFieldChange(record.key, 'approvedCoverage', e.target.value)}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: 'Approved Deductible Amount',
      dataIndex: 'approvedDeductible',
      render: (text, record) => (
        editing ? (
          <Input
            value={text}
            onChange={(e) => handleFieldChange(record.key, 'approvedDeductible', e.target.value)}
          />
        ) : (
          text
        )
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className="coverages-screen" id="coverages">
        {/* Location selection dropdown */}
        <span style={{ marginRight: '10px', fontSize: '18px' }}>Select Location:</span>
        <Select
          value={selectedLocation}
          onChange={handleLocationChange}
          dropdownStyle={{ fontSize: 14 }}
           style={{ width: 350, height: 50, marginTop: 40 }}
          
        >
          <Option value="Location 1">123-05 84th Avenue, Kew Gardens, NY 11415</Option>
          {/* <Option value="Location 2">1234 Elm Street, Apt 101, California, 90210, USA</Option> */}
        </Select>
        {/* Edit/Save button */}
        {selectedLocation && (
          <>
            <Row gutter={16}>
              <Col span={22}>
              </Col>
              <Col span={2}>

                <Button
                  shape="circle"
                  icon={editing ? <Tooltip title="Save"><SaveOutlined style={{ fontSize: "20px" }} /> </Tooltip> : <Tooltip title="Edit"><EditOutlined style={{ fontSize: "20px" }} /></Tooltip>}
                  onClick={toggleEditing}
                  style={{ marginBottom: 16, marginLeft: 16, fontSize: 20 }}

                >
                  {editing ? '' : ''}
                </Button>

              </Col>
              {/* <Row style={{ width: '100%' }} justify="end">
                <Col>
                  <RoundedAddButton onClick={toggleEditing}>
                    <span className="icon">+</span>
                    Edit
                  </RoundedAddButton>
                </Col>
              </Row> */}
            </Row>
            {/* Table for the selected location */}


            <WorkSection>
              <div className="work-content">
                <StyledCollapse defaultActiveKey={['1']}>
                  <Panel header="Coverages" key="1">
                    <StyledLocationText>
                      Location – 123–05 84th Avenue, Kew Gardens, NY 11415
                    </StyledLocationText>
                    <div className="modern-table">
                      <Table
                        columns={columns}
                        dataSource={rowData.map(item => ({ ...item, key: item.key }))}
                        pagination={{ pageSize: 4 }}
                        style={{ width: '100%' }}
                        className="custom-table-header"
                        tableLayout="fixed"
                      />
                    </div>
                  </Panel>
                </StyledCollapse>
              </div>
            </WorkSection>


            {/* UW Notes section */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Coverages;
