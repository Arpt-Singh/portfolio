export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const serviceSymbol = (path: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 32 32"><defs><linearGradient id="edge" x2="1" y2="1"><stop stop-color="#62efff"/><stop offset="1" stop-color="#b05bff"/></linearGradient></defs><rect x="3" y="5" width="26" height="26" rx="7" fill="#512a88"/><rect x="2" y="2" width="26" height="26" rx="7" fill="#17112f" stroke="url(#edge)" stroke-width="1.5"/><g transform="translate(3 3)" fill="none" stroke="url(#edge)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></g></svg>`,
  )}`;

const services = [
  {
    title: "Embedded Systems",
    icon: serviceSymbol("M6 6h12v12H6zM9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"),
    technologies: ["C/C++", "STM32", "ESP32-S3", "Embassy", "CAN"],
  },
  {
    title: "Rust & Systems Programming",
    icon: "/technology-icons/rust.svg",
    technologies: ["Rust", "IPC", "gRPC", "Async", "File I/O", "Protocol Design"],
  },
  {
    title: "Embedded Linux & OS Architecture",
    icon: "/technology-icons/linux.svg",
    technologies: ["Linux", "Yocto", "OpenEmbedded", "BitBake", "Weston", "systemd"],
  },
  {
    title: "Wireless Communication & Signal Processing",
    icon: serviceSymbol("M2 8a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8 16a5 5 0 0 1 8 0M11 20h2"),
    technologies: ["BLE ", "RSSI", "CAN", "Filtering", "Hysteresis"],
  },
  {
    title: "Machine Learning & Computer Vision",
    icon: serviceSymbol("M5 5l7 7 7-7M5 19l7-7 7 7M5 5v14m14-14v14M3 3h4v4H3zM17 3h4v4h-4zM10 10h4v4h-4zM3 17h4v4H3zM17 17h4v4h-4z"),
    technologies: ["Python", "PyTorch", "Deep Learning", "Image Processing", "U-Net", "MobileNet", "CNN"],
  },
  {
    title: "Application & Interface Engineering",
    icon: serviceSymbol("M2 4h20v16H2zM2 8h20M5 6h1m3 0h1M8 12l-3 2 3 2m8-4 3 2-3 2m-3-5-2 6"),
    technologies: ["Tauri","React","TypeScript",  "Redis", "HTML", "CSS", "Tailwind CSS"],
  },

  {
    title: "Physics, Electronics & Control",
    icon: serviceSymbol("M2 12h4l2-5 4 10 4-10 2 5h4M6 3h12M6 21h12"),
    technologies: ["Analog Electronics", "Signal Analysis", "Electromagnetics", "Sensor"],
  },
  {
    title: "Engineering Automation & Quality",
    icon: serviceSymbol("M12 2l8 3v7c0 5-8 10-8 10S4 17 4 12V5zM8 12l3 3 5-6"),
    technologies: ["Azure DevOps", "Playwright", "SonarQube"],
  },
];

export const employer = {
  name: "Medtronic Engineering & Innovation Center (MEIC)",
  url: "https://www.medtronic.com/in-en/our-company/india/medtronic-engineering-innovation-center.html",
  logo: medtronicLogo,
};

const experiences = [
  {
    title: "Research and Development Intern",
    focus: "Embedded Research & Experimental Analysis",
    icon: serviceSymbol("M2 12h4l2-5 4 10 4-10 2 5h4M6 3h12M6 21h12"),
    iconBg: "#383E56",
    date: "15 November 2023 - 1 August 2024",
    points: [
      "Responsibility: Developed measurement and signal-analysis software for embedded motor research, including experimental setup, data acquisition, and validation.",
      "Technologies: Hall-effect sensing, NI-DAQmx data acquisition, LabVIEW, MATLAB, and a controller-based test setup.",
      "Achievement: Research accepted for presentation at a U.S. science and technology event.",
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "Embedded Systems Design & Technical Leadership",
    icon: serviceSymbol("M6 6h12v12H6zM9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"),
    iconBg: "#E6DEDD",
    date: "1 August 2024 - 17 April 2025",
    points: [
      "Design contribution: Led software architecture and implementation from scratch across embedded firmware, host communication services, and Python test clients.",
      "Responsibility: Defined component boundaries, typed service interfaces, and reusable build modules; developed touch-classification services for desktop integration.",
      "Technologies: Embedded C, Rust, Python, CMake, RTOS, Protocol Buffers/gRPC, and Tauri.",
      "Achievement: Built a reusable framework separating test logic, communication services, and embedded device control.",
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "Applied AI/ML & Research",
    icon: serviceSymbol("M4 5h4v4H4zM16 5h4v4h-4zM10 16h4v4h-4zM6 9l6 7 6-7M8 7h8"),
    iconBg: "#383E56",
    date: "17 April 2025 - 1 January 2026",
    points: [
      "Design contribution: Worked with my technical Fellow as a two-person development team on sensor calibration and machine-learning research.",
      "Responsibility: Developed signal preprocessing, model-training, and evaluation software; contributed to mathematical modeling and technical papers supporting AI/ML capability development.",
      "Technologies: Python, PyTorch, MATLAB, statistical analysis, mathematical modeling, signal processing, and linear algebra.",
      "Achievement: Co-developed two research projects selected and presented at a U.S. science and technology conference.",
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "FEBE - Frontend & Backend Engineering",
    icon: serviceSymbol("M3 4h18v14H3zM3 8h18M7 12l-2 2 2 2m10-4 2 2-2 2M13 11l-2 6M8 22h8M12 18v4"),
    iconBg: "#E6DEDD",
    date: "1 January 2026 - Present",
    points: [
      "Design contribution: Designed reusable presentation components and frontend/backend boundaries, separating interaction logic, application state, and persistent data. Developed shared styling and SVG assets for consistent, multilingual interfaces.",
      "Responsibility: Designed application-state management, change-detection algorithms, and Rust data-persistence interfaces. Defined configuration lifecycle and schema-evolution boundaries, and improved consistency across UI state, backend calculations, and event-driven system updates.",
      "Technologies: React, TypeScript, Rust, Tauri, SCSS, SVG, Zustand, SQLite/Diesel, Protocol Buffers/gRPC, Vitest, PyVision, and Azure DevOps.",
      "Achievement: Improved application-state consistency and numerical correctness through shared rules, data-driven calculations, and typed interfaces. Extended service lifecycle controls and verified changes through regression tests and hardware-based evaluation.",
    ],
  },
];

const projects = [
  {
    name: "Oscillatory Motion Analysis",
    icon: serviceSymbol("M2 12c3-14 5 14 8 0s5 14 8 0h4M4 21h16M4 3v18"),
    description: "Developed a measurement and signal-processing workflow to estimate angular acceleration from changing velocity, supporting experimental analysis of oscillatory motion and transient torque and power requirements.",
    flow: [
      { name: "Measurement", detail: "Acquire motion signals from the experimental setup.", link: "Sampled signals" },
      { name: "Signal Analysis", detail: "Filter signals and estimate angular acceleration.", link: "Motion estimates" },
      { name: "Engineering Evaluation", detail: "Assess oscillatory motion and document findings." },
    ],
    period: "15 November 2023 - 1 August 2024",
    problem: "Speed measurements alone did not characterize acceleration during oscillatory motor motion.",
    responsibility: "Developed measurement software, experimental validation, and signal analysis.",
    overview: "Investigated angular acceleration to support analysis of transient motion, torque, and power requirements. Built a measurement workflow connecting data acquisition, signal processing, and experimental evaluation.",
    contributions: ["Designed acquisition and analysis workflows for oscillatory motion.", "Developed signal filtering and acceleration estimation software.", "Documented experimental findings in a research presentation."],
    technologies: ["LabVIEW", "MATLAB", "NI-DAQmx", "Signal processing"],
    outcome: "Research accepted for presentation at a U.S. science and technology event.",
  },
  {
    name: "Modular Embedded Systems Architecture",
    icon: serviceSymbol("M6 6h12v12H6zM9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"),
    description: "Designed a reusable embedded framework from scratch, separating real-time device control, typed host services, and test software through defined component interfaces and concurrency boundaries.",
    flow: [
      { name: "Test Software", detail: "Build reusable commands and client interfaces.", link: "Typed requests" },
      { name: "Host Services", detail: "Separate service contracts from transport-specific code.", link: "Device commands" },
      { name: "Embedded Control", detail: "Handle real-time processing and modular device interfaces." },
    ],
    period: "1 August 2024 - 1 August 2025",
    problem: "Multiple test applications required reusable embedded software and consistent host-to-device interfaces.",
    responsibility: "Led system design and developed firmware, host services, and test clients from scratch.",
    overview: "Designed a common framework that separated test logic, host communication, and embedded device control. Focused on reusable modules and clearly defined interfaces rather than application-specific coupling.",
    contributions: ["Built reusable Python test interfaces and typed host services.", "Designed embedded components for real-time processing and hardware integration.", "Defined interface contracts, build modules, concurrency boundaries, and error handling."],
    technologies: ["Embedded C", "Rust", "Python", "CMake", "RTOS", "Protobuf/gRPC"],
    outcome: "Developed a reusable framework separating test software, communication services, and embedded control.",
  },
  {
    name: "Model-Based Sensor Calibration",
    icon: serviceSymbol("M4 3v18h17M7 17l4-6 4 2 5-8M7 15l13-9"),
    description: "Combined experimental characterization, statistical analysis, and mathematical modeling to compensate for nonlinear sensor response, with calibration software integrated into embedded processing.",
    flow: [
      { name: "Characterization", detail: "Collect measurements and analyze sensor response.", link: "Measurement data" },
      { name: "Model Development", detail: "Develop a mathematical calibration relationship.", link: "Calibration model" },
      { name: "Embedded Implementation", detail: "Apply calibration to support consistent input-output behavior." },
    ],
    period: "1 August 2025 - 1 January 2026",
    problem: "Nonlinear sensor response made consistent input-output behavior difficult to achieve.",
    responsibility: "Worked with my technical Fellow on measurement analysis, calibration software, and embedded implementation.",
    overview: "Applied predictive engineering and mathematical modeling to characterize sensor behavior and support calibration. Combined experimental measurements, statistical analysis, and embedded software development.",
    contributions: ["Contributed as part of a two-person development team.", "Analyzed measurement data and developed calibration software.", "Authored a research paper documenting the engineering approach."],
    technologies: ["Mathematical modeling", "Statistical analysis", "Embedded software"],
    outcome: "Research selected and presented at a U.S. science and technology conference.",
  },
  {
    name: "Generative ML for Signal Evaluation",
    icon: serviceSymbol("M4 5h4v4H4zM16 5h4v4h-4zM10 16h4v4h-4zM6 9l6 7 6-7M8 7h8"),
    description: "Developed synthetic signal-generation software with preprocessing, model training, and statistical signal comparison to support evaluation of classification models in a two-person research team.",
    flow: [
      { name: "Signal Preparation", detail: "Preprocess reference signals for research experiments.", link: "Prepared signals" },
      { name: "Model Training", detail: "Train software to generate synthetic evaluation signals.", link: "Generated signals" },
      { name: "Signal Evaluation", detail: "Compare generated and reference signal characteristics." },
    ],
    period: "1 August 2025 - 1 January 2026",
    problem: "Signal-classification research needed additional evaluation data.",
    responsibility: "Worked with my technical Fellow on synthetic signal generation, model training, and evaluation.",
    overview: "Developed research software for generating synthetic signals to support evaluation of signal-classification models. Focused on data preparation, reproducible experiments, and comparison of generated and reference signals.",
    contributions: ["Contributed as part of a two-person development team.", "Developed signal preprocessing and model-training software.", "Evaluated generated signals and authored a research paper."],
    technologies: ["Python", "PyTorch", "MATLAB", "Signal processing", "Machine learning"],
    outcome: "Research selected and presented at a U.S. science and technology conference.",
  },
  {
    name: "Multi-Touch Gesture Classification",
    icon: serviceSymbol("M8 14V6a2 2 0 0 1 4 0v6-8a2 2 0 0 1 4 0v9l3-3 3 3-6 8H10l-7-7 3-3 2 3"),
    description: "Developed touch-interaction classification using motion analysis and linear algebra, integrating Rust processing with a Tauri application to distinguish pinch gestures and suppress unintended interface scaling.",
    flow: [
      { name: "Touch Input", detail: "Process multi-touch interactions from a capacitive display.", link: "Touch input" },
      { name: "Rust Classification Service", detail: "Distinguish pinch gestures from other touch interactions.", link: "Classification result" },
      { name: "Desktop Integration", detail: "Use results in Tauri gesture handling to suppress unintended zoom." },
    ],
    period: "Recent 3-month research project",
    problem: "Native pinch-to-zoom could cause unexpected scaling during valid multi-touch interactions.",
    responsibility: "Developed gesture classification and a Rust service integrated with a Tauri desktop GUI.",
    overview: "Investigated touch-interaction reliability on capacitive displays. Developed software to distinguish pinch gestures from other interactions and support selective suppression of unintended zoom.",
    contributions: ["Developed touch-analysis and classification software.", "Integrated classification results into desktop gesture handling.", "Authored a research paper describing the approach."],
    technologies: ["Rust", "Tauri", "gRPC", "Linear algebra", "Touch processing"],
    outcome: "Developed a desktop-integrated research solution and authored a paper on touch-interaction reliability.",
  },
  {
    name: "Full-Stack Desktop Systems Architecture",
    icon: serviceSymbol("M2 3h20v12H2zM2 7h20M8 20h8M12 15v5M6 10l2 2-2 2m12-4-2 2 2 2"),
    featuredTechnologies: ["React", "Rust", "SQLite"],
    description: "Designed component-based interfaces, recursive change detection, and Rust application services with SQLite persistence, Diesel schema migrations, and JSON-based database seeding. Applied explicit state transitions and data-driven calculations for cross-layer consistency.",
    flow: [
      { name: "React / TypeScript", detail: "Component-based views, shared styles, SVG graphics, and multilingual input.", link: "State updates" },
      { name: "Zustand / API Clients", detail: "Separate editable configuration from runtime state; detect nested changes.", link: "Tauri commands" },
      { name: "Rust / Tauri", detail: "Typed application interfaces, capability rules, control calculations, and event handling." },
    ],
    branches: [
      { name: "SQLite / Diesel", detail: "Persistent configuration with versioned schema migrations and JSON-based initial seeding." },
      { name: "Protobuf / gRPC", detail: "Typed service contracts for device commands and runtime status." },
    ],
    period: "July 2025 - Present",
    problem: "Maintain consistent configuration and runtime behavior across UI state, Rust services, and persistent storage.",
    responsibility: "Designed component interfaces, state and change-detection logic, persistence integration, and data-driven control algorithms.",
    overview: "Contributed to desktop application design and reliability across reusable presentation components, editing workflows, application logic, and backend integration.",
    contributions: [
      "Separated reusable presentation components, application-state transitions, and backend logic.",
      "Replaced repeated conditionals with shared capability rules, typed values, and data-driven calculations.",
      "Addressed regression cases through targeted tests, hardware verification, and review-driven changes.",
    ],
    workAreas: [
      {
        name: "Component Architecture & State Consistency",
        detail: "Reusable views and input components with shared SCSS/SVG assets. Recursive object comparison and baseline tracking distinguish edited data from runtime state; explicit state transitions preserve consistency across navigation, validation, and configuration updates.",
      },
      {
        name: "Persistence & Service Boundaries",
        detail: "Rust/Diesel integrates SQLite storage, JSON initialization, and schema evolution. Typed Tauri commands and Protobuf/gRPC contracts separate presentation, persistence, and device services; lifecycle/status interfaces expose backend state.",
      },
      {
        name: "Algorithms & Event Semantics",
        detail: "Table-driven control rules, bounded numeric transformations, cursor-aware text editing, and sample-based signal classification. Centralized capability checks, ordered notifications, and event deduplication keep command handling and feedback consistent.",
      },
      {
        name: "Verification & Integration",
        detail: "State-transition and numerical-boundary regression tests, hardware-based evaluation, and PyVision checks. Maintained test discovery, reproducible dependencies, and design/review documentation across frontend and backend changes.",
      },
    ],
    technologies: ["React", "TypeScript", "Rust", "Tauri", "SCSS", "SVG", "Zustand", "SQLite", "Diesel ORM", "Diesel Migrations", "JSON", "Protobuf/gRPC", "Vitest", "PyVision", "Azure DevOps"],
    outcome: "Improved separation of concerns, state consistency, and numerical correctness across the desktop application through reusable components, shared rules, backend interfaces, and regression-tested changes.",
  },
];

export { services, experiences, projects };
import medtronicLogo from "../assets/medtronic-logo.png";
