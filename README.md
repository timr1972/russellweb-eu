# Russellweb

Russellweb is an engineering blog built with Astro and Tailwind CSS. Its shared `BaseLayout` provides responsive
navigation, a system-aware light/dark theme with a saved toggle, and the site footer.

## Development

Requires Node.js `>=22.23.4`.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```text
src/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```
