import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../store/LanguageSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import { Platform } from 'react-native';

// Platform-specific imports
const platformSpecific = {
  web: {
    Link: require('react-router-dom').Link,
    Menu: require('@mui/material').Menu,
    MenuItem: require('@mui/material').MenuItem,
    Typography: require('@mui/material').Typography,
    IconButton: require('@mui/material').IconButton,
    Drawer: require('@mui/material').Drawer,
    List: require('@mui/material').List,
    ListItem: require('@mui/material').ListItem,
    ListItemText: require('@mui/material').ListItemText,
    LanguageIcon: require('@mui/icons-material/Language'),
    PersonIcon: require('@mui/icons-material/Person'),
    MenuIcon: require('@mui/icons-material/Menu'),
    CloseIcon: require('@mui/icons-material/Close'),
  },
  native: {
    Link: require('react-native').TouchableOpacity,
    Menu: require('react-native').Modal,
    MenuItem: require('react-native').TouchableOpacity,
    Typography: require('react-native').Text,
    IconButton: require('react-native').TouchableOpacity,
    Drawer: require('react-native').Modal,
    List: require('react-native').View,
    ListItem: require('react-native').TouchableOpacity,
    ListItemText: require('react-native').Text,
    LanguageIcon: require('react-native-vector-icons/MaterialIcons'),
    PersonIcon: require('react-native-vector-icons/MaterialIcons'),
    MenuIcon: require('react-native-vector-icons/MaterialIcons'),
    CloseIcon: require('react-native-vector-icons/MaterialIcons'),
  }
};

const {
  Link,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  LanguageIcon,
  PersonIcon,
  MenuIcon,
  CloseIcon,
} = platformSpecific[Platform.OS === 'web' ? 'web' : 'native'];

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const languages = useSelector((state) => state.language.languages);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const isLoggedIn = useSelector((state) => !!state.user.accessToken);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personAnchorEl, setPersonAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(Platform.OS !== 'web' || window.innerWidth <= 768);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const navLinks = [
    { id: "flight", label: t("flight"), url: "/" },
    { id: "hotel", label: t("hotel"), url: "/hotels" },
    { id: "cars", label: t("cars"), url: "/cars" },
    { id: "services", label: t("services"), url: "/services" },
    { id: "contact", label: t("contact"), url: "/contact" }
  ].concat(
    !isLoggedIn ? [
      { id: "login", label: t("login"), url: "#" }
    ] : []
  );

  const handleNavClick = (link) => {
    switch (link) {
      case "login":
        setIsModalOpen(true);
        break;
      case "flight":
        navigate('/');
        break;
      case "hotel":
        navigate('/hotels');
        break;
      case "cars":
        navigate('/cars');
        break;
      case "services":
        navigate('/services');
        break;
      case "contact":
        navigate('/contact');
        break;
      default:
        console.log("Invalid navigation link");
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleMenuItems = (key) => {
    switch (key) {
      case 'myTrips':
        navigate('/myTrips');
        break;
      case 'account':
        navigate('/account');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
    handlePersonMenuClose();
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePersonMenuOpen = (event) => {
    setPersonAnchorEl(event.currentTarget);
  };

  const handlePersonMenuClose = () => {
    setPersonAnchorEl(null);
  };

  const handleLanguageChange = (code) => {
    const normalizedCode = code.toLowerCase();
    dispatch(setLanguage(normalizedCode));
    i18n.changeLanguage(normalizedCode);
    handleMenuClose();
  };

  const [prevScrollPos, setPrevScrollPos] = useState(Platform.OS === 'web' ? window.pageYOffset : 0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    if (Platform.OS === 'web') {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [prevScrollPos, visible]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={isMobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: Platform.OS === 'web' ? {
          width: '80%',
          maxWidth: '300px',
          backgroundColor: 'var(--primary-color)',
        } : undefined
      }}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.id}
            button
            onPress={() => handleNavClick(link.id)}
            style={Platform.OS === 'native' ? {
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.1)',
            } : undefined}
          >
            <ListItemText 
              primary={link.label}
              style={Platform.OS === 'native' ? {
                color: '#ffffff',
                fontSize: 16,
              } : undefined}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <div className='navbar' style={{ 
      top: visible ? '0' : '-4.5vw',
      ...(Platform.OS === 'native' ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#0a2556',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        zIndex: 1000,
      } : {})
    }}>
      <Link to='/' className='navbar-logo'>
        <img 
          src={require('../../assets/icons/logo.svg')} 
          alt='Machmiles' 
          className='responsive-logo'
          style={Platform.OS === 'native' ? {
            width: 120,
            height: 40,
            resizeMode: 'contain',
          } : undefined}
        />
      </Link>
      
      {isMobile ? (
        <>
          <IconButton 
            onPress={toggleMobileMenu}
            style={Platform.OS === 'native' ? {
              padding: 8,
            } : undefined}
          >
            {isMobileMenuOpen ? 
              <CloseIcon color="#ffffff" size={24} /> : 
              <MenuIcon color="#ffffff" size={24} />
            }
          </IconButton>
          {renderMobileMenu()}
        </>
      ) : (
        <div className='navbar-links'>
          {navLinks.map((link) => (
            <div
              key={link.id}
              className="linkstyle"
              onPress={() => handleNavClick(link.id)}
              style={Platform.OS === 'native' ? {
                padding: 10,
                marginHorizontal: 5,
              } : undefined}
            >
              <Typography style={Platform.OS === 'native' ? {
                color: '#ffffff',
                fontSize: 16,
              } : undefined}>
                {link.label}
              </Typography>
            </div>
          ))}
          {isLoggedIn && (
            <PersonIcon
              name="person"
              size={24}
              color="#ffffff"
              onPress={handlePersonMenuOpen}
            />
          )}
          <LanguageIcon
            name="language"
            size={24}
            color="#ffffff"
            onPress={handleMenuOpen}
          />
        </div>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: Platform.OS === 'web' ? {
            maxHeight: '40vh',
            overflowY: 'auto',
            zIndex: 'var(--z-index-dropdown)',
            borderRadius: 'var(--radius-md)',
            maxWidth: '40vw',
            minWidth: '17vw',
            marginTop: 'var(--spacing-sm)',
          } : undefined
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.Code}
            onPress={() => handleLanguageChange(lang.Code)}
            selected={lang.Code === selectedLanguage}
            style={Platform.OS === 'native' ? {
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            } : undefined}
          >
            <Typography style={Platform.OS === 'native' ? {
              fontSize: 16,
              textAlign: 'center',
            } : undefined}>
              {lang.Translation}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={personAnchorEl}
        open={Boolean(personAnchorEl)}
        onClose={handlePersonMenuClose}
        PaperProps={{
          sx: Platform.OS === 'web' ? {
            maxHeight: '30vh',
            overflowY: 'auto',
            zIndex: 'var(--z-index-dropdown)',
            borderRadius: 'var(--radius-md)',
            maxWidth: '20vw',
            minWidth: '15vw',
            marginTop: 'var(--spacing-sm)',
          } : undefined
        }}
      >
        <MenuItem onPress={() => handleMenuItems('myTrips')}>
          <Typography style={Platform.OS === 'native' ? {
            fontSize: 16,
            textAlign: 'center',
          } : undefined}>
            {t("myTrips")}
          </Typography>
        </MenuItem>
        <MenuItem onPress={() => handleMenuItems('account')}>
          <Typography style={Platform.OS === 'native' ? {
            fontSize: 16,
            textAlign: 'center',
          } : undefined}>
            {t("acc")}
          </Typography>
        </MenuItem>
        {isAdmin && (
          <MenuItem onPress={() => handleMenuItems('admin')}>
            <Typography style={Platform.OS === 'native' ? {
              fontSize: 16,
              textAlign: 'center',
            } : undefined}>
              {t("admin")}
            </Typography>
          </MenuItem>
        )}
        <MenuItem onPress={() => handleMenuItems('settings')}>
          <Typography style={Platform.OS === 'native' ? {
            fontSize: 16,
            textAlign: 'center',
          } : undefined}>
            {t("settings")}
          </Typography>
        </MenuItem>
      </Menu>

      {Platform.OS === 'web' && (
        <ModalComponent
          open={isModalOpen}
          handleClose={handleCloseModal}
          hideClose={true}
        >
          <Login handleClose={handleCloseModal} />
        </ModalComponent>
      )}
    </div>
  );
};

export default Headers; 