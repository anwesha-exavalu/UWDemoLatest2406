import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../layout/Sublob.css'; // Import the CSS file for styling
import LossInfo from '../lob/commercialproperty/LossInfo';
import UWQuestions from '../lob/commercialproperty/UWQuestions';
import LocationComponent from '../lob/commercialproperty/LocationComponent';
import CreateSubmission from '../SidebarComponents/CreateSubmission';
import QuoteSummary from '../lob/commercialproperty/quoteSummary';
import PremiumSummary from '../lob/commercialproperty/PremiumSummary';

import Coverages from '../lob/commercialproperty/Coverages';
import Sublob2 from '../layout/Sublob2';
import { Container } from '../styles/components/Layout';

const AccountInfoSublobs = (props) => {
  const sections = [
    'policyInfo',
    'locationInfo',
    'lossInfo',
    'coverages',
    'uw',
    'premiumSummary',
    'quoteSummary'
  ];

  const [activeSection, setActiveSection] = useState('policyInfo');
  const {showAccount}=props;
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
   
    <Sublob2/>

  );
};

export default AccountInfoSublobs;
