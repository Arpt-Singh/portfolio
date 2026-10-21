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
    summary: [
      "Designed a measurement and analysis pipeline to characterize oscillatory motor motion beyond speed, including acceleration, torque, and power.",
      "Integrated NI-DAQmx acquisition with LabVIEW and MATLAB processing, separating signal capture, filtering, and acceleration estimation, then validating results against experimental measurements.",
      "Research accepted for presentation at a U.S. science and technology event.",
    ],
    technologies: ["LabVIEW", "MATLAB", "NI-DAQmx", "Signal processing"],
  },
  {
    name: "Modular Embedded Systems Architecture",
    summary: [
      "Architected a reusable, layered test platform separating Python test clients, Rust host services, and Embedded C device control.",
      "Defined Protobuf/gRPC interfaces, RTOS task boundaries, and shared CMake modules to support consistent communication and real-time behavior across multiple test applications. Developed a reusable framework separating test software, communication services, and embedded control.",
    ],
    technologies: ["Embedded C", "CMake", "RTOS", "Protobuf"],
  },
  {
    name: "Model-Based Sensor Calibration",
    summary: [
      "Developed a sensor-calibration workflow linking experimental data, statistical analysis, mathematical modeling, and embedded software. Collaborated with a technical fellow to model nonlinear sensor response and implement software compensation for consistent input-output behavior.",
      "Research selected and presented at a U.S. science and technology conference.",
    ],
    technologies: ["Mathematical modeling", "Statistical analysis", "Embedded software"],
  },
  {
    name: "Generative ML for Signal Evaluation",
    summary: [
      "Designed a reproducible synthetic-signal pipeline to augment evaluation data for signal-classification research.",
      "In a two-person team, structured workflows for preprocessing, model training, signal generation, and statistical comparison against reference data using Python, PyTorch, and MATLAB.",
      "Research selected and presented at a U.S. science and technology conference.",
    ],
    technologies: ["Python", "PyTorch", "Machine learning", "Synthetic signal generation"],
  },
  {
    name: "Touch-Classification Microservice Architecture",
    summary: [
      "Designed a Rust service that analyzes multi-touch motion and distinguishes intentional gestures from pinch-to-zoom input.",
      "Integrated the classifier with a Tauri desktop application through gRPC, separating gesture analysis from GUI behavior. The frontend uses classifier results to suppress unwanted zoom.",
    ],
    technologies: ["gRPC", "Linear algebra", "Touch-input processing", "Gesture classification"],
  },
  {
    name: "Full-Stack Desktop Systems Architecture",
    summary: [
      "Architected desktop workflows across React, Rust/Tauri, and SQLite, keeping configuration, runtime state, and persisted data consistent.",
      "Defined clear boundaries between reusable UI components, Zustand state, typed Tauri commands, and Diesel persistence.",
      "Implemented recursive change detection, schema migrations, and shared control rules.",
      "Validated state transitions and numerical edge cases through regression tests and hardware evaluation.",
    ],
    technologies: ["React", "TypeScript", "Rust", "Tauri", "Zustand", "SQLite", "Diesel", "Vitest", "SCSS", "SVG", "JSON", "PyVision", "Azure DevOps"],
  },
];

export { services, experiences, projects };
import medtronicLogo from "../assets/medtronic-logo.png";
