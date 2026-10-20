# Arpit | Portfolio

## Project structure

Turborepo monorepo using npm workspaces.

```text
portfolio/
|-- apps/
|   |-- frontend/           # React, TypeScript, Vite, Tailwind CSS, Three.js
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
