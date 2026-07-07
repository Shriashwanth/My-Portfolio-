# Shri Ashwanth A — Personal Portfolio Website

A world-class, production-ready personal portfolio website built as a high-performance single-page application (SPA). This website features modern typography, smooth micro-interactions, responsive grids, and advanced animations using **React 18**, **Tailwind CSS v4**, **Framer Motion**, and **GSAP**.

## 🚀 Technologies Used
- **Core**: React 18 (with Hooks), HTML5 Semantic elements
- **Styling**: Tailwind CSS v4 (native `@tailwindcss/vite` compiler)
- **Animations**: 
  - **Framer Motion**: Staggered text entrance, page-load fade-ups, availability alerts, mobile menu drawer, and active tab highlights.
  - **GSAP + ScrollTrigger**: 3D parallax scroll image transformations, drawing-in timeline connector lines on scroll, and interactive magnetic button pull.
- **Icons**: Lucide React + Inline SVGs (for brand consistency)
- **Build System**: Vite 5

---

## 🛠️ Project Structure
```text
myportfolio-ashwanth/
├── public/
│   ├── assets/
│   │   └── profile.jpg      # High-resolution profile photo
│   ├── favicon.svg          # Site icon
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx # Smooth lerping difference cursor
│   │   ├── Navbar.jsx       # Transparent-to-frosted glass navigation
│   │   ├── Hero.jsx         # Viewport header with rotating photo ring
│   │   ├── About.jsx        # Biographic and stats section with parallax
│   │   ├── Experience.jsx   # Timeline with GSAP scroll draw-in line
│   │   ├── Projects.jsx     # Asymmetric Bento grid with 3D mouse tilt cards
│   │   ├── Skills.jsx       # Staggered entry capabilities grid
│   │   ├── Education.jsx    # Clean academic timeline cards
│   │   ├── Contact.jsx      # Animated floating labels form & socials
│   │   ├── Footer.jsx       # Copyright & magnetic back-to-top scroll
│   │   └── Magnetic.jsx     # Reusable GSAP magnetic hover container
│   ├── App.jsx              # Main router & LocalStorage Dark Mode manager
│   ├── index.css            # Tailwind directives, themes & keyframes
│   └── main.jsx             # React DOM entry point
├── package.json
└── vite.config.js
```

---

## 📦 Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and npm installed.

### 1. Install Dependencies
Restore the packages (including React 18, GSAP, Framer Motion, and Tailwind CSS v4 compiler):
```bash
npm install --legacy-peer-deps
```

### 2. Start Local Development Server
Run the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
To generate a fully optimized, compiled production build:
```bash
npm run build
```
This builds static assets into the `dist/` directory, ready to be hosted on Netlify, Vercel, GitHub Pages, or any web server.

### 4. Run Linter
Run Oxlint code diagnostics:
```bash
npm run lint
```

---

## ✨ Features Implemented
- **Premium Typographic Design**: Using Google Fonts' *Outfit* for modern headlines and clean body text.
- **Grayscale-to-Color Transition**: The profile image in the About section starts with a clean grayscale filter and lifts into rich natural colors on hover.
- **Infinite Rotating Border**: An eye-catching gradient border surrounding the hero photo that rotates continuously via CSS keyframes.
- **Intersection Observer Navigation**: Active header underlines follow the user's viewport automatically as they scroll.
- **Interactive 3D Tilt**: Cards in the Bento Grid tilt dynamically based on mouse move coordinates.
- **Robust SEO & OG Preview**: Custom title tags, descriptions, and Open Graph tags pointing to `/assets/profile.jpg` are fully configured.
- **Zero Halo Light/Dark Transition**: Seamless transitions that work beautifully on dark and light backgrounds without harsh white silhouettes.
