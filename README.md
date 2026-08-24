# Keria Restaurant

Official website for **Keria Restaurant** in Gori, Khidistavi, Georgia.

[Visit keriagori.ge](https://keriagori.ge/)

The site presents the restaurant, services, full 16-page menu, photo gallery, contact details, and directions in a responsive and accessible single-page experience.

## Features

- Responsive layouts for mobile, tablet, and desktop
- Accessible mobile navigation and keyboard-friendly controls
- Full-screen 16-page menu viewer
- Previous/next, numbered-page, and mobile page-selection controls
- Standalone `menu.html` fallback when JavaScript is unavailable
- Restaurant gallery and scroll-reveal motion
- Reduced-motion support
- Telephone, Facebook, and Google Maps links
- Georgian metadata, Open Graph tags, and social sharing data
- Schema.org `Restaurant` structured data
- Sitemap, robots directives, favicon set, and web app manifest

## Technology

The website is intentionally dependency-light:

- Semantic HTML5
- Modern CSS3
- Vanilla JavaScript
- Google Fonts
- JSON-LD structured data

No build step or JavaScript framework is required.

## Project structure

```text
Keria-Website/
|-- images/
|   |-- keria-images/   # Restaurant and food photography
|   |-- logo/           # Brand logo and favicon assets
|   `-- menu/           # Complete menu-page images
|-- js/
|   |-- boot.js         # Early document setup
|   `-- script.js       # Navigation, motion, gallery, and menu viewer
|-- style/
|   `-- style.css       # Site styles and responsive layouts
|-- index.html          # Main website
|-- menu.html           # No-JavaScript menu fallback
|-- robots.txt
|-- sitemap.xml
|-- site.webmanifest
`-- README.md
```

## Run locally

Clone the repository and serve it with any static file server:

```bash
git clone <repository-url>
cd Keria-Website
npx serve .
```

You can also use the VS Code Live Server extension. Opening `index.html` directly works for basic viewing, but a local server more closely matches production behavior.

## Menu assets

The menu consists of 16 complete page images stored in `images/menu/`. Their filenames use stable page numbers and Georgian category names transliterated into Latin characters, for example:

```text
menu-01-civi-kerdzebi.jpeg
menu-13-sousebi.jpeg
menu-16-alkoholuri-sasmelebi.jpeg
```

The menu pages are displayed without cropping, stretching, or modifying the original files. If filenames or page counts change, update both `menu.html` and the `pageFiles` list in `js/script.js`.

## Accessibility

The interface includes:

- A skip link and semantic page landmarks
- Visible keyboard focus styles
- Accessible labels and navigation states
- Keyboard menu navigation with `ArrowLeft`, `ArrowRight`, and `Escape`
- Focus restoration after closing the menu viewer
- Reduced-motion and forced-colors accommodations
- Responsive behavior down to narrow mobile screens

## SEO and deployment

Production URLs use `https://keriagori.ge/`. When deploying, preserve the existing directory structure so all relative asset paths continue to work.

Before a production release, verify:

- Contact details, opening hours, services, and map destination
- Metadata and structured data
- All 16 menu pages
- Mobile and desktop navigation
- Browser console and image requests
- `robots.txt` and `sitemap.xml`

## Roadmap

- English interface
- Russian interface
- Localized metadata and structured data
- Language switcher with persistent language selection

Asset filenames will remain language-neutral, so translations can share the same restaurant, logo, and menu images.

## Content and rights

Restaurant branding, menu artwork, and photography belong to their respective owner. No open-source license is currently granted for reuse of this project or its assets.

