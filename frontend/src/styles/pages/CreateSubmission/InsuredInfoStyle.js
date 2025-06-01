import styled from 'styled-components';

// Updated styled components with equal height solution
export const MainContainer = styled.div`
  background-color: #ffffff;
  margin-top: 20px;
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  padding: 0px 16px;
  margin: 0 auto;
  box-sizing: border-box;
  
  /* Desktop */
  @media (min-width: 1200px) {
    max-width: 1420px;
    padding: 0px 24px;
  }
  
  /* Tablet */
  @media (min-width: 768px) and (max-width: 1199px) {
    max-width: 100%;
    padding: 0px 20px;
  }
  
  /* Mobile */
  @media (max-width: 767px) {
    padding: 0px 12px;
    margin-top: 10px;
  }
  
  ol.contentlist {
    li {
      font-weight: 600;
    }
  }
  
  .mt-negative {
    margin-top: -100px;
    
    @media (max-width: 767px) {
      margin-top: -50px;
    }
  }

  &.mt-positive {
    margin-top: 20px;
    
    @media (max-width: 767px) {
      margin-top: 10px;
    }
  }
  
  &.pb {
    padding-bottom: 20px;
    
    @media (max-width: 767px) {
      padding-bottom: 15px;
    }
  }
  
  .ta {
    text-align: right;
    
    @media (max-width: 767px) {
      text-align: center;
    }
  }
  
  .gp {
    gap: 30px 0px;
    
    @media (max-width: 767px) {
      gap: 20px 0px;
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 15px;
    margin-bottom: 15px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-wrap: wrap;
  
  @media (max-width: 767px) {
    margin-left: 0;
    justify-content: center;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  
  @media (max-width: 767px) {
    gap: 15px;
    margin-bottom: 15px;
  }
`;

// SOLUTION 1: Equal height columns using flexbox
export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  margin-bottom: 25px;
  height: 100%; /* Add this */
  
  @media (max-width: 991px) {
    margin-bottom: 20px;
    gap: 20px;
  }
  
  @media (max-width: 767px) {
    margin-bottom: 15px;
    gap: 15px;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  margin-bottom: 25px;
  height: 100%; /* Add this */
  
  @media (max-width: 991px) {
    margin-bottom: 20px;
    gap: 20px;
  }
  
  @media (max-width: 767px) {
    margin-bottom: 15px;
    gap: 15px;
  }
`;

// SOLUTION 2: Equal height cards with flex-grow
export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  flex: 1; /* This makes cards grow to fill available space */
  
  @media (max-width: 767px) {
    margin-bottom: 15px;
    border-radius: 6px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    padding: 12px 16px;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
    color: #1890ff;
    flex-shrink: 0;
    
    @media (max-width: 767px) {
      width: 18px;
      height: 18px;
    }
  }
  
  .logobox {
    max-width: 40px;
    max-height: 40px;
    
    @media (max-width: 767px) {
      max-width: 32px;
      max-height: 32px;
    }
  }
  
  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #2D2B32;
    font-family: 'Inter', sans-serif;
    line-height: 1.2;
    letter-spacing: -0.18px;
    
    @media (max-width: 991px) {
      font-size: 20px;
    }
    
    @media (max-width: 767px) {
      font-size: 18px;
    }
    
    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  flex: 1; /* This allows content to grow and fill available space */
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

// SOLUTION 3: Alternative - Equal height container for both columns
export const EqualHeightContainer = styled.div`
  display: flex;
  align-items: stretch; /* This makes children stretch to same height */
  gap: 24px;
  
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 20px;
  }
  
  @media (max-width: 767px) {
    gap: 15px;
  }
  
  > div {
    flex: 1; /* Makes both columns equal width and height */
  }
`;

// For Mailing Address - 4 columns layout
export const MailingAddressRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 991px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  font-weight: 500;
  
  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 767px) {
    padding: 10px 12px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
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
  
  @media (max-width: 767px) {
    padding: 10px 12px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  
  @media (max-width: 767px) {
    justify-content: center;
    margin-top: 20px;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 767px) {
    width: 120px;
    height: 36px;
    font-size: 13px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 200px;
  }
  
  .step-content-box {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .logobox {
      max-width: 16px;
      max-height: 16px;
    }
  }
  
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
  
  @media (max-width: 767px) {
    width: 120px;
    height: 36px;
    font-size: 13px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    margin-top: 10px;
    max-width: 200px;
  }
  
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
  color: white;
  
  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-top: 10px;
  }
  
  &:hover {
    border-color: #1890ff;
    background-color: #40a9ff;
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
  
  @media (max-width: 767px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
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
  
  @media (max-width: 767px) {
    padding: 20px;
    max-width: 100%;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    max-height: 90vh;
  }
  
  h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    
    @media (max-width: 767px) {
      font-size: 16px;
    }
  }
`;

export const UploadArea = styled.div`
  border: 2px dashed #1890ff;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  @media (max-width: 767px) {
    padding: 30px 16px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 12px;
  }
  
  &:hover {
    border-color: #40a9ff;
    background-color: #f0f8ff;
  }
  
  .upload-icon {
    font-size: 48px;
    color: #1890ff;
    margin-bottom: 16px;
    
    @media (max-width: 767px) {
      font-size: 40px;
      margin-bottom: 12px;
    }
    
    @media (max-width: 480px) {
      font-size: 36px;
      margin-bottom: 10px;
    }
  }
  
  .upload-text {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    
    @media (max-width: 767px) {
      font-size: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  
  .upload-hint {
    font-size: 14px;
    color: #666;
    
    @media (max-width: 767px) {
      font-size: 13px;
    }
    
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;



/* Global responsive breakpoints for consistent behavior */
export const breakpoints = {
  xs: '0px',
  sm: '576px', 
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
};

/* Ensure proper font scaling */
export const GlobalStyles = `
  * {
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Ant Design responsive grid overrides */
  .ant-row {
    margin-left: -8px !important;
    margin-right: -8px !important;
    
    @media (max-width: 767px) {
      margin-left: -6px !important;
      margin-right: -6px !important;
    }
  }
  
  .ant-col {
    padding-left: 8px !important;
    padding-right: 8px !important;
    
    @media (max-width: 767px) {
      padding-left: 6px !important;
      padding-right: 6px !important;
    }
  }
  
  /* Ensure images are responsive */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Prevent horizontal scrolling */
  html, body {
    overflow-x: hidden;
  }
`;