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
    date: "January 2026 - Present",
    paragraphs: [
      "I develop hardware-integrated desktop applications using React, TypeScript, and Tauri, with Rust services and SQLite persistence. I design protobuf-based gRPC APIs and streaming event flows that connect the user interface to backend services, CAN-connected peripherals, and embedded controllers for device control, telemetry, self-tests, updates, and system notifications."
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "Applied AI/ML & Research",
    date: "April 2025 - January 2026",
    paragraphs: [
      "On a two-person team, I contributed to developing a probabilistic generative model for analyzing complex biomedical signals, using synthetic data generation to evaluate classification performance. I worked with PyTorch and MATLAB to preprocess data, train the model, and compare generated signals against reference data. The research was selected for presentation at a U.S. science and technology conference."
    ],
  },
  {
    title: "Enterprise Software Engineer - I",
    focus: "Embedded Systems Design & Technical Leadership",
    date: "August 2024 - April 2025",
    paragraphs: [
      "I built an embedded system Architecture across firmware, Rust host services, and Python test clients. Protobuf/gRPC contracts and reusable CMake modules kept device control, communication, and test logic separate.",
    ],
  },
  {
    title: "Research and Development Intern",
    focus: "Embedded Research & Experimental Analysis",
    date: "November 2023 - August 2024",
    paragraphs: [
      "I designed Hall-effect sensing data acquisition system and integrated it with NI-DAQmx data acquisition using LabVIEW and MATLAB for embedded test. I worked on measurement software and experimental validation; the research was accepted for presentation at a U.S. science and technology event.",
    ],
  },
];

const projects = [
  {
    name: "Oscillatory Motion Analysis",
    description: "Designed a measurement and analysis pipeline to characterize oscillatory motor motion beyond speed, including acceleration, torque, and power.",
    solution: "Integrated NI-DAQmx acquisition with LabVIEW and MATLAB processing, separating signal capture, filtering, and acceleration estimation, then validating results against experimental measurements.",
    flow: [
      { name: "Measurement", detail: "Acquire motion signals from the experimental setup.", link: "Sampled signals" },
      { name: "Signal Analysis", detail: "Filter signals and estimate angular acceleration.", link: "Motion estimates" },
      { name: "Engineering Evaluation", detail: "Assess oscillatory motion and document findings." },
    ],
    period: "15 November 2023 - 1 August 2024",
    problem: "Speed alone could not characterize oscillatory motor motion or explain changes in acceleration, torque, and power.",
    responsibility: "Developed the acquisition and signal-analysis workflow and validated results against experiments.",
    overview: "Combined NI-DAQmx acquisition with LabVIEW and MATLAB processing to analyze oscillatory motor measurements.",
    contributions: ["Integrated signal acquisition and analysis tools.", "Separated capture, filtering, and acceleration estimation.", "Validated results against experimental measurements."],
    technologies: ["LabVIEW", "MATLAB", "NI-DAQmx", "Signal processing"],
    outcome: "Research accepted for presentation at a U.S. science and technology event.",
  },
  {
    name: "Modular Embedded Systems Architecture",
    description: "Architected a reusable, layered test platform separating Python test clients, Rust host services, and Embedded C device control.",
    solution: "Defined Protobuf/gRPC interfaces, RTOS task boundaries, and shared CMake modules to support consistent communication and real-time behavior across multiple test applications.",
    flow: [
      { name: "Test Software", detail: "Build reusable commands and client interfaces.", link: "Typed requests" },
      { name: "Host Services", detail: "Separate service contracts from transport-specific code.", link: "Device commands" },
      { name: "Embedded Control", detail: "Handle real-time processing and modular device interfaces." },
    ],
    period: "1 August 2024 - 1 August 2025",
    problem: "Multiple test applications needed a reusable platform with consistent host-to-device communication and real-time behavior.",
    responsibility: "Architected the layered platform across test clients, host services, and embedded device control.",
    overview: "Separated Python test clients, Rust host services, and Embedded C control with defined RPC contracts, RTOS task boundaries, and shared build modules.",
    contributions: ["Built a reusable layered test platform.", "Defined Protobuf/gRPC interfaces and RTOS task boundaries.", "Shared CMake modules across multiple test applications."],
    technologies: ["Embedded C", "Rust", "Python", "CMake", "RTOS", "Protobuf/gRPC"],
    outcome: "Developed a reusable framework separating test software, communication services, and embedded control.",
  },
  {
    name: "Model-Based Sensor Calibration",
    description: "Developed a sensor-calibration workflow linking experimental data, statistical analysis, mathematical modeling, and embedded software.",
    solution: "Collaborated with a technical fellow to model nonlinear sensor response and implement software compensation for consistent input-output behavior.",
    flow: [
      { name: "Characterization", detail: "Collect measurements and analyze sensor response.", link: "Measurement data" },
      { name: "Model Development", detail: "Develop a mathematical calibration relationship.", link: "Calibration model" },
      { name: "Embedded Implementation", detail: "Apply calibration to support consistent input-output behavior." },
    ],
    period: "1 August 2025 - 1 January 2026",
    problem: "Nonlinear sensor response made consistent input-output behavior difficult to achieve.",
    responsibility: "Worked with a technical fellow on data analysis, sensor modeling, and software compensation.",
    overview: "Linked experimental measurements, statistical analysis, mathematical modeling, and embedded software to calibrate nonlinear sensor response.",
    contributions: ["Analyzed experimental data and modeled sensor response.", "Implemented software compensation for nonlinear behavior.", "Collaborated with a technical fellow on the calibration workflow."],
    technologies: ["Mathematical modeling", "Statistical analysis", "Embedded software"],
    outcome: "Research selected and presented at a U.S. science and technology conference.",
  },
  {
    name: "Generative ML for Signal Evaluation",
    description: "Designed a reproducible synthetic-signal pipeline to augment evaluation data for signal-classification research.",
    solution: "In a two-person team, structured workflows for preprocessing, model training, signal generation, and statistical comparison against reference data using Python, PyTorch, and MATLAB.",
    flow: [
      { name: "Signal Preparation", detail: "Preprocess reference signals for research experiments.", link: "Prepared signals" },
      { name: "Model Training", detail: "Train software to generate synthetic evaluation signals.", link: "Generated signals" },
      { name: "Signal Evaluation", detail: "Compare generated and reference signal characteristics." },
    ],
    period: "1 August 2025 - 1 January 2026",
    problem: "Signal-classification research needed additional evaluation data.",
    responsibility: "Worked in a two-person team on synthetic signal generation and evaluation workflows.",
    overview: "Created a reproducible workflow to generate synthetic signals and compare them statistically with reference data for signal-classification research.",
    contributions: ["Contributed as part of a two-person development team.", "Developed signal preprocessing and model-training software.", "Evaluated generated signals and authored a research paper."],
    technologies: ["Python", "PyTorch", "MATLAB", "Signal processing", "Machine learning"],
    outcome: "Research selected and presented at a U.S. science and technology conference.",
  },
  {
    name: "Touch-Classification Microservice Architecture",
    description: "Designed a Rust service that analyzes multi-touch motion and distinguishes intentional gestures from pinch-to-zoom input.",
    solution: "Integrated the classifier with a Tauri desktop application through gRPC, separating gesture analysis from GUI behavior.",
    flow: [
      { name: "Touch Input", detail: "Process multi-touch interactions from a capacitive display.", link: "Touch input" },
      { name: "Rust Classification Service", detail: "Distinguish pinch gestures from other touch interactions.", link: "Classification result" },
      { name: "Desktop Integration", detail: "Use results in Tauri gesture handling to suppress unintended zoom." },
    ],
    period: "Recent 3-month research project",
    problem: "Native pinch-to-zoom could cause unexpected scaling during valid multi-touch interactions.",
    responsibility: "Designed the Rust classifier and gRPC integration with the Tauri desktop GUI.",
    overview: "Separated multi-touch gesture analysis into a Rust service and used its classification results to control desktop zoom behavior.",
    contributions: ["Developed touch-analysis and classification software.", "Integrated classification results into desktop gesture handling.", "Authored a research paper describing the approach."],
    technologies: ["Rust", "Tauri", "gRPC", "Linear algebra", "Touch-input processing"],
    outcome: "The frontend uses classifier results to suppress unwanted zoom.",
  },
  {
    name: "Full-Stack Desktop Systems Architecture",
    featuredTechnologies: ["React", "Rust", "SQLite"],
    description: "Architected desktop workflows across React, Rust/Tauri, and SQLite, keeping configuration, runtime state, and persisted data consistent.",
    solution: "Defined clear boundaries between reusable UI components, Zustand state, typed Tauri commands, and Diesel persistence.",
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
    technologies: ["React", "TypeScript", "Rust", "Tauri", "Zustand", "SQLite", "Diesel", "Protobuf/gRPC", "Vitest", "SCSS", "SVG", "JSON", "PyVision", "Azure DevOps"],
    outcome: "Implemented recursive change detection, schema migrations, and shared control rules; validated state transitions and numerical edge cases through regression tests and hardware evaluation.",
  },
];

export { services, experiences, projects };
import medtronicLogo from "../assets/medtronic-logo.png";
