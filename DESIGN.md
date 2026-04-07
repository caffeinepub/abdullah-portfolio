# Design Brief

**Theme:** Neon Futurism — bold, tech-forward dark mode with cyan/magenta neon accents and glassmorphic surfaces.

## Palette

| Token | OKLCH | Purpose |
| :--- | :--- | :--- |
| Background | 0.10 0 0 | Deep charcoal, minimal base |
| Card/Glass | 0.16 0.01 256 | Semi-transparent dark with slight purple tint |
| Primary (Cyan) | 0.70 0.20 200 | Vibrant neon accent, CTAs, highlights |
| Accent (Magenta) | 0.65 0.22 320 | Secondary neon, glow emphasis, hovers |
| Foreground | 0.96 0 0 | Off-white for high contrast |
| Border | 0.22 0.01 256 | Subtle dark blue tint, soft division |
| Muted | 0.18 0.02 256 | Secondary background tone |

## Typography

| Role | Font | Scale |
| :--- | :--- | :--- |
| Display | Satoshi (geometric, futuristic) | 48–72px bold |
| Body | Plus Jakarta Sans (clean, legible) | 16–18px regular |
| Mono | JetBrains Mono (tech aesthetic) | 12–14px |

## Structural Zones

| Zone | Treatment | Detail |
| :--- | :--- | :--- |
| Navbar (fixed) | Glassmorphic panel | `glass` class: bg-card/50, backdrop-blur-xl, border-border/30 |
| Hero | Animated background + glass overlay | Floating particles, hero panel at 0.16 darkness |
| Cards (Skills/Projects) | Glass + glow hover | `glass-glow` + neon-glow animations |
| Timeline | Vertical line + glassmorphic entries | Glowing cyan line, fade-in-up on scroll |
| Form | Glass inputs + floating labels | Focus glow animation, pulse-glow on submit |
| Footer | Minimal glass bar | Border-top, social links with neon hover |

## Motion & Animation

- **Entrance:** `fade-in-up` (0.5s) + `scale-in` (0.4s) for cards; `fade-in-down` for navbar
- **Interactive:** Hover → `neon-glow` shadow shift, `transition-smooth` (0.3s)
- **Floating:** `float` keyframe (6s, ±20px vertical)
- **Emphasis:** `pulse-glow` (2s, neon cyan intensity shift), `glow-pulse` box-shadow on cards
- **Scroll:** Parallax on hero background, fade-in-up on section scroll

## Spatial Rhythm

- **Radius:** `0.75rem` for cards, `full` for circular badges
- **Spacing:** 24px gutters, 16px internal padding on glass panels
- **Gap:** 20px between skill/project cards
- **Density:** Ample whitespace emphasizes premium minimal aesthetic

## Component Patterns

- **Buttons:** Primary (cyan neon-glow), Secondary (glass), Tertiary (text with underline)
- **Cards:** Glass panel with 1px accent border on hover, scale(1.05) + glow
- **Inputs:** Dark glass background, cyan focus ring, floating label on focus
- **Links:** Cyan text, subtle underline, glow on hover
- **Badges:** Circular, dark background, cyan text, neon-glow

## Signature Detail

Glassmorphism + neon glow creates layered depth: semi-transparent surfaces overlaid on gradient backgrounds with soft cyan/magenta glows that intensify on interaction. Ambient particle animations and floating geometric shapes reinforce the tech-forward aesthetic without overwhelming readability.

## Constraints

- No solid backgrounds; all surfaces are glass or gradient
- Neon glows only on interactive elements or emphasis zones
- Animations remain <600ms for responsiveness
- Mobile: reduced shadow intensity, simpler particle effects
- Fully responsive via Tailwind breakpoints (sm, md, lg)

