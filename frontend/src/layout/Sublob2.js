import React, { useState } from 'react';
import { Button } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';

import LossInfo from '../lob/commercialproperty/LossInfo';
import UWQuestions from '../lob/commercialproperty/UWQuestions';
import LocationComponent from '../lob/commercialproperty/LocationComponent';
import CreateSubmission from '../SidebarComponents/CreateSubmission';
import QuoteSummary from '../lob/commercialproperty/quoteSummary';
import PremiumSummary from '../lob/commercialproperty/PremiumSummary';
import Coverages from '../lob/commercialproperty/Coverages';
import Documents from './Documents';
import { Container } from '../styles/components/Layout';

import {
  SublobTabContainer,
  SublobTab,
  SublobTabIcon
} from '../styles/components/Sublob';

const Sublob2 = () => {
  const sections = [
    'policyInfo',
    'locationInfo',
    'lossInfo',
    'coverages',
    'uw',
    'premiumSummary',
    'quoteSummary'
  ];
  const defaultBasicInfo = {
    orgName: "",
    orgType: "",
    dba: "",
    fein: "",
    tin: "",
    businessActivity: "",
    sicCode: "",
    sicDescription: "",
    naics: "",
    naicsDescription: "",
    yearsInBusiness: "",
    status: "active",
    isEditing: false,
  };

  const defaultLocationInfo = {
    pinCode: "",
    addressLine1: "",
    addressLine2: "",
    county: "",
    city: "",
    state: "",
    country: "",
    isEditing: false,
  };

  const defaultInsuredInfo = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    countryCode: "",
    phoneNumber: "",
    website: "",
    isEditing: false,
  };
  const [basicInfo, setBasicInfo] = useState(defaultBasicInfo);
  const [locationInfo, setLocationInfo] = useState(defaultLocationInfo);
  const [insuredInfo, setInsuredInfo] = useState(defaultInsuredInfo);



  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(false);



  const showSublob = (sectionId) => {
    setActiveSection(sectionId);
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const buttonData = [
    { key: 'policyInfo', icon: 'file-alt', text: 'Insured Info' },
    { key: 'locationInfo', icon: 'map-marker-alt', text: 'Risk' },
    { key: 'lossInfo', icon: 'chart-bar', text: 'Loss' },
    { key: 'coverages', icon: 'users', text: 'Coverages' },
    { key: 'uw', icon: 'comment-dots', text: 'UW Questions' },
    { key: 'premiumSummary', icon: 'th-large', text: 'Premium Summary' },
    { key: 'quoteSummary', icon: 'file-alt', text: 'Quote Summary' }
  ];

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <SublobTabContainer>
          {buttonData.map(section => (
            <SublobTab
              key={section.key}
              className={activeSection === section.key ? 'active' : ''}
              onClick={() => showSublob(section.key)}
            >
              <SublobTabIcon>
                <i className={`fas fa-${section.icon}`} />
              </SublobTabIcon>
              {section.text}
            </SublobTab>
          ))}
        </SublobTabContainer>

        <div>
          {activeSection === 'policyInfo' && (
            <CreateSubmission
              onNext={goToNextSection}
              prefillLoading={prefillLoading}
              setPrefillLoading={setPrefillLoading}
              basicInfo={basicInfo}
              setBasicInfo={setBasicInfo}
              locationInfo={locationInfo}
              setLocationInfo={setLocationInfo}
              insuredInfo={insuredInfo}
              setInsuredInfo={setInsuredInfo}
            />
          )}

          {activeSection === 'locationInfo' && <LocationComponent onNext={goToNextSection} />}
          {activeSection === 'lossInfo' && <LossInfo onNext={goToNextSection} />}
          {activeSection === 'coverages' && <Coverages onNext={goToNextSection} />}
          {activeSection === 'uw' && (
            <UWQuestions
              onNext={goToNextSection}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              dynamicQuestions={dynamicQuestions}
              setDynamicQuestions={setDynamicQuestions}
              hasGenerated={hasGenerated}
              setHasGenerated={setHasGenerated}
            />
          )}

          {activeSection === 'premiumSummary' && <PremiumSummary onNext={goToNextSection} />}
          {activeSection === 'quoteSummary' && <QuoteSummary onNext={goToNextSection} />}
        </div>

        <Documents />
      </div>
    </Container>
  );
};

export default Sublob2;