# Arpit | Portfolio

## Project structure

Turborepo monorepo using npm workspaces.

```text
portfolio/
|-- apps/
|   |-- frontend/           # React, TypeScript, Vite, component-scoped SCSS, Three.js
|   |   |-- public/         # Static images, icons, and workstation GLB
|   |   |-- scripts/        # Workstation asset generator
|   |   `-- src/            # Components, styles, content, and API client
|   `-- backend/
|       `-- src/            # TypeScript Node.js API
|-- packages/
|   `-- interface/
|       `-- src/            # Shared API types and validators
|-- package.json           # Workspaces and root commands
|-- package-lock.json      # Shared dependency lockfile
|-- tsconfig.base.json     # Shared TypeScript configuration
`-- turbo.json             # Task orchestration and caching
```

UI components use adjacent `.scss` files with parent and child class names.
Shared theme, spacing, and radius variables live in `src/styles/_tokens.scss`;
reusable layout, card, badge, and breakpoint mixins live in `src/styles/_mixins.scss`.
Components load mixins with Sass `@use`; `src/index.scss` loads tokens once
alongside shared resets and headings. Vite compiles SCSS automatically.
Nonvisual TypeScript modules do not need empty stylesheets.
Layout and hover effects use CSS; scroll reveals have been removed to avoid
runtime DOM styles. The workstation GLB preserves smooth mouse-following 3D tilt,
and the stars rotate using native Three.js canvases with CSS dimensions.
Both respect reduced-motion preferences; rendering updates canvas pixels,
not inline CSS.

## Clone and run locally

Requires **Node.js 22.12+** and **npm 10+**.

```sh
git clone https://github.com/Arpt-Singh/portfolio.git
cd portfolio
npm ci
npm run dev
```

Run commands from the repository root, not from an individual app folder.
The development command starts the frontend, backend, and shared-interface watcher.

- Frontend: <http://localhost:5173/portfolio/>
- Backend health endpoint: <http://127.0.0.1:3001/api/health>

If the frontend port is occupied, use the URL printed by Vite.
Keep the terminal running; press **Ctrl+C** to stop.

For subsequent runs:

```sh
cd portfolio
npm run dev
```
