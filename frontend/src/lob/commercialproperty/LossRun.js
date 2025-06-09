import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Upload,
  Button,
  Card,
  Spin,
  message,
  Divider,
  Row,
  Col,
  Tabs,
  Badge,
  Tag,
  Progress,
  Empty
} from 'antd';
import {
  FileTextOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  CheckCircleOutlined,
  FileSearchOutlined,
  CloudUploadOutlined,
  FilePdfOutlined,
  LoadingOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import axios from 'axios';
import LossRunPdfViewer from './PdfReviewDisplay';
import PdfModal from './PdfModal';
import {
  MainContainer,
} from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import { Container } from "../../styles/components/Layout";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const LossRun = () => {
  const [activeTab, setActiveTab] = useState('lossRun');
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // PDF upload props
  const pdfUploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf',
    showUploadList: false,
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        message.error('You can only upload PDF files!');
        return false;
      }

      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error('File must be smaller than 20MB!');
        return false;
      }

      setPdfFile(file);
      // Simulate upload progress for better UX
      simulateProgress();
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setPdfFile(null);
      setUploadProgress(0);
    }
  };

 
  // Simulate upload progress
  const simulateProgress = () => {
    setUploadProgress(0);
    const timer = setInterval(() => {
      setUploadProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  // Handle Loss Run extraction
  const handleLossRunExtraction = async () => {
    if (!pdfFile) {
      message.error('Please upload a PDF file first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      // Make a single request to extract the JSON data
      const jsonResponse = await axios.post(`${BASE_URL}/api/lossrun_extraction`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (jsonResponse.status !== 200) {
        throw new Error('Failed to extract data from PDF');
      }

      // Store the extracted data
      setExtractedData(jsonResponse.data);

      // Create a blob URL for PDF preview
      const url = window.URL.createObjectURL(pdfFile);
      setPdfUrl(url);

      message.success({
        content: 'Loss Run extraction completed successfully!',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
      });
    } catch (error) {
      console.error('Error during extraction:', error);
      message.error({
        content: error.response?.data?.error || 'Failed to process the PDF file.',
        duration: 5
      });
    } finally {
      setLoading(false);
    }
  };

  // Show PDF modal in full screen
  const handleOpenFullScreen = () => {
    setModalVisible(true);
  };

 

  // Handle download of annotated PDF - This function will be called from the PdfModal component
  const handleDownloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'loss_run_output.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle download of extracted data as JSON
  const handleDownloadJson = () => {
    if (extractedData) {
      const dataStr = JSON.stringify(extractedData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'extracted_data.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

 

  // Render file upload status for PDF
  const renderPdfUploadStatus = () => {
    if (!pdfFile) return null;

    return (
      <Card className="mt-4 bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FilePdfOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
            <div>
              <Text strong>{pdfFile.name}</Text>
              <Text type="secondary" className="block">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</Text>
            </div>
          </div>
          <div>
            {uploadProgress === 100 ? (
              <Tag color="success" icon={<CheckCircleOutlined />}>Ready</Tag>
            ) : (
              <Tag color="processing" icon={<LoadingOutlined />}>Uploading</Tag>
            )}
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setPdfFile(null)}
              style={{ marginLeft: '8px' }}
            />
          </div>
        </div>
        {uploadProgress < 100 && <Progress percent={uploadProgress} size="small" status="active" className="mt-2" />}
      </Card>
    );
  };

  
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Container>
      
        {/* PDF Modal for Full Screen View */}
        <PdfModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
          data={extractedData} 
        />
        
        <Card
          className="mb-6"
          style={{
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.09)',
            borderRadius: '5px',
            borderColor: 'white',
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            type="card"
            size="large"
            tabBarStyle={{
              marginBottom: '24px',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
          
            <Tabs.TabPane
              tab={
                <span>
                  <FilePdfOutlined style={{ fontSize: '18px', color: "#054F7D",fontWeight:"bold" }} />
                  <span style={{ marginLeft: '8px', fontSize: '16px', color: "#054F7D" }}>Loss Run Extraction</span>
                </span>
              }
              key="lossRun"
            >
              <div className="p-4">
                <Row align="middle" className="mb-6">
                  <FileTextOutlined style={{ fontSize: '28px', color: "#054F7D", marginRight: '16px' }} />
                  <Title level={3} style={{ margin: 0, color: "#054F7D"}}>
                    Loss Run PDF Processing
                  </Title>
                </Row>

                <Paragraph className="mb-6 text-gray-500">
                  Upload a Loss Run PDF for automated data extraction.
                  The system will process the document and generate an annotated version with extracted information.
                </Paragraph>

                <Card
                  className="mb-6"
                  style={{
                    background: 'linear-gradient(to right, #e6f7ff, #f0f5ff)',
                    borderRadius: '8px',
                    border: '1px dashed #91d5ff'
                  }}
                >
                  <Dragger {...pdfUploadProps} className="bg-white border-0 rounded-lg">
                    <div className="p-8">
                      <p className="text-center">
                        <CloudUploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                      </p>
                      <p className="text-lg font-medium mt-4">Click or drag PDF file here</p>
                      <p className="text-gray-500">
                        Support for a single PDF file up to 20MB
                      </p>
                    </div>
                  </Dragger>

                  {renderPdfUploadStatus()}
                </Card>

                <Button
                  type="primary"
                  size="large"
                  onClick={handleLossRunExtraction}
                  disabled={!pdfFile || loading}
                  style={{
                    height: '48px',
                    borderRadius: '6px',
                    background:"#054F7D",
                    fontWeight: 500,
                    color: "white",
                  }}
                  icon={<FileSearchOutlined />}
                  block
                >
                  {loading ? <><Spin indicator={antIcon} /> Processing...</> : 'Extract & Generate Annotated PDF'}
                </Button>

                {pdfUrl && extractedData ? (
                  <div className="mt-8">
                    <Divider>
                      <Badge status="processing" text="Extraction Results" />
                    </Divider>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Card
                          title={
                            <div className="flex items-center">
                              <FilePdfOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                              <span>PDF Preview</span>
                            </div>
                          }
                          
                          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}
                        >
                          <div className="h-96 border border-gray-200 rounded overflow-auto"  style={{ height: '500px' }}>
                            <LossRunPdfViewer data={extractedData} />
                          </div>
                          <div className="mt-4 flex justify-center">
                            <Button 
                              type="default" 
                              icon={<EyeOutlined />} 
                              onClick={handleOpenFullScreen}
                              style={{width: '180px'}}
                            >
                              Open in Full Screen
                            </Button>
                          </div>
                        </Card>
                      </Col>

                      <Col span={12}>
                        <Card
                          title={
                            <div className="flex items-center">
                              <FileTextOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
                              <span>Extracted Data</span>
                            </div>
                          }
                          extra={
                            <Button
                              type="default"
                              icon={<DownloadOutlined />}
                              onClick={handleDownloadJson}
                              style={{width: '180px'}}
                            >
                              Export as JSON
                            </Button>
                          }
                          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}
                        >
                          <div className="h-96 overflow-auto bg-gray-50 border border-gray-200 rounded p-4" style={{ height: '560px' }}>
                            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(extractedData, null, 2)}</pre>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  pdfUrl === null && extractedData === null && !loading && (
                    <div className="mt-8">
                      <Empty
                        description="Upload a PDF and process it to see results here"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    </div>
                  )
                )}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Card>
    
    </Container>
   
  );
};

export default LossRun;