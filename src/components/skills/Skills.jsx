import React, {useState} from 'react'
import './Skills.css'
import skillsData from '../../content/skills.json'
import SkillCard from './skillCard/SkillCard'
import SkillsInfoCard from './skillsInfoCard/SkillsInfoCard'

const SKILLS = skillsData.categories.map((cat) => ({
  title: cat.titre,
  icon: cat.icone,
  skills: (cat.competences || []).map((c) => ({
    logo: c.logo,
    skill: c.nom,
    level: c.niveau,
  })),
}));

export default function Skills() {

  const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);
  
  const handleSelectedSkill = (data) => {
    setSelectedSkill(data);
  };

  return (
    <section className="skills-container" id='skills'>
      <h2 className='skill-title section-title reveal'>Compétences</h2>

      <div className='skills-content'>
        <div className='skills'>
          {SKILLS.map((item, index) => (
            <div key={item.title} className={`reveal reveal-delay-${Math.min(index + 1, 5)}`}>
              <SkillCard 
                iconClass={item.icon}
                title={item.title}
                isActive={selectedSkill.title === item.title}
                onClick={() => {
                  handleSelectedSkill(item)
                }}
              />
            </div>
          ))}
        </div>
        <div className='skills-info'>
          <SkillsInfoCard
            heading = {selectedSkill.title}
            skills = {selectedSkill.skills}
          />
        </div>
      </div>
    </section>
  )
}
