# SK Eye Care & Opticals — Website

Storefront and enquiry system for SK Eye Care & Opticals, Bantalab, Jammu.
React 19 + Vite + Tailwind 4, Supabase for data, deployed to GitHub Pages.

- Live site: https://akashbhat00.github.io/sk-eyecarewebsite/
- Admin: https://akashbhat00.github.io/sk-eyecarewebsite/#/admin

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run build` | Production build into `dist/` |
| `npm run deploy` | Build and publish to GitHub Pages |

Run `VITE_BACKEND=memory npm run dev` to try the booking form and admin without Supabase
(admin password `demo1234`, any email; data resets on reload).

## Docs

- [SETUP.md](SETUP.md): connect Supabase, create the owner login, deploy
- [ARCHITECTURE.md](ARCHITECTURE.md): layers, folder conventions, how to add features or a new backend
