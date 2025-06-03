import React, { useState } from 'react';
import styles from "./LocationComponent.module.css";
import LocationTable from './LocationTable';
import LocationBuildingTab from "./LocationBuildingTab";
import OverallInsights from "./OverallInsights";
import PublicData from './PublicData';
import { Container } from '../../styles/components/Layout';
import { MainContainer } from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import { StyledTabs, TabPane } from '../../styles/pages/RiskInformation/index'; // Import the styled component

const LocationTab = () => {
  const [activeTab, setActiveTab] = useState("1");
  
  // Function to handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  // Function to go to the next tab (can be called from child components)
  const nextTab = () => {
    const currentTabNumber = parseInt(activeTab);
    if (currentTabNumber < 4) {
      setActiveTab((currentTabNumber + 1).toString());
    }
  };
  
  return (
    <Container>
      <MainContainer>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <StyledTabs
            activeKey={activeTab}
            onChange={handleTabChange}
          >
          <TabPane 
            tab="Location" 
            key="1"
            style={{ padding: '20px 0' }}
          >
            <LocationTable nextTab={nextTab} />
          </TabPane>
          
          <TabPane 
            tab="Buildings" 
            key="2"
            style={{ padding: '20px 0' }}
          >
            <LocationBuildingTab nextTab={nextTab} />
          </TabPane>
          
          <TabPane 
            tab="AI Insights (Beta)" 
            key="3"
            style={{ padding: '20px 0' }}
          >
            <OverallInsights />
          </TabPane>
          
          <TabPane 
            tab="Public Data" 
            key="4"
            style={{ padding: '20px 0' }}
          >
            <PublicData />
          </TabPane>
          </StyledTabs>
        </div>
      </MainContainer>
    </Container>
  );
};

export default LocationTab;