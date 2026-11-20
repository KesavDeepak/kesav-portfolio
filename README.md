# Kesav Deepak Sridharan — Portfolio

A responsive React + Vite portfolio built from the supplied resume and the `Text Styles-.md` component reference. The design uses light mode, black and white surfaces, `#68e2e3` accents, bold Manrope / Space Grotesk typography, left-right alternating section layouts, scroll reveals and section parallax.

## Latest interaction updates

- The resume control now uses the original `TearTicket` implementation from the supplied `Text Styles-.md`: a perforated ticket with a draggable stub, animated fibres, spring/physics motion, keyboard activation, and an `onTear` callback. The resume PDF download is triggered when the stub detaches; a fallback download link appears afterward.
- The Skills index is now an asymmetric Bento grid. Cards track pointer position and use blue/cyan radial illumination, gradient skill names, and code-style snippets. Cards can be selected to pin the detail panel.
- Every section now has directional entry and exit animation. Scroll position also applies subtle horizontal/vertical parallax to section content and its ornament. Reduced-motion preferences disable these effects.
- The original TearTicket requires the `motion` package. It is listed in `package.json`; the official setup uses `npm install motion` and imports via `motion/react`.

## Run locally

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Included sections

- **Home:** animated hero typography, typewriter roles, interactive profile card and resume shortcut.
- **About:** objective, work experience, education, hackathon achievements, certifications and languages.
- **Skills:** selectable skill-folder papers, an asymmetric Bento index with pointer-following blue/cyan gradients and code snippets, and a moving technology strip.
- **Projects:** a large interactive folder. Hover or focus it to fan out project papers; select any paper to open its project details, highlights, tags and links.
- **Contact:** contact links and the original perforated TearTicket effect. Drag the cyan perforated stub to tear it free; the resume PDF download starts as soon as the perforation snaps. Keyboard users can focus the stub and press Enter or Space.

## All 13 effects from the supplied Markdown

1. `TechText` — pointer-reveal dashed canvas lettering.
2. `StrokeText` — SVG stroke-draw and fill heading.
3. `SplitText` — staggered character reveal.
4. `BlurText` — word-by-word blur-to-focus entrance.
5. `CircularText` — rotating circular typography.
6. `TextType` — cycling typewriter text.
7. `LogoLoop` — looping technology marquee.
8. `TargetCursor` — custom cursor brackets for interactive targets.
9. `Folder` — large folder with papers that fan out; each paper opens a detail dialog.
10. `ProfileCard` — photo card with pointer tilt.
11. `GlassIcons` — asymmetric Bento skill cards with cursor-following blue illumination and gradient code text.
12. `TearTicket` — the original physics-based perforated ticket with an animated tear and PDF download callback.
13. `FolderFloat` — floating skills folder with selectable category papers.

The page-level parallax and reveal effects are applied to every section. Reduced-motion preferences are considered in the CSS animations.

## Profile photo

The profile card uses `public/profile.jpeg`, displayed with `object-fit: cover` in `src/components/PortfolioEffects.jsx`.

## Resume file

The original resume is included at:

`public/Kesav-Deepak-Sridharan-Resume.pdf`

The navigation shortcut, home shortcut and tear-ticket action all point to that PDF.

## Project links

Project descriptions are based on the supplied resume. The resume only shows placeholder labels for some GitHub links, so those project-specific repository links are not fabricated. The JuriAssist repository link is included, and other project cards also provide a direct email action to request project details.

## Replace links / content

Edit `src/pages/Projects.jsx` to update project descriptions, technology tags and repository URLs. Edit `src/pages/Skills.jsx` to add or rename skill categories and technology labels. Contact details are in `src/pages/Contact.jsx` and `src/components/PortfolioEffects.jsx`.
