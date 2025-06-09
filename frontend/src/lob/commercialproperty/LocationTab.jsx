import React, { useState } from 'react';
import { Row, Col } from 'antd';
import styles from "./LocationComponent.module.css";
import LocationTable from './LocationTable';
import LocationBuildingTab from "./LocationBuildingTab";
import OverallInsights from "./OverallInsights";
import PublicData from './PublicData';
import { Container } from '../../styles/components/Layout';
import { MainContainer } from '../../styles/pages/CreateSubmission/InsuredInfoStyle';
import { StyledTabs, TabPane } from '../../styles/pages/RiskInformation/index';
import { RoundedAddButton } from "../../styles/index";

const LocationTab = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
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

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  return (
    <Container>
     
        <div style={{ width: '100%', overflowX: 'auto' }}>
          {/* Tabs and Add Button in same row */}
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col flex="auto">
              <StyledTabs
                activeKey={activeTab}
                onChange={handleTabChange}
                style={{ 
                  marginBottom: 0,
                  '& .ant-tabs-tab': {
                    cursor: 'pointer !important',
                    pointerEvents: 'auto !important'
                  }
                }}
              >
                <TabPane tab="Location" key="1" />
                <TabPane tab="Buildings" key="2" />
                <TabPane tab="AI Insights (Beta)" key="3" />
                <TabPane tab="Public Data" key="4" />
              </StyledTabs>
            </Col>
            
            {/* Show Add Location button only on Location tab */}
            {activeTab === "1" && (
              <Col>
                <RoundedAddButton onClick={showModal}>
                  <span className="icon">+</span>
                  Add Location
                </RoundedAddButton>
              </Col>
            )}
          </Row>

          {/* Tab Content */}
          <div style={{ marginTop: '-80px', paddingTop: '80px' }}>
            {activeTab === "1" && (
              <LocationTable 
                nextTab={nextTab} 
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            )}
            
            {activeTab === "2" && (
              <LocationBuildingTab nextTab={nextTab} />
            )}
            
            {activeTab === "3" && (
              <OverallInsights />
            )}
            
            {activeTab === "4" && (
              <PublicData />
            )}
          </div>
        </div>
    
    </Container>
  );
};

export default LocationTab;