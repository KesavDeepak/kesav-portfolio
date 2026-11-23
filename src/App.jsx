import { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { TargetCursor } from './components/PortfolioEffects';
import Particles from './components/Particles';

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

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const state = rect.top > height * 0.84 ? 'before' : rect.bottom < height * 0.68 ? 'after' : 'in';
        if (section.dataset.scrollState !== state) section.dataset.scrollState = state;

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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const sections = [...document.querySelectorAll('.portfolio-page')].slice(1);
    const band = 180;
    let frame = 0;
    let targetY = window.scrollY;
    let mode = '';
    let touchY = 0;
    let ignoreTouch = false;

    const stopMotion = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      mode = '';
      targetY = window.scrollY;
    };

    const getBoundaryFactor = (scrollY) => {
      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
      const closestDistance = sections.reduce((closest, section) => {
        const boundary = section.getBoundingClientRect().top + window.scrollY - headerHeight;
        return Math.min(closest, Math.abs(boundary - scrollY));
      }, Infinity);

      if (closestDistance >= band) return 1;
      return 0.38 + 0.62 * (closestDistance / band);
    };

    const animateManualScroll = () => {
      frame = 0;
      const remaining = targetY - window.scrollY;
      if (Math.abs(remaining) < 0.5) {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        mode = '';
        return;
      }

      window.scrollTo({ top: window.scrollY + remaining * 0.2, behavior: 'instant' });
      frame = requestAnimationFrame(animateManualScroll);
    };

    const moveManually = (delta, event) => {
      const currentY = mode === 'manual' ? targetY : window.scrollY;
      const factor = getBoundaryFactor(currentY);
      if (factor >= 1) {
        if (mode === 'manual') stopMotion();
        return false;
      }

      event.preventDefault();
      if (mode !== 'manual') {
        if (frame) cancelAnimationFrame(frame);
        targetY = window.scrollY;
        mode = 'manual';
      }

      targetY = Math.max(0, Math.min(
        document.documentElement.scrollHeight - window.innerHeight,
        targetY + delta * factor,
      ));
      if (!frame) frame = requestAnimationFrame(animateManualScroll);
      return true;
    };

    const onWheel = (event) => {
      if (event.ctrlKey || event.deltaY === 0 || event.target.closest('.project-modal')) return;
      if (mode === 'link') stopMotion();

      const scale = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight
          : 1;
      moveManually(event.deltaY * scale, event);
    };

    const onTouchStart = (event) => {
      if (event.touches.length !== 1) {
        ignoreTouch = true;
        return;
      }
      touchY = event.touches[0].clientY;
      ignoreTouch = Boolean(event.target.closest('.project-modal'));
      if (mode === 'link') stopMotion();
    };

    const onTouchMove = (event) => {
      if (ignoreTouch || event.touches.length !== 1) return;
      const nextY = event.touches[0].clientY;
      const delta = touchY - nextY;
      touchY = nextY;
      moveManually(delta, event);
    };

    const onTouchEnd = () => {
      ignoreTouch = false;
    };

    const onAnchorClick = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = decodeURIComponent(anchor.getAttribute('href').slice(1));
      const destination = document.getElementById(id);
      if (!destination?.classList.contains('portfolio-page')) return;

      event.preventDefault();
      stopMotion();
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);

      const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
      const from = window.scrollY;
      const to = Math.max(0, destination.getBoundingClientRect().top + from - headerHeight);
      const startedAt = performance.now();
      const duration = Math.min(1500, 850 + Math.abs(to - from) * 0.12);
      mode = 'link';

      const animateLink = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = progress * progress * (3 - 2 * progress);
        window.scrollTo({ top: from + (to - from) * eased, behavior: 'instant' });
        if (progress < 1) {
          frame = requestAnimationFrame(animateLink);
        } else {
          frame = 0;
          mode = '';
        }
      };

      frame = requestAnimationFrame(animateLink);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('click', onAnchorClick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('click', onAnchorClick);
    };
  }, []);

  const navigate = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="site-particles" aria-hidden="true">
        <Particles
          particleColors={['#68e2e3']}
          particleCount={1200}
          particleSpread={12.5}
          speed={0.09}
          particleBaseSize={52}
          glow={2}
          twinkle={0.3}
          moveParticlesOnHover
          hoverEffect="parallax"
          sizeRandomness={1}
          shape="circle"
          depthOfField={0}
          connections={false}
          connectionDistance={110}
          particleHoverFactor={1}
          hoverRadius={140}
          drift="none"
          driftSpeed={1}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={20}
          variation={0}
          opacity={1}
          clickBurst
          intro
          lightMode
          pixelRatio={1}
        />
      </div>
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
