import React from 'react'
import './MobileNav.css'

export default function MobileNav({isOpen, toggleMenu}) {
  return (
    <>
        <div className={`mobile-menu ${isOpen ? "active":""}`}
            onClick={toggleMenu}>
            <div className='mobile-menu-container'>
              <img className='logoMobile' src='./assets/images/logo.png' alt=''/>
              
              <ul>
                <li><a href='#hero' className='menu-item' onClick={toggleMenu}>Home</a></li>
                <li><a href='#about' className='menu-item' onClick={toggleMenu}>A propos</a></li>
                <li><a href='#skills' className='menu-item' onClick={toggleMenu}>Skills</a></li>
                <li><a href='#exp' className='menu-item' onClick={toggleMenu}>Experiences</a></li>
                <li><a href='#projets' className='menu-item' onClick={toggleMenu}>Projets</a></li>
                <li><a href='#contacts' className='menu-item' onClick={toggleMenu}>Contacts</a></li>
              </ul>
            </div>
        </div>
    </>
  )
}
