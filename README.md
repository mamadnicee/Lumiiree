# LUMIÈRE — Future Form / Edition 2026

A no-build, static editorial storefront for an imagined independent womenswear house. Designed as a light-first cyber-luxury experience: surgical white space, electric pink, liquid gold and cool cyan, with an interactive Three.js atelier.

## Preview locally
Serve this folder over HTTP (ES modules and import maps do not run reliably from `file://`):

```sh
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Deploy
Upload the folder to GitHub Pages or Cloudflare Pages. No build command or output directory is required. Keep the folder structure intact. CDN assets require an internet connection; site content and styling are local.

## Experience
- Interactive Three.js garment atelier: drag to rotate, outfit tabs, zoom and light controls.
- Four chapter, scroll-driven Worlds experience; GSAP/ScrollTrigger and Lenis enhance native scrolling.
- Ten product cards with category filtering, search, quick-add and a persistent session cart count.
- Responsive navigation, light/dark theme toggle, product tilt, newsletter validation, and reduced-motion support.

## Stack & accessibility
HTML, modern CSS and vanilla JavaScript ES modules; Three.js 0.170.0, GSAP 3 / ScrollTrigger, Lenis, and Google Fonts are loaded from public CDNs. Images are remote Unsplash Source image URLs and load lazily. Keyboard focus styles, semantic sections, accessible controls and reduced-motion fallbacks are included. Newsletter is a front-end demo and needs a provider integration to collect subscriptions.
