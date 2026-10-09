# LUMIÈRE — Cyberpunk Luxury Boutique

Static, no-build storefront made with semantic HTML, modular CSS and vanilla JavaScript. Three.js r158, GSAP 3 / ScrollTrigger, Lenis and Google Fonts load from CDNs. No React, package installation or compilation required.

## Preview locally

Open `index.html` directly, or run a static server from this directory (for example `python -m http.server 8000`) and visit `http://localhost:8000`. A local server is recommended for browser security and reliable asset loading.

## Deploy

**GitHub Pages:** commit the contents of this directory to a repository, then enable Pages for the desired branch and root folder. `.nojekyll` is included.

**Cloudflare Pages:** connect the repository; set the build command to empty and the output directory to `/` (repository root). This is a static site with no build step.

## Included effects

- Fixed Three.js neon grid, colored particle field and slowly rotating neon geometry; scroll-controlled dolly camera and subtle pointer parallax.
- GSAP/ScrollTrigger entrance, editorial parallax, collection portal reveals, character reveal and progress indicator.
- Lenis smooth scrolling when available; accessible mobile navigation and requestAnimationFrame pointer tilt on product cards.
- Reduced-motion preference support and responsive layouts.

## Notes

CDN scripts, Google Fonts and Unsplash photographs require an internet connection. Replace remote images, contact details and example product links with production assets/content before launch. Commerce buttons are visual placeholders and do not process orders. Browser WebGL support is required for the animated backdrop; page content remains usable without it.
