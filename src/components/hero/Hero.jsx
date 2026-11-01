import React from 'react'
import './Hero.css'
import { Typewriter } from 'react-simple-typewriter'
import settings from '../../content/settings.json'

export default function Hero() {
  return (
    <section className="hero-container" id='hero'>
        <div className='hero-content'>
            <h2 className='primary-text'>Bienvenue, je suis {settings.nom}</h2>
            <p>
                <Typewriter
                    words={settings.phrases}
                    loop={0}
                    cursor={false}
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                />
                <span className='typewriter-cursor'>_</span>
            </p>
        </div>
        
        <div className='hero-img'>
            <div className='hero-img-main'>
                <div className='hero-img-left'>
                    <div className='tech-icon'>
                        <img src='assets/logo/langage/django.svg' alt=''></img>
                    </div>
                    <div className='tech-icon'>
                        <img src='assets/logo/langage/react.svg' className='react' alt=''></img>
                    </div>
                </div>
                <div className='pic-container'>
                    <img src={settings.photo} alt={settings.nom} className='head-pic'></img>
                </div>
            </div>
            <div className='tech-icon-container'>
                <div className='tech-icon'>
                    <img src='assets/logo/langage/html.svg' alt=''></img>
                </div>
                <div className='tech-icon'>
                    <img src='assets/logo/langage/css.svg' alt=''></img>
                </div>
                <div className='tech-icon'>
                    <img src='assets/logo/langage/javascript.svg' alt=''></img>
                </div>
            </div>
        </div>
    </section>
  )
}
