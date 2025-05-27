import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";

import Dashboard from './SidebarComponents/Dashboard';
import DocumentScreen from './SidebarComponents/DocumentScreen';
import ClearanceScreen from './SidebarComponents/ClearanceScreen';
import SearchInsured from './SidebarComponents/SearchInsured';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingFilled, HomeOutlined, InfoCircleOutlined, EditFilled, FileTextOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import HeaderDesign from './layout/HeaderDesign';

import { Divider } from 'antd';
import Sublob2 from './layout/Sublob2';
import AuditTrail from './SidebarComponents/AuditTrail';
import AccountInfo from './SidebarComponents/AccountInfo';
import AccountDashboard from './SidebarComponents/AccountDashboard';
import Login from './layout/Login';
import DashboardAdmin from './SidebarComponents/DashboardAdmin';
import Report from './SidebarComponents/Report';
import PrivateFooter from './components/Footer/PrivateFooter';



const { Content, Footer } = Layout;
const { SubMenu } = Menu;

const MyMenu = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  // This effect loads the role and ensures default view
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    // Redirect to first appropriate page based on role if on dashboard
    if (location.pathname === '/dashboard') {
      if (role === 'admin') {
        navigate('/dashboardAdmin');
      }
    }

    // Redirect to first submenu if on admin root path
    if (role === 'admin' && location.pathname === '/') {
      navigate('/dashboardAdmin');
    }
  }, [navigate, location.pathname]);

  // Create a key lookup based on pathname
  const currentPath = location.pathname;

  // Determine which key should be selected based on current path
  let selectedKeys = [];
  let openKeys = [];

  if (userRole === 'underwriter') {
    if (currentPath === '/dashboard') selectedKeys = ['1'];
    else if (currentPath === '/accountdashboard') selectedKeys = ['2'];
    else if (currentPath === '/accountinfo') selectedKeys = ['3'];
    else if (currentPath === '/createsubmission') selectedKeys = ['4'];
  } else if (userRole === 'admin') {
    if (currentPath === '/dashboardAdmin')
      selectedKeys = ['5'];
    else if (currentPath === '/accountdashboard') selectedKeys = ['6'];
    else if (currentPath === '/accountinfo') selectedKeys = ['7'];
    else if (currentPath === '/createsubmission') selectedKeys = ['8'];
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      inlineIndent={12}
      className="custom-sidebar-menu"
    >
      {/* Show these items only for underwriter role */}
      {userRole === 'underwriter' && (
        <>
          <Menu.Item key="1" icon={<HomeOutlined />} title={"Dashboard"}>
            {!collapsed ? <Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> : <Link to="/dashboard" style={{ textDecoration: 'none' }} />}
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />} title={"Account Information"}>
            {!collapsed ? <Link to="/accountdashboard" style={{ textDecoration: 'none' }}>Account Information</Link> : <Link to="/accountdashboard" style={{ textDecoration: 'none' }} />}
          </Menu.Item>
          <Menu.Item key="3" icon={<FileTextOutlined />} title={"Account Details"}>
            {!collapsed ? <Link to="/accountinfo" style={{ textDecoration: 'none' }}>Account Details</Link> : <Link to="/accountinfo" style={{ textDecoration: 'none' }} />}
          </Menu.Item>
          <Menu.Item key="4" icon={<EditFilled />} title={"Create Submission"}>
            {!collapsed ? <Link to="/createsubmission" style={{ textDecoration: 'none' }}>Create Submission</Link> : <Link to="/createsubmission" style={{ textDecoration: 'none' }} />}
          </Menu.Item>

        </>
      )}

      {/* Show these items only for admin role */}
      {userRole === 'admin' && (
        <>

          <Menu.Item key="5" icon={<HomeOutlined />}>
            {!collapsed ?
              <Link to="/dashboardAdmin" style={{ textDecoration: 'none' }}>My Workbench</Link> :
              <Link to="/dashboardAdmin" style={{ textDecoration: 'none' }} />
            }
          </Menu.Item>
          <Menu.Item key="6" icon={<InfoCircleOutlined />} title={"Account Information"}>
            {!collapsed ? <Link to="/accountdashboard" style={{ textDecoration: 'none' }}>Account Information</Link> : <Link to="/accountdashboard" style={{ textDecoration: 'none' }} />}
          </Menu.Item>
          <Menu.Item key="7" icon={<FileTextOutlined />} title={"Account Details"}>
            {!collapsed ? <Link to="/accountinfo" style={{ textDecoration: 'none' }}>Account Details</Link> : <Link to="/accountinfo" style={{ textDecoration: 'none' }} />}
          </Menu.Item>
          <Menu.Item key="8" icon={<EditFilled />} title={"Create Submission"}>
            {!collapsed ? <Link to="/createsubmission" style={{ textDecoration: 'none' }}>Create Submission</Link> : <Link to="/createsubmission" style={{ textDecoration: 'none' }} />}
          </Menu.Item>

        </>
      )}
    </Menu>
  );
};

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/';

  useEffect(() => {
    // Get the user role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    // If user is on the root path and already logged in as admin, redirect to dashboardAdmin
    if (role === 'admin' && location.pathname === '/dashboard') {
      navigate('/dashboardAdmin');
    }

    // Add custom CSS to fix the submenu overflow issue
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-sidebar-menu .ant-menu-sub.ant-menu-inline {
        background: #2457d3 !important;
        max-width: 100% !important;
        overflow: hidden !important;
      }
      
      .custom-sidebar-menu .ant-menu-submenu-title {
        padding-right: 16px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      
      .custom-sidebar-menu .ant-menu-item {
        padding-right: 16px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      
      .custom-sidebar-menu.ant-menu-inline-collapsed .ant-menu-submenu-title {
        text-align: center !important;
        padding: 0 !important;
        width: 100% !important;
      }
      
      .custom-sidebar-menu .ant-menu-submenu-arrow {
        right: 8px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [location.pathname, navigate]);

  return (
    <Layout>
      {/* {!isLoginPage && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: '#2457d3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden'
          }}
          width={220} // Set a fixed width for the Sider
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ color: "white" }} /> : <MenuFoldOutlined style={{ color: "white" }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '46px',
              width: '50px',
              height: '60px',
            }}
          />
          {!collapsed && <h4 style={{ color: 'white', textAlign: 'center' }}>Intelligent Risk Assessment</h4>}
          <Divider
            variant="dotted"
            style={{
              borderColor: 'black',
              width: '100%',
            }}
          />
          <div className="demo-logo-vertical" />
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <MyMenu collapsed={collapsed} />
          </div>
        </Sider>
      )} */}
      <Layout>
        {!isLoginPage && <HeaderDesign />}
        <Content
          style={{
            margin: '5px 9px',
            padding: 24,
            minHeight: 560,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="createsubmission" element={<Sublob2 />} />
            <Route path="audit-trail" element={<AuditTrail />} />
            <Route path="accountdashboard" element={<AccountDashboard />} />
            <Route path="accountinfo" element={<AccountInfo />} />
            <Route path="documentscreen" element={<DocumentScreen />} />
            <Route path="clearancescreen" element={<ClearanceScreen />} />
            <Route path="searchinsured" element={<SearchInsured />} />
            <Route path="dashboardAdmin" element={<DashboardAdmin />} />
            <Route path="report" element={<Report />} />
          </Routes>


        </Content>
        {!isLoginPage && (
          <PrivateFooter >
          </PrivateFooter>
        )}
      </Layout>
    </Layout>
  );
};


const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;