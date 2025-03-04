import React, { useEffect, useState } from 'react';
import Logo from '../assets/icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/LanguageSlice';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ModalComponent from '../commons/Modal';
import Login from '../components/Login/login';

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { t } = useTranslation();
  const languages = useSelector((state) => state.language.languages)
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const isLoggedIn = useSelector((state) => !!state.user.accessToken)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [personAnchorEl, setPersonAnchorEl] = useState(null);

  // Open Person Menu
  const handlePersonMenuOpen = (event) => {
    setPersonAnchorEl(event.currentTarget);
  };

  const handlePersonMenuClose = () => {
    setPersonAnchorEl(null);
  };

  const navLinks = [
    { id: "flight", label: t("flight"), url: "https://google.com" },
    { id: "hotel", label: t("hotel"), url: "https://google.com" },
    { id: "cars", label: t("cars"), url: "https://google.com" },
    { id: "services", label: t("services"), url: "https://google.com" },
    { id: "contact", label: t("contact"), url: "https://google.com" }
  ].concat(
    !isLoggedIn ? [
      { id: "login", label: t("login"), url: "https://google.com" }
    ] : []
  )


  const handleNavClick = (link) => {
    switch (link) {
      case "login":
        console.log("Login Clicked");
        setIsModalOpen(!isModalOpen)
        break;
      case "contact":
        console.log("Contact Clicked");
        break;
      case "flight":
        navigate('/');
        break;
      case "hotel":
        console.log("Hotels Clicked");
        break;
      case "cars":
        console.log("Cars Clicked");
        break;
      default:
        console.log("Something is wrong")
    }
  }

  const handleCloseModal = () => setIsModalOpen(false)

  const handleMenuItems = (key) => {
    switch (key) {
      case 'myTrips':
        navigate('/myTrips');
        handlePersonMenuClose();
        break;
      case 'account':
        navigate('/account');
        handlePersonMenuClose();
        break;
      case 'admin':
        navigate('/admin');
        handlePersonMenuClose();
        break;
      case 'settings':
        navigate('/settings');
        handlePersonMenuClose();
        break;
      default:
        navigate('/');
        break;
    }
  }


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
              cursor: 'pointer'
            }}
            className="linkstyle"
            onClick={() => handleNavClick(link.id)}
          >
            {link.label}
          </div>
        ))}
        {
          isLoggedIn &&
          <PersonIcon
            sx={{ margin: '0rem 1rem 0 1rem' }}
            className="language-icon"
            onClick={handlePersonMenuOpen}
          />
        }
        <LanguageIcon sx={{ marginTop: '0.05rem' }} className="language-icon" onClick={handleMenuOpen} />
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
              maxWidth: '40vw',
              minWidth: '17vw',
              marginTop: '1rem',
            },
          }}
        >
          <div style={{
            maxHeight: '40vh',
            overflowY: 'auto',
            // background: '#0e367e',
            scrollbarWidth: 'none', // Firefox custom scrollbar
            // scrollbarColor: '#0e367e #0e367e', // Thumb and track color
          }}>
            <style>
              {`
        /* WebKit (Chrome, Safari, Edge) Custom Scrollbar */
        div::-webkit-scrollbar {
          width: 6px; /* Thin scrollbar */
        }

        div::-webkit-scrollbar-track {
          background: #0e367e; /* Light grey background */
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: #0e367e; /* Dark grey thumb */
          border-radius: 10px; /* Rounded edges */
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #ffff; /* Darker on hover */
        }
      `}
            </style>
            {languages.map((lang) => (
              <MenuItem
                key={lang.Code}
                onClick={() => handleLanguageChange(lang.Code)}
                selected={lang.Code === selectedLanguage}
                sx={{
                  padding: '1rem',
                  width: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ fontFamily: 'Poppins', color: 'black', fontWeight: 600, fontSize: '0.85rem' }}>
                  {lang.Translation}
                </Typography>
              </MenuItem>
            ))}
          </div>
        </Menu>

        <Menu
          anchorEl={personAnchorEl}
          open={Boolean(personAnchorEl)}
          onClose={handlePersonMenuClose}
          PaperProps={{
            style: {
              maxHeight: '30vh',
              overflowY: 'auto',
              zIndex: 1300,
              borderRadius: '10px',
              maxWidth: '20vw',
              minWidth: '15vw',
              marginTop: '1rem',
            },
          }}
        >
          <MenuItem onClick={() => handleMenuItems('myTrips')}>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem' }}>{t("myTrips")}</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItems('account')}>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem' }}>{t("acc")}</Typography>
          </MenuItem>
          {
            isAdmin || isAdmin === 1 && <MenuItem onClick={() => handleMenuItems('admin')}>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem' }}>{t("admin")}</Typography>
            </MenuItem>
          }

          <MenuItem onClick={() => handleMenuItems('settings')}>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem' }}>{t("settings")}</Typography>
          </MenuItem>
        </Menu>

      </div>
      <ModalComponent
        open={isModalOpen}
        handleClose={handleCloseModal}
        hideClose={true}
      >
        <Login handleClose={handleCloseModal} />
      </ModalComponent>
    </div>
  );
};

export default Headers;