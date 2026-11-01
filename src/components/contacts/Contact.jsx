import React, { useRef } from 'react'
import emailjs from "@emailjs/browser"

import './Contact.css'
import toast from 'react-hot-toast';
import { useFadeUp } from '../../hooks/useFadeUp';
import contact from '../../content/contact.json';

const whatsappNumero = (contact.whatsapp || '').replace(/\D/g, '');

export default function Contacts() {
  const { ref, visible } = useFadeUp();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_pgn0d4s",   // Service ID
      "template_gtuythc",  // Template ID
      form.current,
      "r4FRY-BQXTnxHuRWo"   // Public Key
    )
    .then(
      (result) => {
        console.log("Message envoyé !", result.text);
        toast.success("Message envoyé avec succès!");
        form.current.reset();
      },
      (error) => {
        console.error("Erreur :", error.text);
        toast.error("Une erreur est survenue");
      }
    );
  };

  return (
    <section ref={ref} className={`contact-container fade-up ${visible ? 'visible' : ''}`} id='contacts'>
        <h2 className='title-contact section-title reveal'>Contacts</h2>
        <div className='contact-section container grid'>
          <div className='contact-content_info'>
            <div className='contact-info'>
              <div className='contact-card'>
                <i className="fa-solid fa-envelope"></i>
                <h3 className='card-title'>Email</h3>
                <span className='card-data'>{contact.email}</span>
                <a href={`mail_vers:${contact.email}`} className='contact-btn'>Me contacter<i className="fa-solid fa-arrow-right-long"></i></a>
              </div>

              <div className='contact-card'>
                <i className="fa-brands fa-whatsapp"></i>
                <h3 className='card-title'>Whatsapp</h3>
                <span className='card-data'>{contact.whatsapp}</span>
                <a href={`https://wa.me/${whatsappNumero}`} target='_blank' rel='noopener noreferrer' className='contact-btn'>Me contacter<i className="fa-solid fa-arrow-right-long"></i></a>
              </div>
            </div>
          </div>
          <div className='contact-content'>
            <h3 className='contact-title'>Ecrivez-moi votre projet</h3>
            <form ref={form} onSubmit={sendEmail} className='contact-form'>
              <div className='contact-div'>
                <label className='contact-tag'>Nom</label>
                <input type='text' name='name' className='contact-form_input' placeholder='Inserer votre nom' required/>
              </div>

              <div className='contact-div'>
                <label className='contact-tag'>Email</label>
                <input type='email' name='email' className='contact-form_input' placeholder='Inserer votre email' autoComplete='off' required/>
              </div>

              <div className='contact-div contact contact-form_area'>
                <label className='contact-tag'>Projet</label>
                <textarea name='projet' cols='30' rows='10' className='contact-form_input' placeholder='Ecrivez votre projet' required></textarea>
              </div>

              <button type='submit' className='button'>Envoyer le message <i className="fa-solid fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
    </section>
  )
}
