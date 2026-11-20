import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { CircularText, ProfileCard, SplitText, TechText, TextType } from '../components/PortfolioEffects';

const HOME_PHRASES = ['Data Science', 'Machine Learning', 'Analytics', 'AI Engineering'];

export default function Home() {
  return (
    <section id="home" className="portfolio-page home-page" aria-labelledby="home-title">
      <div className="page-ornament page-ornament--home" aria-hidden="true" />
      <div className="page-shell home-grid">
        <div className="home-copy">
          <div className="eyebrow home-kicker"><span className="status-dot" /> OPEN TO OPPORTUNITIES <span className="kicker-line" /> CHENNAI, INDIA</div>
          <p className="home-pretitle">HELLO, I'M</p>
          <h1 id="home-title"><SplitText text="Kesav Deepak" /><br /><span className="home-title-last">Sridharan<span className="cyan-dot">.</span></span></h1>
          <div className="home-role"><span className="home-role-label">I WORK AT THE INTERSECTION OF</span><TextType words={HOME_PHRASES} /></div>
          <p className="home-summary">I turn complex data into clear insights, build machine learning solutions, and create useful applications with a focus on real-world outcomes.</p>
          <div className="home-actions">
            <a className="button button--dark cursor-target" href="#projects">EXPLORE MY WORK <ArrowUpRight size={16} /></a>
            <a className="button button--light cursor-target" href="/Kesav-Deepak-Sridharan-Resume.pdf" download><Download size={16} /> DOWNLOAD RESUME</a>
          </div>
          <div className="home-location"><MapPin size={14} /> Singaperumal Kovil, Chengalpattu, Tamil Nadu</div>
          <div className="home-big-type"><TechText text="DATA" /></div>
          <div className="home-bottom-note"><span>01 — 05</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
        </div>
        <div className="home-visual">
          <div className="profile-rail"><span className="vertical-label">PORTFOLIO / 2026</span><span className="rail-line" /></div>
          <ProfileCard />
          <div className="home-orbit"><CircularText text="DATA SCIENCE · MACHINE LEARNING · ANALYTICS · "><span>KD</span></CircularText></div>
          <div className="home-index"><strong>AI</strong><span>01 / 05</span></div>
        </div>
      </div>
      <div className="home-strip"><div className="page-shell home-strip-inner"><span>DATA SCIENTIST</span><i /> <span>DATA ANALYST</span><i /> <span>SQL DEVELOPER</span><i /> <span>AI ENTHUSIAST</span><ArrowDownRight size={16} /></div></div>
    </section>
  );
}
