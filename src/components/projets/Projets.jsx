import React, { useState } from 'react'
import './Projets.css'
import projetsData from '../../content/projets.json'

const PROJETS = projetsData.projets.map((projet, index) => ({ ...projet, id: index + 1 }));

const CATEGORIES = {
  tous: null,
  'conçus': 'Conçus',
  encours: 'En cours',
};

export default function Projets() {

  const [activeFilter, setActiveFilter] = useState('tous');

  const categorieActive = CATEGORIES[activeFilter];
  const items = categorieActive
    ? PROJETS.filter((projet) => projet.categorie === categorieActive)
    : PROJETS;

  const [toggleState, setToggleState] = useState(0)
  const toggleTab = (index) => {
    setToggleState(index);
  }

  const ouvrir = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <section className="pro-container" id='projets'>
        <h2 className='section-title reveal'>Projets</h2>

        <div className='pro-filters reveal reveal-delay-1'>
          <span className={`pro-item ${activeFilter === 'tous' ? 'active-filter' : ""}`} onClick={() => setActiveFilter("tous")}>Touts</span>
          <span className={`pro-item ${activeFilter === 'conçus' ? 'active-filter' : ""}`} onClick={() => setActiveFilter("conçus")}>Conçus</span>
          <span className={`pro-item ${activeFilter === 'encours' ? 'active-filter' : ""}`}onClick={() => setActiveFilter("encours")}>En cours</span>
        </div>

        <div className='pro-content grid'>
          {items.map((elem) => {
            const{id, titre, image, type, description, technologies, lien_demo, lien_code} = elem;
            return (
              <div className='pro-card-container'>
                <div className='pro-card' key={id}>
                  <div className='pro-thumbnail'>
                    <img src={image} alt={titre} className='pro-img'/>
                    <div className='pro-mask'></div>
                  </div>

                  <span className='pro-type'>{type}</span>
                  <h3 className='pro-title'>{titre}</h3>
                </div>
                <div className='btn-container'>
                  <button className='btn info-btn' onClick={() => toggleTab(id)}>Info</button>
                 {lien_demo && <button className='btn demo-btn' onClick={() => ouvrir(lien_demo)}>Demo</button>}
                  {lien_code && <button className='btn demo-btn' onClick={() => ouvrir(lien_code)}>Code</button>}
                </div>
                <div className={toggleState === id ? "info-modal active-modal" : "info-modal"}
                onClick={() => toggleTab(0)}
                >
                  <div className='info-modal-content' onClick={(e) => e.stopPropagation()}>

                    <div className='info-modal-header'>
                      <i className="fa-solid fa-xmark close" onClick={() => toggleTab(0)}></i>
                      <h3 className='info-title'>{titre}</h3>
                    </div>

                    <div className='info-modal-body'>
                      <p className='info-descri'>{description}</p>
                      <p className='tech-label'>Technologies utilisées</p>
                      <div className='tech-container'>
                        {technologies && technologies.map((tech, index) => (
                          <div key={index} className='tech-use'>
                            <img src={tech.logo} alt={tech.nom} className='tech-logo'/>
                            <p className='tech-nom'>{tech.nom}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </section>
  )
}
