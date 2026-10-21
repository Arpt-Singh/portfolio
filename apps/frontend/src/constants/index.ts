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

const services = [
  {
    title: "Application & Interface Engineering",
    icon: `${import.meta.env.BASE_URL}technology-icons/react.svg`,
    technologies: ["React", "TypeScript", "HTML", "CSS", "SCSS", "Tailwind CSS", "Zustand", "Tauri", "SQLite", "Diesel ORM", "Redis"],
  },
  {
    title: "Embedded System Design",
    icon: `${import.meta.env.BASE_URL}technology-icons/stmicroelectronics.svg`,
    technologies: ["C/C++", "STM32", "ESP32-S3", "RTOS", "Embassy", "CAN"],
  },
  {
    title: "Rust & Systems Programming",
    icon: `${import.meta.env.BASE_URL}technology-icons/rust.svg`,
    technologies: ["Rust", "IPC", "Protobuf/gRPC", "Async", "File I/O", "Protocol Design"],
  },
  {
    title: "Embedded Linux & OS Architecture",
    icon: `${import.meta.env.BASE_URL}technology-icons/linux.svg`,
    technologies: ["Linux", "Yocto", "OpenEmbedded", "BitBake", "Weston", "systemd"],
  },
  {
    title: "Machine Learning & Computer Vision",
    icon: `${import.meta.env.BASE_URL}technology-icons/pytorch.svg`,
    technologies: ["Python", "PyTorch", "Deep Learning", "Image Processing", "U-Net", "MobileNet", "CNN"],
  },
  {
    title: "Wireless Communication & Signal Processing",
    icon: `${import.meta.env.BASE_URL}technology-icons/bluetooth.svg`,
    technologies: ["BLE ", "RSSI", "CAN", "Filtering", "Hysteresis"],
  },

  {
    title: "Engineering Automation & Quality",
    icon: `${import.meta.env.BASE_URL}technology-icons/playwright.svg`,
    technologies: ["Azure DevOps", "Playwright", "SonarQube", "Vitest"],
  },
  {
    title: "Physics, Electronics & Control",
    icon: `${import.meta.env.BASE_URL}technology-icons/quantum-state.svg`,
    technologies: ["Analog Electronics", "Signal Analysis", "Electromagnetics", "Sensor"],
  },
];

export const employer = {
  name: "Medtronic Engineering & Innovation Center (MEIC)",
  url: "https://www.medtronic.com/in-en/our-company/india/medtronic-engineering-innovation-center.html",
  logo: medtronicLogo,
};

const experiences = [
  {
    title: "Enterprise Software Engineer - I",
    focus: "FEBE - Frontend & Backend Engineering",
    date: "1 January 2026 - Present",
    paragraphs: [
      "Designed reusable UI components and clear frontend/backend boundaries, separating interaction logic, application state, and stored data. Built shared styles and SVG assets for consistent, multilingual interfaces.",
      "Developed state management, change-detection algorithms, and Rust persistence interfaces. Defined how configuration is loaded, updated, and stored as database schemas change, keeping UI state, backend calculations, and system events consistent.",
      "Used React, TypeScript, Rust, Tauri, SCSS, SVG, Zustand, SQLite/Diesel, and Protocol Buffers/gRPC, with Vitest, PyVision, and Azure DevOps for testing and delivery.",
      "Improved state consistency and numerical correctness through shared rules, data-driven calculations, and typed interfaces. Extended service lifecycle controls and verified changes with regression tests and hardware evaluation.",
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "Applied AI/ML & Research",
    date: "17 April 2025 - 1 January 2026",
    paragraphs: [
      "Worked with my technical Fellow in a two-person development team on sensor calibration and machine-learning research. Developed software for signal preprocessing, model training, and evaluation.",
      "Used Python, PyTorch, and MATLAB alongside statistical analysis, mathematical modeling, signal processing, and linear algebra. Contributed to the models and technical papers documenting the research.",
      "Co-developed two research projects that were selected and presented at a U.S. science and technology conference.",
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "Embedded Systems Design & Technical Leadership",
    date: "1 August 2024 - 17 April 2025",
    paragraphs: [
      "Led software architecture and implementation from scratch across embedded firmware, host communication services, and Python test clients. Defined component boundaries, typed service interfaces, and reusable build modules.",
      "Used Embedded C, Rust, Python, CMake, an RTOS, and Protocol Buffers/gRPC to connect the system layers. Also developed touch-classification services for integration with a Tauri desktop application.",
      "Built a reusable framework that separates test logic, communication services, and embedded device control, allowing each layer to be developed through clear interfaces.",
    ],
  },
  {
    title: "Research and Development Intern",
    focus: "Embedded Research & Experimental Analysis",
    date: "15 November 2023 - 1 August 2024",
    paragraphs: [
      "Developed measurement and signal-analysis software for embedded motor research, covering the experimental setup, data acquisition, and validation.",
      "Connected Hall-effect sensing and NI-DAQmx data acquisition with LabVIEW and MATLAB analysis in a controller-based test setup.",
      "The research was accepted for presentation at a U.S. science and technology event.",
    ],
  },
];

const projects = [
  {
    name: "Oscillatory Motion Analysis",
    description: "Built a measurement pipeline for oscillatory motor motion, where speed readings alone could not explain changes in acceleration, torque, and power.",
    solution: "Connected NI-DAQmx data acquisition to LabVIEW and MATLAB analysis. Separated signal collection, filtering, and acceleration estimation into stages, then checked the results against experimental measurements.",
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
    description: "Designed a shared embedded framework so multiple test applications could use the same device-control software and host interfaces instead of separate implementations.",
    solution: "Split the system into Python test clients, typed Rust host services, and Embedded C firmware. Defined Protobuf/gRPC contracts, RTOS concurrency boundaries, and reusable CMake modules to keep test logic separate from communication and real-time control.",
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
    description: "Developed sensor-calibration software to handle nonlinear sensor response and support consistent input-output behavior.",
    solution: "Worked with my technical Fellow to build a flow from experimental measurements to statistical analysis, a mathematical calibration model, and embedded processing. Used the model to compensate for sensor response in software.",
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
    description: "Built a synthetic-signal pipeline to provide additional evaluation data for signal-classification research.",
    solution: "Worked in a two-person team to separate preprocessing, model training, signal generation, and evaluation. Used Python, PyTorch, and MATLAB to run reproducible experiments and compare generated signals with reference data through statistical analysis.",
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
    description: "Built a touch-classification service to prevent valid multi-touch interactions from triggering unwanted pinch-to-zoom in a desktop application.",
    solution: "Used motion analysis and linear algebra to classify touch input in Rust. Connected the service to Tauri gesture handling through gRPC, separating touch analysis from UI behavior so classification results could control zoom suppression.",
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
    featuredTechnologies: ["React", "Rust", "SQLite"],
    description: "Designed desktop application components that keep editable configuration, runtime state, and stored data consistent across React views, Rust services, and SQLite.",
    solution: "Separated reusable UI components, Zustand state, typed Tauri commands, and Diesel persistence. Added recursive change detection, schema migrations, and shared control rules, then checked state transitions and numerical boundaries through regression tests and hardware evaluation.",
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
