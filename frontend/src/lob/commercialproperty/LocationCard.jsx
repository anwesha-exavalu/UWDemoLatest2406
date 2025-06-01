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
import view_more from '../../assets/img/view_more.png';
import { Container } from '../../styles/components/Layout';

const RiskCard = ({ card }) => {
  const [isVisible, setISVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');

  const openDocument = (url) => {
    setDocumentUrl(url);
    setISVisible(true);
  };

  const closeModal = () => {
    setISVisible(false);
    setDocumentUrl('');
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

  const cardStyle = {
    width: '100%',
    minHeight: 250, // Minimum height but allow expansion
    height: 'auto', // Allow height to adjust based on content
    background: '#f6faff',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  };

  const valueStyle = {
    background: '#ffffff',
    padding: '2px 12px',
    borderRadius: 8,
    color: '#1890ff',
    fontWeight: 600,
    fontSize: '14px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
  };

  const contentStyle = {
    flex: 1,
    marginBottom: 16,
    paddingRight: 8
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
            pointerEvents: 'none', // allows clicks through
            zIndex: 0
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            flexShrink: 0 // Prevent header from shrinking
          }}>
            {renderImage(card.riskFactorTitle)}
            <span style={{ fontSize: 20, fontWeight: 'bold' }}>{card.riskFactorTitle}</span>
          </div>

          {/* Details - Scrollable Content */}
          <div style={contentStyle}>
            {Object.entries(card.riskFactorDetails).map(([key, value], idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: '#555' }}>{key}</span>
                <span style={valueStyle}>{value}</span>
              </div>
            ))}
          </div>
          <Row gutter={24}>
            <Col span={12}></Col>
            <Col span={12} >
              {/* View More Button - Always at bottom right */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexShrink: 0, // Prevent button area from shrinking
                marginTop: 'auto', // Push to bottom
                textAlign: 'right'
              }}>
                <Button
                  type="text"
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                    padding: '4px 8px',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                  onClick={() => openDocument(riskmeter_report)}
                >
                  View more
                  <img src={view_more} alt="view more" style={{ width: 16, height: 16 }} />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Modal */}
      <Modal title="Document Viewer" open={isVisible} onCancel={closeModal} footer={null} width="60%">
        <iframe src={documentUrl} title="Document Viewer" style={{ width: '100%', height: '80vh', border: 'none' }} />
      </Modal>
    </>
  );
};

export default RiskCard;