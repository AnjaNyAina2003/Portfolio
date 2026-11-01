import React from 'react'
import './App.css'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Skills from './components/skills/Skills'
import Exp from './components/exp/Exp'
import Projets from './components/projets/Projets'
import Contact from './components/contacts/Contact'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import useScrollReveal from './utils/useScrollReveal'
import { Route, Routes } from 'react-router-dom'
import NotFound from './components/Error/NotFound'

export default function App() {
  useScrollReveal();
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <div className='container'>
              <Hero />
              <About />
              <Skills />
              <Exp />
              <Projets />
              <Contact />
              <Footer />
            </div>
          </>
        }/>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}
