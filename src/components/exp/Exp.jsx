import React from 'react'
import './Exp.css'
import experiences from '../../content/experiences.json'

const ICONES = {
  formation: 'fa-solid fa-graduation-cap',
  pro: 'fa-solid fa-briefcase',
}

export default function Exp() {
  const { parcours } = experiences

  return (
    <section className="exp-container" id='exp'>
        <h2 className='section-title reveal'>Experiences</h2>
        <span className='section-subtitle reveal reveal-delay-1'>Parcours</span>
        <div className='exp-content'>
            <div className='exp-sections'>
                <div className='qualification-content reveal'>
                    {parcours.map((etape, index) => {
                        const aGauche = index % 2 === 0;
                        const estDernier = index === parcours.length - 1;

                        const details = (
                            <div>
                                <h3 className='exp-title'>{etape.titre}</h3>
                                <span className='exp-subtitle'>{etape.lieu}</span>
                                <div className='exp-calendar'>
                                    <i className="fa-solid fa-calendar-days"></i> {etape.periode}
                                </div>
                            </div>
                        );

                        const timeline = (
                            <div className='timeline'>
                                <i className={ICONES[etape.type] || ICONES.formation}></i>
                                {!estDernier && <span className='exp-line'></span>}
                            </div>
                        );

                        return (
                            <div
                                className='exp-data'
                                key={`${etape.titre}-${index}`}
                                style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
                            >
                                {aGauche ? (
                                    <>
                                        {details}
                                        {timeline}
                                    </>
                                ) : (
                                    <>
                                        <div></div>
                                        {timeline}
                                        {details}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </section>
  )
}
