import styled from 'styled-components';

export const SublobTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0;
  padding: 0;
  border-bottom: 1px solid #e8eaed;
  margin-bottom: 0;
  overflow-x: auto;
  background-color: #fff;
  width: 100%;
`;

export const SublobTab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 12px 16px;
  border-bottom: 2px solid transparent;
  color: #5f6368;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.2s ease;
  position: relative;
  flex: 1;
  text-align: center;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &.active {
    border-bottom: 2px solid #1a73e8;
    color: #1a73e8;
    font-weight: 500;
    background-color: rgba(26, 115, 232, 0.04);
  }
`;

export const SublobTabIcon = styled.div`
  font-size: 16px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;