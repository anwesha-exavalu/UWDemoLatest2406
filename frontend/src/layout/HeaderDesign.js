import React, { useState, useEffect, Children } from "react";
import {
  Avatar,
  Button,
  Grid,
  Menu,
  Popover,
  Space,
  theme,
  Typography,
  Badge,
  Card,
  Modal,
  Radio,
  Dropdown
} from "antd";
import {
  MenuOutlined,
  CloseCircleOutlined,
  DownOutlined
} from "@ant-design/icons";
import SearchIcon from "../../src/assets/img/search-icon.png";
import SearchIconDark from "../../src/assets/img/share.png";
import ProfileIcon from "../assets/img/profile_img.png";
import novoLogo from '../assets/img/exavalu.png';
import {
  NavbarHeader,
  Container,
  UserNameStyle,
  AccountManagementButtonStyle,
  CloseButtonStyle,
  AvatarStyle,
  LanguageDropdownItem,
  LanguageSelector,
  FlagIcon,
  LanguageText,
  UserProfileContainer

} from "../styles/components/Navbar";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../assets/svg/home";

import {
  NotificationAlertStyle,
  NotificationStyle,
} from "../styles/components/Navbar";
import useMetaData from "../context/metaData";
import { BellFilled } from "@ant-design/icons";

import notificationImage from '../assets/img/notification_popup.png';
import redirect from '../assets/img/share.png';
import USFlag from "../assets/svg/flag.svg";

const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;



export default function PrivateNavbar() {
  const { theme } = useMetaData();
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(ProfileIcon);
  const [popOverOpen, setPopOverOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const notifications = 1;

  useEffect(() => {
    setUserImage(ProfileIcon);
  }, []);
  const redirectURL = () => {
    handlePopoverClose();
    navigate("/account-settings");
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const handlePopoverClose = () => {
    setPopOverOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setPopOverOpen(newOpen);
  };

  const onThemeChange = () => {
    setIsModalOpen(true);
  }

  const languages = [
    { code: 'en', name: 'Eng (US)', flag: USFlag },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    // Here you can add your language change logic
    console.log('Language changed to:', languageCode);
  };

  const languageMenuItems = languages.map(lang => ({
    key: lang.code,
    label: (
      <LanguageDropdownItem onClick={() => handleLanguageChange(lang.code)}>
        <span>{lang.flag}</span>
        <span>{lang.name}</span>
      </LanguageDropdownItem>
    ),
  }));

  const content = (

    <div className="user-profile-Modal">

      <div className="profile-iamge">
        <CloseButtonStyle theme={theme}>
          <Button icon={<CloseCircleOutlined />} onClick={handlePopoverClose} />
        </CloseButtonStyle>
        {userImage.length > 0 ? (
          <span className="usericon">
            {" "}
            <img src={userImage} />
          </span>
        ) : (
          <AvatarStyle>
            <Avatar size={90}>MD</Avatar>
          </AvatarStyle>
        )}
      </div>
      <UserNameStyle theme={theme}>
        <Typography.Title level={4}>Michael Doe</Typography.Title>
      </UserNameStyle>
      <AccountManagementButtonStyle theme={theme}>
        <Button shape="round" onClick={redirectURL}>
          <Text>Manage your Account</Text>
        </Button>
      </AccountManagementButtonStyle>

    </div>
  );

  const handleRedirection = () => {
    navigate('/notificationDetails')
    setOpen(false)
  }

  const handleNotificationOpen = (newOpen) => {
    setOpen(newOpen)
  }

  const notificationContent = (

    <div>
      <img className="image" src={notificationImage}></img>
      <p className={`${theme === 'dark' ? 'sigin-title-dark' : 'sigin-title'}`}>Tasks/Notifications <a onClick={() => handleRedirection()}><img src={redirect} /></a></p>
      <Card className="notification-card">

      </Card>
    </div>
  )

  const menuItems = [
    {
      key: "home",
      icon: <HomeIcon />,
    },
    {
      label: "Product",
      key: "dashboard",
      children: [
        {
          label: "Commercial Property",
          key: "commercialProperty",
        }
      ]
    },
    {
      label: "Programs",
      key: "SubMenu",
      children: [
        {
          label: "Vacant Buildings",
          key: "vacantBuildings",
        },

      ],
    },

  ];

  const [current, setCurrent] = useState("projects");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    if (e.key == 'dashboard' || e.key == 'home') {
      navigate('/');
    } else if (e.key == 'commercialProperty') {
      navigate('/commercialProperty');
    }
    else if (e.key == 'vacantBuildings') {
      navigate('/vacantBuildings');
    } else if (e.key == 'flood') {
      navigate('/flood');
    } else if (e.key == 'documents') {
      navigate('/uploadDocuments');
    } else if (e.key == 'searchpolicy') {
      navigate('/search-policy')
    } else if (e.key == 'reportingAnalytics') {
      navigate('/reporting-analytics')
    } else if (e.key == 'customer') {
      navigate('/customer-details')
    } else if (e.key == 'claim') {
      navigate('/search-claim')
    } else if (e.key == 'commissions') {
      navigate('/commissions')
    } else if (e.key == 'admin') {
      navigate('/admin')
    } else if (e.key == 'homeowners') {
      navigate('/home-owners')
    } else if (e.key == 'cyber') {
      navigate('/upload-file')
    } else if (e.key == 'automaticquote') {
      navigate('/automatic-quote');
    } else if (e.key == 'bulkquote') {
      navigate('/bulk-quote');
    }
  };

  const styles = {
    headercard: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: token.screenXL,
      // padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      marginLeft: screens.md ? "0px" : `-${token.size}px`,
      width: screens.lg ? "inherit" : token.sizeXXL,
    },
    menuContainer: {
      alignItems: "center",
      display: "flex",
      gap: token.size,
      width: "100%",
    },
  };

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem('theme', selectedMode);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setSelectedMode(e.target.value);
  };

  return (
    <NavbarHeader theme={theme}>
      <Container>
        <nav>
          <div style={styles.headercard}>
            <div style={styles.menuContainer}>
              <a href="#">
               <img src={novoLogo} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />


              </a>
              <Menu
                style={styles.menu}
                mode="horizontal"
                items={menuItems}
                onClick={onClick}
                selectedKeys={screens.md ? [current] : ""}
                overflowedIndicator={
                  <Button color="#fff" type="text" icon={<MenuOutlined style={{ color: theme == 'dark' ? "#fff" : "#000" }} />}></Button>
                }
              />
            </div>
            <Space size="large" align="center">
              <Dropdown
                menu={{ items: languageMenuItems }}
                trigger={['click']}
                placement="bottomRight"
              >
                <LanguageSelector>
                  <FlagIcon src={currentLanguage?.flag} alt={currentLanguage?.code} />
                  <LanguageText>Eng&nbsp;(US)</LanguageText>
                  <DownOutlined style={{ fontSize: '12px', color: '#bbb', marginLeft: 4 }} />
                </LanguageSelector>
              </Dropdown>





              <Popover
                onOpenChange={handleNotificationOpen}
                open={open}
                placement="bottom"
                content={notificationContent}
                trigger="click"
                overlayStyle={{
                  height: 150,
                  maxWidth: 450,
                  padding: 0,
                }}
                overlayClassName={theme === 'dark' ? 'custom-pophover-dark-notification' : ''}
              >
                {
                  notifications == 0 ? (
                    <NotificationStyle>
                      <Button shape="circle" icon={<BellFilled />} />
                    </NotificationStyle>
                  ) : <>

                    <NotificationAlertStyle>
                      <Badge count={notifications} size="small" offset={[-6, 7]}>
                        <Button shape="circle" icon={<BellFilled />} />
                      </Badge>
                    </NotificationAlertStyle>
                  </>
                }
              </Popover>
              <Popover
                theme={theme}
                onOpenChange={handleOpenChange}
                open={popOverOpen}
                placement="bottom"
                content={content}
                trigger="click"
                overlayClassName={theme === 'dark' ? 'custom-pophover-dark' : 'custom-pophover'}
              >
                <UserProfileContainer>
                  <img src={userImage} alt="avatar" className="avatar" />
                  <div className="user-info">
                    <span className="user-name">Haydenson</span>
                    <span className="user-role">Admin</span>
                  </div>
                  <DownOutlined className="dropdown-icon" />
                </UserProfileContainer>
              </Popover>

            </Space>
          </div>
        </nav>
      </Container>
      <Modal
        title="Dark mode"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Radio.Group onChange={handleChange} value={selectedMode}>
          <Radio.Button value="light">
            <span role="img" aria-label="Light">
              ☀️
            </span>{" "}
            Light
          </Radio.Button>
          <Radio.Button value="dark">
            <span role="img" aria-label="Dark">
              🌙
            </span>{" "}
            Dark
          </Radio.Button>
        </Radio.Group>
      </Modal>
    </NavbarHeader>
  );
}