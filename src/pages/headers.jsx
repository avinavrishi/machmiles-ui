import React, { useEffect, useState } from 'react';
import Logo from '../assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/LanguageSlice';
import { Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ModalComponent from '../commons/Modal';
import Login from '../components/Login/login';

const Headers = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const languages = useSelector((state) => state.language.languages)
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { id: "myTrips", label: t("myTrips"), url: "https://google.com" },
    { id: "services", label: t("services"), url: "https://google.com" },
    { id: "contact", label: t("contact"), url: "https://google.com" },
    { id: "login", label: t("login"), url: "https://google.com" }
  ]


  const handleNavClick = (link) => {
    switch (link) {
      case "login":
        console.log("Login Clicked");
        setIsModalOpen(!isModalOpen)
        break;
      case "contact":
        console.log("Contact Clicked");
        break;
      case "myTrips":
        console.log("My trips Clicked");
        break;
      case "services":
        console.log("Services Clicked");
        break;
      default:
        console.log("Something is wrong")
    }
  }

  const handleCloseModal = () =>setIsModalOpen(false)


  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);

    // console.log("Selected Language from Redux:", selectedLanguage);
    console.log("Current Language in i18n:", i18n.language);
    console.log("Loaded Translations:", i18n.options.resources);
  }, [selectedLanguage]);

  // console.log("🌍 Translated myTrips:", t('myTrips'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLanguageChange = (code) => {
    const normalizedCode = code.toLowerCase(); // Normalize to match i18n keys
    dispatch(setLanguage(normalizedCode));
    i18n.changeLanguage(normalizedCode);
    handleMenuClose();
  };

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [prevScrollPos, visible]);

  // console.log("✅ i18n Test (myTrips):", i18n.t('myTrips'));

  return (
    <div className='navbar' style={{ top: visible ? '0' : '-4.5vw' }}>
      <Link to='/' className='navbar-logo'>
        <img src={Logo} alt='Machmiles' onClick={'/'} className='responsive-logo' />
      </Link>
      <div className='navbar-links'>
        {navLinks.map((link, index) => (
          <div
            key={link.id}
            style={{
              marginLeft: index === 0 ? "12vw" : "1vw",
              textDecoration: "none",
              fontWeight: 600,
              color: "white",
              cursor:'pointer'
            }}
            className="linkstyle"
            onClick={() => handleNavClick(link.id)}
          >
            {link.label}
          </div>
        ))}
        <LanguageIcon className="language-icon" onClick={handleMenuOpen} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            disablePadding: true,
          }}
          PaperProps={{
            style: {
              maxHeight: '40vh', // Set a reasonable height for the menu
              overflowY: 'auto', // Enables scrolling when needed
              zIndex: 1300,
              borderRadius: '10px', // Soft edges
            },
          }}
        >
          <div style={{
            maxHeight: '40vh',
            overflowY: 'auto',
            scrollbarWidth: 'thin', // Firefox custom scrollbar
            scrollbarColor: '#888 #f1f1f1', // Thumb and track color
          }}>
            <style>
              {`
        /* WebKit (Chrome, Safari, Edge) Custom Scrollbar */
        div::-webkit-scrollbar {
          width: 6px; /* Thin scrollbar */
        }

        div::-webkit-scrollbar-track {
          background: #f1f1f1; /* Light grey background */
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: #888; /* Dark grey thumb */
          border-radius: 10px; /* Rounded edges */
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #555; /* Darker on hover */
        }
      `}
            </style>
            {languages.map((lang) => (
              <MenuItem
                key={lang.Code}
                onClick={() => handleLanguageChange(lang.Code)}
                selected={lang.Code === selectedLanguage}
              >
                {lang.Translation}
              </MenuItem>
            ))}
          </div>
        </Menu>

      </div>
      <ModalComponent 
        open={isModalOpen} 
        handleClose = {handleCloseModal}
        hideClose={true}
      >
        <Login handleClose={handleCloseModal}/>
      </ModalComponent>
    </div>
  );
};

export default Headers;