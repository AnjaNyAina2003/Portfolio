import React from 'react'
import './SkillCard.css'

export default function SkillCard({ title, iconClass, isActive, onClick }) {
  return (
    <div className={`skills-card ${isActive ? "active" : ""}`}
        onClick={() => onClick()}>
            <div className='skill-icon'>
                <i className={iconClass}></i>
            </div>

            <span>{title}</span>
    </div>
  )
}
