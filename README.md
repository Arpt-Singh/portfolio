# Arpit | Embedded Portfolio

A React portfolio covering embedded systems, software engineering, and applied
research. Built with Vite, Tailwind CSS, Three.js, React Three Fiber, and Framer
Motion. Organized as an npm-workspaces monorepo orchestrated by Turborepo.

This README is both a runbook and a source-code tutorial. All paths below are
relative to the monorepo root, `3d_portfolio/`. The walkthrough describes the
current implementation, not a hypothetical backend-driven portfolio.

**Important:** the workstation is a PNG displayed on a flat mesh inside a GLB,
not a fully modeled 3D computer. CSS perspective, floating animation, and WebGL
rendering provide the presentation. The star field is separate procedural 3D
geometry. Portfolio content is local frontend data; the backend currently
provides only a health endpoint.

## Tutorial contents

1. [Requirements and development](#requirements-and-development)
2. [Commands](#commands)
3. [Project structure](#project-structure)
4. [Layout and behavior](#layout-and-behavior)
5. [Workstation hero](#workstation-hero)
6. [Complete file map](#complete-file-map)
7. [Build the project step by step](#build-the-project-step-by-step)
8. [Components, functions, and state](#components-functions-and-state)
9. [How the visual styling works](#how-the-visual-styling-works)
10. [How the GLB is constructed](#how-the-glb-is-constructed)
11. [How the model is rendered](#how-the-model-is-rendered)
12. [How the animated stars work](#how-the-animated-stars-work)
13. [Backend and interface walkthrough](#backend-and-interface-walkthrough)
14. [Customize and extend the project](#customize-and-extend-the-project)
15. [Validation and troubleshooting](#validation-and-troubleshooting)
16. [Production deployment](#production-deployment)
17. [Content and attribution](#content-and-attribution)

## Requirements and development

Use Node.js 22.12 or newer and npm 10 or newer. The `packageManager` field records
the npm version used for the lockfile. Run commands from the repository root:

```sh
npm ci
npm run dev
```

The root `.npmrc` retains the workspace's `legacy-peer-deps=true` installation
policy. The tilt component now uses React 18-compatible `react-tilt` 1.x and its
named `Tilt` export.
Turborepo builds the shared contracts first, then runs:

- Frontend: Vite at `http://localhost:5173` (or the next available port).
- Backend: Node HTTP server at `http://127.0.0.1:3001`.
- Interface: TypeScript watch mode to rebuild shared contracts when they change.

No environment variables or email service configuration are required. Optional
`HOST` and `PORT` environment variables configure the backend and Vite's API proxy:

```sh
PORT=4001 npm run dev
```

The frontend proxies `/api/health` to the backend in development and preview,
avoiding browser CORS configuration. `src/api/health.ts` in the frontend provides
a typed `getHealth()` client with runtime response validation. It is not called
automatically: portfolio rendering and direct email remain independent of the
backend.

## Commands

```sh
npm run build       # build shared contracts, then frontend and backend
npm run typecheck   # strict TypeScript checks across every workspace
npm test            # frontend API-client and backend HTTP tests
npm run preview    # preview the built frontend (does not start the backend)
npm start          # run the built backend (does not serve frontend files)
```

Build outputs are `apps/frontend/dist/`, `apps/backend/dist/`, and
`packages/interface/dist/`. Turborepo caches these outputs and rebuilds dependencies
before their consumers. Changes to the root TypeScript configuration invalidate
workspace caches. Development tasks are persistent and uncached.

To run just one app with its shared dependency tasks:

```sh
npm run dev -- --filter=@portfolio/frontend...
npm run dev -- --filter=@portfolio/backend...
```

If running both apps separately, start each in its own terminal. On production
hosting, serve `apps/frontend/dist/` as a static SPA (with an `index.html` fallback),
run the backend separately, and route `/api/health` to it through your reverse
proxy if using the API client. Vite's proxy is not part of the static production
bundle. Deploy `packages/interface/dist/` and the workspace package links alongside
the backend; run `npm ci` and `npm run build` from the monorepo root before starting
it.

## Project structure

```text
3d_portfolio/
  apps/
    frontend/              # React + Vite + TypeScript
      public/              # static models, textures, and icons
      scripts/             # workstation asset generation tooling
      src/
        api/               # typed HTTP clients
        components/
        constants/
        hoc/
        types/             # compatibility types for existing libraries
        utils/
    backend/               # Node.js HTTP API + TypeScript
      src/
        index.ts           # process startup and shutdown
        server.ts          # HTTP routes
        server.test.ts
  packages/
    interface/             # browser-safe API contracts and validators
      src/index.ts
  package.json             # npm workspaces and root commands
  package-lock.json        # one lockfile for the entire monorepo
  tsconfig.base.json       # common strict compiler settings
  turbo.json               # task graph and cache outputs
```

Turborepo convention places runnable applications in `apps/` and shared libraries
in `packages/`; it does not mandate a backend framework or a particular internal
folder layout. Apps depend on `@portfolio/interface`, never on each other.
Keep the interface package free of React, Node-specific APIs, server logic, and
secrets. Add shared request/response types and runtime validators there as API
routes are introduced.

The backend currently exposes only:

| Method | Route | Response |
| --- | --- | --- |
| GET | `/api/health` | `{"status":"ok","service":"portfolio-backend"}` |
| HEAD | `/api/health` | HTTP 200 with no body |

Unknown routes return JSON 404 responses; unsupported health methods return
JSON 405 responses with an `Allow` header. Invalid ports fail startup explicitly.

Within `apps/frontend/`:

- `src/components/`: hero, navigation, overview, experience, projects, quotation,
  and direct-email contact panel.
- `src/components/canvas/`: workstation model and moving star field.
- `src/constants/index.ts`: navigation links, skills, experience, and six projects.
- `src/hoc/SectionWrapper.tsx`: shared section layout and entrance animation.
- `src/index.css`: shared custom styles and hero edge masks.
- `src/styles.ts`: shared heading styles.
- `public/desktop_pc/workstation01/`: workstation GLB and loading-preview PNG.
- `public/technology-icons/`: Rust and Linux SVG icons with source attribution.
- `scripts/create-workstation.ts`: regenerates the workstation model.

Frontend, backend, shared contracts, and asset-generation tooling use strict
TypeScript. Existing Tailwind/PostCSS configuration retains its CommonJS format.
There is no lint script; validation uses TypeScript, Node's test runner via `tsx`,
and Vite production builds.
Unused template components, screenshots, Earth assets, technology tiles, loader
styles, and EmailJS integration have been removed.

## Layout and behavior

Navigation and content share a centered 1280px maximum width with matching 16px
phone, 24px tablet, and 32px desktop gutters. The background remains full-width.
Overview text has a separate readability limit. Section introductions reveal when
the section enters the screen rather than waiting for a percentage of a tall
mobile section. Overview cards reveal individually.

Experience alternates on desktop at 1170px and wider, and uses a single column on
smaller screens. All entries belong to Medtronic Engineering & Innovation Center
(MEIC), with separate focus areas. Each card includes the user-supplied Medtronic
logo from `src/assets/medtronic-logo.png`, displayed at the bottom-right of each
card in normal flow at 56px tall, bundled by Vite and
linked to the MEIC company page in a new tab;
the Medtronic name and logo remain the property of their owner.
Projects use three desktop columns, two tablet columns, and one
phone column. Each card opens a native dialog containing an architecture flow,
responsibilities, technologies, contributions, and outcome. Dialogs support
Escape and backdrop dismissal, contain keyboard focus, restore focus to the
trigger, and lock background scrolling.

The full-width Galileo card contains the attributed quotation and portrait.
The moving 3D star field appears only
behind this section. The portrait is loaded from Wikimedia Commons and requires
an internet connection.

Contact uses a direct `mailto:` link to arpit181001002080@gmail.com, opening the
visitor's email app. There is no message form or rotating Earth.

## Workstation hero

The hero loads `public/desktop_pc/workstation01/scene.glb`, a flat plane displaying
the complete supplied PNG, not a volumetric reconstruction. The original PNG
serves as a matching loading preview until the GLB finishes its first render.
Both files are required.

On desktop the scene retains its 50px rightward offset and pointer motion.
Multi-stop masks blend all four edges, finishing before the clipping boundary.
The description occupies a narrow left column with a localized, rounded
readability gradient rather than a dark full-height strip over the left edge.
On phones and tablets the workstation sits below the introduction. Hero height
follows content rather than imposing a full viewport height, avoiding large gaps
in tall windows or when zoomed out.

To regenerate the GLB and preview:

```sh
npm run generate:workstation -- /absolute/path/to/workstation01.png
```

Unused standalone glTF and binary exports are not retained or generated.
Source image rights remain with their respective owner.

## Complete file map

Generated directories such as `node_modules/`, `dist/`, and `.turbo/` are omitted.
Do not edit generated bundles; edit source files and rebuild.

```text
3d_portfolio/
|-- .gitignore
|-- .npmrc
|-- README.md
|-- package.json
|-- package-lock.json
|-- tsconfig.base.json
|-- turbo.json
|-- apps/
|   |-- frontend/
|   |   |-- package.json
|   |   |-- index.html
|   |   |-- vite.config.ts
|   |   |-- tsconfig.json
|   |   |-- tailwind.config.cjs
|   |   |-- postcss.config.cjs
|   |   |-- scripts/
|   |   |   `-- create-workstation.ts
|   |   |-- public/
|   |   |   |-- favicon.svg
|   |   |   |-- desktop_pc/workstation01/
|   |   |   |   |-- README.txt
|   |   |   |   |-- scene.glb
|   |   |   |   `-- textures/workstation01.png
|   |   |   `-- technology-icons/
|   |   |       |-- README.txt
|   |   |       |-- linux.svg
|   |   |       `-- rust.svg
|   |   `-- src/
|   |       |-- main.tsx
|   |       |-- App.tsx
|   |       |-- index.css
|   |       |-- styles.ts
|   |       |-- api/
|   |       |   |-- health.ts
|   |       |   `-- health.test.ts
|   |       |-- assets/
|   |       |   |-- index.ts
|   |       |   |-- logo.svg
|   |       |   |-- menu.svg
|   |       |   |-- close.svg
|   |       |   `-- medtronic-logo.png
|   |       |-- components/
|   |       |   |-- index.ts
|   |       |   |-- Navbar.tsx
|   |       |   |-- Hero.tsx
|   |       |   |-- About.tsx
|   |       |   |-- Experience.tsx
|   |       |   |-- Works.tsx
|   |       |   |-- Feedbacks.tsx
|   |       |   |-- Contact.tsx
|   |       |   `-- canvas/
|   |       |       |-- index.ts
|   |       |       |-- Computers.tsx
|   |       |       `-- Stars.tsx
|   |       |-- constants/
|   |       |   `-- index.ts
|   |       |-- hoc/
|   |       |   |-- index.ts
|   |       |   `-- SectionWrapper.tsx
|   |       |-- types/
|   |       |   `-- react.d.ts
|   |       `-- utils/
|   |           `-- motion.ts
|   `-- backend/
|       |-- package.json
|       |-- tsconfig.json
|       |-- tsconfig.build.json
|       `-- src/
|           |-- index.ts
|           |-- server.ts
|           `-- server.test.ts
`-- packages/
    `-- interface/
        |-- package.json
        |-- tsconfig.json
        `-- src/
            `-- index.ts
```

### Configuration responsibilities

| File | Responsibility |
| --- | --- |
| [package.json](./package.json) | Declares workspaces, tool versions, and root commands. |
| [package-lock.json](./package-lock.json) | Locks dependency versions and local workspace links for reproducible installation. |
| [.npmrc](./.npmrc) | Retains the workspace's legacy peer dependency installation policy. |
| [.gitignore](./.gitignore) | Excludes dependencies, build outputs, local environment files, and task caches. |
| [turbo.json](./turbo.json) | Defines task dependencies, cache outputs, persistent development tasks, and environment inputs. |
| [tsconfig.base.json](./tsconfig.base.json) | Shared strict TypeScript settings and ES2022 target. |
| [frontend package.json](./apps/frontend/package.json) | React, Three.js, Vite, styling dependencies, and frontend scripts. |
| [frontend tsconfig.json](./apps/frontend/tsconfig.json) | DOM types, React JSX, bundler resolution, and checks for source, generator, and Vite config. |
| [vite.config.ts](./apps/frontend/vite.config.ts) | React plugin and development/preview health API proxy. |
| [tailwind.config.cjs](./apps/frontend/tailwind.config.cjs) | Source scanning, theme colors, card shadow, and extra-small breakpoint. |
| [postcss.config.cjs](./apps/frontend/postcss.config.cjs) | Runs Tailwind 4 through the dedicated `@tailwindcss/postcss` plugin. |
| [backend package.json](./apps/backend/package.json) | Backend watch, build, test, and production start commands. |
| [backend tsconfig.json](./apps/backend/tsconfig.json) | Node types, NodeNext modules, and backend source/output paths. |
| [tsconfig.build.json](./apps/backend/tsconfig.build.json) | Excludes backend tests from production compilation. |
| [interface package.json](./packages/interface/package.json) | Exposes compiled JavaScript and declaration files as `@portfolio/interface`. |
| [interface tsconfig.json](./packages/interface/tsconfig.json) | Compiles shared source into JavaScript and `.d.ts` declarations. |

## Build the project step by step

Use this reading and implementation order to understand how the application fits
together. To run the existing project, use the quick-start commands above rather
than recreating or overwriting these files.

### Step 1: Establish the monorepo boundaries

The root [package.json](./package.json) discovers `apps/*` and `packages/*` as npm
workspaces. Each workspace has a unique package name. Both apps list
`@portfolio/interface` as a dependency, so npm links the local package.

```text
@portfolio/frontend ----> @portfolio/interface <---- @portfolio/backend
         |
         +--- HTTP request to backend, only when getHealth() is called
```

The package dependency graph and HTTP communication are different things.
Importing a shared type does not contact the server.

In [turbo.json](./turbo.json), `dependsOn: ["^build"]` means "build this task's
workspace dependencies first." Therefore interface compilation precedes either
app build. `outputs: ["dist/**"]` tells Turbo what to cache and restore.
The caret does not mean "build every app."

### Step 2: Add strict TypeScript boundaries

The shared compiler configuration enables `strict`. The frontend uses
`moduleResolution: "Bundler"` because Vite resolves browser imports. The backend
and interface use `NodeNext` to follow Node ESM rules.

That is why [backend startup](./apps/backend/src/index.ts) imports
`"./server.js"` even though the source file is TypeScript: compiled Node code
must reference a runtime JavaScript file.

The tilt library supplies its own component types. The frontend's
[react.d.ts](./apps/frontend/src/types/react.d.ts) augments React image types for
the lowercase `fetchpriority` attribute used by this version of React.
This file supplies compile-time types; it does not change library behavior.

### Step 3: Mount React and compose the page

The browser starts at [index.html](./apps/frontend/index.html), which declares
the root element, title, favicon, workstation-image preload, and TypeScript
module entry.

[main.tsx](./apps/frontend/src/main.tsx) imports global CSS, checks that the
root element exists, and renders `App` through `ReactDOM.createRoot` inside
`React.StrictMode`.

[App.tsx](./apps/frontend/src/App.tsx) places the sections in this order:

```text
BrowserRouter
  page background
    hero backdrop
      Navbar
      Hero
    About
    Experience
    Works
    quotation container
      Feedbacks
      StarsCanvas
    Contact
```

This is one scrolling page, not a set of separate page routes. The navbar uses
hash anchors for sections and a router `Link` for the home action.

### Step 4: Separate portfolio data from presentation

[constants/index.ts](./apps/frontend/src/constants/index.ts) contains:

- `navLinks`: section IDs and labels.
- `services`: skill categories, icons, and technology lists.
- `employer`: company name, URL, and logo.
- `experiences`: role, focus, date, icon styling, and bullet points.
- `projects`: summary cards and detailed engineering-dialog data.
- `serviceSymbol(path)`: creates a decorative SVG data URL from a path string.

Components map these arrays into UI instead of repeating markup for each entry.
The data is bundled into the frontend. There is no database or content API.

### Step 5: Build shared section layout and animations

[SectionWrapper.tsx](./apps/frontend/src/hoc/SectionWrapper.tsx) wraps a section
component with a centered container, anchor ID, and Framer Motion lifecycle.
[motion.ts](./apps/frontend/src/utils/motion.ts) returns reusable animation
variants, and [styles.ts](./apps/frontend/src/styles.ts) centralizes heading
utility strings.

### Step 6: Build the content sections and project dialog

Use [About.tsx](./apps/frontend/src/components/About.tsx) for data-driven skill
cards, [Experience.tsx](./apps/frontend/src/components/Experience.tsx) for the
timeline, and [Works.tsx](./apps/frontend/src/components/Works.tsx) for project
cards and their native dialog. The component reference below explains state and
event flow.

### Step 7: Generate and render the workstation

Run the generator on a PNG, then load its GLB through
[Computers.tsx](./apps/frontend/src/components/canvas/Computers.tsx).
[Hero.tsx](./apps/frontend/src/components/Hero.tsx) provides the HTML introduction
and pointer-controlled presentation. The GLB and rendering sections below
explain the geometry, binary layout, camera fitting, and loading preview.

### Step 8: Add the backend and shared contract

Define the health route and response in
[packages/interface/src/index.ts](./packages/interface/src/index.ts). Implement
the Node request handler in [server.ts](./apps/backend/src/server.ts), process
startup in [backend index.ts](./apps/backend/src/index.ts), and browser fetch
logic in [health.ts](./apps/frontend/src/api/health.ts).

### Step 9: Install, validate, and build

From the monorepo root:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run dev
```

Stop development with `Ctrl+C`. You do not need Blender, a database, an email
provider, or API keys to run this implementation.

## Components, functions, and state

### Navigation and ordinary page sections

| Source file | Functions/components | Behavior |
| --- | --- | --- |
| [Navbar.tsx](./apps/frontend/src/components/Navbar.tsx) | `Navbar`, effect-local `handleScroll` | Tracks clicked `active` label, mobile-menu `toggle`, and `scrolled`. At scroll positions greater than 100px, adds the opaque background. Registers and cleans up a scroll listener. Clicking the brand clears the selection and scrolls to the top. Active styling follows clicks, not automatic section observation. |
| [Hero.tsx](./apps/frontend/src/components/Hero.tsx) | `Hero`, `handlePointerMove`, `resetPointer` | Renders the introduction and workstation container. Uses a DOM ref to update CSS custom properties without React state updates on every pointer event. Touch pointers are ignored. |
| [About.tsx](./apps/frontend/src/components/About.tsx) | `About`, `ServiceCard` | Maps services into tilt cards, trims technology labels, and animates each card when 10% visible. Cards use tilt options `max: 45`, `scale: 1`, `speed: 450`. |
| [Experience.tsx](./apps/frontend/src/components/Experience.tsx) | `Experience`, `ExperienceCard` | Maps experiences into `VerticalTimelineElement` components. A regular expression identifies known bullet prefixes and renders them in bold. Employer logo links open in a new tab with `noopener noreferrer`. |
| [Feedbacks.tsx](./apps/frontend/src/components/Feedbacks.tsx) | `Feedbacks` | Despite its historical name, renders the attributed Galileo quotation and remote portrait, not a testimonial carousel. |
| [Contact.tsx](./apps/frontend/src/components/Contact.tsx) | `Contact`, `CONTACT_EMAIL` | Builds a direct `mailto:` link with a left-side entrance animation. It does not submit data to the backend. |

### Project selection and dialog lifecycle

Everything below lives in [Works.tsx](./apps/frontend/src/components/Works.tsx).

1. `Works` initializes `selectedProject` to `null`.
2. Clicking a project button sets the selected project object.
3. A non-null selection mounts `ProjectModal`.
4. `ProjectModal` uses `createPortal(..., document.body)` so the dialog is outside
   the section's DOM hierarchy.
5. Its effect saves the focused element and current body overflow, calls
   `dialog.showModal()`, and disables background scrolling.
6. `ProjectArchitecture` maps `flow` into numbered blocks and connector arrows.
   Optional `branches` render additional backend-integration boxes.
7. Projects with `workAreas` show detailed work-area panels; other projects show
   the contributions grid.
8. Close-button clicks call `onClose`. The native dialog `cancel` event also calls
   it, enabling Escape dismissal in supporting browsers.
9. Backdrop dismissal checks both the event target and pointer coordinates
   outside the dialog rectangle so clicks inside content do not close it.
10. Clearing the selection unmounts the dialog. Effect cleanup closes it,
    restores body overflow, and restores focus when the previous element is an
    `HTMLElement`.

The native modal supplies browser focus containment. The dialog is labeled by
its heading, project triggers declare `aria-haspopup="dialog"`, and CSS provides
visible keyboard-focus outlines.

### Shared helper functions and barrel files

| Source | Function/export | Purpose |
| --- | --- | --- |
| [SectionWrapper.tsx](./apps/frontend/src/hoc/SectionWrapper.tsx) | `StarWrapper(Component, idName)` | Higher-order component exported as `SectionWrapper` through the HOC barrel. Returns a component named `HOC`; adds the section anchor and one-time viewport reveal. It does not render stars despite its internal name. |
| [motion.ts](./apps/frontend/src/utils/motion.ts) | `textVariant(delay = 0)` | Fades text in while moving from `y: -50` to `0`, using a spring transition. |
| [motion.ts](./apps/frontend/src/utils/motion.ts) | `fadeIn(direction, type, delay, duration)` | Returns `hidden`/`show` states with opacity and optional 100px translation. The `up` setting begins below the final position. |
| [motion.ts](./apps/frontend/src/utils/motion.ts) | `slideIn(direction, type, delay, duration)` | Moves from a percentage-based offset to the final position. Currently used with `"left"` by Contact. |
| [motion.ts](./apps/frontend/src/utils/motion.ts) | `staggerContainer(staggerChildren?, delayChildren = 0)` | Configures child-animation timing. The section wrapper uses the defaults, so no explicit child stagger interval is supplied there. |
| [styles.ts](./apps/frontend/src/styles.ts) | `styles` | Shared hero, section-heading, and uppercase-subheading class strings. |
| [assets/index.ts](./apps/frontend/src/assets/index.ts) | `logo`, `menu`, `close` | Bundled image imports used by navigation. |
| [components/index.ts](./apps/frontend/src/components/index.ts) | Component exports | Keeps imports in `App` concise. |
| [canvas/index.ts](./apps/frontend/src/components/canvas/index.ts) | `ComputersCanvas`, `StarsCanvas` | Re-exports canvas components. |
| [hoc/index.ts](./apps/frontend/src/hoc/index.ts) | `SectionWrapper` | Re-exports the section higher-order component. |

## How the visual styling works

### Three styling layers

1. [tailwind.config.cjs](./apps/frontend/tailwind.config.cjs) defines theme tokens.
   Tailwind scans the HTML entry and TypeScript/TSX source for classes.
2. Component `className` strings implement spacing, grids, typography, borders,
   responsiveness, and positioning.
3. [index.css](./apps/frontend/src/index.css) contains global rules and effects
   that are clearer as custom CSS: masks, keyframes, dialog backdrop, and flow
   connectors.

[postcss.config.cjs](./apps/frontend/postcss.config.cjs) uses
`@tailwindcss/postcss`, not `tailwindcss` directly: Tailwind 4 moved its PostCSS
plugin into this separate package. In [index.css](./apps/frontend/src/index.css),
`@import "tailwindcss"` loads Tailwind and
`@config "../tailwind.config.cjs"` explicitly loads the existing theme configuration.
Tailwind 4 handles imports and vendor prefixing without a separate Autoprefixer
plugin. Global resets are in `@layer base` so utility classes can override their
spacing. Vite emits the processed CSS into the frontend production assets.

The project uses Vite 8 with `@vitejs/plugin-react` 6. Keep these major versions
compatible when upgrading dependencies. Tailwind 4 targets modern browsers
(Safari 16.4+, Chrome 111+, Firefox 128+).

### Palette and typography

| Token/effect | Value or source | Visual role |
| --- | --- | --- |
| `primary` | `#050816` | Full-page dark background. |
| `secondary` | `#aaa6c3` | Muted copy and supporting text. |
| `tertiary` | `#151030` | Cards and dialog surfaces. |
| `black-100` | `#100d25` | Contact panel background. |
| Purple accent | Commonly `#915eff` | Hero marker, borders, and glow. |
| Cyan accent | Commonly `#62d9ff` | Architecture arrows, numbers, and focus outlines. |
| Font | Poppins imported from Google Fonts in global CSS | Shared typeface; falls back to sans-serif without network access. |

`.green-pink-gradient` paints a colored outer wrapper; a dark child with 1px
wrapper padding makes it look like a gradient border. `.brand-mark` brightens
the navigation logo and adds a drop shadow. `.contact-intro`, `.galileo-card`,
and `.hero-backdrop` use layered gradients rather than background photographs.

### Responsive layout rules

- Shared content width: `max-w-7xl`, which is 1280px with the current Tailwind
  defaults.
- Horizontal gutters: 16px initially, 24px from `sm`, 32px from `lg`.
- Custom `xs` breakpoint: 28.125rem (450px at the default root size), using the
  same unit as Tailwind 4's default breakpoints so responsive rules sort correctly.
  Standard breakpoints used here include `sm`
  640px, `md` 768px, `lg` 1024px, and `xl` 1280px.
- Skills: one column initially, two from `sm`, four from `lg`.
- Projects: one column initially, two from `sm`, three from `xl`.
- Experience: the timeline library switches to alternating two-column layout
  at 1170px, independently of Tailwind's breakpoints.
- Architecture flow: horizontal on larger screens; below 768px, blocks stack
  and connector SVGs rotate 90 degrees.
- Dialog: width is `min(1120px, calc(100% - 24px))`; maximum height is based on
  dynamic viewport height, with internal vertical scrolling.

`.hash-span` offsets anchors by 100px so the fixed navbar does not cover section
headings. Section wrappers reveal once with a negative bottom viewport margin
rather than waiting for a large fraction of a tall section to be visible.

### Hero layering and edge blending

In [Hero.tsx](./apps/frontend/src/components/Hero.tsx):

```text
hero section: centered, overflow hidden
  z-0: floating workstation container and masked canvas
  z-10: localized readability gradient
  z-20: HTML heading and description
```

On desktop, the scene is absolutely positioned at
`left: calc(6% + 50px)`, `top: 76px`, and `width: 94%`. The copy becomes a narrow
left column. On smaller screens the scene stays in document flow below the
introduction with a 3:2 aspect ratio.

The `.glb-scene-fade` class intersects a horizontal and a vertical mask. The
multiple opacity stops make all four edges gradually disappear into the dark
background. Desktop overrides move the right fade inward before clipping.
The mask affects both the loading PNG and canvas because it is applied to their
ancestor.

The `.hero-copy-shade` radial gradient is localized around the text instead of
placing an opaque strip over the scene. Text shadow adds another readability
layer.

### Pointer movement and floating animation

`handlePointerMove` normalizes pointer coordinates to approximately `[-1, 1]`:

```text
x = ((pointerX - sectionLeft) / sectionWidth) * 2 - 1
y = ((pointerY - sectionTop) / sectionHeight) * 2 - 1

rotateX = -y * 1.2 degrees
rotateY =  x * 1.5 degrees
shiftX  =  x * 8 pixels
shiftY  =  y * 6 pixels
```

The handler writes `--scene-tilt-x`, `--scene-tilt-y`, `--scene-shift-x`, and
`--scene-shift-y`. `.hero-scene-tilt` consumes these in a transform using a
1400px perspective and a 500ms easing transition. `resetPointer` restores zeros.

The outer `.hero-scene-float` independently moves up 8px halfway through a
9-second repeating animation. Separating the outer float from the inner tilt
lets both effects coexist. `pointer-events-none` keeps the decorative scene from
blocking interaction with HTML.

The reduced-motion media query disables the hero float, tilt transform, and
tilt transition. It does **not** currently disable all Framer Motion animations
or the rotating star field.

## How the GLB is constructed

Source: [create-workstation.ts](./apps/frontend/scripts/create-workstation.ts).

### Input, command, and outputs

Supply a PNG you have permission to use. Run from the monorepo root:

```sh
npm run generate:workstation -- /absolute/path/to/workstation01.png
```

The root script forwards the argument to the frontend workspace, where `tsx`
executes the TypeScript generator. The output directory is resolved relative
to the generator's own location, not your current terminal directory.

| Output | Purpose |
| --- | --- |
| [scene.glb](./apps/frontend/public/desktop_pc/workstation01/scene.glb) | Self-contained plane geometry, material, and embedded PNG. |
| [workstation01.png](./apps/frontend/public/desktop_pc/workstation01/textures/workstation01.png) | Copy of the source PNG used as the immediate loading preview. |
| [README.txt](./apps/frontend/public/desktop_pc/workstation01/README.txt) | Generated asset description and regeneration command. |

The command overwrites these output files. Keep the source artwork separately
if you want to preserve alternate versions.

### Construction pipeline

```text
PNG bytes
  -> validate PNG signature and read dimensions
  -> construct a Three.js plane with matching aspect ratio
  -> flip its vertical UV coordinates
  -> export scene as glTF JSON plus geometry buffer
  -> attach PNG texture and material references
  -> embed geometry and PNG in one binary buffer
  -> create padded JSON and BIN chunks
  -> write GLB header + chunks
```

1. **Read and inspect the PNG.** The script reads `process.argv[2]`, checks the
   eight-byte PNG signature, and reads width and height from header offsets 16
   and 20. It rejects zero dimensions. This is basic input validation, not a
   complete PNG decoder or image-integrity check.
2. **Provide `FileReader` compatibility.** Three.js's exporter expects browser
   `FileReader` methods even for geometry export. A small Node-compatible class
   implements `readAsArrayBuffer` and `readAsDataURL` using `Blob.arrayBuffer()`.
3. **Create geometry.** `PlaneGeometry(3, 3 * height / width)` preserves image
   proportions. The current 1536x1024 PNG produces a 3-by-2-unit plane.
4. **Create the material.** `MeshBasicMaterial` uses `DoubleSide`, so the plane
   can be drawn from either side. This is an unlit image presentation, not a
   physically shaded reconstruction.
5. **Flip UVs.** For each UV coordinate, `v` becomes `1 - v` to account for the
   image-origin convention used by glTF textures.
6. **Export an intermediate glTF.** `GLTFExporter.parseAsync` produces JSON.
   The script decodes its geometry buffer from a base64 data URI.
7. **Connect the image.** It adds image, sampler, and texture records and sets
   `pbrMetallicRoughness.baseColorTexture` to texture index zero. The sampler
   selects linear filtering, linear mipmap minification, and clamp-to-edge.
8. **Embed the PNG.** A cloned document replaces the image URI with a
   `bufferView` and `mimeType: "image/png"`. The binary payload holds padded
   geometry followed by image bytes and padding.
9. **Write GLB chunks.** JSON is padded with spaces; binary data is padded with
   zero bytes. Both chunks are aligned to 4-byte boundaries.
10. **Write the final files.** The generator writes the GLB, unchanged PNG
    bytes, and asset README, then logs the source dimensions and output path.

### GLB binary layout

```text
12-byte header
  magic:   0x46546c67 ("glTF" in little-endian byte order)
  version: 2
  length:  total file size

JSON chunk
  4-byte chunk length
  4-byte type: 0x4e4f534a
  padded scene/material/buffer JSON

BIN chunk
  4-byte chunk length
  4-byte type: 0x004e4942
  padded geometry + PNG bytes
```

The local helper `chunk(data, type)` creates an 8-byte chunk header and appends
the payload. No standalone `.gltf` or `.bin` is saved.

**Why keep a PNG next to a self-contained GLB?** The GLB does not need the external
PNG at runtime, but React displays that PNG immediately while the GLB downloads,
parses, and renders its first frame. Keeping the same source in both avoids a
visible content change.

### Limitations when replacing the image

This is a flat image on a mesh: there are no separate monitor, desk, keyboard,
or hidden surfaces to inspect by orbiting. A true volumetric workstation would
require a separately modeled asset and corresponding camera/interaction work.

The generator preserves any PNG aspect ratio, but the current hero wrapper and
camera-fit height assume the existing 3:2 artwork. If you use a different ratio,
review the `aspect-[3/2]` class in
[Hero.tsx](./apps/frontend/src/components/Hero.tsx) and the height calculation in
[Computers.tsx](./apps/frontend/src/components/canvas/Computers.tsx).

## How the model is rendered

All three components below are defined in
[Computers.tsx](./apps/frontend/src/components/canvas/Computers.tsx).

### `ComputersCanvas`: canvas and loading lifecycle

- `WORKSPACE_MODEL` points to `/desktop_pc/workstation01/scene.glb`.
- `WORKSPACE_PREVIEW` points to `/desktop_pc/workstation01/textures/workstation01.png`.
- `useGLTF.preload` starts loading the model ahead of component rendering.
- `ready` begins false, so an eager, high-priority PNG appears over the canvas.
- The preview is scaled by `0.9803921569`, approximately `1 / 1.02`, matching
  the camera's framing margin.
- `Canvas` starts with continuous frames, device pixel ratio constrained to
  `[1, 2]`, antialiasing, and a perspective camera with 35-degree vertical FOV,
  near plane 0.1, and far plane 100.
- `Suspense` waits for the GLB. Its fallback is null because the separate PNG
  already provides the loading visual.
- `WorkspaceModel` invokes the stable `handleReady` callback after its first
  explicit render. The preview is removed and the canvas switches to demand
  rendering.
- `data-workspace-ready` exposes readiness for browser checks.

Ambient and directional lights are present, but the current image-plane
material is unlit. Do not expect changing light intensity alone to relight
features baked into the source photograph.

`OrbitControls` has zoom and pan disabled, damping enabled, and the polar angle
fixed at `Math.PI / 2`. The decorative ancestor disables pointer events, so the
intended page interaction is CSS pointer tilt, not user orbiting.

### `WorkspaceModel`: load, normalize, and present

1. `useGLTF` loads the scene.
2. `useMemo` calculates its `Box3` bounds, center, and width. The scene receives
   the negative center offset and a width-normalization factor `3 / size.x`.
3. The outer group multiplies this factor by `MODEL_SCALE`, currently `1.35`.
4. An effect traverses meshes and their materials. For textured materials, it
   sets anisotropy to the renderer's supported maximum, marks textures/materials
   dirty, and disables tone mapping on those materials to preserve the image
   presentation.
5. `invalidate()` requests another frame after these changes.
6. A priority-1 `useFrame` callback explicitly renders the scene and calls
   `onReady()` only on the first render, tracked with a ref.

### `CanvasSizer`: resize without cropping the image

An effect gets the renderer's parent container and requires a perspective
camera. A `ResizeObserver` runs the local `resize()` function whenever its size
changes.

```text
aspect    = containerWidth / containerHeight
halfFov   = cameraFovInDegrees * PI / 360
fitWidth  = (3 * MODEL_SCALE) / (2 * aspect * tan(halfFov))
fitHeight = (2 * MODEL_SCALE) / (2 * tan(halfFov))
distance  = max(fitWidth, fitHeight) * 1.02
```

The renderer resizes to the container. The camera receives the new aspect and
distance, looks at the origin, and updates its projection matrix. The 1.02 factor
adds a small margin. Observer cleanup runs when the component unmounts.

## How the animated stars work

Source: [Stars.tsx](./apps/frontend/src/components/canvas/Stars.tsx).

- `Stars` allocates a `Float32Array(4998)` once through lazy state initialization.
  With three coordinates per vertex, that is **1666 points**, not 4998 stars.
- `random.inSphere` fills the positions inside a sphere of radius 1.2.
- Drei's `Points` and `PointMaterial` draw the points with a pink color, size
  `0.002`, perspective size attenuation, transparency, and disabled depth writes.
- `useFrame` decreases X rotation by `delta / 10` and Y rotation by `delta / 15`.
  Using elapsed frame time makes the speed less dependent on frame rate.
- The parent group begins with a Z rotation of `Math.PI / 4`.
- `StarsCanvas` uses a camera at `[0, 0, 1]` and an absolutely positioned,
  pointer-transparent decorative container behind the quotation section.

Unlike the workstation's demand-rendered scene after readiness, the star canvas
keeps animating. The random positions are not seeded, so reloads can show a
different arrangement. No star GLB asset is loaded or generated.

## Backend and interface walkthrough

### Shared runtime values and types

[packages/interface/src/index.ts](./packages/interface/src/index.ts) exports:

| Export | Kind | Purpose |
| --- | --- | --- |
| `HEALTH_PATH` | Runtime string | Single source for `/api/health`; used by server, client, and Vite proxy config. |
| `HealthResponse` | TypeScript interface | Describes `status: "ok"` and `service: "portfolio-backend"`. |
| `ApiErrorResponse` | TypeScript interface | Describes an error object with an `error` string. |
| `isHealthResponse(value)` | Runtime type guard | Rejects null, non-objects, missing properties, and unexpected status/service values. Extra properties are not explicitly rejected. |

Types alone disappear during compilation and cannot validate untrusted JSON.
That is why the package also includes a runtime guard.

### Server construction versus process startup

[server.ts](./apps/backend/src/server.ts) exports `createApp()`, which constructs
a Node HTTP server without choosing a port or starting the listener. Tests can
therefore bind it to an available ephemeral port.

Its request callback sets JSON content type, removes any query string from the
URL before routing, and handles the health endpoint. `satisfies` checks error
object shapes at compile time. Unknown paths return 404; unsupported health
methods return 405 and advertise `GET, HEAD`.

[index.ts](./apps/backend/src/index.ts) is the executable entry:

1. Reads `PORT`, defaulting to `"3001"`.
2. Requires decimal digits and a value from 1 through 65535.
3. Reads `HOST`, defaulting to `"127.0.0.1"`.
4. Calls `createApp()` and starts listening.
5. Logs server errors and sets a nonzero exit code.
6. On `SIGINT` or `SIGTERM`, stops accepting new connections and closes idle
   connections, reporting shutdown errors.

### Frontend request flow

The `getHealth(signal?)` function in
[health.ts](./apps/frontend/src/api/health.ts):

```text
fetch shared route with optional AbortSignal
  -> reject non-success HTTP status
  -> parse JSON as unknown
  -> validate with isHealthResponse
  -> return Promise<HealthResponse>
```

HTTP errors, invalid response shapes, invalid JSON, and network failures reject
the promise rather than returning a success-shaped default. A future caller
should present failures in its own UI. No existing page component automatically
calls this function.

During development and preview, [vite.config.ts](./apps/frontend/vite.config.ts)
proxies the shared health path to the configured backend host and port. The
browser calls its frontend origin, while Vite forwards the request.

### Check the API manually

With `npm run dev` running, use a second terminal:

```sh
curl -i http://127.0.0.1:3001/api/health
curl -I http://127.0.0.1:3001/api/health
curl -i -X POST http://127.0.0.1:3001/api/health
curl -i http://127.0.0.1:3001/missing
curl -i http://localhost:5173/api/health
```

Expected statuses are 200, 200, 405, 404, and 200 respectively. Use the frontend
port Vite actually printed if 5173 was occupied.

## Customize and extend the project

### Quick edit guide

| Change | Edit |
| --- | --- |
| Browser title and favicon reference | [index.html](./apps/frontend/index.html) |
| Favicon image | [favicon.svg](./apps/frontend/public/favicon.svg) |
| Brand text and menu behavior | [Navbar.tsx](./apps/frontend/src/components/Navbar.tsx) |
| Brand/menu/close images | [assets/](./apps/frontend/src/assets/) |
| Hero name, introduction, and scene positioning | [Hero.tsx](./apps/frontend/src/components/Hero.tsx) |
| Overview paragraph | [About.tsx](./apps/frontend/src/components/About.tsx) |
| Navigation, skills, employer, experiences, and projects | [constants/index.ts](./apps/frontend/src/constants/index.ts) |
| Project detail layout | [Works.tsx](./apps/frontend/src/components/Works.tsx) |
| Quotation and portrait URL | [Feedbacks.tsx](./apps/frontend/src/components/Feedbacks.tsx) |
| Contact address | `CONTACT_EMAIL` in [Contact.tsx](./apps/frontend/src/components/Contact.tsx) |
| Colors, shadow, and custom breakpoint | [tailwind.config.cjs](./apps/frontend/tailwind.config.cjs) |
| Shared heading sizes | [styles.ts](./apps/frontend/src/styles.ts) |
| Hero masks, float, tilt, dialog, and connectors | [index.css](./apps/frontend/src/index.css) |
| Animation variant timing | [motion.ts](./apps/frontend/src/utils/motion.ts) |
| Model camera, scale, and loading preview | [Computers.tsx](./apps/frontend/src/components/canvas/Computers.tsx) |
| Star count, radius, color, and rotation | [Stars.tsx](./apps/frontend/src/components/canvas/Stars.tsx) |
| Workstation artwork | Run [create-workstation.ts](./apps/frontend/scripts/create-workstation.ts) on a replacement PNG. |

### Add a project

Append an entry to `projects` in
[constants/index.ts](./apps/frontend/src/constants/index.ts). Follow a nearby
entry's shape: `name`, `icon`, `description`, `flow`, `period`, `problem`,
`responsibility`, `overview`, `contributions`, `technologies`, and `outcome`.

Each flow item has `name`, `detail`, and optionally `link` for the connector
label. Optional `featuredTechnologies` controls card badges; otherwise the first
three technologies are shown. Optional `branches` adds integration boxes, and
optional `workAreas` switches the modal to detailed work-area panels.
`period` and `overview` are stored in current data but are not displayed by the
current project UI.

The component derives `Project` with `(typeof projects)[number]`; run type checks
after changing the data. Use stable, unique project names because names also
serve as React keys.

### Add a section

1. Create a TSX component under [components/](./apps/frontend/src/components/).
2. Export the component through `SectionWrapper(Component, "section-id")` if
   it should share the standard section layout and reveal behavior.
3. Export it from the [component barrel](./apps/frontend/src/components/index.ts).
4. Insert it into [App.tsx](./apps/frontend/src/App.tsx).
5. Add the matching ID to `navLinks` if it needs a navigation entry.

### Understand public versus bundled assets

Files in [public/](./apps/frontend/public/) are served from the URL root and
copied without hashed names. For example:

```text
Disk: apps/frontend/public/desktop_pc/workstation01/scene.glb
URL:  /desktop_pc/workstation01/scene.glb
```

Do not include `public/` in the browser URL.

Files imported from [src/assets/](./apps/frontend/src/assets/) are processed by
Vite and usually receive hashed production names. The employer logo is imported
from there and displayed at 56px tall in timeline cards.

### Add an API endpoint

1. Add shared route constants, request/response types, and response guards to
   [interface source](./packages/interface/src/index.ts).
2. Implement method checks and explicit JSON error responses in
   [server.ts](./apps/backend/src/server.ts).
3. Add a browser client under [api/](./apps/frontend/src/api/) that checks HTTP
   status and validates parsed JSON.
4. Add the route to the Vite proxy configuration. Currently only the health
   path is configured; a new endpoint is not proxied automatically.
5. Add backend/client tests and connect a UI with explicit loading/error states.
6. Add the corresponding production reverse-proxy rule.

Do not put credentials, persistence logic, React components, or Node-only APIs
in the shared interface package. The current server has no authentication,
request-body parser, persistence, or contact-form implementation.

## Validation and troubleshooting

### Automated checks

```sh
npm run typecheck
npm test
npm run build
```

- [server.test.ts](./apps/backend/src/server.test.ts): checks the exact health
  response, content type, query strings, HEAD, unknown routes, and unsupported
  methods through an actual local HTTP listener.
- [health.test.ts](./apps/frontend/src/api/health.test.ts): checks the shared
  request route, AbortSignal forwarding, response validation, HTTP failures,
  network errors, and invalid JSON using a mocked fetch.
- There are currently eight test cases total. These are not full visual
  regression tests or tests of every React component.
- There is no lint script in the current project.

### Manual browser checklist

1. Open desktop and phone-sized viewports; inspect the navbar and section gutters.
2. Confirm the workstation PNG appears first and gives way to the rendered model.
3. Move the mouse over the hero, then move away; check tilt and reset.
4. Scroll through skills, timeline, and project cards.
5. Open a project and verify its flow blocks, Close button, backdrop dismissal,
   native Escape cancellation, focus restoration, and restored background scroll.
6. Confirm the star field stays behind the quotation rather than the whole page.
7. Verify the email link opens a configured mail application.
8. Inspect `/api/health` directly and through the frontend proxy.

### Common issues

| Symptom | Explanation and action |
| --- | --- |
| `@portfolio/interface` cannot be resolved | Run `npm ci` at the root and use `npm run dev` or `npm run build` so Turbo builds shared exports before consumers. Running workspace Vite directly before interface compilation bypasses that dependency step. |
| Installation reports React peer conflicts | Install from the root so [.npmrc](./.npmrc) is applied consistently with the lockfile. Avoid mixing package managers or running unrelated forced major upgrades. |
| PostCSS says not to use `tailwindcss` directly | Tailwind 4 requires `@tailwindcss/postcss` in the PostCSS config, `@import "tailwindcss"` in global CSS, and `@config` to load this project's JavaScript theme. Run `npm ci` after pulling dependency changes, then restart development. |
| Backend reports `EADDRINUSE` | Another process owns the port. Use `PORT=4001 npm run dev` or stop the specific server you started. Vite's frontend port and the API port are separate settings. |
| Frontend URL is not 5173 | Vite normally chooses the next available port. Read the URL printed in its output. |
| API proxy fails while the portfolio works | The page uses local content, but the health client requires a running backend. Check the configured `HOST`/`PORT` and backend terminal output. |
| Invalid `PORT` stops startup | Use an integer from 1 through 65535. Empty or nonnumeric values are not accepted. |
| GLB or preview returns 404 | Check both files in the workstation public directory and request their root-relative URLs without `/public`. |
| New image is cropped or mismatched | Regenerate both assets together. For artwork not using 3:2 proportions, review hero aspect ratio and camera-fit height as described above. |
| Generator cannot read an image | Pass a readable PNG file path after `--`; JPEGs are not accepted. The command overwrites generated outputs. |
| WebGL does not render | Check browser hardware acceleration, WebGL support, asset requests, and console errors. The PNG is a loading preview, not a complete error-recovery system. |
| Portrait or font does not load offline | The Galileo portrait is remote and Poppins uses Google Fonts; neither is fully bundled for offline use. |
| React reports an invalid element type at `ServiceCard` | Use `react-tilt` 1.x and `import { Tilt } from "react-tilt"`. The old 0.1.x default export is incompatible with this project's Vite 8 development bundling. |
| Build warns about bundle size or old Browserslist data | These are dependency/performance maintenance items. The current Three.js bundle is large; warnings do not by themselves mean the build failed. |
| npm reports vulnerabilities | Review dependency maintenance separately; do not blindly use `npm audit fix --force`, which can introduce breaking upgrades. |

The `HOST=... PORT=... command` examples use POSIX shell syntax. In PowerShell,
set environment variables before running the command:

```powershell
$env:PORT = "4001"
npm run dev
```

## Production deployment

### GitHub Pages

For this repository's root URL, `https://arpt-singh.github.io/`, use the
[Pages deployment workflow](./.github/workflows/deploy-pages.yml).

1. In the GitHub repository, open **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**, not
   **Deploy from a branch**.
3. Commit and push the workflow and project files to `main`.
4. Open **Actions > Deploy portfolio to GitHub Pages** and wait for both the
   build and deployment jobs to succeed. You can also use **Run workflow**.
5. Reload `https://arpt-singh.github.io/` after deployment completes.

The workflow installs from the root lockfile, builds the frontend and shared
contracts through Turborepo, and uploads **only `apps/frontend/dist/`**.
Publishing the repository root instead can cause Pages to render this README
because the root has no site `index.html`. Do not move the source HTML entry to
the root or commit build outputs to work around that problem.

GitHub Pages hosts static files only: it does not run this project's Node
backend, and `/api/health` will not work there without a separate API deployment
and corresponding client configuration. The portfolio itself does not call the
API automatically, so its content and direct-email contact link work without it.
The current root-relative assets and default Vite base match this user-site URL.

### Local production smoke test

Build once from the root:

```sh
npm ci
npm run build
```

In terminal A, start the compiled backend:

```sh
npm start
```

In terminal B, preview the frontend:

```sh
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Visit `http://127.0.0.1:4173` and
`http://127.0.0.1:4173/api/health`. Preview forwards the health request to the
backend on its default port. If the backend uses another `PORT`, supply the same
environment value to the preview command. Stop both commands with `Ctrl+C`.
Vite preview is a local verification server, not the recommended production
hosting solution.

### Real hosting boundaries

| Artifact | How to host |
| --- | --- |
| Frontend `apps/frontend/dist/` | Static web host or reverse proxy with an SPA `index.html` fallback. |
| Backend `apps/backend/dist/` | Node process running the compiled entry point, with its runtime dependencies available. |
| Interface `packages/interface/dist/` | Keep the compiled package and npm workspace resolution available to the backend. It is not a separate HTTP service. |

The backend does not serve the frontend build. Vite's proxy settings do not
become part of static files. Configure a production reverse proxy so
`/api/health` reaches Node before the SPA fallback catches it. The frontend
currently assumes root hosting through absolute model/icon paths and the
default Vite base; deploying under a URL subdirectory requires coordinated
base-path and asset-path changes.

Keep the backend bound to loopback when a reverse proxy runs on the same host.
In container environments, an intentional `HOST=0.0.0.0` may be necessary;
expose it only according to your deployment's access controls. The application
itself does not configure TLS.

The simplest deployment preserves the workspace layout, installs at the root,
builds, and starts the backend from the root. Copying only its JavaScript entry
file will not include the runtime interface package dependency.

## Content and attribution

Engineering and research descriptions use conceptual responsibilities rather
than internal implementation details. Review employer disclosure requirements
before publishing professional work.

Brand icon attribution is retained in
[public/technology-icons/README.txt](./apps/frontend/public/technology-icons/README.txt).
Other engineering symbols are descriptive SVGs generated in the constants module,
not official brand marks.

Originally based on the JavaScript Mastery
[3D portfolio tutorial](https://www.youtube.com/watch?v=0fYi8SGA20k).
