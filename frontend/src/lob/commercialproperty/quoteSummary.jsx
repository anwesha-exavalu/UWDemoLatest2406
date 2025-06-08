import React, { useRef } from 'react';
import { Table, Input, Typography, Button, Collapse, Row, Col } from 'antd';
import { FilePdfOutlined, FileTextOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TableComponent from '../../components/Table';
import PremiumSummary from "../../assets/img/PremiumSummary.png"
import { ScreenHeader } from '../../styles';
import { QuoteSummaryTableWrapper } from "../../styles/pages/QuoteSummary"
import {
  WorkSection,
} from '../../styles/pages/Dashboard/MyDashboardStyle';
import { StyledLocationText, StyledCollapse } from "../../styles/index";
import { NotesWrapper, NotesHeader } from "../../styles/index";
import {
  NextButtonContainer,
  NextButton,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import NextArrow from "../../assets/img/nextArrow.png";
import { RoundedAddButton } from "../../styles/index";

const { Title } = Typography;
const { Panel } = Collapse;

const QuoteSummary = () => {
  const summaryRef = useRef(); // Create a ref to reference the component for PDF generation

  const generatePDF = () => {
    const input = summaryRef.current;
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Set the width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF and handle page breaks
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('quote-summary.pdf'); // Save the PDF with the desired name
    });
  };

  // Define table data for each section
  const coverageData = [
    { key: 1, label: 'Property Damage Coverage', coverageAmount: '$15,000,000', deductible: '$5,000', approvedCoverage: '$15,000,000', approvedDeductible: '$5,000' },
    { key: 2, label: 'Business Personal Property', coverageAmount: '$500,000', deductible: '$2,500', approvedCoverage: '$500,000', approvedDeductible: '$2,500' },
    { key: 3, label: 'Business Income Coverage', coverageAmount: '$1,000,000', deductible: '$10,000', approvedCoverage: '$1,000,000', approvedDeductible: '$10,000' },
    { key: 4, label: 'Flood Coverage', coverageAmount: '$500,000', deductible: '$25,000', approvedCoverage: '$500,000', approvedDeductible: '$25,000' },
    { key: 5, label: 'Earthquake Coverage', coverageAmount: '$1,000,000', deductible: '$50,000', approvedCoverage: '$1,000,000', approvedDeductible: '$50,000' },
    { key: 6, label: 'Annual Rental and fees', coverageAmount: '$250,000', deductible: '$1,000', approvedCoverage: '$250,000', approvedDeductible: '$1,000' },
    { key: 7, label: 'Ord/ Law Blanket Limits', coverageAmount: '$100,000', deductible: '$5,000', approvedCoverage: '$100,000', approvedDeductible: '$5,000' }
    // { key: 2, location: '1234 Elm Street', coverage: '$5000,000', limit: '$5000,000', deductible: '$50000', premium: '$50000' },

  ];

  const formData = [
    { key: 1, formNumber: 'CP0010', formName: 'Building and Personal Property Coverage', description: 'Covers buildings, business personal property, and property of others.' },
    { key: 2, formNumber: 'CP1515', formName: 'Business Income Coverage Form', description: 'Covers income loss due to business suspension caused by a covered peril.' },

  ];

  const invoiceData = [
    { key: 1, label: 'Invoice Number', value: '11202556' },
    { key: 2, label: 'Installment No.', value: '11202456' },
    { key: 3, label: 'Total Premium Due', value: '$50000' },
    { key: 4, label: 'Installment Premium Due', value: '$4000' },
  ];

  // Define columns for each table
  // const coverageColumns = [
  //   { title: 'Location (address)/Building', dataIndex: 'location', key: 'location' },
  //   { title: 'Coverage', dataIndex: 'coverage', key: 'coverage' },
  //   { title: 'Coverage Limit', dataIndex: 'limit', key: 'limit' },
  //   { title: 'Deductible', dataIndex: 'deductible', key: 'deductible' },
  //   { title: 'Premium', dataIndex: 'premium', key: 'premium' },
  // ];
  const coverageColumns = [
    { title: '', dataIndex: 'label', key: 'label' },
    { title: 'Coverage Amount', dataIndex: 'coverageAmount', key: 'coverageAmount' },
    { title: 'Deductible', dataIndex: 'deductible', key: 'deductible' },
    { title: 'Approved Coverage', dataIndex: 'approvedCoverage', key: 'approvedCoverage' },
    { title: 'Approved Deductible', dataIndex: 'approvedDeductible', key: 'approvedDeductible' },
  ];

  const formColumns = [
    { title: 'Form Number', dataIndex: 'formNumber', key: 'formNumber' },
    { title: 'Form Name', dataIndex: 'formName', key: 'formName' },
    { title: 'Form Description', dataIndex: 'description', key: 'description' },
  ];

  const invoiceColumns = [
    { title: 'Label', dataIndex: 'label', key: 'label' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  return (
    <div className="quote-summary" ref={summaryRef}>
      {/* PDF Icon Button */}
      <Row gutter={16}>
        <Col span={21}></Col>
        <Col span={3}>
          <RoundedAddButton
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={generatePDF} // Call the PDF generation function on click
            style={{
              marginTop:"10px"
              
            }}
          >
            Download PDF
          </RoundedAddButton>
        </Col>
      </Row>

      {/* Header Information */}

      <ScreenHeader>
        <div className="icon-wrapper">
          <img src={PremiumSummary} alt="Quote Icon" className="icon" />
        </div>
        <h3>Quote Summary</h3>
      </ScreenHeader>


      <QuoteSummaryTableWrapper>
        <Table
          columns={[
            { title: '', dataIndex: 'label', key: 'label' },
            { title: '', dataIndex: 'value', key: 'value' }
          ]}
          dataSource={[
            { key: 'quoteNumber', label: 'Quote Number', value: 'Q0014562' },
            { key: 'effectiveDate', label: 'Policy Effective Date', value: '12/11/2024' },
            { key: 'endDate', label: 'Policy End Date', value: '12/11/2025' },
            { key: 'insuredName', label: 'Insured Name', value: 'Kew Gardens Property Inc.' },
            { key: 'mailingAddress', label: 'Mailing Address', value: '123-05 84th Avenue, Kew Gardens, NY 11415' }
          ]}
          pagination={false}
          showHeader={false}
          rowKey="key"
        />
      </QuoteSummaryTableWrapper>


      <WorkSection>
        <div className="work-content">
          <StyledCollapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="Coverage Summary" key="1">
              <StyledLocationText>
                Location – 123–05 84th Avenue, Kew Gardens, NY 11415
              </StyledLocationText>
              <div className="modern-table">
                <Table
                  columns={coverageColumns}
                  dataSource={coverageData}
                  pagination={{ pageSize: 8 }}
                  style={{ width: '100%' }}
                  className="custom-table-header"
                  tableLayout="fixed"
                />
              </div>
              <div className="work-content" >

                <div className="modern-table" >
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
            </Panel>

          </StyledCollapse>
        </div>

      </WorkSection>


      <WorkSection>
        <div className="work-content">
          <StyledCollapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="Forms" key="2">
              <div className="modern-table">
                <Table
                  columns={formColumns}
                  dataSource={formData}
                  pagination={{ pageSize: 6 }}
                  style={{ width: '100%' }}
                  className="custom-table-header"
                  tableLayout="fixed"
                />
              </div>
            </Panel>
          </StyledCollapse>
        </div>
      </WorkSection>

      <WorkSection>
        <div className="work-content">
          <StyledCollapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="Invoice Details" key="3">
              <div className="modern-table">
                <Table
                  columns={invoiceColumns}
                  dataSource={invoiceData}
                  pagination={{ pageSize: 6 }}
                  style={{ width: '100%' }}
                  className="custom-table-header"
                  tableLayout="fixed"
                />
              </div>
            </Panel>
          </StyledCollapse>
        </div>
      </WorkSection>


      {/* Underwriter Notes */}
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
              onClick={() => alert("Create Quote request sent")}
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
              Create Quote
            </Button>

            <Button
              type="primary"
              onClick={() => alert("Bind Quote request sent")}
              style={{
                width: "12rem",
                marginBottom: "1rem",
                marginTop: "2rem",
                marginRight: "15px",
                backgroundColor: "#054F7D",
                border: "2px solid #004A77", // deep blue border
                color: "white",            // matching text color
                borderRadius: "8px",         // rounded corners
              }}
            >
              Bind Quote
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default QuoteSummary;
