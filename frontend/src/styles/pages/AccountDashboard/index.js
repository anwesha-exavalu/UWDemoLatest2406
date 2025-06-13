import styled from "styled-components";

export const DashboardContainer = styled.div`
  background-color: #F4F7FF;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-seri;
   
`;

export const DetailsCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #E8E8E8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .card-header {
    background-color: #054F7D;
    color: #FFFFFF;
    padding: 16px 24px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h2 {
      margin: 0;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: 600;
    }
    
    .ant-btn {
      color: #FFFFFF;
      border: none;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  .card-content {
    padding: 24px;
  }
`;


export const FormInput = styled.div`
  margin-bottom: 6px;
  
  label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #8C8C8C;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  input {
    width: 100%;
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid #E8E8E8;
    background-color: transparent;
    font-size: 14px;
    color: #262626;
    outline: none;
    transition: border-color 0.3s ease;
    
    &:focus {
      border-bottom-color: #1890FF;
    }
    
    &[readonly] {
      background-color: transparent;
      cursor: default;
    }
    
    &::placeholder {
      color: #BFBFBF;
    }
  }
`;

export const WorkSection = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E8E8E8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .work-header {
    background-color: #054F7D;
    color: #FFFFFF;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .work-content {
    padding: 0;
    
    .modern-table {
      .ant-table {
        background-color: #FFFFFF !important;
        border: none;
       
        .ant-table-thead > tr > th {
          background-color: #F3F3F3 !important;
          color: #595959 !important;
          font-weight: 500;
          font-size: 12px;
          border-bottom: 1px solid #E8E8E8 !important;
          padding: 16px 24px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-right: none;
          
          &:first-child {
            border-left: none;
          }
        }
        
        .ant-table-tbody > tr > td {
          background-color: #FFFFFF !important;
          color: #262626 !important;
          border-bottom: 1px solid #F5F5F5 !important;
          border-right: none;
          padding: 16px 24px;
          font-size: 14px;
          
          &:first-child {
            border-left: none;
          }
        }
        
        .ant-table-tbody > tr:hover > td {
          background-color: #FAFAFA !important;
        }
        
        .clickable-row {
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
      }
      
      /* Custom table styling */
      table {
        width: 100%;
        border-collapse: collapse;
        
         padding: 24px;
        thead {
          tr {
            th {
              background-color: #F8F9FA;
              color: #595959;
              font-weight: 500;
              font-size: 12px;
              border-bottom: 1px solid #E8E8E8;
              padding: 16px 24px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              text-align: left;
            }
          }
        }
        
        tbody {
          tr {
            &:hover {
              background-color: #FAFAFA;
            }
            
            &.clickable-row {
              cursor: pointer;
              transition: background-color 0.2s ease;
            }
            
            td {
              background-color: #FFFFFF;
              color: #262626;
              border-bottom: 1px solid #F5F5F5;
              padding: 16px 24px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
`;

export const MetricsSection = styled.div`
  padding: 10px 14px;
  
  .metrics-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    
    .metrics-icon {
      margin-right: 8px;
      font-size: 16px;
    }
    
    .metrics-title {
      font-size: 16px;
      font-weight: 600;
      color: #262626;
    }
  }
  
  .metrics-grid {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

export const MetricCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 12px;
  padding: 18px;
  flex: 1;
  max-width: 410px;
  max-height: 350px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  .card-title {
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 8px;
    text-align: left;
  }
  
  .card-subtitle {
    font-size: 12px;
    color: #8C8C8C;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 16px;
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      
      .legend-color {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
  }
  
  .chart-container {
    min-height: 250px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

export const TopBar = styled.div`
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-section {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 18px;
    margin-left: 18px;

    .greeting {
      font-size: 20px;
      color: #666666;
    }
  }

  .center-section {
    .search-input {
      width: 360px;
      height: 40px;
      
      .ant-input {
        border-radius: 6px;
      }
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 16px;

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #1890FF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
      font-size: 14px;
    }

    .actions {
      display: flex;
      gap: 8px;
    }
  }
`;

export const PriorityBadge = styled.span`
  &.priority-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
    text-transform: capitalize;
    
    &.priority-high {
      background-color: #FFF2F0;
      color: #CF1322;
      border: 1px solid #FFCCC7;
    }
    
    &.priority-medium {
      background-color: #FFF7E6;
      color: #D48806;
      border: 1px solid #FFD591;
    }
    
    &.priority-low {
      background-color: #F6FFED;
      color: #52C41A;
      border: 1px solid #B7EB8F;
    }
  }
`;

export const ResponsiveHelper = styled.div`
  @media (max-width: 1200px) {
    .metrics-grid {
      flex-direction: column;
      align-items: center;
    }
    
    .top-bar {
      .center-section .search-input {
        width: 200px;
      }
    }
  }
  
  @media (max-width: 992px) {
    .metrics-grid {
      padding: 0 16px;
    }
    
    .top-bar {
      flex-direction: column;
      gap: 12px;
      
      .center-section,
      .right-section {
        order: 2;
      }
    }
  }
  
  @media (max-width: 768px) {
    .tab-navigation {
      flex-direction: column !important;
      
      .nav-tab {
        width: 200px;
        border-radius: 6px !important;
        margin-bottom: 8px;
      }
    }
    
    .metrics-grid {
      gap: 16px;
    }
    
    .work-section {
      margin: 16px;
      
      .ant-table-wrapper {
        overflow-x: auto;
      }
    }
  }
`;
// In your styled-components file - Replace the ChartCard with this updated version:

export const ChartCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #E8E8E8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  height: 100%;
  
  .chart-container {
    height: 300px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    
    canvas {
      width: 100% !important;
      height: 100% !important;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); /* Add shadow for subtle 3D effect */
    }
  }
  
  .billing-info {
    border-top: 1px solid #F0F0F0;
    padding-top: 16px;
    margin-left: 20px;
    
    p {
      margin: 8px 0;
      font-size: 16px;
      font-weight: 400;
      color: #595959;
      
      strong {
        color: #262626;
      }
    }
  }
`;