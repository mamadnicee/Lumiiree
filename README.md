# LUMIÈRE — Digital Couture Experience

A cinematic, responsive fashion microsite with a Three.js journey across four 3D worlds, GSAP ScrollTrigger camera dolly, Lenis smoothing and a remote GLTF placeholder loader.

## Run locally
Because the GLTF asset is loaded remotely, serve this folder over HTTP (not `file://`). For example, from this directory run `python -m http.server 8000`, then open `http://localhost:8000`.

## Structure
- `index.html` — five 100vh editorial sections, navigation, canvas and CDN dependencies.
- `css/` — design tokens, global styles, navigation, hero, section layouts and responsive rules.
- `js/scene.js` — Three.js r160 renderer, four world groups at z=0/-30/-60/-90, procedural mannequin, 2,000 + 1,000 particle fields, 12 floating cards and GLTF loader infrastructure.
- `js/scroll.js` — Lenis/GSAP ticker integration, pinned canvas, camera dolly (z=5 to -95), drift, title reveals and progress line.
- `js/nav.js`, `js/tilt.js`, `js/main.js` — navigation, desktop parallax and lifecycle behavior.

## Model placeholder
`https://threejs.org/examples/models/gltf/Soldier.glb` is used as the requested free loader-infrastructure placeholder (it is a soldier model, not a female fashion model). On successful load, its first animation clip is played with an `AnimationMixer`; if the remote asset is unavailable, the hand-built stylized mannequin remains visible. Swap the URL and adjust scale/placement in `js/scene.js` when the final fashion model is ready.

All external libraries and Google Fonts are CDN-loaded, so an internet connection is needed for those resources. No build step is required.