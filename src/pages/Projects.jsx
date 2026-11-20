import { ArrowUpRight, FolderOpen, Github } from 'lucide-react';
import { Folder, StrokeText } from '../components/PortfolioEffects';

const projectFiles = [
  {
    title: 'CodeChai',
    subtitle: 'Responsive web application · Django backend',
    description: 'Designed and built a web application with a responsive frontend and Django backend. Integrated user authentication and authorization to help keep the application safe and secure.',
    highlights: [
      'Built a responsive frontend connected to a Django backend.',
      'Integrated user authentication and authorization.',
      'Focused on a safe and secure application experience.',
    ],
    tags: ['Django', 'Responsive frontend', 'Authentication', 'Authorization'],
    links: [
      { label: 'GitHub profile', href: 'https://github.com/KesavDeepak', external: true },
    ],
  },
  {
    title: 'JuriAssist',
    subtitle: 'Legal information web application · Integrated chatbot',
    description: 'Designed and built a web application with a responsive frontend and backend, including an integrated chatbot to answer user queries. It identifies the IPC section for a case, helps surface previous cases and judgements based on that case, and supports secure storage of important files and folders.',
    highlights: [
      'Integrated chatbot to respond to user queries.',
      'Identifies relevant IPC sections and helps find previous cases and judgements.',
      'Includes secure storage for important files and folders.',
    ],
    tags: ['Web application', 'Chatbot', 'IPC information', 'Case references', 'Secure storage'],
    links: [
      { label: 'View JuriAssist repository', href: 'https://github.com/KesavDeepak/JuriAssist', external: true },
    ],
  },
  {
    title: 'Electrical energy consumption',
    subtitle: 'Building energy prediction · Django application',
    description: 'Developed a web application to predict electrical energy consumption in buildings, with an integrated chatbot and user authentication. The application was developed using Django with a user interface.',
    highlights: [
      'Predicts electrical energy consumption in buildings.',
      'Includes an integrated chatbot and user authentication.',
      'Developed using Django with a user interface.',
    ],
    tags: ['Django', 'Energy prediction', 'Chatbot', 'Authentication'],
    links: [
      { label: 'GitHub profile', href: 'https://github.com/KesavDeepak', external: true },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="portfolio-page projects-page" aria-labelledby="projects-title">
      <div className="page-ornament page-ornament--projects" aria-hidden="true" />
      <div className="page-shell">
        <div className="section-heading reveal">
          <div><span className="section-index">04 / SELECTED WORK</span><StrokeText text="PROJECT FILES" /></div>
          <span className="section-side-note">BUILT / TESTED / LEARNED</span>
        </div>
        <div className="projects-layout">
          <div className="projects-copy reveal">
            <span className="eyebrow">A LOOK INSIDE THE WORK</span>
            <h2 id="projects-title">Ideas turned<br /><span>into projects.</span></h2>
            <p>Three projects from my development and data journey. Hover over the folder to fan out the project papers, then select one to open its details and links.</p>
            <div className="projects-count"><strong>03</strong><span>PROJECT FILES<br />IN THIS COLLECTION</span></div>
            <a className="projects-github-link cursor-target" href="https://github.com/KesavDeepak" target="_blank" rel="noreferrer"><Github size={17} /> EXPLORE GITHUB <ArrowUpRight size={14} /></a>
          </div>
          <div className="projects-folder-column reveal">
            <Folder number="04" title="Selected work" items={projectFiles} />
          </div>
        </div>
        <div className="projects-foot reveal"><FolderOpen size={16} /><span>SELECT A PAPER TO OPEN ITS PROJECT PROFILE.</span><a href="#contact">ASK ME ABOUT A PROJECT <ArrowUpRight size={14} /></a></div>
      </div>
    </section>
  );
}
