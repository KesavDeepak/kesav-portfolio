import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Activity, ArrowDownRight, ArrowUpRight, Atom, Braces, BrainCircuit, BarChart3, Cloud, Code2, Database, FileText, Folder as FolderIcon, GraduationCap,
  Layers, Mail, ShieldCheck, Sparkles, Terminal, Zap, Download, ExternalLink, X,
} from 'lucide-react';
import './PortfolioEffects.css';
import TearTicketEngine from './TearTicket';

// 1. TechText — interactive dashed lettering with a moving reveal lens.
export function TechText({ text = 'KESAV', className = '' }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false, kick: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !wrap || !ctx) return undefined;
    let raf = 0;
    let width = 1;
    let height = 1;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let last = 0;
    let sweep = 0;
    let alive = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    const draw = (now) => {
      if (!alive) return;
      const dt = Math.min(.05, (now - (last || now)) / 1000);
      last = now;
      const p = pointer.current;
      if (!reducedMotion && !p.active) sweep += dt * .45;
      const targetX = p.active && !reducedMotion ? p.x : width * (reducedMotion ? .5 : (.12 + .76 * (.5 + .5 * Math.sin(sweep))));
      const targetY = p.active && !reducedMotion ? p.y : height * .53;
      const lensX = targetX;
      const lensY = targetY;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const fontSize = Math.min(height * .66, width / Math.max(4, text.length) * 1.04);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `800 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = 'rgba(12, 27, 31, .42)';
      ctx.strokeText(text, width / 2, height / 2 + Math.sin(now / 500) * 1.5);
      ctx.setLineDash([]);
      ctx.save();
      ctx.beginPath();
      ctx.arc(lensX, lensY, Math.max(60, Math.min(width, height) * .42), 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#101719';
      ctx.fillText(text, width / 2, height / 2 + Math.sin(now / 500) * 1.5);
      ctx.restore();
      p.kick *= Math.pow(.08, dt);
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };
    if (reducedMotion) draw(performance.now());
    else raf = requestAnimationFrame(draw);

    const move = (event) => {
      const rect = wrap.getBoundingClientRect();
      pointer.current = { ...pointer.current, x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    };
    const leave = () => { pointer.current.active = false; };
    const kick = () => { pointer.current.kick = 1; };
    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerleave', leave);
    wrap.addEventListener('click', kick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      wrap.removeEventListener('pointermove', move);
      wrap.removeEventListener('pointerleave', leave);
      wrap.removeEventListener('click', kick);
    };
  }, [text]);

  return <div className={`tech-text-wrap ${className}`} ref={wrapRef} aria-label={text}><canvas ref={canvasRef} /></div>;
}

// 2. StrokeText — animated SVG outline that resolves into a solid heading.
export function StrokeText({ text, className = '' }) {
  return (
    <span className={`stroke-text ${className}`} aria-label={text}>
      <svg viewBox="0 0 1200 180" role="img" aria-hidden="true" preserveAspectRatio="xMinYMid meet">
        <text x="4" y="132" textLength="1120" lengthAdjust="spacingAndGlyphs">{text}</text>
      </svg>
    </span>
  );
}

// 3. SplitText — staggered letter reveal, activated when it enters the viewport.
export function SplitText({ text, className = '' }) {
  const letters = useMemo(() => Array.from(text), [text]);
  return <span className={`split-text ${className}`} aria-label={text}>{letters.map((char, i) => <span key={`${char}-${i}`} aria-hidden="true" style={{ '--i': i }}>{char === ' ' ? '\u00a0' : char}</span>)}</span>;
}

// 4. BlurText — word-by-word blur-to-focus entrance.
export function BlurText({ text, className = '' }) {
  return <span className={`blur-text ${className}`} aria-label={text}>{text.split(' ').map((word, i) => <span key={`${word}-${i}`} style={{ '--i': i }} aria-hidden="true">{word}</span>)}</span>;
}

// 5. CircularText — rotating character ring with an optional center label.
export function CircularText({ text = 'DATA · DESIGN · DISCOVERY · ', children, className = '' }) {
  const chars = Array.from(text);
  return (
    <div className={`circular-text ${className}`} aria-label={text}>
      <div className="circular-text__ring">{chars.map((char, i) => <span key={i} style={{ '--i': i, '--count': chars.length }}>{char}</span>)}</div>
      <div className="circular-text__center">{children || <Sparkles size={20} />}</div>
    </div>
  );
}

// 6. TextType — accessible typewriter loop.
export function TextType({ words, className = '' }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [shown, setShown] = useState('');
  const [deleting, setDeleting] = useState(false);
  const phrases = words?.length ? words : ['Data science', 'machine learning', 'useful AI'];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(phrases[0]);
      return undefined;
    }
    const full = phrases[wordIndex % phrases.length];
    const complete = shown === full;
    const empty = shown.length === 0;
    const delay = deleting ? 38 : complete ? 1250 : empty ? 320 : 72;
    const timer = window.setTimeout(() => {
      if (!deleting && !complete) setShown(full.slice(0, shown.length + 1));
      else if (!deleting && complete) setDeleting(true);
      else if (deleting && !empty) setShown(full.slice(0, shown.length - 1));
      else {
        setDeleting(false);
        setWordIndex((value) => (value + 1) % phrases.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [shown, deleting, wordIndex, phrases]);

  return <span className={`text-type ${className}`} aria-live="polite">{shown}<i aria-hidden="true" /></span>;
}

// 7. LogoLoop — seamless skills/tools marquee, paused on hover or focus.
export function LogoLoop({ items = [] }) {
  const list = items.length ? items : ['Python', 'PyTorch', 'SQL', 'Power BI'];
  return (
    <div className="logo-loop" aria-label="Technology stack">
      <div className="logo-loop__track">{[...list, ...list].map((item, i) => <span className="logo-loop__item" key={`${item}-${i}`}><span className="logo-loop__dot" />{item}</span>)}</div>
    </div>
  );
}

// 8. TargetCursor — custom corner cursor follows only interactive portfolio targets.
export function TargetCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const el = cursorRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    let x = -100;
    let y = -100;
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        frame = 0;
      });
    };
    const over = (event) => {
      const node = event.target instanceof Element ? event.target : null;
      const target = node?.closest('.cursor-target, a, button');
      el.classList.toggle('is-active', Boolean(target));
    };
    const leave = (event) => {
      const next = event.relatedTarget instanceof Element ? event.relatedTarget.closest('.cursor-target, a, button') : null;
      if (!next) el.classList.remove('is-active');
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', leave);
    };
  }, []);
  return <div className="target-cursor" ref={cursorRef} aria-hidden="true"><i /><i /><i /><i /></div>;
}

// 9. Folder — a large project folder that fans out clickable project papers.
export function Folder({ title = 'PROJECT FILES', number = '04', items = [], className = '' }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const spread = [
    { x: -176, y: -34, r: -13 },
    { x: 0, y: -104, r: 0 },
    { x: 176, y: -34, r: 13 },
    { x: -255, y: -2, r: -18 },
    { x: 255, y: -2, r: 18 },
  ];

  useEffect(() => {
    if (!selected) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selected]);

  const askLink = (item) => `mailto:kesavdeepak007@gmail.com?subject=${encodeURIComponent(`Project enquiry: ${item.title}`)}&body=${encodeURIComponent(`Hi Kesav, I would like to know more about ${item.title} and its source code.`)}`;

  return (
    <>
      <div
        className={`project-folder cursor-target ${open ? 'is-open' : ''} ${className}`}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') setOpen(true); }}
        onPointerLeave={(event) => { if (event.pointerType === 'mouse') setOpen(false); }}
        onFocus={() => setOpen(true)}
      >
        <div className="project-folder__eyebrow"><span>{number} / FILE ARCHIVE</span><span>HOVER TO OPEN</span></div>
        <div className="project-folder__stage">
          <div className="project-folder__papers" aria-label="Project files">
            {items.map((item, index) => {
              const position = spread[index] || { x: (index - 2) * 92, y: -15, r: (index - 2) * 5 };
              return (
                <button
                  type="button"
                  className="project-file-paper cursor-target"
                  key={item.title}
                  style={{ '--paper-x': `${position.x}px`, '--paper-y': `${position.y}px`, '--paper-r': `${position.r}deg`, '--paper-x-mobile': `${position.x * 0.62}px`, '--paper-y-mobile': `${position.y * 0.82}px`, '--paper-r-mobile': `${position.r * 0.8}deg`, '--paper-x-small': `${position.x * 0.43}px`, '--paper-y-small': `${position.y * 0.72}px`, '--paper-r-small': `${position.r * 0.7}deg`, '--paper-index': index }}
                  onClick={() => { setOpen(true); setSelected(item); }}
                >
                  <span className="project-file-paper__top"><FileText size={17} /><small>PROJECT / 0{index + 1}</small></span>
                  <strong>{item.title}</strong>
                  <span className="project-file-paper__summary">{item.subtitle}</span>
                  <span className="project-file-paper__open">OPEN FILE <ArrowUpRight size={13} /></span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="project-folder__cover"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label={`Open ${title} folder and show project papers`}
          >
            <span className="project-folder__tab" />
            <span className="project-folder__cover-copy"><FolderIcon size={44} strokeWidth={1.4} /><strong>{title}</strong><small>{items.length} PROJECT FILES · SELECT A PAPER</small></span>
            <span className="project-folder__cover-hint">{open ? 'FOLDER OPEN' : 'OPEN FOLDER'} <ArrowUpRight size={14} /></span>
          </button>
        </div>
        <p className="project-folder__instruction">Hover the folder to fan out the files. Select any paper to read the project.</p>
      </div>

      {selected && createPortal(
        <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <div className="project-modal__topline"><span>PROJECT FILE / PORTFOLIO ARCHIVE</span><button type="button" className="project-modal__close cursor-target" onClick={() => setSelected(null)} aria-label="Close project details"><X size={19} /></button></div>
            <span className="project-modal__subtitle">{selected.subtitle}</span>
            <h2 id="project-modal-title">{selected.title}<span>.</span></h2>
            <p className="project-modal__description">{selected.description}</p>
            {selected.highlights?.length > 0 && <div className="project-modal__highlights"><span className="eyebrow">PROJECT DETAILS</span><ul>{selected.highlights.map((point) => <li key={point}>{point}</li>)}</ul></div>}
            <div className="project-modal__tags">{(selected.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="project-modal__actions">
              {(selected.links || []).map((link) => <a key={link.label} className="button button--dark cursor-target" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{link.label}<ExternalLink size={14} /></a>)}
              <a className="button button--light cursor-target" href={askLink(selected)}>REQUEST PROJECT DETAILS <ArrowUpRight size={14} /></a>
            </div>
          </section>
        </div>,
        document.body
      )}
    </>
  );
}

// 10. ProfileCard — portrait card with pointer tilt and cyan lighting.
export function ProfileCard() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const move = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    setTilt({ x: y * -10, y: x * 12 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });
  return (
    <article className="profile-card cursor-target" ref={cardRef} onPointerMove={move} onPointerLeave={reset} style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
      <div className="profile-card__image-wrap"><img src="/profile.jpeg" alt="Portrait of Kesav Deepak Sridharan" /></div>
      <div className="profile-card__body">
        <div><span className="eyebrow">DATA · AI · ANALYTICS</span><h2>Kesav Deepak<br />Sridharan<span className="cyan-dot">.</span></h2><p>Building thoughtful solutions from data, models and code.</p></div>
        <a className="profile-card__mail" href="mailto:kesavdeepak007@gmail.com" aria-label="Email Kesav"><Mail size={18} /></a>
      </div>
      <div className="profile-card__corner">01 / 05</div>
    </article>
  );
}

const skillIcons = [
  { label: 'Python', icon: Code2, hint: 'Core programming', snippet: 'def build_model(data):', size: 'feature', detail: 'Programming, data preparation, scripting and model workflows.' },
  { label: 'PyTorch', icon: BrainCircuit, hint: 'ML / DL framework', snippet: 'torch.nn.Module · autograd', size: 'wide', detail: 'Neural networks and deep-learning model development.' },
  { label: 'SQL', icon: Database, hint: 'Data querying', snippet: 'SELECT · JOIN · GROUP BY', size: 'normal', detail: 'Querying, filtering and working with structured data.' },
  { label: 'Java', icon: Braces, hint: 'Core programming', snippet: 'class Solution { ... }', size: 'normal', detail: 'Object-oriented programming and application fundamentals.' },
  { label: 'scikit-learn', icon: Activity, hint: 'Machine learning', snippet: 'Pipeline · fit · predict', size: 'wide', detail: 'Preprocessing, feature selection, model training and evaluation.' },
  { label: 'Django', icon: Terminal, hint: 'Full-stack', snippet: 'models.py · views.py · urls.py', size: 'tall', detail: 'Web application structure, routing, authentication and backend development.' },
  { label: 'Power BI', icon: BarChart3, hint: 'Analytics', snippet: 'DAX · Data model · Reports', size: 'normal', detail: 'Dashboard creation, business reporting and data visualization.' },
  { label: 'Looker Studio', icon: Layers, hint: 'Analytics', snippet: 'Charts · Filters · Reports', size: 'normal', detail: 'Interactive dashboards and report design.' },
  { label: 'Neural Networks', icon: Zap, hint: 'Deep learning', snippet: 'Forward · Loss · Backprop', size: 'wide', detail: 'Neural-network concepts and deep-learning workflows.' },
  { label: 'LLM / NLP', icon: Atom, hint: 'AI / language', snippet: 'Tokenize · Embed · Generate', size: 'normal', detail: 'Natural-language processing and large language model concepts.' },
  { label: 'Azure Cloud', icon: Cloud, hint: 'Cloud', snippet: 'Compute · Storage · Services', size: 'normal', detail: 'Cloud platform fundamentals and service concepts.' },
  { label: 'Artificial Intelligence', icon: Sparkles, hint: 'AI', snippet: 'Prompt · Reason · Evaluate', size: 'wide', detail: 'Applying AI methods to practical problems.' },
];

// 11. GlassIcons — an asymmetric Bento skill index with cursor-following blue light.
export function GlassIcons() {
  const [active, setActive] = useState(null);
  const selected = skillIcons.find((item) => item.label === active);

  const moveGlow = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
    event.currentTarget.style.setProperty('--pointer-x', `${x}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`);
    event.currentTarget.classList.add('is-hovered');
  };

  const clearGlow = (event) => event.currentTarget.classList.remove('is-hovered');

  return (
    <div className="glass-icons-wrap">
      <div className="glass-bento-grid" aria-label="Interactive skill index">
        {skillIcons.map(({ label, icon: Icon, hint, snippet, size, detail }, i) => (
          <button
            type="button"
            className={`bento-skill bento-skill--${size} cursor-target ${active === label ? 'is-selected' : ''}`}
            key={label}
            style={{ '--i': i }}
            onPointerMove={moveGlow}
            onPointerLeave={clearGlow}
            onFocus={(event) => moveGlow({ currentTarget: event.currentTarget, clientX: event.currentTarget.getBoundingClientRect().left + event.currentTarget.clientWidth * 0.72, clientY: event.currentTarget.getBoundingClientRect().top + event.currentTarget.clientHeight * 0.38 })}
            onBlur={clearGlow}
            onClick={() => setActive((value) => value === label ? null : label)}
            aria-pressed={active === label}
            aria-label={`${label}: ${detail}`}
          >
            <span className="bento-skill__topline"><span>0{i + 1} / TOOL</span><Icon size={19} strokeWidth={1.7} /></span>
            <span className="bento-skill__content">
              <strong>{label}</strong>
              <small>{hint}</small>
            </span>
            <code className="bento-skill__snippet">{snippet}</code>
            <span className="bento-skill__arrow"><ArrowUpRight size={15} /></span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="glass-icons__selection" aria-live="polite">
          <span>SELECTED TOOL</span><strong>{selected.label}</strong><small>{selected.detail} · Click again to clear</small>
        </div>
      )}
    </div>
  );
}

// 12. TearTicket — the supplied perforated-ticket component tears the stub away physically.
export function TearTicket() {
  const [downloaded, setDownloaded] = useState(false);
  const downloadRef = useRef(null);

  const startResumeDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
      setDownloaded(true);
    }
  };

  return (
    <div className="resume-tear-wrap">
      <div className="resume-tear-heading">
        <span className="eyebrow">PORTFOLIO TAKEAWAY / 2026</span>
        <span className="resume-tear-counter">PDF · 02 PAGES</span>
      </div>
      <TearTicketEngine
        width={460}
        height={242}
        stubSize={142}
        radius={15}
        holes={13}
        holeSize={6}
        notch={4}
        roughness={1.15}
        tearAngle={26}
        stretch={34}
        resistance={0.4}
        orientation="horizontal"
        rotate={0}
        tilt
        tiltMax={5}
        tiltReach={260}
        parallax={5}
        perspective={1100}
        background="#11191b"
        stubBackground="#68e2e3"
        color="#f5ffff"
        border
        borderColor="rgba(255,255,255,.28)"
        borderWidth={1}
        onTear={startResumeDownload}
        ariaLabel="Grab the cyan ticket stub and tear it away to download Kesav's resume"
        className="resume-tear-ticket"
        stub={(
          <div className="resume-ticket-stub">
            <span className="resume-ticket-stub__top">DETACH</span>
            <span className="resume-ticket-stub__icon"><Download size={24} /></span>
            <strong>RESUME</strong>
            <small>PDF DOWNLOAD</small>
            <span className="resume-ticket-stub__serial">KD / 2026</span>
          </div>
        )}
      >
        <div className="resume-ticket-main">
          <span className="resume-ticket-main__serial">KD / RESUME / 2026</span>
          <span className="resume-ticket-main__overline">DATA · AI · SOFTWARE</span>
          <strong>Resume<br /><em>Access.</em></strong>
          <p>Detach the cyan stub to receive my latest resume as a PDF.</p>
          <span className="resume-ticket-main__bottom">KESAV DEEPAK SRIDHARAN <i>↗</i></span>
        </div>
      </TearTicketEngine>
      <a
        ref={downloadRef}
        className="resume-tear-hidden-download"
        href="/Kesav-Deepak-Sridharan-Resume.pdf"
        download="Kesav-Deepak-Sridharan-Resume.pdf"
        tabIndex={-1}
        aria-hidden="true"
      >Download resume</a>
      <div className={`resume-tear-instruction ${downloaded ? 'is-downloaded' : ''}`} aria-live="polite">
        <span className="resume-tear-instruction__icon">{downloaded ? '✓' : '↗'}</span>
        <span>{downloaded ? 'Stub detached — your resume download has started.' : 'DRAG THE CYAN STUB · TEAR IT OFF'}</span>
      </div>
      {downloaded && (
        <a className="resume-tear-again" href="/Kesav-Deepak-Sridharan-Resume.pdf" download="Kesav-Deepak-Sridharan-Resume.pdf">
          <Download size={14} /> DOWNLOAD AGAIN <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}

// 13. FolderFloat — a floating skills folder with selectable category papers.
export function FolderFloat({
  items = [], label = 'Skills library', sublabel = '6 categories', trigger = 'hover',
  closeOnSelect = false, onSelect, width = 560, height = 410,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const defaults = [
    { title: 'Core programming', detail: 'Python · Java', skills: ['Python', 'Java'] },
    { title: 'ML / DL', detail: 'PyTorch · scikit-learn · Machine Learning', skills: ['PyTorch', 'scikit-learn', 'Machine Learning'] },
    { title: 'Analytics', detail: 'Power BI · Looker Studio', skills: ['Power BI', 'Looker Studio'] },
    { title: 'AI / NLP', detail: 'Neural Networks · Deep Learning · LLM · AI', skills: ['Neural Networks', 'Deep Learning', 'LLM', 'Artificial Intelligence'] },
    { title: 'Full-stack', detail: 'Django', skills: ['Django'] },
    { title: 'Cloud & database', detail: 'Azure Cloud · SQL', skills: ['Azure Cloud', 'SQL'] },
  ];
  const files = (items.length ? items : defaults).map((item) => typeof item === 'string' ? ({ title: item, detail: item, skills: [item] }) : item);
  const placements = [
    { x: -242, y: -34, r: -16 }, { x: -150, y: -93, r: -10 }, { x: -54, y: -126, r: -4 },
    { x: 54, y: -126, r: 4 }, { x: 150, y: -93, r: 10 }, { x: 242, y: -34, r: 16 },
  ];
  const openOnHover = trigger === 'hover';
  const choose = (item, index) => {
    setSelected(item);
    onSelect?.(item, index);
    if (closeOnSelect) setOpen(false);
  };

  return (
    <div
      className={`folder-float ${open ? 'is-open' : ''} ${selected ? 'has-selection' : ''}`}
      style={{ '--folder-max-width': `${width}px`, '--folder-min-height': `${height}px` }}
      onPointerEnter={openOnHover ? (event) => { if (event.pointerType === 'mouse') setOpen(true); } : undefined}
      onPointerLeave={openOnHover ? (event) => { if (event.pointerType === 'mouse') setOpen(false); } : undefined}
      onFocus={() => setOpen(true)}
    >
      <div className="folder-float__heading"><span>{label}</span><small>{sublabel}</small></div>
      <div className="folder-float__stage">
        <span className="folder-float__spark spark-a">✳</span><span className="folder-float__spark spark-b">+</span>
        <div className="folder-float__papers">
          {files.map((item, index) => {
            const pos = placements[index] || { x: (index - 2.5) * 82, y: -34, r: (index - 2.5) * 5 };
            return (
              <button
                type="button"
                className={`folder-float__paper cursor-target ${selected?.title === item.title ? 'is-selected' : ''}`}
                key={`${item.title}-${index}`}
                style={{ '--paper-x': `${pos.x}px`, '--paper-y': `${pos.y}px`, '--paper-r': `${pos.r}deg`, '--paper-x-mobile': `${pos.x * 0.62}px`, '--paper-y-mobile': `${pos.y * 0.75}px`, '--paper-r-mobile': `${pos.r * 0.8}deg`, '--paper-x-small': `${pos.x * 0.38}px`, '--paper-y-small': `${pos.y * 0.68}px`, '--paper-r-small': `${pos.r * 0.6}deg`, '--paper-index': index }}
                onClick={() => choose(item, index)}
              >
                <small>SKILL FILE / 0{index + 1}</small>
                <strong>{item.title}</strong>
                <span>{item.detail || item.skills?.join(' · ')}</span>
              </button>
            );
          })}
        </div>
        <button type="button" className="folder-float__folder cursor-target" onClick={() => setOpen(true)} aria-expanded={open}>
          <span className="folder-float__tab" />
          <FolderIcon size={56} strokeWidth={1.2} />
          <strong>{label}</strong>
          <small>{open ? 'PICK A CATEGORY' : 'HOVER / TAP TO OPEN'}</small>
        </button>
        <span className="folder-float__caption">INTERACTIVE SKILL ARCHIVE <span>↗</span></span>
      </div>
      {selected && (
        <div className="folder-float__selected" aria-live="polite">
          <span className="folder-float__selected-index">SELECTED CATEGORY</span>
          <strong>{selected.title}</strong>
          <p>{(selected.skills || [selected.detail]).join(' · ')}</p>
        </div>
      )}
    </div>
  );
}

