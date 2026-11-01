import React from 'react'
import './SkillsInfoCard.css'

export default function SkillsInfoCard({heading, skills}) {
  return (
    <div className='skills-info-card'>
        <h6>{heading}</h6>
        <div className='skills-info-content'>
            {skills.map((item, index) => (
                <React.Fragment key={`skill_${index}`}>
                    <div className='skill-info'>
                        <img src={item.logo} className='skill-logo'></img>
                        <div>
                            <h4 className='skill-name'>{item.skill}</h4>
                            <p className='skill-level'>{item.level}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}
