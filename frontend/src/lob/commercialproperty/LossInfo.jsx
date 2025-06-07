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
  
  const rowSelection = {
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
          <RoundedAddButton onClick={showAddPolicyModal}>
            <span className="icon">+</span>
            Add Policy
          </RoundedAddButton>
        );
      case "2":
        return (
          <RoundedAddButton onClick={showLossDetailModal}>
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
        <Row gutter={16} style={{ width: '100%', margin: 0 }}>
          <Col span={24}>
            <div id="lossInfo">
              <div style={{ width: '100%', overflowX: 'auto' }}>
                {/* Tab and Button Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <StyledTabs
                      activeKey={activeTab}
                      onChange={handleTabChange}
                    >
                      <TabPane tab="Prior Policies" key="1" />
                      <TabPane tab="Loss Summary" key="2" />
                      <TabPane tab="Loss Runs - AI Insights" key="3" />
                    </StyledTabs>
                  </div>
                  {getCurrentTabButton() && (
                    <div style={{ marginTop: '-10px', marginLeft: '20px', flexShrink: 0 }}>
                      {getCurrentTabButton()}
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                <div style={{ marginTop: '20px' }}>
                  {activeTab === "1" && (
                    <div>
                      {selectedPolicies.length > 0 && (
                        <Button
                          type="primary"
                          onClick={handleDelete}
                          style={{ marginBottom: "20px" }}
                        >
                          Delete
                        </Button>
                      )}
                      
                      <WorkSection>
                        <div className="work-header">Prior Policies Details</div>
                        <div className="work-content">
                          <div className="modern-table">
                            <Table
                              rowSelection={rowSelection}
                              columns={tableColumns.priorPolicy}
                              dataSource={policies.map((item, index) => ({ key: index, ...item }))}
                              pagination={{ pageSize: 4 }}
                              scroll={{ x: 'max-content' }}
                              style={{ width: '100%' }}
                              className="custom-table-header"
                              tableLayout="fixed"
                              summary={(pageData) => {
                                const total = pageData.reduce((sum, row) => {
                                  const cleaned = parseFloat((row.totalLosses || '').replace(/[^0-9.-]+/g, '')) || 0;
                                  return sum + cleaned;
                                }, 0);
                                return (
                                  <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={8} style={{ textAlign: 'right', fontWeight: 600 }}>
                                      Sum:
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={8}>
                                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </Table.Summary.Cell>
                                  </Table.Summary.Row>
                                );
                              }}
                            />
                          </div>
                        </div>
                      </WorkSection>

                      <Row gutter={16}>
                        <Col span={20}></Col>
                        <Col span={4}>
                          <NextButtonContainer>
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
                      <Documents />
                    </div>
                  )}

                  {activeTab === "2" && (
                    <div>
                      <WorkSection>
                        <div className="work-header">Loss Details</div>
                        <div className="work-content">
                          <div className="modern-table">
                            <Table
                              rowSelection={rowSelectionClaims}
                              columns={tableColumns.lossDetail}
                              dataSource={lossDetails.map((item) => ({ key: item.claimNumber, ...item }))}
                              pagination={{ pageSize: 4 }}
                              style={{ width: '100%' }}
                              className="custom-table-header"
                              tableLayout="fixed"
                            />
                          </div>
                        </div>
                      </WorkSection>

                      {lossDetails && (
                        <WorkSection>
                          <div className="work-header">Claim Notes History</div>
                          <div className="work-content">
                            {selectedClaim ? (
                              <Collapse accordion defaultActiveKey={['1']}>
                                {selectedClaim.notes.map((note, index) => (
                                  <Panel header={`Notes: (Dated) - ${note.noteDate}`} key={index}>
                                    <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                      <p><strong>Accident Date:</strong> {note.accidentDate}</p>
                                      <p><strong>Report Date:</strong> {note.reportedDate}</p>
                                      <p><strong>Expense Reserve:</strong> {note.expenseReserve}</p>
                                    </div>
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
                                        resize: 'vertical'
                                      }}
                                    />
                                  </Panel>
                                ))}
                              </Collapse>
                            ) : (
                              <p style={{ padding: '10px' }}>Please first select any row to see the history</p>
                            )}
                          </div>
                        </WorkSection>
                      )}
                    </div>
                  )}

                  {activeTab === "3" && (
                    <div style={{ marginTop: "0px", marginBottom: "30px" }}>
                      <LossRun />
                    </div>
                  )}
                </div>
              </div>

              {/* Modals */}
              <Modal
                title="Add New Policy"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
              >
                <Input
                  placeholder="Carrier"
                  name="carrier"
                  value={newPolicy.carrier}
                  onChange={(e) => handleInputChange(e, setNewPolicy)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Policy #"
                  name="policyNumber"
                  value={newPolicy.policyNumber}
                  onChange={(e) => handleInputChange(e, setNewPolicy)}
                  style={{ marginBottom: "10px" }}
                />
                <DatePicker
                  placeholder="Effective Date"
                  style={{ width: "100%", marginBottom: "10px" }}
                  onChange={(date) => handleDateChange("effectiveDate", date, setNewPolicy)}
                />
                <DatePicker
                  placeholder="Expiration Date"
                  style={{ width: "100%", marginBottom: "10px" }}
                  onChange={(date) => handleDateChange("effectiveDate", date, setNewPolicy)}
                />
                <Input
                  placeholder="Annual Premium"
                  name="annualPremium"
                  value={newPolicy.annualPremium}
                  onChange={(e) => handleInputChange(e, setNewPolicy)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="# Losses"
                  name="losses"
                  value={newPolicy.losses}
                  onChange={(e) => handleInputChange(e, setNewPolicy)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Total Losses"
                  name="totalLosses"
                  value={newPolicy.totalLosses}
                  onChange={(e) => handleInputChange(e, setNewPolicy)}
                  style={{ marginBottom: "10px" }}
                />
              </Modal>

              {/* Add Loss Summary Modal */}
              <Modal
                title="Add Loss Summary"
                visible={isLossSummaryModalVisible}
                onOk={handleLossSummaryModalOk}
                onCancel={handleLossSummaryModalCancel}
              >
                <Input
                  placeholder="Policy Year"
                  name="policyYear"
                  value={newLossSummary.policyYear}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Annual Premium"
                  name="annualPremium"
                  value={newLossSummary.annualPremium}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Claims"
                  name="claims"
                  value={newLossSummary.claims}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Open Claims"
                  name="openClaims"
                  value={newLossSummary.openClaims}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Total Insured Losses"
                  name="totalInsuredLosses"
                  value={newLossSummary.totalInsuredLosses}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Total paid Losses"
                  name="totalPaidLosses"
                  value={newLossSummary.totalPaidLosses}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="expenses"
                  name="expenses"
                  value={newLossSummary.expenses}
                  onChange={(e) => handleInputChange(e, setNewLossSummary)}
                  style={{ marginBottom: "10px" }}
                />
              </Modal>

              {/* Add Loss Detail Modal */}
              <Modal
                title="Add Loss Detail"
                visible={isLossDetailModalVisible}
                onOk={handleLossDetailModalOk}
                onCancel={handleLossDetailModalCancel}
              >
                <Input
                  placeholder="Claim Number"
                  name="claimNumber"
                  value={newLossDetail.claimNumber}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Effective Date (MM-DD-YYYY)"
                  value={newLossDetail.effectiveDate}
                  onChange={(e) => handleDateChangeError('effectiveDate', e.target.value)}
                  style={{ marginBottom: "10px" }}
                  maxLength={10}
                />
                {errors.effectiveDate && (
                  <p style={{ color: 'red', marginTop: '-8px', marginBottom: '10px' }}>
                    {errors.effectiveDate}
                  </p>
                )}
                <Input
                  placeholder="Expiration Date (MM-DD-YYYY)"
                  value={newLossDetail.expirationDate}
                  onChange={(e) => handleDateChangeError('expirationDate', e.target.value)}
                  style={{ marginBottom: "10px" }}
                  maxLength={10}
                />
                {errors.expirationDate && (
                  <p style={{ color: 'red', marginTop: '-8px', marginBottom: '10px' }}>
                    {errors.expirationDate}
                  </p>
                )}
                <Input
                  placeholder="Carrier"
                  name="carrier"
                  value={newLossDetail.carrier}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Lob"
                  name="lob"
                  value={newLossDetail.lob}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Accident Description"
                  name="accidentDescription"
                  value={newLossDetail.accidentDescription}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Reported Date: MM-DD-YYYY"
                  value={newLossDetail.reportedDate}
                  onChange={(e) => handleDateChangeError('reportedDate', e.target.value)}
                  style={{ marginBottom: "10px" }}
                  maxLength={10}
                />
                {errors.reportedDate && (
                  <p style={{ color: 'red', marginTop: '-8px', marginBottom: '10px' }}>
                    {errors.reportedDate}
                  </p>
                )}
                <Input
                  placeholder="Status"
                  name="status"
                  value={newLossDetail.status}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Class"
                  name="class"
                  value={newLossDetail.class}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Total Paid"
                  name="totalPaid"
                  value={newLossDetail.totalPaid}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
                <Input
                  placeholder="Total Incurred"
                  name="totalIncurred"
                  value={newLossDetail.totalIncurred}
                  onChange={(e) => handleInputChange(e, setNewLossDetail)}
                  style={{ marginBottom: "10px" }}
                />
              </Modal>
            </div>
          </Col>
        </Row>
      </MainContainer>
    </Container>
  );
};

export default LossInfo;