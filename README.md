# Hearth & Key – Real Estate Website

React 18 + Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
```

## Pages
Home · Properties (search + filters + sort) · Property details · Agents · Contact · Login / Sign up

## Folder structure
```
public/data        sample JSON (properties, agents) loaded with Axios
src/components     Navbar, Footer, PropertyCard, AgentCard, SearchBar, Filters ...
src/pages          one file per route
src/context        AuthContext (demo auth via localStorage)
src/services       Axios API layer
src/hooks          useFetch
src/utils          formatters
```

## Deploy
- **Vercel**: import the GitHub repo, framework = Vite, build `npm run build`, output `dist`. (`vercel.json` handles SPA routing.)
- **Netlify**: build `npm run build`, publish `dist`. (`public/_redirects` handles SPA routing.)

Note: login/sign-up is a front-end demo (localStorage). Connect a real backend through `src/services/api.js`.
