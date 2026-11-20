import { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { TargetCursor } from './components/PortfolioEffects';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = [...document.querySelectorAll('.portfolio-page')];
    const direction = [1, -1, 1, -1, 1];

    sections.forEach((section, index) => {
      section.dataset.scrollState = index === 0 ? 'in' : 'before';
      section.querySelectorAll('.reveal').forEach((node, revealIndex) => {
        node.style.setProperty('--reveal-order', revealIndex);
      });
    });

    let frame = 0;
    let lastActive = '';
    const updateSections = () => {
      frame = 0;
      const height = Math.max(window.innerHeight, 1);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const state = rect.top > height * 0.84 ? 'before' : rect.bottom < height * 0.68 ? 'after' : 'in';
        if (section.dataset.scrollState !== state) section.dataset.scrollState = state;

        if (!reduce) {
          const midpoint = rect.top + rect.height * 0.5;
          const distance = Math.max(-1.15, Math.min(1.15, (midpoint - height * 0.5) / height));
          section.style.setProperty('--scroll-parallax-y', `${-distance * 15}px`);
          section.style.setProperty('--scroll-parallax-x', `${direction[index % direction.length] * distance * 9}px`);
          section.style.setProperty('--page-ornament-y', `${-distance * 54}px`);
        } else {
          section.style.setProperty('--scroll-parallax-y', '0px');
          section.style.setProperty('--scroll-parallax-x', '0px');
          section.style.setProperty('--page-ornament-y', '0px');
        }

        if (rect.top <= height * 0.43 && rect.bottom > height * 0.43 && lastActive !== section.id) {
          lastActive = section.id;
          setActive(section.id);
        }
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateSections);
    };

    updateSections();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const navigate = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <TargetCursor />
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="brand cursor-target" onClick={navigate} aria-label="Kesav Deepak Sridharan home"><span className="brand-mark">K<span>.</span></span><span className="brand-name">KESAV DEEPAK<br /><small>SRIDHARAN</small></span></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            {navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={navigate} className={`${active === item.id ? 'is-active' : ''} cursor-target`}>{item.label}<span /></a>)}
          </nav>
          <a className="header-resume cursor-target" href="/Kesav-Deepak-Sridharan-Resume.pdf" download><Download size={14} /> RESUME <ArrowUpRight size={13} /></a>
        </div>
      </header>
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-inner"><span>© 2026 KESAV DEEPAK SRIDHARAN</span><span>DESIGNED WITH CLARITY <i>×</i> BUILT WITH CURIOSITY</span><a href="#home">TOP ↑</a></div>
      </footer>
    </div>
  );
}
