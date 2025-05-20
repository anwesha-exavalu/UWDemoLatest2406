import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';
import LossRunPdfViewer from './PdfReviewDisplay';

const PdfModal = ({ visible, onClose, data }) => {
  // Function to generate and download PDF
  const handleDownload = () => {
    const element = document.getElementById('pdf-container');
    const opt = {
      margin: 10,
      filename: 'loss_run_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).save();
  };

  return (
    <Modal
      title="Loss Run Report"
      visible={visible}
      onCancel={onClose}
      width="80%"
      footer={[
        <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={handleDownload} style={{ width: '180px' }}>
          Download PDF
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
    >
      <div id="pdf-container" style={{ height: '70vh', overflow: 'auto' }}>
        {/* We'll load our PDF viewer component here */}
        {data && <LossRunPdfViewer data={data} />}
      </div>
    </Modal>
  );
};

export default PdfModal;