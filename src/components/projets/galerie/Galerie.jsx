import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Galerie.css'

export default function Galerie({ titre, captures, onClose }) {
  const total = captures.length;
  const [index, setIndex] = useState(0);
  const debutToucher = useRef(null);

  const precedente = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const suivante = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'Escape') onClose();
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
  }, [onClose, precedente, suivante, total]);

  useEffect(() => {
    if (total < 2) return;
    [index + 1, index - 1].forEach((i) => {
      const img = new Image();
      img.src = captures[(i + total) % total].image;
    });
  }, [index, captures, total]);

  const surDebutToucher = (e) => {
    debutToucher.current = e.touches[0].clientX;
  };
  const surFinToucher = (e) => {
    if (debutToucher.current === null || total < 2) return;
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
      className='galerie-overlay'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={`Captures d'écran : ${titre}`}
    >
      <div className='galerie-contenu' onClick={(e) => e.stopPropagation()}>

        <div className='galerie-entete'>
          <h3 className='galerie-titre'>{titre}</h3>
          <button type='button' className='galerie-fermer' onClick={onClose} aria-label='Fermer la galerie'>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>

        <div className='galerie-scene' onTouchStart={surDebutToucher} onTouchEnd={surFinToucher}>
          {total > 1 && (
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

          {total > 1 && (
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
