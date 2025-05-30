import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: #ffffff;
  margin-top: 20px;
  min-height: 100vh;
  max-width: 1420px;
  padding: 0px 2px;
  margin: 0 auto;
  ol.contentlist {
    li {
      font-weight: 600;
    }
  }
  .mt-negative {
    margin-top: -100px; 
  }

  &.mt-positive {
    margin-top: 20px; 
  }
  &.pb {
    padding-bottom: 20px;
  }
  .ta {
    text-align: right;
  }
  .gp{
    gap:30px 0px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto; /* Aligns the button group to the right */
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: stretch; /* Make columns equal height */
  
  /* Responsive behavior for smaller screens */
  @media (max-width: 1120px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
  min-width: 0; /* Prevents flex items from overflowing */
  margin-bottom: 25px;
  margin-right: 10px;
  margin-left: 5px;
  
  /* Ensure all cards in the column have consistent spacing */
  > * {
    width: 100%;
  }
  
  /* Make the last card flexible to fill remaining space */
  > *:last-child {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 1120px) {
    margin-right: 0;
    max-width: none;
    
    > *:last-child {
      flex: none;
    }
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px; /* Match the gap with left column for consistency */
  min-width: 0; /* Prevents flex items from overflowing */
  margin-bottom: 25px;
  margin-left: 10px;
  
  /* Ensure all cards in the column have consistent spacing */
  > * {
    width: 100%;
  }
  
  /* Make the last card flexible to fill remaining space */
  > *:last-child {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 1120px) {
    margin-left: 0;
    max-width: none;
    
    > *:last-child {
      flex: none;
    }
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px; /* Fixed typo: was 'margn-bottom' */
  display: flex;
  flex-direction: column;
  
  /* Ensure consistent card behavior */
  min-height: fit-content;
  width: 100%;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0; /* Prevent header from shrinking */
  
  .icon {
    width: 20px;
    height: 20px;
    color: #1890ff;
    flex-shrink: 0;
  }
  
  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #2D2B32;
    font-family: 'Inter', sans-serif;
    line-height: 22px;
    letter-spacing: -0.18px;
    vertical-align: middle;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  flex: 1; /* Allow content to expand and fill available space */
  display: flex;
  flex-direction: column;
  
  /* If this is the last card in a column, allow it to grow */
  *:last-child & {
    justify-content: flex-start;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  /* Responsive grid adjustments */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0; /* Prevent overflow */
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &:read-only {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const NextButtonContainer = styled.div`
  display: flex;
    flex-direction: column;
  justify-content: flex-end;
 
  
`;

export const NextButton = styled.button`
   background-color: #054F7D;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;
  width: 140px;
  height: 40px;
 
 
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #40a9ff;
  }
  
  &:active {
    background-color: #096dd9;
  }
  
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button`
  background-color: #054F7D;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s ease;
  width: 140px;
  height: 40px;
  
  &:hover {
    background-color: #40a9ff;
  }
  
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  background: #054F7D;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
    margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  gap: 8px;
  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const UploadArea = styled.div`
  border: 2px dashed #1890ff;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #40a9ff;
    background-color: #f0f8ff;
  }
  
  .upload-icon {
    font-size: 48px;
    color: #1890ff;
    margin-bottom: 16px;
  }
  
  .upload-text {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
  }
  
  .upload-hint {
    font-size: 14px;
    color: #666;
  }
`;