import styled from "styled-components";
import { Card } from "antd";

// Main container with light gray background
export const PublicDataContainer = styled.div`

  min-height: 100vh;
  padding: 20px;
`;

// Header section with navigation tabs
export const HeaderSection = styled.div`
  background: white;
 
  padding: 0;
  margin-bottom: 0;
 
`;

export const NavigationTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  
  .nav-tab {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      color: #374151;
      background: #f9fafb;
    }
    
    &.active {
      color: #2563eb;
      border-bottom-color: #2563eb;
      background: #f8faff;
    }
  }
`;

// Main card component
export const StyledCard = styled(Card)`
  border-radius: 0 0 8px 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: none;
  margin-top: 0;
  
  .ant-card-head {
    display: none;
  }
  
  .ant-card-body {
    padding: 0;
  }
`;

// Content wrapper
export const ContentWrapper = styled.div`
  background: white;
  padding: 20px;
`;

// Controls container for year selection and action buttons
export const ControlsContainer = styled.div`
  padding: 16px 20px;
  background: #f8faff;
  border-bottom: 1px solid #e5e7eb;
  
  .controls-left {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .download-icon {
      font-size: 16px;
      color: #6b7280;
      cursor: pointer;
      
      &:hover {
        color: #374151;
      }
    }
    
    .camera-icon {
      font-size: 16px;
      color: #6b7280;
      cursor: pointer;
      
      &:hover {
        color: #374151;
      }
    }
    
    .title-text {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-left: 8px;
    }
  }
  
  .controls-right {
    display: flex;
    justify-content: flex-end;
    
    .ant-select {
      min-width: 200px;
      
      .ant-select-selector {
        border-radius: 6px;
        border: 1px solid #d1d5db;
        font-size: 14px;
        background: #374151;
        color: white;
        
        .ant-select-selection-item {
          color: white;
        }
      }
      
      .ant-select-arrow {
        color: white;
      }
    }
  }
`;

// Main content tabs
export const MainTabsContainer = styled.div`
  .main-tabs {
    display: flex;
    background: #f8faff;
    border-bottom: 1px solid #e5e7eb;
    
    .main-tab {
      flex: 1;
      padding: 16px 24px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: white;
      cursor: pointer;
      border-radius: 6px 6px 0 0;
      margin: 4px 4px 0 4px;
      transition: all 0.2s ease;
      
      &.all-boroughs {
        background: #2563eb;
      }
      
      &.borough-specific {
        background: #6b7280;
        
        &:hover {
          background: #4b5563;
        }
      }
      
      &.active {
        background: #2563eb;
      }
    }
  }
`;

// Chart container
export const ChartContainer = styled.div`
  background: white;
  padding: 24px;
  
  .chart-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .chart-wrapper {
    position: relative;
    
    .apexcharts-canvas {
      background: transparent !important;
    }
    
    .apexcharts-bar-area {
      fill: #3b82f6 !important;
    }
    
    .apexcharts-series[data\\:realtime] .apexcharts-bar-area {
      fill: #e5e7eb !important;
    }
    
    .apexcharts-gridline {
      stroke: #f1f5f9 !important;
      stroke-width: 1;
    }
    
    .apexcharts-text {
      fill: #64748b !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 12px !important;
    }
    
    .apexcharts-xaxis-texts-g text {
      fill: #64748b !important;
      font-size: 11px !important;
    }
    
    .apexcharts-yaxis-texts-g text {
      fill: #475569 !important;
      font-size: 11px !important;
      font-weight: 400 !important;
    }
    
    .apexcharts-tooltip {
      background: white !important;
      border: 1px solid #e2e8f0 !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      border-radius: 6px !important;
    }
    
    /* Floating effect */
    .apexcharts-svg {
      filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15));
    }
  }
`;

// Borough selection container
export const BoroughSelectContainer = styled.div`
  padding: 20px;
  background: #f8faff;
  border-bottom: 1px solid #e5e7eb;
  
  .ant-select {
    width: 200px;
    
    .ant-select-selector {
      border-radius: 6px;
      border: 1px solid #d1d5db;
      font-size: 14px;
      background: white;
    }
  }
`;