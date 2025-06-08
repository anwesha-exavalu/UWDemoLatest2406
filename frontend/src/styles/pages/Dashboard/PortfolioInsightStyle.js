import styled from 'styled-components';

export const Dashboard = styled.div`
  padding: 14px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;

  &.large-card {
    padding: 24px;
  }

  &.business-card {
    grid-column: span 1;
  }

  &.product-card {
    grid-column: span 1;
  }

  &.revenue-card {
    grid-column: span 1;
   
  }

  .chart-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
   
    width: 100%;

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
  }
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 20px 0;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

export const StatsGrid = styled.div`
margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 66px;

  @media (max-width: 1200px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const StatItem = styled.div`
  display: flex;
 
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

  @media (max-width: 1200px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;

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

export const LineChart = styled.div`
  display: flex;
  gap: 16px;
  height: 160px;
`;

export const YAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
`;

export const YLabel = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

export const ChartArea = styled.div`
  flex: 1;
  position: relative;
`;

export const ChartBars = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  height: 120px;
  position: relative;
`;

export const ChartColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &.active .bar-value {
    background: #3b82f6;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    margin-bottom: 4px;
  }
`;

export const BarItem = styled.div`
  width: 24px;
  border-radius: 2px;
`;

export const XLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
`;

export const BarValue = styled.div`
  /* Styles will be applied via ChartColumn.active */
`;

export const TargetLine = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DashedLine = styled.div`
  width: 40px;
  height: 1px;
  border-top: 2px dashed #9ca3af;
`;

export const TargetLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
`;

// Claim History Styles
export const ClaimHistoryContainer = styled.div`
margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 54px;

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

export const ClaimCirclesRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 16px;

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

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

export const CircleLabel = styled.div`
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  max-width: 120px;
  line-height: 1.2;
  margin-top: 8px;

  @media (max-width: 480px) {
    font-size: 10px;
    max-width: 100px;
  }
`;

export const ClaimAmountSection = styled.div`
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;

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