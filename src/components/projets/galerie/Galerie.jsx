import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Galerie.css'

const DUREE_FERMETURE = 300; 

export default function Galerie({ titre, captures, onClose }) {
  const total = captures.length;
  const [index, setIndex] = useState(0);
  const [enFermeture, setEnFermeture] = useState(false);
  const debutToucher = useRef(null);
  const minuteur = useRef(null);

  const aPrecedente = index > 0;
  const aSuivante = index < total - 1;

  const precedente = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const suivante = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);

  const fermer = useCallback(() => {
    if (minuteur.current) return;
    setEnFermeture(true);
    minuteur.current = setTimeout(onClose, DUREE_FERMETURE);
  }, [onClose]);

  useEffect(() => () => clearTimeout(minuteur.current), []);

  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'Escape') fermer();
      else if (e.key === 'ArrowLeft' && total > 1) precedente();
      else if (e.key === 'ArrowRight' && total > 1) suivante();
    };
    document.addEventListener('keydown', surTouche);
    const debordementInitial = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', surTouche);
      document.body.style.overflow = debordementInitial;
    };
  }, [fermer, precedente, suivante, total]);

  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      if (i < 0 || i >= total) return;
      const img = new Image();
      img.src = captures[i].image;
    });
  }, [index, captures, total]);

  const surDebutToucher = (e) => {
    debutToucher.current = e.touches[0].clientX;
  };
  const surFinToucher = (e) => {
    if (debutToucher.current === null) return;
    const ecart = e.changedTouches[0].clientX - debutToucher.current;
    debutToucher.current = null;
    if (Math.abs(ecart) > 50) {
      if (ecart > 0) precedente();
      else suivante();
    }
  };

  const capture = captures[index];

  return createPortal(
    <div
      className={enFermeture ? 'galerie-overlay galerie-ferme' : 'galerie-overlay'}
      onClick={fermer}
      role='dialog'
      aria-modal='true'
      aria-label={`Captures d'écran : ${titre}`}
    >
      <div className='galerie-contenu' onClick={(e) => e.stopPropagation()}>

        <div className='galerie-entete'>
          <h3 className='galerie-titre'>{titre}</h3>
          <button type='button' className='galerie-fermer' onClick={fermer} aria-label='Fermer la galerie'>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>

        <div className='galerie-scene' onClick={(e) => {if(e.target === e.currentTarget) fermer()}} onTouchStart={surDebutToucher} onTouchEnd={surFinToucher}>
          {aPrecedente && (
            <button type='button' className='galerie-fleche galerie-precedente' onClick={precedente} aria-label='Capture précédente'>
              <i className='fa-solid fa-chevron-left'></i>
            </button>
          )}

          <img
            key={index}
            className='galerie-image'
            src={capture.image}
            alt={capture.legende || `${titre} - capture ${index + 1}`}
          />

          {aSuivante && (
            <button type='button' className='galerie-fleche galerie-suivante' onClick={suivante} aria-label='Capture suivante'>
              <i className='fa-solid fa-chevron-right'></i>
            </button>
          )}
        </div>

        <div className='galerie-pied'>
          {capture.legende && <p className='galerie-legende'>{capture.legende}</p>}
          {total > 1 && <span className='galerie-compteur'>{index + 1} / {total}</span>}
        </div>

      </div>
    </div>,
    document.body
  );
}
