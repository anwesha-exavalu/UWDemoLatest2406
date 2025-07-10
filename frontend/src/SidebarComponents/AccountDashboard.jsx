import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Row, Col, Button } from 'antd';
import { 
  DashboardContainer, 
  DetailsCard, 
  ChartCard, 
  WorkSection,
 
} from '../styles/pages/AccountDashboard/index';
import FormInput from "../components/FormInput";
import { Container } from '../styles/components/Layout';
import sidearrow from "../assets/img/sideArrow.png"

ChartJS.register(ArcElement, Tooltip, Legend);

const AccountDashboard = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    accountNo: '123456789',
    accountName: 'Skyline Property Inc.',
    billingAddress: '657-08 84th Avenue, Citadel, NY 15615',
    fein: '1234567',
    contactNo: '(327)678-556',
    organizationType: 'Business',
    industryCode: '243107',
    status: 'Active',
    emailAddress: 'skylineprop@gmail.com'
  });

  const pieChartData = {
    labels: [
      'Unbilled',
      'Premium', 
      'Incentive',
      'Allocated'
    ],
    datasets: [
      {
        data: [50, 15, 20, 15], // Adjust these values to match your actual data
        backgroundColor: [
          '#4A67C7', // Deep blue (largest segment)
          '#A5B4FC', // Light purple  
          '#FF6B5A', // Coral red
          '#10B981'  // Teal green
        ],
        borderWidth: 6,
    borderColor: '#FFFFFF',
    borderRadius: 0,
    cutout: '40%',    // inner radius
    radius: '100%'     // outer radius (default is '100%')
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide the built-in legend since we're using custom
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: $${value.toLocaleString()}`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 3,
        borderColor: '#FFFFFF',
       
      }
    }
  };

  const handleInputChange = (e, field) => {
    setAccountData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleRowClick = () => {
    navigate('/accountinfo');
  };

  const policyData = [
    {
      key: '1',
      policyNo: '7234238854',
      product: 'Commercial Property',
      status: 'Active',
      datesEffective: '01/01/2024-01/01/2025',
      premium: '$15,000.00',
      lossRatio: ''
    },
    {
      key: '2',
      policyNo: '7234238854',
      product: 'Commercial Property',
      status: 'Active',
      datesEffective: '01/01/2024-01/01/2025',
      premium: '$15,000.00',
      lossRatio: ''
    },
    {
      key: '3',
      policyNo: '7234238854',
      product: 'Commercial Property',
      status: 'Active',
      datesEffective: '01/01/2024-01/01/2025',
      premium: '$15,000.00',
      lossRatio: ''
    }
  ];

  const claimsData = [
    {
      key: '1',
      policyNo: '7234238854',
      product: 'Commercial Property',
      status: 'Active',
      datesEffective: '01/01/2024-01/01/2025',
      premium: '$15,000.00',
      lossRatio: ''
    },
    {
      key: '2',
      policyNo: '7234238854',
      product: 'Commercial Property',
      status: 'Active',
      datesEffective: '01/01/2024-01/01/2025',
      premium: '$15,000.00',
      lossRatio: ''
    },
    {
      key: '3',
      policyNo: '7234238854',
      product: 'Commercial Property',
      status: 'Active',
      datesEffective: '01/01/2024-01/01/2025',
      premium: '$15,000.00',
      lossRatio: ''
    }
  ];

  const policyColumns = [
    {
      title: 'Policy#',
      dataIndex: 'policyNo',
      key: 'policyNo',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Dates Effective',
      dataIndex: 'datesEffective',
      key: 'datesEffective',
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
    },
    {
      title: 'Loss Ratio',
      dataIndex: 'lossRatio',
      key: 'lossRatio',
    },
  ];

  const claimsColumns = [
    {
      title: 'Policy#',
      dataIndex: 'policyNo',
      key: 'policyNo',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Dates Effective',
      dataIndex: 'datesEffective',
      key: 'datesEffective',
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
    },
    {
      title: 'Loss Ratio',
      dataIndex: 'lossRatio',
      key: 'lossRatio',
    },
  ];

  // Custom FormInput component with side arrow
  const FormInputWithArrow = ({ label, ...props }) => (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <img
          src={sidearrow}
          alt="arrow"
          style={{
            width: '12px',
            height: '12px',
            objectFit: 'contain'
          }}
        />
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          {label}
        </span>
      </div>
      <FormInput {...props} />
    </div>
  );

  return (
    <DashboardContainer>
      <Container>
     
        <div style={{ padding: '30px' }}>
          <h3 >Details</h3>
          <Row gutter={[24, 24]}>
            {/* Details Card */}
            <Col xs={24} lg={14}>
              <DetailsCard>
             
                <div className="card-content">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Account No:"
                        value={accountData.accountNo}
                        onChange={(e) => handleInputChange(e, 'accountNo')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Organization Type:"
                        value={accountData.organizationType}
                        onChange={(e) => handleInputChange(e, 'organizationType')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Account Name:"
                        value={accountData.accountName}
                        onChange={(e) => handleInputChange(e, 'accountName')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Industry Code:"
                        value={accountData.industryCode}
                        onChange={(e) => handleInputChange(e, 'industryCode')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Billing Address:"
                        value={accountData.billingAddress}
                        onChange={(e) => handleInputChange(e, 'billingAddress')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Status:"
                        value={accountData.status}
                        onChange={(e) => handleInputChange(e, 'status')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="FEIN:"
                        value={accountData.fein}
                        onChange={(e) => handleInputChange(e, 'fein')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Email Address:"
                        value={accountData.emailAddress}
                        onChange={(e) => handleInputChange(e, 'emailAddress')}
                        readOnly={!isEditing}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <FormInputWithArrow
                        label="Contact No:"
                        value={accountData.contactNo}
                        onChange={(e) => handleInputChange(e, 'contactNo')}
                        readOnly={!isEditing}
                      />
                    </Col>
                  </Row>
                </div>
              </DetailsCard>
            </Col>

            {/* Chart Card */}
            <Col xs={24} lg={10}>
              <ChartCard>
                {/* Custom Legend */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '15px',
                  marginBottom: '30px',
                  justifyContent: 'flex-start',
                  paddingLeft: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#6B7FD7' 
                    }}></span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Acquisition</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#A5B4FC' 
                    }}></span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Purchase</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#C7D2FE' 
                    }}></span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Retention</span>
                  </div>
                  {/* Second row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#10B981' 
                    }}></span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Acquisition</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: '#FF6B5A',
                       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}></span>
                    <span style={{ fontSize: '12px', color: '#666' }}>Purchase</span>
                  </div>
                </div>

                {/* Chart Container */}
                <div className="chart-container">
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                
                <div className="billing-info">
                  <p>Next Invoice Due: <strong>$5,000.00 (11/02/2024)</strong></p>
                  <p>Last Payment: <strong>$7,000.00 (08/24/2024)</strong></p>
                </div>
              </ChartCard>
            </Col>
          </Row>

          {/* Policy Terms Section */}
          <WorkSection style={{ marginTop: '24px' }}>
            <div className="work-header" >
              Policy Terms
            </div>
            <div className="work-content" style={{  padding: '20px' }}>
              <div className="modern-table">
                <table className="ant-table">
                  <thead className="ant-table-thead">
                    <tr>
                      {policyColumns.map(col => (
                        <th key={col.key} className="ant-table-cell">
                          {col.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {policyData.map(row => (
                      <tr key={row.key} onClick={handleRowClick} className="clickable-row">
                        <td className="ant-table-cell">{row.policyNo}</td>
                        <td className="ant-table-cell">{row.product}</td>
                        <td className="ant-table-cell">{row.status}</td>
                        <td className="ant-table-cell">{row.datesEffective}</td>
                        <td className="ant-table-cell">{row.premium}</td>
                        <td className="ant-table-cell">{row.lossRatio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </WorkSection>

          {/* Claims Section */}
          <WorkSection style={{ marginTop: '24px' }}>
            <div className="work-header">
              Claims
            </div>
            <div className="work-content" style={{  padding: '20px' }}>
              <div className="modern-table" >
                <table className="ant-table" >
                  <thead className="ant-table-thead">
                    <tr>
                      {claimsColumns.map(col => (
                        <th key={col.key} className="ant-table-cell">
                          {col.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {claimsData.map(row => (
                      <tr key={row.key} className="clickable-row">
                        <td className="ant-table-cell" style={{backgroundColor:'blue'}}>{row.policyNo}</td>
                        <td className="ant-table-cell">{row.product}</td>
                        <td className="ant-table-cell">{row.status}</td>
                        <td className="ant-table-cell">{row.datesEffective}</td>
                        <td className="ant-table-cell">{row.premium}</td>
                        <td className="ant-table-cell">{row.lossRatio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </WorkSection>
        </div>
      
      </Container>
    </DashboardContainer>
  );
};

export default AccountDashboard;