import { Card, Button, Modal, Row, Col } from 'antd';
import { useState } from 'react';
import riskmeter_report from '../../assets/documents/riskmeter_report.pdf';
import flood from '../../assets/img/flooded-house.png';
import earthquake from '../../assets/img/Vector.png';
import firestation from '../../assets/img/firestation-01.png';
import sinkhole from '../../assets/img/sink.png';
import stormsurge from '../../assets/img/strom.png';
import wildfire from '../../assets/img/wildlife-01.png';
import risk from '../../assets/img/risk.png';
import ViewMore from '../../assets/img/ViewMore.png';
import { Container } from '../../styles/components/Layout';

const RiskCard = ({ card }) => {
  const [isVisible, setISVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');

  // Define page mappings for different risk factors
  const getPageNumber = (riskFactor) => {
    const pageMapping = {
      'Flood': 10,
      'WildFire': 4,
      'Earthquake': 3,
      'StormSurge': 2,
      'Sinkhole': 2,
      'FireStation': 2
    };
    return pageMapping[riskFactor] || 1;
  };

  const openDocument = (riskFactor) => {
    const pageNumber = getPageNumber(riskFactor);
    const pdfUrl = `${riskmeter_report}#page=${pageNumber}`;
    setDocumentUrl(pdfUrl);
    setISVisible(true);
  };

  const closeModal = () => {
    setISVisible(false);
    setDocumentUrl('');
  };

  // Check if any risk score is greater than 60
  const hasHighRisk = () => {
    return Object.values(card.riskFactorDetails).some(value => {
      // Convert value to number if it's a string, handle percentage signs
      const numericValue = typeof value === 'string' 
        ? parseFloat(value.replace('%', '').replace(/[^\d.-]/g, ''))
        : parseFloat(value);
      
      return !isNaN(numericValue) && numericValue > 60;
    });
  };

  const renderImage = (riskfactor) => {
    switch (riskfactor) {
      case 'Flood':
        return <img src={flood} alt="icon" style={{ width: 32, height: 32 }} />;
      case 'Earthquake':
        return <img src={earthquake} alt="icon" style={{ width: 32, height: 32 }} />;
      case 'FireStation':
        return <img src={firestation} alt="icon" style={{ width: 32, height: 32 }} />;
      case 'Sinkhole':
        return <img src={sinkhole} alt="icon" style={{ width: 32, height: 32 }} />;
      case 'StormSurge':
        return <img src={stormsurge} alt="icon" style={{ width: 32, height: 32 }} />;
      case 'WildFire':
        return <img src={wildfire} alt="icon" style={{ width: 32, height: 32 }} />;
      default:
        return <img src={risk} alt="icon" style={{ width: 32, height: 32 }} />;
    }
  };

  const isHighRisk = hasHighRisk();

  const cardStyle = {
    width: '100%',
    minHeight: 250,
    height: 'auto',
    background: isHighRisk ? '#ffebee' : '#f6faff', // Light red for high risk, original blue for normal
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    border: isHighRisk ? '2px solid #f44336' : 'none' // Optional: add red border for high risk
  };

  const valueStyle = {
    background: '#ffffff',
    padding: '2px 12px',
    borderRadius: 8,
    color: isHighRisk ? '#d32f2f' : '#1890ff', // Red text for high risk values
    fontWeight: 600,
    fontSize: '14px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
  };

  const contentStyle = {
    flex: 1,
    paddingRight: 8,
    marginBottom: 0 // Remove margin to allow button to stick to bottom
  };

  return (
    <>
      <Card style={{ ...cardStyle, position: 'relative' }} bordered={false}>
        <img
          src="transparentbg.png"
          alt="overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 200 // Ensure minimum height for consistent layout
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            flexShrink: 0
          }}>
            {renderImage(card.riskFactorTitle)}
            <span style={{ 
              fontSize: 20, 
              fontWeight: 'bold',
              color: isHighRisk ? '#d32f2f' : 'inherit' // Red title for high risk
            }}>
              {card.riskFactorTitle}
            </span>
          </div>

          {/* Details - Scrollable Content */}
          <div style={contentStyle}>
            {Object.entries(card.riskFactorDetails).map(([key, value], idx) => {
              // Check if this specific value is > 60
              const numericValue = typeof value === 'string' 
                ? parseFloat(value.replace('%', '').replace(/[^\d.-]/g, ''))
                : parseFloat(value);
              const isHighValue = !isNaN(numericValue) && numericValue > 60;

              return (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: '#555' }}>{key}</span>
                  <span style={{
                    ...valueStyle,
                    background: isHighValue ? '#ffffff' : '#ffffff', // Light red background for high values
                    color: isHighValue ? '#d32f2f' : (isHighRisk ? '#d32f2f' : '#1890ff')
                  }}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* View More Button using Row/Col - Always at bottom */}
          <Row style={{ marginTop: 'auto' }}>
            <Col span={24} style={{ textAlign: 'right'}}>
              <Button
                type="text"
                style={{
                  fontWeight: 'bold',
                  color: '#000',
                  padding: '4px 8px',
                  height: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
                onClick={() => openDocument(card.riskFactorTitle)}
              >
                View more
                <img src={ViewMore} alt="view more" style={{ width: 20, height: 20 }} />
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Modal */}
      <Modal 
        title="Document Viewer" 
        open={isVisible} 
        onCancel={closeModal} 
        footer={null} 
        width="80%"
        style={{ top: 20 }}
      >
        <iframe 
          src={documentUrl} 
          title="Document Viewer" 
          style={{ width: '100%', height: '80vh', border: 'none' }} 
        />
      </Modal>
    </>
  );
};

export default RiskCard;