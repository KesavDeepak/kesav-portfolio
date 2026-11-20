import { ArrowUpRight, Award, CalendarDays, GraduationCap, MapPin, ShieldCheck } from 'lucide-react';
import { BlurText, StrokeText } from '../components/PortfolioEffects';

const experiences = [
  {
    role: 'Machine Learning Engineer', type: 'Internship Training', date: 'JAN 2025 — FEB 2025',
    company: 'ReTech Solutions Pvt Ltd', location: 'Chennai, India',
    points: [
      'Developed a machine learning model to predict whether a loan application should be approved or rejected based on applicant data.',
      'Performed data preprocessing, feature selection, and model training.',
      'Evaluated model performance to improve prediction accuracy.',
    ],
  },
  {
    role: 'Data Analyst', type: 'Inplant Training', date: 'JUN 2023 — JUL 2023',
    company: 'ReTech Solutions Pvt Ltd', location: 'Chennai, India',
    points: [
      'Developed a data analysis project to evaluate student performance using academic data.',
      'Performed data cleaning, analysis, and visualization to identify performance patterns.',
      'Created dashboards and reports using Microsoft Power BI and Looker Studio to present insights.',
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="portfolio-page about-page" aria-labelledby="about-title">
      <div className="page-ornament page-ornament--about" aria-hidden="true" />
      <div className="page-shell">
        <div className="section-heading reveal">
          <div><span className="section-index">02 / ABOUT</span><StrokeText text="A LITTLE ABOUT ME" /></div>
          <span className="section-side-note">BACKGROUND / EXPERIENCE / EDUCATION</span>
        </div>
        <div className="about-intro reveal">
          <div className="about-intro-lead"><span className="eyebrow">THE PERSON BEHIND THE WORK</span><h2 id="about-title">Curious about data.<br /><span>Focused on impact.</span></h2></div>
          <div className="about-objective"><span className="quote-mark">“</span><BlurText text="Results-driven professional with strong expertise as a Data Scientist, Data Analyst, and SQL Developer. Skilled in extracting actionable insights from complex datasets, building and optimizing deep learning models, and designing efficient data pipelines and queries. Experienced in applying data-driven approaches to solve real-world problems and deliver scalable, high-impact solutions." /></div>
        </div>

        <div className="about-content-grid">
          <div className="about-experience-column">
            <div className="about-section-label reveal"><span>01</span><h3>Work experience</h3><span className="label-rule" /></div>
            <div className="experience-list">
              {experiences.map((job, index) => (
                <article className="experience-item reveal" key={job.role}>
                  <div className="experience-marker"><span>0{index + 1}</span><i /></div>
                  <div className="experience-content">
                    <div className="experience-top"><div><h4>{job.role}</h4><span className="experience-type">{job.type}</span></div><span className="experience-date"><CalendarDays size={13} /> {job.date}</span></div>
                    <div className="experience-company"><strong>{job.company}</strong><span><MapPin size={12} /> {job.location}</span></div>
                    <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="about-details-column">
            <article className="info-panel reveal">
              <div className="panel-icon"><GraduationCap size={20} /></div>
              <span className="eyebrow">EDUCATION</span>
              <h3>Bachelor's Degree in Artificial Intelligence and Data Science</h3>
              <p className="panel-primary">Saveetha Engineering College</p>
              <p>Chennai, India</p>
              <p>3rd year (6th sem)</p>
              <div className="panel-foot"><span>MAR 2023 — MAR 2027</span><strong>CGPA 8.15</strong></div>
            </article>
            <article className="info-panel reveal">
              <div className="panel-icon"><Award size={20} /></div>
              <span className="eyebrow">HACKATHONS & CONFERENCES</span>
              <h3>Ideas explored through challenges.</h3>
              <div className="achievement"><strong>IBM Z Datathon 2024</strong><p>Presented Enecionit, a solution focused on predicting electrical energy consumption along with the necessary questions related to it.</p></div>
              <div className="achievement"><strong>IBM Z Datathon 2025</strong><p>Presented Quantum Encryption Check to evaluate encryption performance and determine an optimal configuration.</p></div>
            </article>
            <article className="info-panel reveal">
              <div className="panel-icon"><ShieldCheck size={20} /></div>
              <span className="eyebrow">CERTIFICATIONS & LANGUAGES</span>
              <h3>Continuous learning.</h3>
              <ul className="cert-list"><li>Azure Fundamentals</li><li>NLP Certificates</li><li>Introduction to Machine Learning</li></ul>
              <div className="panel-foot"><span>LANGUAGES</span><strong>English · Tamil</strong></div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}
