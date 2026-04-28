# 📷 Lens & Light — Photography Portfolio

A clean, modern, dark-themed photography portfolio website built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies — just fast, elegant, production-ready code.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-gold?style=flat)

---

## ✨ Features

- **Hero Section** — Full-viewport typography with animated floating orbs and grain texture
- **Custom Cursor** — Smooth lagging ring cursor with gold dot (auto-disabled on mobile)
- **Sticky Navigation** — Shrinks and blurs on scroll; collapses to a full-screen overlay on mobile
- **Gallery Grid** — Masonry-style layout with category filters (All / Landscapes / Portraits) and staggered animations
- **Lightbox Viewer** — Prev/Next navigation, keyboard arrow key support, touch swipe gestures, and smooth scale-in animation
- **Contact Form** — Floating labels, animated underline focus states, per-field validation, and simulated async submission
- **Scroll Reveal** — IntersectionObserver-powered fade-in animations for all sections
- **Fully Responsive** — Mobile-first layout, works across all screen sizes

---

## 🗂 Project Structure

```
portfolio/
├── index.html        # Markup & content
├── style.css         # All styling & animations
├── script.js         # Interactivity & logic
├── README.md         # You are here
│
├── landscape photo1.jpg   # Your photo assets
├── landscape photo2.jpg
├── portrait photo1.jpg
└── portrait photo2.jpg
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/lens-and-light-portfolio.git
cd lens-and-light-portfolio
```

### 2. Add your photos

Drop your images into the root folder. The expected filenames are:

| File | Category |
|---|---|
| `landscape photo1.jpg` | Landscape gallery card 1 |
| `landscape photo2.jpg` | Landscape gallery card 2 (wide) |
| `portrait photo1.jpg` | Portrait gallery card 1 |
| `portrait photo2.jpg` | Portrait gallery card 2 |

> **Tip:** You can rename files to anything you like — just update the `src` attributes in the gallery section of `index.html` to match.

### 3. Open in browser

```bash
# Option A — just open the file
open index.html

# Option B — use a local dev server (recommended)
npx serve .
# or
python -m http.server 8080
```

---

## 🎨 Customisation

### Personal details
Edit `index.html` to update:
- Your name / brand in `<title>` and `.nav-logo`
- Hero tagline and subheading
- About Me bio text and stats (years, projects, countries)
- Contact email and phone number in the contact section
- Footer social links

### Colors & fonts
All design tokens live at the top of `style.css` inside `:root {}`:

```css
:root {
  --bg:       #0a0a10;   /* Page background */
  --gold:     #d4af37;   /* Accent color    */
  --text:     #e8e4dc;   /* Body text       */
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans:  "DM Sans", sans-serif;
}
```

Change `--gold` to any hex value to instantly re-theme the entire site.

### Adding more gallery images
In `index.html`, duplicate a `.gallery-item` block and adjust the `src`, `alt`, category class (`landscape` or `portrait`), and caption text. Add the class `wide` to make a card span two columns.

```html
<div class="gallery-item landscape" data-index="6">
  <div class="gallery-img-wrap">
    <img src="your-new-photo.jpg" alt="Description" class="gallery-img" loading="lazy" />
    <div class="gallery-placeholder">
      <div class="ph-icon">🌿</div>
      <span>Photo Title</span>
    </div>
  </div>
  <div class="gallery-caption">
    <span class="caption-cat">Landscape</span>
    <span class="caption-title">Photo Title</span>
  </div>
</div>
```

---

## 🌐 Deployment

This is a static site — deploy anywhere for free:

| Platform | Steps |
|---|---|
| **GitHub Pages** | Repo → Settings → Pages → Source: `main` branch → `/root` |
| **Netlify** | Drag & drop the project folder at [netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` in the project directory |

---

## 📬 Contact Form

The form currently runs client-side only with a simulated async delay. To make it functional, connect it to a backend service:

- **[Formspree](https://formspree.io)** — Add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
- **[EmailJS](https://emailjs.com)** — Replace the `await new Promise(...)` simulation in `script.js` with an EmailJS call
- **Custom backend** — Replace the simulation with a `fetch()` POST to your own API endpoint

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ☕ and a love for light.</p>
