import React, { useState } from "react";
// import './LossInfo.css';  // Import the CSS file
// import FormInput from '../../components/FormInput'
import { Button, Card, Col, Modal, Row, Input, DatePicker, Collapse, Table } from 'antd';
import Documents from '../../layout/Documents';
import NextArrow from "../../assets/img/nextArrow.png";
import LossRun from "./LossRun";
import {
  WorkSection
} from '../../styles/pages/Dashboard/MyDashboardStyle';
import { Container } from "../../styles/components/Layout";
import {
  MainContainer, NextButtonContainer,
  NextButton,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import { RoundedAddButton } from "../../styles/index";
import { StyledTabs, TabPane } from '../../styles/pages/RiskInformation/index'; // Import the styled component

// Import dummy data
import { 
  initialPolicies, 
  initialLossData, 
  initialClaimsData, 
  tableColumns, 
  initialFormStates 
} from './dummyLossData';

const { Panel } = Collapse;

const LossInfo = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLossSummaryModalVisible, setIsLossSummaryModalVisible] = useState(false);
  const [isLossDetailModalVisible, setIsLossDetailModalVisible] = useState(false);
  
  const [newPolicy, setNewPolicy] = useState(initialFormStates.newPolicy);
  const [newLossSummary, setNewLossSummary] = useState(initialFormStates.newLossSummary);
  const [newLossDetail, setNewLossDetail] = useState(initialFormStates.newLossDetail);
  const [errors, setErrors] = useState(initialFormStates.errors);

  const [policies, setPolicies] = useState(initialPolicies);
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [lossSummaries, setLossSummaries] = useState(initialLossData);
  const [lossDetails, setLossDetails] = useState(initialClaimsData);
  
  // Font styles
  const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const headerTextStyle = {
    fontFamily,
    fontSize: '22px',
    fontWeight: 600,
    margin: 0
  };
  const normalTextStyle = {
    fontFamily,
    fontSize: '14px',
    margin: 0,
    align: 'center',
  };

  
  const rowSelection = {
    type: 'radio',
    selectedRowKeys: selectedPolicies,
    onChange: (selectedRowKeys) => setSelectedPolicies(selectedRowKeys)
  };

  const rowSelectionClaims = {
    type: 'radio',
    selectedRowKeys: selectedClaim ? [selectedClaim.claimNumber] : [],
    onChange: (selectedRowKeys, selectedRows) => setSelectedClaim(selectedRows[0])
  };

  // Function to handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Function to go to the next tab
  const nextTab = () => {
    const currentTabNumber = parseInt(activeTab);
    if (currentTabNumber < 3) {
      setActiveTab((currentTabNumber + 1).toString());
    }
  };

  const handleCheckboxChangeclaim = (claim) => {
    setSelectedClaim(claim);
  };

  const showAddPolicyModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setPolicies([...policies, newPolicy]);
    setNewPolicy(initialFormStates.newPolicy);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Loss Summary Modal Handlers
  const handleLossSummaryModalOk = () => {
    setLossSummaries([...lossSummaries, newLossSummary]);
    setNewLossSummary(initialFormStates.newLossSummary);
    setIsLossSummaryModalVisible(false);
  };
  
  const handleLossSummaryModalCancel = () => {
    setIsLossSummaryModalVisible(false);
  };

  // Loss Detail Modal Handlers
  const showLossDetailModal = () => {
    setIsLossDetailModalVisible(true);
  };
  
  const handleLossDetailModalOk = () => {
    setLossDetails([...lossDetails, newLossDetail]);
    setNewLossDetail(initialFormStates.newLossDetail);
    setIsLossDetailModalVisible(false);
  };
  
  const handleLossDetailModalCancel = () => {
    setIsLossDetailModalVisible(false);
  };

  const handleInputChange = (e, setStateFunction) => {
    const { name, value } = e.target;
    setStateFunction((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date, setStateFunction) => {
    setStateFunction((prev) => ({ ...prev, [name]: date ? date.format("YYYY-MM-DD") : "" }));
  };

  const handleCheckboxChange = (index) => {
    if (selectedPolicies.includes(index)) {
      setSelectedPolicies(selectedPolicies.filter((i) => i !== index));
    } else {
      setSelectedPolicies([...selectedPolicies, index]);
    }
  };

  const handleDelete = () => {
    setPolicies(policies.filter((_, index) => !selectedPolicies.includes(index)));
    setSelectedPolicies([]);
  };

  const handleDateChangeError = (field, value) => {
    // Validate for MM-DD-YYYY format
    const isValidDate = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(value);

    setNewLossDetail((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));

    // Show error if date is invalid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !isValidDate && value.length === 10 ? 'Date must be in MM-DD-YYYY format.' : '',
    }));
  };

  const getCurrentTabButton = () => {
    switch (activeTab) {
      case "1":
        return (
          <RoundedAddButton onClick={showAddPolicyModal} style={normalTextStyle}>
            <span className="icon">+</span>
            Add Policy
          </RoundedAddButton>
        );
      case "2":
        return (
          <RoundedAddButton onClick={showLossDetailModal} style={normalTextStyle}>
            <span className="icon">+</span>
            Add Loss Details
          </RoundedAddButton>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <MainContainer>
        <Row gutter={[16, 16]} style={{ width: '100%', margin: 0 }}>
          <Col span={24}>
            <div id="lossInfo">
              <Row gutter={[16, 16]} style={{ width: '100%' }}>
                {/* Tab and Button Row with proper alignment */}
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <StyledTabs
                      activeKey={activeTab}
                      onChange={handleTabChange}
                      style={{ width: '100%', ...normalTextStyle }}
                    >
                      <TabPane tab="Prior Policies" key="1" />
                      <TabPane tab="Loss Summary" key="2" />
                      <TabPane tab="Loss Runs - AI Insights" key="3" />
                    </StyledTabs>
                  </div>
                </Col>
                
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                    {getCurrentTabButton()}
                  </div>
                </Col>
              </Row>

              {/* Tab Content */}
              <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={24}>
                  {activeTab === "1" && (
                    <div>
                      <Row gutter={[16, 16]}>
                        {selectedPolicies.length > 0 && (
                          <Col span={24}>
                            <Button
                              type="primary"
                              onClick={handleDelete}
                              style={{ ...normalTextStyle, marginBottom: "10px" }}
                            >
                              Delete
                            </Button>
                          </Col>
                        )}
                        
                        <Col span={24}>
                          <WorkSection style={{marginLeft:'2px', marginRight:'10px'}}>
                            <div className="work-header" style={headerTextStyle}>Prior Policies Details</div>
                            <div className="work-content">
                              <div className="modern-table">
                                <Table
                                  // rowSelection={rowSelection}
                                  columns={tableColumns.priorPolicy}
                                  dataSource={policies.map((item, index) => ({ key: index, ...item }))}
                                  pagination={{ pageSize: 4 }}
                                  scroll={{ x: 'max-content' }}
                                  style={{ width: '100%', ...normalTextStyle }}
                                  className="custom-table-header"
                                  tableLayout="fixed"
                                  summary={(pageData) => {
                                    const total = pageData.reduce((sum, row) => {
                                      const cleaned = parseFloat((row.totalLosses || '').replace(/[^0-9.-]+/g, '')) || 0;
                                      return sum + cleaned;
                                    }, 0);
                                    return (
                                      <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={8} style={{ textAlign: 'right', fontWeight: 600, ...normalTextStyle }}>
                                          Sum:
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={8} style={normalTextStyle}>
                                          ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </Table.Summary.Cell>
                                      </Table.Summary.Row>
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </WorkSection>
                        </Col>

                        <Col xs={24} sm={20} md={16} lg={16} xl={16}></Col>
                        <Col xs={24} sm={6} md={8} lg={8} xl={8}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight:'2px' }}>
                            <NextButtonContainer>
                              <NextButton onClick={nextTab} style={normalTextStyle}>
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

                        <Col span={24}>
                          <Documents />
                        </Col>
                      </Row>
                    </div>
                  )}

                  {activeTab === "2" && (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <WorkSection style={{marginLeft:'2px', marginRight:'10px', marginBottom:'5px'}}>
                          <div className="work-header" style={headerTextStyle}>Loss Details</div>
                          <div className="work-content">
                            <div className="modern-table">
                              <Table
                                rowSelection={rowSelectionClaims}
                                columns={tableColumns.lossDetail}
                                dataSource={lossDetails.map((item) => ({ key: item.claimNumber, ...item }))}
                                pagination={{ pageSize: 4 }}
                                style={{ width: '100%', ...normalTextStyle }}
                                className="custom-table-header"
                                tableLayout="fixed"
                              />
                            </div>
                          </div>
                        </WorkSection>
                      </Col>

                      {lossDetails && (
                        <Col span={24}>
                          <WorkSection  style={{marginLeft:'2px', marginRight:'10px'}}>
                            <div className="work-header" style={headerTextStyle}>Claim Notes History</div>
                            <div className="work-content">
                              {selectedClaim ? (
                                <Collapse accordion defaultActiveKey={['1']}>
                                  {selectedClaim.notes.map((note, index) => (
                                    <Panel header={`Notes: (Dated) - ${note.noteDate}`} key={index} style={normalTextStyle}>
                                      <Row gutter={[16, 8]}>
                                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                          <p style={normalTextStyle}><strong>Accident Date:</strong> {note.accidentDate}</p>
                                        </Col>
                                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                          <p style={normalTextStyle}><strong>Report Date:</strong> {note.reportedDate}</p>
                                        </Col>
                                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                          <p style={normalTextStyle}><strong>Expense Reserve:</strong> {note.expenseReserve}</p>
                                        </Col>
                                        <Col span={24}>
                                          <textarea
                                            placeholder="Note"
                                            value={note.note}
                                            readOnly
                                            style={{
                                              width: '100%',
                                              minHeight: '80px',
                                              marginTop: '10px',
                                              padding: '8px',
                                              borderRadius: '4px',
                                              border: '1px solid #ccc',
                                              resize: 'vertical',
                                              ...normalTextStyle
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                    </Panel>
                                  ))}
                                </Collapse>
                              ) : (
                                <p style={{ ...normalTextStyle, padding: '10px' }}>Please first select any row to see the history</p>
                              )}
                            </div>
                          </WorkSection>
                        </Col>
                      )}
                    </Row>
                  )}

                  {activeTab === "3" && (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <div style={{ marginTop: "0px", marginBottom: "30px" }}>
                          <LossRun />
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </div>

            {/* Modals */}
            <Modal
              title={<span style={headerTextStyle}>Add New Policy</span>}
              visible={isModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
            >
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <Input
                    placeholder="Carrier"
                    name="carrier"
                    value={newPolicy.carrier}
                    onChange={(e) => handleInputChange(e, setNewPolicy)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Policy #"
                    name="policyNumber"
                    value={newPolicy.policyNumber}
                    onChange={(e) => handleInputChange(e, setNewPolicy)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <DatePicker
                    placeholder="Effective Date"
                    style={{ width: "100%", marginBottom: "10px", ...normalTextStyle }}
                    onChange={(date) => handleDateChange("effectiveDate", date, setNewPolicy)}
                  />
                </Col>
                <Col span={24}>
                  <DatePicker
                    placeholder="Expiration Date"
                    style={{ width: "100%", marginBottom: "10px", ...normalTextStyle }}
                    onChange={(date) => handleDateChange("effectiveDate", date, setNewPolicy)}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Annual Premium"
                    name="annualPremium"
                    value={newPolicy.annualPremium}
                    onChange={(e) => handleInputChange(e, setNewPolicy)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="# Losses"
                    name="losses"
                    value={newPolicy.losses}
                    onChange={(e) => handleInputChange(e, setNewPolicy)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Total Losses"
                    name="totalLosses"
                    value={newPolicy.totalLosses}
                    onChange={(e) => handleInputChange(e, setNewPolicy)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
              </Row>
            </Modal>

            {/* Add Loss Summary Modal */}
            <Modal
              title={<span style={headerTextStyle}>Add Loss Summary</span>}
              visible={isLossSummaryModalVisible}
              onOk={handleLossSummaryModalOk}
              onCancel={handleLossSummaryModalCancel}
            >
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <Input
                    placeholder="Policy Year"
                    name="policyYear"
                    value={newLossSummary.policyYear}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Annual Premium"
                    name="annualPremium"
                    value={newLossSummary.annualPremium}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Claims"
                    name="claims"
                    value={newLossSummary.claims}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Open Claims"
                    name="openClaims"
                    value={newLossSummary.openClaims}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Total Insured Losses"
                    name="totalInsuredLosses"
                    value={newLossSummary.totalInsuredLosses}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Total paid Losses"
                    name="totalPaidLosses"
                    value={newLossSummary.totalPaidLosses}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="expenses"
                    name="expenses"
                    value={newLossSummary.expenses}
                    onChange={(e) => handleInputChange(e, setNewLossSummary)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
              </Row>
            </Modal>

            {/* Add Loss Detail Modal */}
            <Modal
              title={<span style={headerTextStyle}>Add Loss Detail</span>}
              visible={isLossDetailModalVisible}
              onOk={handleLossDetailModalOk}
              onCancel={handleLossDetailModalCancel}
            >
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  <Input
                    placeholder="Claim Number"
                    name="claimNumber"
                    value={newLossDetail.claimNumber}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Effective Date (MM-DD-YYYY)"
                    value={newLossDetail.effectiveDate}
                    onChange={(e) => handleDateChangeError('effectiveDate', e.target.value)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                    maxLength={10}
                  />
                  {errors.effectiveDate && (
                    <p style={{ color: 'red', marginTop: '-8px', marginBottom: '10px', ...normalTextStyle }}>
                      {errors.effectiveDate}
                    </p>
                  )}
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Expiration Date (MM-DD-YYYY)"
                    value={newLossDetail.expirationDate}
                    onChange={(e) => handleDateChangeError('expirationDate', e.target.value)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                    maxLength={10}
                  />
                  {errors.expirationDate && (
                    <p style={{ color: 'red', marginTop: '-8px', marginBottom: '10px', ...normalTextStyle }}>
                      {errors.expirationDate}
                    </p>
                  )}
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Carrier"
                    name="carrier"
                    value={newLossDetail.carrier}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Lob"
                    name="lob"
                    value={newLossDetail.lob}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Accident Description"
                    name="accidentDescription"
                    value={newLossDetail.accidentDescription}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Reported Date: MM-DD-YYYY"
                    value={newLossDetail.reportedDate}
                    onChange={(e) => handleDateChangeError('reportedDate', e.target.value)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                    maxLength={10}
                  />
                  {errors.reportedDate && (
                    <p style={{ color: 'red', marginTop: '-8px', marginBottom: '10px', ...normalTextStyle }}>
                      {errors.reportedDate}
                    </p>
                  )}
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Status"
                    name="status"
                    value={newLossDetail.status}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Class"
                    name="class"
                    value={newLossDetail.class}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Total Paid"
                    name="totalPaid"
                    value={newLossDetail.totalPaid}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
                <Col span={24}>
                  <Input
                    placeholder="Total Incurred"
                    name="totalIncurred"
                    value={newLossDetail.totalIncurred}
                    onChange={(e) => handleInputChange(e, setNewLossDetail)}
                    style={{ ...normalTextStyle, marginBottom: "10px" }}
                  />
                </Col>
              </Row>
            </Modal>
          </Col>
        </Row>
      </MainContainer>
    </Container>
  );
};

export default LossInfo;