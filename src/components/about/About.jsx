import React, { useState } from 'react'
import './About.css'
import Info from './Info'
import about from '../../content/about.json'
import settings from '../../content/settings.json'

export default function About() {
    const [choixCV, setChoixCV] = useState(0);

    const fileName = about.cv[choixCV]?.fichier;

    const [toogleState, setToogleState] = useState(0)
    const toogleModal = (index) => {
        setToogleState(index);
      }
  return (
    <section className="about-container" id='about'>
        <h2 className='section-title reveal'>A propos</h2>
        <span className='section-subtitle reveal reveal-delay-1'>Présentation</span>
        <div className='about-content grid'>
            <img src={settings.photo} alt={settings.nom} className='about-pic reveal-left reveal-delay-1'></img>
            <div className='about-data reveal-right reveal-delay-2'>
                <Info />
                <div className='bio-descri'>
                    {about.bio.map((paragraphe, index) => (
                        <p key={index}>{paragraphe}</p>
                    ))}
                </div>
                {about.cv.length > 0 && (
                    <>
                        <button className='button' onClick={() => toogleModal(1)}>
                            Télécharger mon CV <i className='fa-regular fa-file-lines' style={{fontSize: "1.2rem"}}></i>
                        </button>
                        <div className={toogleState === 1 ? "choice-modal active-modal" : "choice-modal"}>
                            <div className='choice-modal-content'>
                                <i className="fa-solid fa-xmark close-down" onClick={() => toogleModal(0)}></i>
                                <p>Veuillez choisir le type de CV :</p>
                                {about.cv.map((item, index) => (
                                    <div className='input-radio-container' key={`${item.label}-${index}`}>
                                        <label className='input-radio'>
                                            <input type="radio" name='cv' value={index} checked={choixCV === index} onChange={() => setChoixCV(index)}/>
                                            {item.label}
                                        </label>
                                    </div>
                                ))}
                                <a download="" href={fileName} className='button-down'>Télécharger <i className="fa-solid fa-download"></i></a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </section>
  )
}
