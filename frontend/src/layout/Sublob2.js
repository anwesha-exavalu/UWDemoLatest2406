import React, { useState } from 'react';
// import './Sublob.css'; // Import the CSS file for styling
import LossInfo from '../lob/commercialproperty/LossInfo';
import UWQuestions from '../lob/commercialproperty/UWQuestions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LocationComponent from '../lob/commercialproperty/LocationComponent';
import { Button, Row, Col } from 'antd';
import CreateSubmission from '../SidebarComponents/CreateSubmission';
import QuoteSummary from '../lob/commercialproperty/quoteSummary';
import PremiumSummary from '../lob/commercialproperty/PremiumSummary';
import Bind from '../lob/commercialproperty/Bind';
import Coverages from '../lob/commercialproperty/Coverages';
import Documents from './Documents';

const Sublob2 = (props) => {
  const sections = [
    'policyInfo',
    'locationInfo',
    'lossInfo',
    'coverages',
    'uw',
    'premiumSummary',
    'quoteSummary'
  ];
 
  const [activeSection, setActiveSection] = useState(sections[0]);

  const showSublob = (sectionId) => {
    setActiveSection(sectionId);
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  return (
    <div style={{  marginTop: '20px', position: 'relative' }}>
      <Row gutter={[16, 16]} align="stretch" justify={'space-between'}>
        <Col  xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'policyInfo' ? 'active' : ''}`}
            onClick={() => showSublob('policyInfo')}
            block style={{ width: '11rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-file-alt"></i> Insured Info
          </Button>
        </Col>
        <Col  xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'locationInfo' ? 'active' : ''}`}
            onClick={() => showSublob('locationInfo')}
            block style={{ width: '11rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-map-marker-alt"></i> Risk
          </Button>
        </Col>
        <Col  xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'lossInfo' ? 'active' : ''}`}
            onClick={() => showSublob('lossInfo')}
            block style={{ width: '11rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-exclamation-triangle"></i> Loss
          </Button>
        </Col>
        <Col  xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'coverages' ? 'active' : ''}`}
            onClick={() => showSublob('coverages')}
            block style={{ width: '10rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-shield-alt"></i> Coverages
          </Button>
        </Col>
        <Col xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'uw' ? 'active' : ''}`}
            onClick={() => showSublob('uw')}
            block style={{ width: '11rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-question-circle"></i> UW Questions
          </Button>
        </Col>
        <Col  xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'premiumSummary' ? 'active' : ''}`}
            onClick={() => showSublob('premiumSummary')}
            block style={{ width: '11rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-calculator"></i> Premium Summary
          </Button>
        </Col>
        <Col  xs={23} sm={12} md={7} lg={5} xl={3}>
          <Button
            className={`sublob-item ${activeSection === 'quoteSummary' ? 'active' : ''}`}
            onClick={() => showSublob('quoteSummary')}
            block style={{ width: '11rem' }}
            // style={{ height: '3rem', fontSize: '1rem', width: '100%' }}
          >
            <i className="fas fa-file-signature"></i> Quote Summary
          </Button>
        </Col>
      </Row>

      {/* Conditional rendering based on the active section */}
      {activeSection === 'policyInfo' && (
        <div className="sublob-item.active" id="policyInfo">
          <CreateSubmission onNext={goToNextSection} />
        </div>
      )}
      {activeSection === 'locationInfo' && (
        <div className="sublob-item.active" id="locationInfo">
          <LocationComponent onNext={goToNextSection} />
        </div>
      )}
      {activeSection === 'lossInfo' && (
        <div className="sublob-item.active" id="lossInfo">
          <LossInfo onNext={goToNextSection} />
        </div>
      )}
      {activeSection === 'coverages' && (
        <div className="sublob-item.active" id="coverages">
          <Coverages onNext={goToNextSection} />
        </div>
      )}
      {activeSection === 'uw' && (
        <div className="sublob-item.active" id="uw">
          <UWQuestions onNext={goToNextSection} />
        </div>
      )}
      {activeSection === 'premiumSummary' && (
        <div className="sublob-item.active" id="premiumSummary">
          <PremiumSummary onNext={goToNextSection} />
        </div>
      )}
      {activeSection === 'quoteSummary' && (
        <div className="sublob-item.active" id="quoteSummary">
          <QuoteSummary onNext={goToNextSection} />
        </div>
      )}
       <Documents />
    </div>
  );
};

export default Sublob2;
