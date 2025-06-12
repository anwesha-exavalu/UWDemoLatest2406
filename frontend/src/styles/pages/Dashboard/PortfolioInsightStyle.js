import styled from 'styled-components';

export const Dashboard = styled.div`
  padding: 14px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 100%;
  overflow-x: hidden;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 350px;

  &.large-card {
    padding: 24px;
    min-height: 400px;
  }

  &.business-card {
    min-height: 350px;
  }

  &.product-card {
    min-height: 350px;
  }

  &.revenue-card {
    min-height: 350px;
  }

  .chart-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    flex: 1;

    &.stretched {
      width: 100%;
      height: 100%;
      
      > div {
        width: 100% !important;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 300px;
    
    &.large-card {
      min-height: 350px;
    }
  }

  @media (max-width: 480px) {
    padding: 14px;
    min-height: 280px;
    
    &.large-card {
      min-height: 320px;
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 20px 0;
  line-height: 1.4;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

export const StatsGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  flex: 1;

  @media (max-width: 1400px) {
    gap: 20px;
    margin-top: 25px;
  }

  @media (max-width: 1200px) {
    gap: 16px;
    margin-top: 20px;
  }

  @media (max-width: 992px) {
    gap: 14px;
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 15px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.blue {
    background-color: #dbeafe;
    color: #3b82f6;
  }

  &.green {
    background-color: #dcfce7;
    color: #16a34a;
  }

  &.purple {
    background-color: #f3e8ff;
    color: #a855f7;
  }

  &.teal {
    background-color: #ccfbf1;
    color: #14b8a6;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

export const StatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px 0;
  word-break: break-word;

  @media (max-width: 1200px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    margin-bottom: 16px;
    gap: 6px;
  }
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &.green {
    background-color: #16a34a;
  }
`;

export const StatusText = styled.span`
  font-size: 12px;
  color: #6b7280;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const StatusPercentage = styled.span`
  font-size: 12px;
  color: #16a34a;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

// Claim History Styles
export const ClaimHistoryContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;

  @media (max-width: 768px) {
    margin-top: 25px;
    gap: 25px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    margin-top: 20px;
  }
`;

export const ClaimCirclesRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 14px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const ClaimCircleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 140px;

  @media (max-width: 480px) {
    max-width: 120px;
  }
`;

export const ClaimCircleChart = styled.div`
  position: relative;
  width: 120px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
 

  .apexcharts-canvas {
    margin: 0 auto;
  }

  .apexcharts-datalabel-value {
    font-weight: 600 !important;
    font-size: 14px !important;
  }

  @media (max-width: 768px) {
    width: 110px;
    height: 110px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

export const CircleLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  max-width: 120px;
  line-height: 1.2;
  margin-top: 8px;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 11px;
    max-width: 110px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    max-width: 100px;
  }
`;

export const ClaimAmountSection = styled.div`
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  margin-top: "40px";

  @media (max-width: 480px) {
    padding-top: 14px;
  }
`;

export const ClaimAmountLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const ClaimAmountValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 14px;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 12px;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #8C8C8C;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 11px;
    gap: 5px;
  }
`;

// Remove the old styled components that are no longer needed
export const TopRow = styled.div`
  /* This component is no longer used - replaced with Ant Design Row/Col */
`;

export const BottomRow = styled.div`
  /* This component is no longer used - replaced with Ant Design Row/Col */
`;