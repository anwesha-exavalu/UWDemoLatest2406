import React, { useState, useContext } from 'react';
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
import { AppContext } from '../App'; // Import the context

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

  // Get global state from context
  const { globalFormState, updateGlobalState } = useContext(AppContext);

  const showSublob = (sectionId) => {
    updateGlobalState({ activeSection: sectionId });
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(globalFormState.activeSection);
    if (currentIndex < sections.length - 1) {
      updateGlobalState({ activeSection: sections[currentIndex + 1] });
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
              className={globalFormState.activeSection === section.key ? 'active' : ''}
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
          {globalFormState.activeSection === 'policyInfo' && (
            <CreateSubmission
              onNext={goToNextSection}
              prefillLoading={globalFormState.prefillLoading}
              setPrefillLoading={(loading) => updateGlobalState({ prefillLoading: loading })}
              basicInfo={globalFormState.basicInfo}
              setBasicInfo={(updates) => {
                if (typeof updates === 'function') {
                  const newBasicInfo = updates(globalFormState.basicInfo);
                  updateGlobalState({ basicInfo: newBasicInfo });
                } else {
                  updateGlobalState({ basicInfo: updates });
                }
              }}
              locationInfo={globalFormState.locationInfo}
              setLocationInfo={(updates) => {
                if (typeof updates === 'function') {
                  const newLocationInfo = updates(globalFormState.locationInfo);
                  updateGlobalState({ locationInfo: newLocationInfo });
                } else {
                  updateGlobalState({ locationInfo: updates });
                }
              }}
              insuredInfo={globalFormState.insuredInfo}
              setInsuredInfo={(updates) => {
                if (typeof updates === 'function') {
                  const newInsuredInfo = updates(globalFormState.insuredInfo);
                  updateGlobalState({ insuredInfo: newInsuredInfo });
                } else {
                  updateGlobalState({ insuredInfo: updates });
                }
              }}
            />
          )}

          {globalFormState.activeSection === 'locationInfo' && <LocationComponent onNext={goToNextSection} />}
          {globalFormState.activeSection === 'lossInfo' && <LossInfo onNext={goToNextSection} />}
          {globalFormState.activeSection === 'coverages' && <Coverages onNext={goToNextSection} />}
          {globalFormState.activeSection === 'uw' && (
            <UWQuestions
              onNext={goToNextSection}
              isLoading={globalFormState.isLoading}
              setIsLoading={(loading) => updateGlobalState({ isLoading: loading })}
              dynamicQuestions={globalFormState.dynamicQuestions}
              setDynamicQuestions={(questions) => updateGlobalState({ dynamicQuestions: questions })}
              hasGenerated={globalFormState.hasGenerated}
              setHasGenerated={(generated) => updateGlobalState({ hasGenerated: generated })}
            />
          )}

          {globalFormState.activeSection === 'premiumSummary' && <PremiumSummary onNext={goToNextSection} />}
          {globalFormState.activeSection === 'quoteSummary' && <QuoteSummary onNext={goToNextSection} />}
        </div>

        <Documents />
      </div>
    </Container>
  );
};

export default Sublob2;