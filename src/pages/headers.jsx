import React, { useEffect, useState, useCallback } from 'react';
import Logo from '../assets/icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/LanguageSlice';
import { Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, TextField, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ModalComponent from '../commons/Modal';
import Login from '../components/Login/login';
import '../styles/variables.css';
import '../styles/responsive.css';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        if(isMobile){
          toggleMobileMenu();
        }
        break;
      case 'account':
        navigate('/account');
        if(isMobile){
          toggleMobileMenu();
        }
        break;
      case 'admin':
        navigate('/admin');
        if(isMobile){
          toggleMobileMenu();
        };
        break;
      case 'settings':
        navigate('/settings');
        if(isMobile){
          toggleMobileMenu();
        }
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

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
    setIsScrolled(currentScrollPos > 50);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={isMobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: '85%',
          maxWidth: '320px',
          backgroundColor: 'var(--primary-color)',
          '& .MuiDrawer-paper': {
            borderLeft: 'none',
            boxShadow: 'var(--shadow-lg)',
          }
        }
      }}
    >
      <List sx={{ pt: 2 }}>
        {/* <ListItem sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'var(--text-color)' }} />
                </InputAdornment>
              ),
              sx: {
                color: 'var(--text-color)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                  opacity: 0.5,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                  opacity: 0.8,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                  opacity: 1,
                },
                '& input::placeholder': {
                  color: 'var(--text-color)',
                  opacity: 0.7,
                }
              }
            }}
          />
        </ListItem> */}
        {navLinks.map((link) => (
          <ListItem
            key={link.id}
            button
            onClick={() => handleNavClick(link.id)}
            sx={{
              color: 'var(--text-color)',
              '&:hover': {
                backgroundColor: 'var(--secondary-color)',
                opacity: 0.8,
              },
              transition: 'all var(--transition-speed) ease',
              borderRadius: 'var(--radius-sm)',
              mx: 1,
              mb: 0.5,
              minHeight: '44px',
            }}
          >
            <ListItemText 
              primary={link.label}
              primaryTypographyProps={{
                sx: {
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 500,
                }
              }}
            />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={handlePersonMenuOpen}
          sx={{
            color: 'var(--text-color)',
            '&:hover': {
              backgroundColor: 'var(--secondary-color)',
              opacity: 0.8,
            },
            transition: 'all var(--transition-speed) ease',
            borderRadius: 'var(--radius-sm)',
            mx: 1,
            mb: 0.5,
            minHeight: '44px',
          }}
        >
          <ListItemText 
            primary={t('acc')}
            primaryTypographyProps={{
              sx: {
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
              }
            }}
          />
          <KeyboardArrowDownIcon sx={{ ml: 1 }} />
        </ListItem>
        <ListItem
          button
          onClick={handleMenuOpen}
          sx={{
            color: 'var(--text-color)',
            '&:hover': {
              backgroundColor: 'var(--secondary-color)',
              opacity: 0.8,
            },
            transition: 'all var(--transition-speed) ease',
            borderRadius: 'var(--radius-sm)',
            mx: 1,
            mb: 0.5,
            minHeight: '44px',
          }}
        >
          <ListItemText 
            primary={t('language')}
            primaryTypographyProps={{
              sx: {
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
              }
            }}
          />
          <KeyboardArrowDownIcon sx={{ ml: 1 }} />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <header className={`navbar ${visible ? 'visible' : 'hidden'} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={Logo} alt='Machmiles' className='responsive-logo' />
          </Link>
        </div>

        <div className="header-right">
          {isMobile ? (
            <>
              <IconButton 
                onClick={toggleMobileMenu}
                sx={{ color: 'var(--text-color)' }}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              {renderMobileMenu()}
            </>
          ) : (
            <>
              <nav className="nav-links">
                {navLinks.map((link) => (
                  <div
                    key={link.id}
                    className="nav-link"
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.label}
                  </div>
                ))}
              </nav>
              {isLoggedIn && (
                <PersonIcon
                  className="language-icon"
                  onClick={handlePersonMenuOpen}
                />
              )}
              <LanguageIcon
                className="language-icon"
                onClick={handleMenuOpen}
              />
            </>
          )}
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-color)',
            minWidth: '200px',
            mt: 1,
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--accent-color)',
            '& .MuiMenu-list': {
              padding: '0.5rem',
            },
            maxHeight: '80vh',
            overflowY: 'auto',
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.Code}
            onClick={() => handleLanguageChange(lang.Code)}
            selected={selectedLanguage === lang?.Code}
            sx={{
              borderRadius: 'var(--radius-sm)',
              mb: 0.5,
              color: 'var(--text-color)',
              '&.Mui-selected': {
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--text-color)',
                '&:hover': {
                  backgroundColor: 'var(--secondary-color)',
                  opacity: 1,
                  color: 'var(--text-color)',
                }
              },
              '&:hover': {
                backgroundColor: 'var(--secondary-color)',
                opacity: 0.8,
                color: 'var(--text-color)',
              },
              transition: 'all var(--transition-speed) ease',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              minHeight: '44px',
              '& .MuiListItemText-root': {
                color: 'var(--text-color)',
              },
              '& .MuiListItemText-primary': {
                color: 'var(--text-color)',
              }
            }}
          >
            {lang.Translation}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={personAnchorEl}
        open={Boolean(personAnchorEl)}
        onClose={handlePersonMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-color)',
            minWidth: '200px',
            mt: 1,
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--accent-color)',
            '& .MuiMenu-list': {
              padding: '0.5rem',
            }
          }
        }}
      >
        <MenuItem 
          onClick={() => handleMenuItems('myTrips')}
          sx={{
            borderRadius: 'var(--radius-sm)',
            mb: 0.5,
            color: 'var(--text-color)',
            '&:hover': {
              backgroundColor: 'var(--secondary-color)',
              opacity: 0.8,
              color: 'var(--text-color)',
            },
            transition: 'all 0.2s ease',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            '& .MuiListItemText-root': {
              color: 'var(--text-color)',
            },
            '& .MuiListItemText-primary': {
              color: 'var(--text-color)',
            }
          }}
        >
          {t('myTrips')}
        </MenuItem>
        <MenuItem 
          onClick={() => handleMenuItems('account')}
          sx={{
            borderRadius: 'var(--radius-sm)',
            mb: 0.5,
            color: 'var(--text-color)',
            '&:hover': {
              backgroundColor: 'var(--secondary-color)',
              opacity: 0.8,
              color: 'var(--text-color)',
            },
            transition: 'all 0.2s ease',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            '& .MuiListItemText-root': {
              color: 'var(--text-color)',
            },
            '& .MuiListItemText-primary': {
              color: 'var(--text-color)',
            }
          }}
        >
          {t('acc')}
        </MenuItem>
        {isAdmin && (
          <MenuItem 
            onClick={() => handleMenuItems('admin')}
            sx={{
              borderRadius: 'var(--radius-sm)',
              mb: 0.5,
              color: 'var(--text-color)',
              '&:hover': {
                backgroundColor: 'var(--secondary-color)',
                opacity: 0.8,
                color: 'var(--text-color)',
              },
              transition: 'all 0.2s ease',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              '& .MuiListItemText-root': {
                color: 'var(--text-color)',
              },
              '& .MuiListItemText-primary': {
                color: 'var(--text-color)',
              }
            }}
          >
            {t('admin')}
          </MenuItem>
        )}
        <MenuItem 
          onClick={() => handleMenuItems('settings')}
          sx={{
            borderRadius: 'var(--radius-sm)',
            mb: 0.5,
            color: 'var(--text-color)',
            '&:hover': {
              backgroundColor: 'var(--secondary-color)',
              opacity: 0.8,
              color: 'var(--text-color)',
            },
            transition: 'all 0.2s ease',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            '& .MuiListItemText-root': {
              color: 'var(--text-color)',
            },
            '& .MuiListItemText-primary': {
              color: 'var(--text-color)',
            }
          }}
        >
          {t('settings')}
        </MenuItem>
      </Menu>

      <ModalComponent
        open={isModalOpen}
        handleClose={handleCloseModal}
        hideClose
      >
        <Login handleClose={handleCloseModal} />
      </ModalComponent>
    </header>
  );
};

export default Headers;