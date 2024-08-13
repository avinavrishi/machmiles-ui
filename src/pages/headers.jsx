import React, { useEffect, useState } from 'react';
import Logo from '../assets/icons/logo.svg';
import { Link } from 'react-router-dom';

const Headers = () => {
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
  }, [prevScrollPos, visible]);

  return (
    <div className='navbar' style={{ top: visible ? '0' : '-4.5vw' }}>
      <Link to='/' className='navbar-logo'>
        <img src={Logo} alt='Machmiles' onClick={'/'}/>
      </Link>
      <div className='navbar-links'>
        {['My Trips', 'Services', 'Login/Sign up', '+1 (321) 414 3818'].map((link, index) => (
          <a
            key={index}
            href="https://google.com"
            style={{ marginLeft: index === 0 ? '12vw' : '1vw', textDecoration: 'none', fontWeight: 600, color: 'white' }}
            className='linkstyle'
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Headers;
