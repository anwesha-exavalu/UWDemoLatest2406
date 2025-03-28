import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, DatePicker, Button, Typography, Space, Row, Col, Table,Select } from 'antd';
import { FileTextOutlined, CopyOutlined, PrinterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const Report = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [selectedLOB, setSelectedLOB] = useState(null);
    const [selectedAgency, setSelectedAgency] = useState('All');
    
    const handleGoBack = () => {
        navigate('/dashboardAdmin');
    };

    const handleGenerate = () => {
        if (startDate && endDate) {
            setReportGenerated(true);
        } else {
            alert('Please select both start and end dates');
        }
    };

    // Columns for the Expiring Policies Table
    const columns = [
        {
            title: 'Expiring Policy',
            dataIndex: 'expiringPolicy',
            key: 'expiringPolicy',
        },
        {
            title: 'Expiring Date',
            dataIndex: 'expiringDate',
            key: 'expiringDate',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Insured Last Name',
            dataIndex: 'insuredLastName',
            key: 'insuredLastName',
        },
        {
            title: 'Insured First Name',
            dataIndex: 'insuredFirstName',
            key: 'insuredFirstName',
        },
        {
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Agency #',
            dataIndex: 'agencyNo',
            key: 'agencyNo',
        },
        {
            title: 'Agency Name',
            dataIndex: 'agencyName',
            key: 'agencyName',
        },
        {
            title: 'Secondary Agency Name',
            dataIndex: 'secondaryAgencyName',
            key: 'secondaryAgencyName',
        },
        {
            title: 'Renewal Amount',
            dataIndex: 'renewalAmount',
            key: 'renewalAmount',
        },
        {
            title: 'NFIP Quote Amount',
            dataIndex: 'nfipQuotAmol',
            key: 'nfipQuotAmol',
        }
    ];

    // Sample data matching the screenshot
    const data = [
        {
            key: '1',
            expiringPolicy: '9522415601',
            expiringDate: '26/07/24',
            product: 'FLD',
            insuredLastName: 'KNH',
            insuredFirstName: 'Holding',
            paidAmount: '$4759',
            status: 'Active',
            agencyNo: '733299',
            agencyName: 'Jas Insurance comp',
            secondaryAgencyName: 'Jas Insurance comp',
            renewalAmount: '$467',
            nfipQuotAmol: '$0.0'
        },
        {
            key: '2',
            expiringPolicy: '9522415600',
            expiringDate: '26/07/24',
            product: 'FLD',
            insuredLastName: 'Weller',
            insuredFirstName: 'Kariene',
            paidAmount: '$8759',
            status: 'Expired',
            agencyNo: '733799',
            agencyName: 'Jas Insurance comp',
            secondaryAgencyName: 'Jas Insurance comp',
            renewalAmount: '$867',
            nfipQuotAmol: '$0.0'
        }
    ];

    const renderReportDetails = () => {
        if (!reportGenerated) return null;

        return (
            <>
                <Card
                    type="inner"
                    title="Expiring Report"
                    style={{ marginTop: 16 }}
                >
                    <Row>
                        <Col span={12}>
                            <Text>Line of Business</Text>
                            <div>{selectedLOB}</div>
                        </Col>
                        <Col span={12}>
                            <Text>Agency</Text>
                            <div>{selectedAgency}</div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Text>Begin Date</Text>
                            <div>{startDate.format('MM/DD/YYYY')}</div>
                        </Col>
                        <Col span={12}>
                            <Text>End Date</Text>
                            <div>{endDate.format('MM/DD/YYYY')}</div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Text>Include Renewal Policy</Text>
                            <div>N</div>
                        </Col>
                        <Col span={12}>
                            <Text>Agency Name</Text>
                            <div>Skyline Property</div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Text>Agency #</Text>
                            <div>733299</div>
                        </Col>
                        <Col span={12}>
                            <Text>Total Records</Text>
                            <div>29</div>
                        </Col>
                    </Row>
                </Card>

                {/* Existing Expiring Policies Card remains the same */}
                <Card
                    type="inner"
                    title="Expiring Policies"
                    style={{ marginTop: 16 }}
                >
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        scroll={{ x: 1500 }}
                        pagination={false}
                    />
                </Card>
            </>
        );
    };

    return (
        <div>
            <div style={{
                textAlign: 'right',
                marginBottom: 16,
                color: '#1890ff',
                cursor: 'pointer',
                fontSize: '0.9em'
            }}
                onClick={handleGoBack}>
                Previous page
            </div>
            <Card
                style={{
                    maxWidth: 800,
                    margin: '0 auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Title level={4} style={{ textAlign: 'center', marginBottom: 20, fontSize: '1.2em' }}>
                    Create Renewal Report
                </Title>

                <Space direction="vertical" style={{ width: '100%' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Text strong>Line of Business</Text>
                            <Select
                                style={{ width: '100%', marginTop: 8 }}
                                placeholder="Select Line of Business"
                                value={selectedLOB}
                                onChange={(value) => setSelectedLOB(value)}
                            >
                                <Option value="Commercial Property">Commercial Property</Option>
                                <Option value="General Liability">General Liability</Option>
                                <Option value="Professional Liability">Professional Liability</Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Text strong>Agency</Text>
                            <Select
                                style={{ width: '100%', marginTop: 8 }}
                                placeholder="Select Agency"
                                value={selectedAgency}
                                onChange={(value) => setSelectedAgency(value)}
                            >
                                <Option value="All">All</Option>
                                <Option value="Jas Insurance comp">Jas Insurance comp</Option>
                                <Option value="Skyline Property">Skyline Property</Option>
                                <Option value="ABC Insurance">ABC Insurance</Option>
                                <Option value="XYZ Agency">XYZ Agency</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Text strong>Start Date</Text>
                            <DatePicker
                                style={{ width: '100%', marginTop: 8 }}
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholder="Select date"
                            />
                        </Col>
                        <Col span={12}>
                            <Text strong>End Date</Text>
                            <DatePicker
                                style={{ width: '100%', marginTop: 8 }}
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholder="Select date"
                            />
                        </Col>
                    </Row>

                    <Button
                        type="primary"
                        block
                        style={{
                            marginTop: 16,
                        }}
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>

                    {renderReportDetails()}
                </Space>
            </Card>
        </div>
    );
};

export default Report;