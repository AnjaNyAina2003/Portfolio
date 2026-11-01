import React from 'react'
import about from '../../content/about.json'

export default function Info() {
  return (
    <div className='about-info grid'>
        {about.cartes.map((carte, index) => (
            <div className='about-box' key={`${carte.titre}-${index}`}>
                <i className={carte.icone} style={{fontSize: "1.2rem"}}></i>
                <h3 className='about-title'>{carte.titre}</h3>
                <span className='about-subtitle'>{carte.valeur}</span>
            </div>
        ))}
    </div>
  )
}
