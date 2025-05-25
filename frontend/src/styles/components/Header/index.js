import styled from 'styled-components';
import { Button } from 'antd';

// Main Header container
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  
  /* Large screens */
  @media (min-width: 1025px) {
    padding: 14px 40px;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

// Logo container
export const LogoContainer = styled.div`
  img {
    height: 40px;
  }
`;

// Navigation container
export const NavContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  /* Responsive styles */
  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    margin-left: 0;
  }
`;

// Navigation links
export const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
  
  a {
    text-decoration: none;
    color: #444;
    font-weight: 500;
    transition: color 0.3s;
    
    &:hover {
      color: #1169a0;
    }
    
    &.active {
      color: #1169a0;
      border-bottom: 2px solid #1169a0;
    }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    display: ${props => props.mobileVisible ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    padding: 10px 0;
    margin-top: 10px;
  }
  
  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1024px) {
    gap: 15px;
  }
`;

// Right section container
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  /* Responsive styles */
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// User profile container
export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  /* Responsive styles */
  @media (max-width: 768px) {
    display: none;
  }
`;

// User information container
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// User name style
export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1e3a8a;
`;

// User role style
export const UserRole = styled.span`
  font-size: 12px;
  color: #666;
`;

// Login/Logout icon button
export const LoginIconButton = styled(Button)`
  font-size: 20px;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    color: #1169a0;
    transform: scale(1.1);
  }
`;

// Mobile menu icon
export const MenuIconButton = styled(Button)`
  display: none;
  
  /* Responsive styles */
  @media (max-width: 768px) {
    display: block;
  }
`;

// Title style for the header title
export const HeaderTitle = styled.div`
  color: royalblue;
  text-align: center;
`;