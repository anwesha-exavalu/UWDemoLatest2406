import styled from "styled-components";

export const DashboardContainer = styled.div`
  background-color: #F4F7FF;
  min-height: 150vh;
  height: 100%;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

export const WelcomeSection = styled.div`
  .filters-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px;
    background-color: ${({ theme }) => (theme === 'dark' ? '#464646' : '#f8f9fa')};
    border-radius: 6px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-label {
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => (theme === 'dark' ? '#FFFFFF' : '#05004E')};
    white-space: nowrap;
  }
  
  .welcome-title {
    font-size: 24px !important;
    font-weight: 600 !important;
    color: #262626 !important;
    margin-bottom: 24px !important;
    margin-left: 16px !important;
  }
  
  .tab-navigation {
    display: flex;
    gap: 0;
    border: 1px solid #D9D9D9;
    border-radius: 6px;
    overflow: hidden;
    display: inline-flex;
    margin-right: 16px; /* Align with search box */
    
    .nav-tab {
      background-color: #FFFFFF !important;
      border: none !important;
      color: #666666 !important;
      font-weight: 500;
      height: 40px;
      border-radius: 0 !important;
      &.active {
        background-color: #262626 !important;
        color: #FFFFFF !important;
      }
      
      &:hover:not(.active) {
        background-color: #FAFAFA !important;
      }
    }
  }

  /* Ensure proper alignment between search and tabs */
  .ant-row {
    margin-right: 16px;
    margin-left: 16px;
  }
`;

export const MetricsSection = styled.div`
  padding: 12px 24px; /* Added horizontal padding to match other sections */
  
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
    justify-content: center; /* Center the donut chart */
    
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

export const WorkSection = styled.div`
  background-color: #FFFFFF;
  margin: 30px 24px; /* Match the horizontal margin with MetricsSection */
  border-radius: 10px;
  border: 2px solid #E8E8E8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .work-header {
    background-color: #054F7D;
    color: #FFFFFF;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .work-content {
    padding: 24px;
    
    .modern-table {
      .ant-table {
        background-color: #FFFFFF !important;
        
        .ant-table-thead > tr > th {
          background-color: #F3F3F3 !important;
          color: #595959 !important;
          font-weight: 500;
          font-size: 12px;
          border-bottom: 1px solid #E8E8E8 !important;
          padding: 18px 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          
          .ant-table-column-sorter {
            color: #8C8C8C;
          }
        }
        
        .ant-table-tbody > tr > td {
          background-color: #FFFFFF !important;
          color: #262626 !important;
          border-bottom: 1px solid #F5F5F5 !important;
          padding: 16px;
          font-size: 14px;
        }
        
        .ant-table-tbody > tr:hover > td {
          background-color: #FAFAFA !important;
        }
        
        .clickable-row {
          cursor: pointer;
        }
      }
      
      .ant-pagination {
        padding: 16px 24px;
        
        .ant-pagination-item {
          background-color: #FFFFFF !important;
          border-color: #D9D9D9 !important;
          
          a {
            color: #595959 !important;
          }
          
          &.ant-pagination-item-active {
            background-color: #1890FF !important;
            border-color: #1890FF !important;
            
            a {
              color: #FFFFFF !important;
            }
          }
        }
        
        .ant-pagination-prev,
        .ant-pagination-next {
          .ant-pagination-item-link {
            background-color: #FFFFFF !important;
            border-color: #D9D9D9 !important;
            color: #595959 !important;
          }
        }
      }
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

export const SearchDropdown = styled.div`
  .ant-dropdown {
    background-color: #FFFFFF !important;
    border: 1px solid #D9D9D9 !important;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    .ant-input {
      background-color: #FFFFFF !important;
      border-color: #D9D9D9 !important;
      color: #262626 !important;
      
      &::placeholder {
        color: #8C8C8C !important;
      }
    }
    
    .ant-btn {
      &.ant-btn-primary {
        background-color: #1890FF !important;
        border-color: #1890FF !important;
      }
      
      &:not(.ant-btn-primary):not(.ant-btn-link) {
        background-color: #FAFAFA !important;
        border-color: #D9D9D9 !important;
        color: #595959 !important;
      }
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

// Chart specific styling
export const ChartWrapper = styled.div`
  .chart-container {
    height: 200px !important;
    width: 90% !important;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
   
   
  }
  
  canvas {
    width: 100% !important;
    height: 100% !important;
    
  }
  
  /* Custom chart colors */
  --primary-blue: #4A90E2;
  --secondary-blue: #7BB3F0;
  --light-blue: #204FC2;
  --accent-blue: #2E5C8A;
`;