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
    title: "Full Stack Desktop Application",
    icon: `${import.meta.env.BASE_URL}technology-icons/react.svg`,
    technologies: ["React", "TypeScript", "Tauri", "Rust", "SQLite", "gRPC"],
  },
  {
    title: "Embedded Systems Architecture",
    icon: `${import.meta.env.BASE_URL}technology-icons/stmicroelectronics.svg`,
    technologies: ["C", "C++", "STM32", "ESP32-S3", "RTOS", "CAN"],
  },
  {
    title: "Wireless Technology",
    icon: `${import.meta.env.BASE_URL}technology-icons/bluetooth.svg`,
    technologies: ["BLE", "Wi-Fi", "Signal Processing"],
  },
  {
    title: "Machine Learning & Automation",
    icon: `${import.meta.env.BASE_URL}technology-icons/pytorch.svg`,
    technologies: ["Python", "PyTorch", "CNN", "Playwright"],
  },
];

export const employer = {
  name: "Medtronic Engineering & Innovation Center (MEIC)",
  url: "https://www.medtronic.com/in-en/our-company/india/medtronic-engineering-innovation-center.html",
  logo: medtronicLogo,
};

const githubProfileUrl = "https://github.com/Arpt-Singh";

const experiences = [
  {
    title: "Enterprise Software Engineer - I",
    date: "Aug 2024 — Present",
    areas: [
      {
        focus: "Full-Stack Desktop Applications",
        points: [
          "Build desktop apps that control hardware, using React, TypeScript, Tauri, Rust and SQLite.",
          "Design gRPC APIs with Protobuf and streaming events between the app, backend services and CAN-connected devices.",
        ],
      },
      {
        focus: "Machine Learning Research",
        points: [
          "Built a probabilistic generative model with one teammate to create synthetic biomedical signals for testing algorithms, evaluating signal filters, and classifying false signals.",
          "Prepared the data, trained the model and compared its output with real signals. Selected for the Medtronic U.S. science and technology conference.",
        ],
      },
      {
        focus: "Embedded Systems Design",
        points: [
          "Designed an embedded system with firmware, Rust host services and Python test clients.",
          "Used Protobuf and gRPC contracts and shared CMake modules to keep device control, communication and testing separate.",
        ],
      },
    ],
    technologies: ["Rust", "React", "Tauri", "gRPC", "SQLite", "Embedded C", "CMake", "Python", "PyTorch", "MATLAB"],
  },
  {
    title: "Research and Development Intern",
    date: "Nov 2023 — Aug 2024",
    areas: [
      {
        focus: "Embedded Research & Experimental Analysis",
        points: [
          "Designed a Hall-effect sensing data-acquisition system and integrated it with NI-DAQmx, LabVIEW and MATLAB for embedded test.",
          "Worked on measurement software and experimental validation. Accepted for presentation at the Medtronic U.S. science and technology event.",
        ],
      },
    ],
    technologies: ["LabVIEW", "MATLAB", "NI-DAQmx"],
  },
];

// Add `repoUrl` for public repositories. Proprietary work never shows a repository icon or link.
type Project = { name: string; summary: string; technologies: string[]; repoUrl?: string; proprietary?: boolean };

const projects: Project[] = [
  {
    name: "Desktop Applications for Embedded Systems",
    summary: "React and TypeScript desktop apps send typed Tauri commands to Rust services. SQLite persists session-based configuration with typed data structures whose properties are applied at runtime. Python test clients use Protobuf and gRPC to connect host services with Embedded C firmware on an RTOS.",
    technologies: ["React", "Tauri", "Rust", "gRPC", "Embedded C"],
  },
  {
    name: "Desktop Touch Gesture Classifier",
    summary: "A Tauri desktop app handles multi-touch input from a touchscreen display. A Rust service analyzes touch motion, classifies gestures, and streams results over gRPC. The UI uses these results to distinguish intended gestures from pinch-to-zoom and suppress unwanted zoom, keeping gesture analysis separate from display controls.",
    technologies: ["Rust", "gRPC", "Tauri"],
  },
  {
    name: "Machine Learning & Probabilistic Modeling",
    summary: "Probabilistic models generate signal data for algorithm testing, signal-filter evaluation, and false-signal classification. ML-based sensor calibration covers data preparation, validation against reference signals, and calibration in embedded software. Methods are Medtronic proprietary.",
    technologies: ["Machine Learning", "Probabilistic Modeling", "Signal Processing"],
    proprietary: true,
  },
];

export { services, experiences, projects, githubProfileUrl };
import medtronicLogo from "../assets/medtronic-logo.png";
