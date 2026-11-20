import { Braces, BrainCircuit, Cloud, Code2, Database, Gauge, Workflow } from 'lucide-react';
import { FolderFloat, GlassIcons, LogoLoop, StrokeText } from '../components/PortfolioEffects';

const skillCategories = [
  { title: 'Core programming', detail: 'Python · Java', skills: ['Python', 'Java'] },
  { title: 'ML / DL frameworks', detail: 'PyTorch · scikit-learn · Machine Learning', skills: ['PyTorch', 'scikit-learn', 'Machine Learning'] },
  { title: 'Data science & analytics', detail: 'Power BI · Looker Studio', skills: ['Power BI', 'Looker Studio'] },
  { title: 'AI / NLP & MLOps', detail: 'Neural Networks · Deep Learning · LLM · AI', skills: ['Neural Networks', 'Deep Learning', 'LLM', 'Artificial Intelligence'] },
  { title: 'Full-stack', detail: 'Django', skills: ['Django'] },
  { title: 'Cloud & database', detail: 'Azure Cloud · SQL', skills: ['Azure Cloud', 'SQL'] },
];

const stack = ['Python', 'Java', 'PyTorch', 'scikit-learn', 'Machine Learning', 'Neural Networks', 'LLM / NLP', 'Django', 'Power BI', 'Looker Studio', 'Azure Cloud', 'SQL'];

export default function Skills() {
  return (
    <section id="skills" className="portfolio-page skills-page" aria-labelledby="skills-title">
      <div className="page-ornament page-ornament--skills" aria-hidden="true" />
      <div className="page-shell">
        <div className="section-heading reveal">
          <div><span className="section-index">03 / CAPABILITIES</span><StrokeText text="MY TOOLKIT" /></div>
          <span className="section-side-note">TOOLS / TECHNOLOGIES / METHODS</span>
        </div>
        <div className="skills-explorer-layout">
          <div className="skills-explorer-copy reveal">
            <span className="eyebrow">A PRACTICAL TOOLKIT</span>
            <h2 id="skills-title">Tools for<br /><span>making things work.</span></h2>
            <p>My skill set spans programming, machine learning, analytics, AI, application development, cloud and databases. Open the skills folder to fan out each category and select a file to inspect its contents.</p>
            <div className="skills-category-row">
              {skillCategories.map((category, index) => {
                const icons = [Code2, BrainCircuit, Gauge, Workflow, Braces, Cloud];
                const Icon = icons[index];
                return <div className="skill-category" key={category.title}><Icon size={18} /><div><strong>{category.title}</strong><span>{category.detail}</span></div></div>;
              })}
            </div>
          </div>
          <div className="skills-folder-column reveal">
            <FolderFloat items={skillCategories} label="Skill library" sublabel="06 CATEGORY FILES" trigger="hover" width={620} height={455} />
          </div>
        </div>
        <div className="skills-grid-heading reveal"><span className="eyebrow">BENTO SKILL INDEX</span><span className="mono-note">MOVE YOUR POINTER TO LIGHT UP EACH TOOL</span></div>
        <GlassIcons />
        <div className="stack-label"><Database size={14} /><span>TECH STACK IN MOTION</span></div>
        <LogoLoop items={stack} />
      </div>
    </section>
  );
}
