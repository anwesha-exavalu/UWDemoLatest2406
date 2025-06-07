import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const StyledTabs = ({ children, ...props }) => {
  React.useEffect(() => {
    const styleId = 'custom-tabs-style';
    
    // Check if style already exists
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .modern-tabs-wrapper {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          margin-top: 20px;
        }

        .modern-tabs-wrapper .ant-tabs {
          width: 100%;
        }

        .modern-tabs-wrapper .ant-tabs-nav {
          margin-bottom: 0 !important;
          position: relative;
        }

        .modern-tabs-wrapper .ant-tabs-nav::before {
          display: none !important;
        }

        .modern-tabs-wrapper .ant-tabs-nav-wrap {
          border-radius: 25px;
          padding: 3px;
          border: none;
          display: inline-flex;
          width: auto;
          min-width: fit-content;
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .modern-tabs-wrapper .ant-tabs-nav-wrap::-webkit-scrollbar {
          display: none;
        }

        .modern-tabs-wrapper .ant-tabs-nav-list {
          display: flex;
          gap: 0;
          flex-wrap: nowrap;
          min-width: fit-content;
          position: relative;
        }

        .modern-tabs-wrapper .ant-tabs-tab {
          background: #f8f9fa !important;
          border: 1px solid #DDE5F9 !important;
          border-radius: 20px !important;
          margin: 0 -18px 0 0 !important;
          padding: 10px 28px !important;
          font-weight: 500;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #5f6368 !important;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
          font-size: 14px;
          line-height: 1.4;
          min-width: 170px;
          position: relative;
          z-index: 1;
        }

        .modern-tabs-wrapper .ant-tabs-tab:not(:first-child) {
          z-index: 0;
        }

        .modern-tabs-wrapper .ant-tabs-tab:nth-child(1) { z-index: 4; }
        .modern-tabs-wrapper .ant-tabs-tab:nth-child(2) { z-index: 3; }
        .modern-tabs-wrapper .ant-tabs-tab:nth-child(3) { z-index: 2; }
        .modern-tabs-wrapper .ant-tabs-tab:nth-child(4) { z-index: 1; }
        .modern-tabs-wrapper .ant-tabs-tab:nth-child(n+5) { z-index: 0; }

        .modern-tabs-wrapper .ant-tabs-tab:first-child {
          margin-left: 0 !important;
        }

        .modern-tabs-wrapper .ant-tabs-tab:hover {
          background: rgba(66, 133, 244, 0.08) !important;
          color: #204FC2 !important;
          z-index: 10 !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .modern-tabs-wrapper .ant-tabs-tab-active {
          background: #DDE5F9 !important;
          color: #204FC2 !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
          font-weight: 600;
          z-index: 15 !important;
          transform: translateY(-2px);
          border-color: #b3c7f7 !important;
        }

        .modern-tabs-wrapper .ant-tabs-tab-active:hover {
          background: #DDE5F9 !important;
          color: #204FC2 !important;
          z-index: 15 !important;
        }

        .modern-tabs-wrapper .ant-tabs-ink-bar {
          display: none !important;
        }

        .modern-tabs-wrapper .ant-tabs-content-holder {
          border: none;
          background: transparent;
          padding-top: 20px;
        }

        .modern-tabs-wrapper .ant-tabs-tabpane {
          padding: 0;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .modern-tabs-wrapper .ant-tabs-nav-wrap {
            padding: 2px;
            border-radius: 20px;
            width: 100%;
            overflow-x: auto;
          }
          
          .modern-tabs-wrapper .ant-tabs-tab {
            padding: 8px 20px !important;
            font-size: 13px;
            min-width: 150px;
            margin: 0 -14px 0 0 !important;
          }
        }

        @media (max-width: 480px) {
          .modern-tabs-wrapper .ant-tabs-nav-wrap {
            width: 100%;
            justify-content: flex-start;
          }
          
          .modern-tabs-wrapper .ant-tabs-tab {
            padding: 6px 18px !important;
            font-size: 12px;
            min-width: 130px;
            margin: 0 -10px 0 0 !important;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .modern-tabs-wrapper .ant-tabs-tab {
            padding: 5px 14px !important;
            font-size: 11px;
            min-width: 110px;
            margin: 0 -8px 0 0 !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle && existingStyle.parentNode) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div className="modern-tabs-wrapper">
      <Tabs
        type="card"
        size="default"
        {...props}
      >
        {children}
      </Tabs>
    </div>
  );
};

export { StyledTabs, TabPane };