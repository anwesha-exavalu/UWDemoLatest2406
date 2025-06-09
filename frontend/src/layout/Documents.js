import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import fire_flood_print from '../assets/documents/fire_flood_print.pdf'
import riskmeter_report from '../assets/documents/riskmeter_report.pdf'
import SampleInspectionReport from '../assets/documents/Sample Inspection Report.pdf'
import { FileTextOutlined, ArrowRightOutlined } from '@ant-design/icons';
import AspyreMetroApplicationNY from '../assets/documents/Aspyre Metro Application NY.pdf'
import AIGLossRuns from '../assets/documents/AIG_Loss_Runs.pdf'
import CommercialPropertySovs from '../assets/documents/Commercial_Property_Insurance_SOV.pdf'
import DocumentForExtraction02 from '../assets/documents/DocumentForExtraction02.pdf'
import arrowIcon from "../assets/img/rightarrow.png"
import {
  VerticalButton,
  VerticalText,
  DocumentIcon,
  DocumentMenu,
  DocumentList,
  DocumentItem,
  DocumentLink,
  DocumentTitle,
  SectionTitle,
  DocumentIconBg,
  RotatedContent
} from "../styles/pages/Documents";

const Documents = () => {
  const [isDocumentMenuVisible, setDocumentMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const [capturedDocs, setCapturedDocs] = useState([]);
  const [documentType, setDocumentType] = useState("pdf"); // 'pdf' or 'image'

  useEffect(() => {
    // Load captured documents from localStorage
    const loadCapturedDocs = () => {
      const docs = JSON.parse(localStorage.getItem('capturedVisualizations') || '[]');
      setCapturedDocs(docs);
    };

    loadCapturedDocs();
    // Add event listener for storage changes
    window.addEventListener('storage', loadCapturedDocs);

    return () => {
      window.removeEventListener('storage', loadCapturedDocs);
    };
  }, []);

  const handleDocumentMenuHover = () => {
    setCapturedDocs(JSON.parse(localStorage.getItem('capturedVisualizations') || '[]'));
    setDocumentMenuVisible(true);
  };

  const handleDocumentMenuLeave = () => {
    setDocumentMenuVisible(false);
  };

  const openDocument = (url, type = 'pdf') => {
    setDocumentUrl(url);
    setDocumentType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setDocumentUrl("");
  };

  return (
    <>
      {/* Vertical "Documents" button */}
      <VerticalButton
        onMouseEnter={handleDocumentMenuHover}
        onMouseLeave={handleDocumentMenuLeave}
      >
        <RotatedContent>
           <DocumentIconBg />
        </RotatedContent>
       
        <VerticalText>Documents</VerticalText>
      </VerticalButton>

      {/* Document menu */}
      <DocumentMenu
        isVisible={isDocumentMenuVisible}
        onMouseEnter={handleDocumentMenuHover}
        onMouseLeave={handleDocumentMenuLeave}
      >
        <DocumentTitle>
          <FileTextOutlined />
          Documents
        </DocumentTitle>
        <DocumentList>
          <DocumentItem onClick={() => openDocument(DocumentForExtraction02)}>
             <DocumentIcon src={arrowIcon} alt="arrow" />
            Application.pdf
          </DocumentItem>
          <DocumentItem onClick={() => openDocument(AIGLossRuns)}>
            <DocumentIcon src={arrowIcon} alt="arrow" />
            Loss_Runs.pdf
          </DocumentItem>
          <DocumentItem onClick={() => openDocument(CommercialPropertySovs)}>
            <DocumentIcon src={arrowIcon} alt="arrow" />
            SOVs.pdf
          </DocumentItem>
          <DocumentItem onClick={() => openDocument(riskmeter_report)}>
            <DocumentIcon src={arrowIcon} alt="arrow" />
            Riskmeter Corelogic Report.pdf
          </DocumentItem>
          <DocumentItem onClick={() => openDocument(SampleInspectionReport)}>
            <DocumentIcon src={arrowIcon} alt="arrow" />
            Inspection Report.pdf
          </DocumentItem>
          <DocumentItem onClick={() => openDocument(fire_flood_print)}>
            <DocumentIcon src={arrowIcon} alt="arrow" />
            Fire Flood Report.pdf
          </DocumentItem>

          {capturedDocs.length > 0 && (
            <>
              <SectionTitle>Fire Data Visualizations</SectionTitle>
              {capturedDocs.map((doc, index) => (
                <li key={index}>
                  <DocumentLink onClick={() => openDocument(doc.image, 'image')}>
                    {doc.borough} ({doc.year === 'all' ? '2016-2024' : doc.year})
                  </DocumentLink>
                </li>
              ))}
            </>
          )}
        </DocumentList>
      </DocumentMenu>

      {/* Modal for viewing documents */}
      <Modal
        title="Document Viewer"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        {documentType === 'image' ? (
          <img
            src={documentUrl}
            alt="Captured Visualization"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <iframe
            src={documentUrl}
            title="Document Viewer"
            style={{ width: "100%", height: "80vh", border: "none" }}
          />
        )}
      </Modal>
    </>
  );
};

export default Documents;