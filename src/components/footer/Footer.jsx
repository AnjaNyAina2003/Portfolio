import React from 'react'
import './Footer.css'
import settings from '../../content/settings.json'
import contact from '../../content/contact.json'

const RESEAUX = [
  { url: contact.facebook, icone: 'fa-brands fa-facebook-f', classe: 'social-link-f', nom: 'Facebook' },
  { url: contact.linkedin, icone: 'fa-brands fa-linkedin-in', classe: 'social-link-f', nom: 'LinkedIn' },
  { url: contact.github, icone: 'fa-brands fa-github', classe: 'social-link', nom: 'GitHub' },
].filter((reseau) => reseau.url);

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container container'>
        <img className='footer-logo' src={settings.logo} alt=''/>
        {RESEAUX.length > 0 && (
          <div className='footer-social'>
            {RESEAUX.map((reseau) => (
              <a key={reseau.nom} href={reseau.url} className={reseau.classe} target='_blank' rel='noopener noreferrer' aria-label={reseau.nom}>
                <i className={reseau.icone}></i>
              </a>
            ))}
          </div>
        )}
        <span className='footer-copy'>&copy; {settings.annee} - {settings.nom_complet}</span>
      </div>
    </footer>
  )
}
