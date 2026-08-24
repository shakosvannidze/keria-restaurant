# Keria Restaurant

Official website designed and developed for Keria Restaurant as a project-based client commission. Located in Khidistavi, Georgia, the restaurant directly requested a responsive web presence that gives visitors convenient access to its full menu, photo gallery, available services, contact details, and location.

[Visit the live website](https://keriagori.ge/)

## Key features

- Responsive layouts for mobile, tablet, and desktop screens
- Georgian, English, and Russian routes with an accessible language selector
- Localized metadata, structured data, and `hreflang` links
- Accessible mobile navigation with clear focus states
- Interactive viewer for all 16 complete menu pages
- Previous, next, numbered-page, and mobile page-selection controls
- Keyboard menu navigation with arrow keys and `Escape` to close
- Dedicated `menu.html` fallback that remains available without JavaScript
- Responsive restaurant photo gallery and scroll-reveal animations
- Reduced-motion and forced-colors support
- Direct telephone, Facebook, and Google Maps directions links
- Open Graph metadata and Schema.org `Restaurant` structured data
- Dedicated social-sharing preview image for Open Graph and X/Twitter cards
- Sitemap, `robots.txt`, favicon set, and web app manifest

## Technologies

- Semantic HTML5
- Modern CSS3
- Vanilla JavaScript
- JSON-LD structured data
- Self-hosted Noto font families with Georgian, Latin, and Cyrillic subsets

The website is dependency-light and requires no JavaScript framework or build process.

## Project structure

```text
keria-restaurant/
|-- images/
|   |-- keria-images/
|   |-- logo/
|   |-- menu/
|   `-- social/
|-- fonts/               # Self-hosted WOFF2 subsets and OFL licenses
|-- en/                  # English website and menu fallback
|-- ru/                  # Russian website and menu fallback
|-- js/
|   `-- script.js
|-- style/
|   `-- style.css
|-- index.html
|-- menu.html
|-- robots.txt
|-- sitemap.xml
|-- site.webmanifest
`-- README.md
```

## Local setup

```bash
git clone https://github.com/shakosvannidze/keria-restaurant.git
cd keria-restaurant
npx serve .
```

Alternatively, open the project with the VS Code Live Server extension.

## Accessibility

The site uses semantic landmarks, a skip link, visible keyboard focus, accessible navigation states, and labelled menu controls. The menu viewer supports keyboard navigation, `Escape`-to-close behavior, and focus restoration after closing. Reduced-motion preferences and forced-colors mode are also supported.

## Content and asset ownership

The Keria Restaurant name, logo, branding, and menu artwork belong to Keria Restaurant. Restaurant photography belongs to Keria Restaurant or its respective owner. No open-source license is granted for reuse of these assets.

## Author

Website design and development by [Shako Svanidze](https://github.com/shakosvannidze).
