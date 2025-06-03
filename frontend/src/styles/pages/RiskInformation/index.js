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
          gap: 1px;
          
          flex-wrap: nowrap;
          min-width: fit-content;
        }

        .modern-tabs-wrapper .ant-tabs-tab {
          background: transparent !important;
          border: none !important;
          border-radius: 20px !important;
          border-bottom: 1px solid #DDE5F9 !important;
          border-top: 1px solid #DDE5F9  !important;
          border-left: 1px solid #DDE5F9  !important;
          border-right: 1px solid #DDE5F9  !important;
          margin: 0 !important;
          padding: 8px 20px !important;
          font-weight: 500;
         align-items: center;
          
          color: #5f6368 !important;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
          font-size: 14px;
          line-height: 1.4;
          min-width: 140px;
        }

        .modern-tabs-wrapper .ant-tabs-tab:hover {
          background: rgba(66, 133, 244, 0.08) !important;
         
          color:#204FC2 !important;
        }

        .modern-tabs-wrapper .ant-tabs-tab-active {
          background: #DDE5F9 !important;
          
          color: #204FC2 !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
          font-weight: 500;
        }

        .modern-tabs-wrapper .ant-tabs-tab-active:hover {
          background: #DDE5F9 !important;
          color: #204FC2 !important;
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
            padding: 6px 16px !important;
            font-size: 13px;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .modern-tabs-wrapper .ant-tabs-nav-wrap {
            width: 100%;
            justify-content: flex-start;
          }
          
          .modern-tabs-wrapper .ant-tabs-tab {
            padding: 6px 12px !important;
            font-size: 12px;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .modern-tabs-wrapper .ant-tabs-tab {
            padding: 5px 10px !important;
            font-size: 11px;
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