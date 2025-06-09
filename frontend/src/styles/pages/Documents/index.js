import styled from "styled-components";
import { FileTextOutlined } from '@ant-design/icons';

export const VerticalButton = styled.div`
  position: fixed;
  top: 80%;
  right: 0;
  transform: translateY(-50%);
  background-color: #054F7D;
  color: #fff;
  padding: 10px;
  width: 50px;
  height: 200px;
  border-radius: 12px 0 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;

`;

export const DocumentIconBg = styled(FileTextOutlined)`
  font-size: 24px;
  margin-bottom: 8px;
  color: white;
  
`;

export const RotatedContent = styled.div`
  transform: rotate(90deg);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const VerticalText = styled.span`
  writing-mode: vertical-rl;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;


export const DocumentIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;
export const DocumentMenu = styled.div`
  position: fixed;
  top: 25%;
  right: ${({ isVisible }) => (isVisible ? '0' : '-300px')};
  width: 300px;
  max-height: 70vh;
  background-color: #EFF4FF;
  background-image: url('bg.png'); 
  background-size: cover;
  background-repeat: no-repeat;
  transition: right 0.3s ease;
  padding: 20px 20px 20px 10px;
  z-index: 999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px 0 0 8px;
  overflow-y: auto;
  border-left: 10px solid #054F7D;
`;

export const DocumentTitle = styled.h3`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #054F7D;
  margin-bottom: 20px;

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;


export const DocumentList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;


export const DocumentItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #1c3f6f;
  margin-bottom: 12px;
  cursor: pointer;

  svg {
    margin-right: 8px;
    color: #1c3f6f;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const DocumentLink = styled.span`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

export const SectionTitle = styled.li`
  margin-top: 20px;
  font-weight: bold;
  color: #333;
`;

export const MenuHeaderImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 6px 6px 0 0;
`;

