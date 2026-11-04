import React, { useState, useEffect } from 'react'
import './Navbar.css'
import MobileNav from './mobileNav/MobileNav';
import settings from '../../content/settings.json';

export default function Navbar() {
  const [openMenu, setOpenMenu]= useState(false);
  const [scrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'exp', 'projets', 'contacts'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home', id: 'hero' },
    { href: '#about', label: 'A propos', id: 'about' },
    { href: '#skills', label: 'Compétences', id: 'skills' },
    { href: '#exp', label: 'Experiences', id: 'exp' },
    { href: '#projets', label: 'Projets', id: 'projets' },
    { href: '#contacts', label: 'Contacts', id: 'contacts' },
  ];

  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu}/>
      <nav className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className='nav-content'>
          <img className='logo' src={settings.logo} alt=''/>

          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={`menu-item ${activeSection === link.id ? 'active-link' : ''}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button className='menu-btn' onClick={toggleMenu}>
              {openMenu ? <i className='fa-solid fa-xmark' style={{fontSize: "1.8rem"}}></i> : <i className='fa-solid fa-bars' style={{fontSize: "1.8rem"}}></i>}
          </button>
        </div>
      </nav>
    </>
  )
}
