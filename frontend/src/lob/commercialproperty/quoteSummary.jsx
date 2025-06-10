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
import { Container } from '../../styles/components/Layout';

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

  // Global font styles
  const globalFontStyle = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px'
  };

  const headerFontStyle = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '22px'
  };

  return (
    <Container style={globalFontStyle}>
      <div className="quote-summary" ref={summaryRef}>
        {/* Header Row with consistent alignment */}
        <Row 
          gutter={[16, 16]} 
          align="middle" 
          justify="space-between"
          style={{ 
            marginTop: '20px',
            marginBottom: '20px',
            minHeight: '60px' // Consistent height for alignment
          }}
        >
          <Col xs={18} sm={18} md={18} lg={18} xl={20}>
            <ScreenHeader style={{ 
              display: 'flex', 
              alignItems: 'center',
              height: '100%',
              margin: 0
            }}>
              <div className="icon-wrapper" style={{ 
                marginLeft: '20px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img 
                  src={PremiumSummary} 
                  alt="Quote Icon" 
                  className="icon" 
                  style={{ verticalAlign: 'middle' }}
                />
              </div>
              <h3 style={{
                ...headerFontStyle,
                margin: 0,
                marginLeft: '10px',
                lineHeight: '1.2'
              }}>
                Quote Summary
              </h3>
            </ScreenHeader>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={4}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '100%'
            }}>
              <RoundedAddButton
                type="primary"
                icon={<FilePdfOutlined />}
                onClick={generatePDF}
                style={{
                  ...globalFontStyle,
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ marginLeft: '4px' }}>Download PDF</span>
              </RoundedAddButton>
            </div>
          </Col>
        </Row>

        {/* Header Information Table */}
        <QuoteSummaryTableWrapper style={globalFontStyle}>
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

        {/* Coverage Summary Section */}
        <WorkSection style={globalFontStyle}>
          <div className="work-content">
            <StyledCollapse>
              <Panel 
                header={<span style={headerFontStyle}>Coverage Summary</span>} 
                key="1"
              >
                <StyledLocationText style={globalFontStyle}>
                  Location – 123–05 84th Avenue, Kew Gardens, NY 11415
                </StyledLocationText>
                <div className="modern-table">
                  <Table
                    columns={coverageColumns}
                    dataSource={coverageData}
                    pagination={{ pageSize: 8 }}
                    style={{ width: '100%', ...globalFontStyle }}
                    className="custom-table-header"
                    tableLayout="fixed"
                  />
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
                      style={{ width: '100%', ...globalFontStyle }}
                      className="custom-table-header"
                      tableLayout="fixed"
                    />
                  </div>
                </div>
              </Panel>
            </StyledCollapse>
          </div>
        </WorkSection>

        {/* Forms Section */}
        <WorkSection style={globalFontStyle}>
          <div className="work-content">
            <StyledCollapse>
              <Panel 
                header={<span style={headerFontStyle}>Forms</span>} 
                key="2"
              >
                <div className="modern-table">
                  <Table
                    columns={formColumns}
                    dataSource={formData}
                    pagination={{ pageSize: 6 }}
                    style={{ width: '100%', ...globalFontStyle }}
                    className="custom-table-header"
                    tableLayout="fixed"
                  />
                </div>
              </Panel>
            </StyledCollapse>
          </div>
        </WorkSection>

        {/* Invoice Details Section */}
        <WorkSection style={globalFontStyle}>
          <div className="work-content">
            <StyledCollapse >
              <Panel 
                header={<span style={headerFontStyle}>Invoice Details</span>} 
                key="3"
              >
                <div className="modern-table">
                  <Table
                    columns={invoiceColumns}
                    dataSource={invoiceData}
                    pagination={{ pageSize: 6 }}
                    style={{ width: '100%', ...globalFontStyle }}
                    className="custom-table-header"
                    tableLayout="fixed"
                  />
                </div>
              </Panel>
            </StyledCollapse>
          </div>
        </WorkSection>

        {/* Notes Section */}
        <div style={{ 
          marginTop: '20px', 
          marginBottom: '20px',
          ...globalFontStyle
        }}>
          <NotesHeader style={{
            marginLeft: '20px',
            display: 'flex',
            alignItems: 'center',
            ...headerFontStyle
          }}>
            <FileTextOutlined className="icon" style={{ marginRight: '8px' }} />
            <span className="title">Notes</span>
          </NotesHeader>
          <WorkSection>
            <Input.TextArea
              placeholder="Enter notes here"
              rows={4}
              style={globalFontStyle}
            />
          </WorkSection>
        </div>

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
                     Create Quote
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
                       Bind Quote
                      
                     </div>
                   </NextButton>
                 </div>
               </Col>
             </Row>
      </div>
    </Container>
  );
};

export default QuoteSummary;