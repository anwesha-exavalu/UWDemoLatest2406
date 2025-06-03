import React from "react";
import styles from "./LocationComponent.module.css";
import { LocationHeader } from "./LocationHeader";


import Documents from "../../layout/RightSidebar";

import { Col, Row } from "antd";

import Tableantd
 from "../../layout/Tableantd";
import LocationTable from "./LocationTable";
import LocationTab from "./LocationTab";
import { Container } from "../../styles/components/Layout";
import { MainContainer } from "../../styles/pages/CreateSubmission/InsuredInfoStyle";

export function LocationComponent() {
  return (
   <Container>
    <MainContainer>
          <LocationTab/>
          </MainContainer>
         </Container>
          
         
     
     
   
  );
}

export default LocationComponent;
