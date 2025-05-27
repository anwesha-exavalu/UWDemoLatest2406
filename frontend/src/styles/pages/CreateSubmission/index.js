import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#f5f5f5')};
  min-height: 100vh;
`;

export const WidgetBox = styled.div`
  background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#ffffff')};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#404040' : '#e8e8e8')};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const WidgetHeader = styled.div`
  background: ${({ theme }) => 
    theme === 'dark' 
      ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? '#404040' : '#e8e8e8')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WidgetTitle = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const WidgetContent = styled.div`
  padding: 24px;
  background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#ffffff')};
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 6px;
  }
`;

export const ActionButton = styled.button`
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &.primary {
    background: ${({ theme }) => 
      theme === 'dark' 
        ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    color: white;
    padding: 8px 16px;
    font-size: 14px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${({ theme }) => 
        theme === 'dark' 
          ? 'rgba(74, 85, 104, 0.3)' 
          : 'rgba(102, 126, 234, 0.3)'};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  &.circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => (theme === 'dark' ? '#404040' : '#d9d9d9')};
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#ffffff')};
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#666666')};

    &:hover {
      border-color: ${({ theme }) => (theme === 'dark' ? '#667eea' : '#1890ff')};
      color: ${({ theme }) => (theme === 'dark' ? '#667eea' : '#1890ff')};
      transform: translateY(-1px);
    }

    .anticon {
      font-size: 16px;
    }
  }
`;

export const FormInputWrapper = styled.div`
  margin-bottom: 16px;

  label {
    font-weight: 500;
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};
    font-size: 14px;
    margin-bottom: 4px;
    display: block;
  }

  input, 
  .ant-input, 
  .ant-select-selector {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => (theme === 'dark' ? '#404040' : '#d9d9d9')};
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s ease;
    background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#ffffff')};
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};

    &:focus {
      border-color: ${({ theme }) => (theme === 'dark' ? '#667eea' : '#1890ff')};
      box-shadow: 0 0 0 2px ${({ theme }) => 
        theme === 'dark' 
          ? 'rgba(102, 126, 234, 0.2)' 
          : 'rgba(24, 144, 255, 0.2)'};
      outline: none;
    }

    &:read-only,
    &[readonly] {
      background-color: ${({ theme }) => (theme === 'dark' ? '#404040' : '#f5f5f5')};
      color: ${({ theme }) => (theme === 'dark' ? '#cccccc' : '#666666')};
      cursor: not-allowed;
    }
  }

  &.error {
    input, 
    .ant-input {
      border-color: #ff4d4f;
    }

    label {
      color: #ff4d4f;
    }
  }

  &.success {
    input, 
    .ant-input {
      border-color: #52c41a;
    }
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#404040' : '#e8e8e8')};

  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const NextButton = styled.button`
  background: ${({ theme }) => 
    theme === 'dark' 
      ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border: none;
  color: white;
  padding: 10px 32px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => 
      theme === 'dark' 
        ? 'rgba(74, 85, 104, 0.3)' 
        : 'rgba(102, 126, 234, 0.3)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const UploadModalWrapper = styled.div`
  .ant-modal-content {
    border-radius: 8px;
    overflow: hidden;
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#ffffff')};
  }

  .ant-modal-header {
    background: ${({ theme }) => 
      theme === 'dark' 
        ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    border-bottom: none;
  }

  .ant-modal-title {
    color: white;
    font-weight: 600;
  }

  .ant-modal-close {
    color: white;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .ant-modal-body {
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#ffffff')};
  }

  .ant-modal-footer {
    background: ${({ theme }) => (theme === 'dark' ? '#2d2d2d' : '#ffffff')};
    border-top: 1px solid ${({ theme }) => (theme === 'dark' ? '#404040' : '#e8e8e8')};
  }
`;

export const UploadDragger = styled.div`
  padding: 40px 20px;
  border: 2px dashed ${({ theme }) => (theme === 'dark' ? '#4a5568' : '#667eea')};
  border-radius: 8px;
  background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#fafafa')};
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => (theme === 'dark' ? '#667eea' : '#764ba2')};
    background: ${({ theme }) => (theme === 'dark' ? '#404040' : '#f0f0f0')};
  }

  .upload-icon {
    font-size: 48px;
    color: ${({ theme }) => (theme === 'dark' ? '#4a5568' : '#667eea')};
    margin-bottom: 16px;
    display: block;
  }

  .upload-text {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};
    margin-bottom: 8px;
  }

  .upload-hint {
    font-size: 14px;
    color: ${({ theme }) => (theme === 'dark' ? '#cccccc' : '#666666')};
  }
`;

export const LoadingOverlay = styled.div`
  position: relative;
  opacity: ${({ loading }) => (loading ? '0.7' : '1')};
  pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10;
    display: ${({ loading }) => (loading ? 'block' : 'none')};
  }
`;

export const StatusMessage = styled.div`
  font-weight: 500;
  margin: 8px 0;

  &.success {
    color: #52c41a;
  }

  &.error {
    color: #ff4d4f;
  }

  &.warning {
    color: #faad14;
  }

  &.info {
    color: ${({ theme }) => (theme === 'dark' ? '#1890ff' : '#1890ff')};
  }
`;

export const RadioGroupWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;

  .ant-radio-wrapper {
    font-size: 14px;
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};

    .ant-radio {
      .ant-radio-inner {
        background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#ffffff')};
        border-color: ${({ theme }) => (theme === 'dark' ? '#404040' : '#d9d9d9')};
      }

      &.ant-radio-checked .ant-radio-inner {
        background: ${({ theme }) => (theme === 'dark' ? '#667eea' : '#1890ff')};
        border-color: ${({ theme }) => (theme === 'dark' ? '#667eea' : '#1890ff')};
      }
    }
  }
`;

export const CustomTooltip = styled.div`
  .ant-tooltip-inner {
    background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#333333')};
    color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#ffffff')};
    border-radius: 4px;
  }

  .ant-tooltip-arrow::before {
    background: ${({ theme }) => (theme === 'dark' ? '#1a1a1a' : '#333333')};
  }
`;

export const ResponsiveCol = styled.div`
  @media (max-width: 1200px) {
    .ant-col-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  @media (max-width: 768px) {
    .ant-col-6 {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 576px) {
    .ant-col-6,
    .ant-col-8,
    .ant-col-12 {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
`;

export const FadeInAnimation = styled.div`
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;