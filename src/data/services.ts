export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  blurb: string;
  projectsFilter: "all" | "ai" | "fullstack";
  items: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning Services",
    blurb:
      "Intelligent features, predictive models, and automated pipelines built to solve real problems.",
    projectsFilter: "ai",
    items: [
      {
        id: "ai-chatbots",
        title: "Custom AI Chatbots & Assistants",
        description:
          "Build AI-powered tools using the Gemini API and Retrieval-Augmented Generation (RAG) pipelines for smart customer support or internal knowledge bases.",
        tech: ["Gemini API", "RAG Pipelines", "Python", "ChromaDB"],
      },
      {
        id: "predictive-modeling",
        title: "Predictive Modeling & Data Analysis",
        description:
          "Build regression, classification, and forecasting models using Python, TensorFlow, scikit-learn, and XGBoost.",
        tech: ["Python", "TensorFlow", "scikit-learn", "XGBoost"],
      },
      {
        id: "computer-vision",
        title: "Computer Vision Solutions",
        description:
          "Build biometric or real-time identity verification tools using OpenCV.",
        tech: ["Python", "OpenCV", "Computer Vision"],
      },
    ],
  },
  {
    id: "fullstack-web",
    title: "Full-Stack & Web Development",
    blurb:
      "End-to-end web platforms — from database architecture to pixel-perfect interfaces.",
    projectsFilter: "fullstack",
    items: [
      {
        id: "web-app-dev",
        title: "Custom Web Application Development",
        description:
          "Build end-to-end scalable web apps using the MERN stack (MongoDB, Express.js, React.js, Node.js) or Laravel/PHP.",
        tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Laravel"],
      },
      {
        id: "frontend-uiux-dev",
        title: "Frontend UI/UX Development",
        description:
          "Convert Figma designs into fully responsive, mobile-friendly websites using React.js, Tailwind CSS, and Bootstrap.",
        tech: ["React.js", "Tailwind CSS", "Bootstrap"],
      },
      {
        id: "backend-api-dev",
        title: "Backend API Development",
        description:
          "Build and secure server-side logic, routing, and RESTful APIs using Node.js, Express, FastAPI, or Laravel.",
        tech: ["Node.js", "Express", "FastAPI", "Laravel"],
      },
      {
        id: "database-management",
        title: "Database Management",
        description:
          "Design, implement, and optimize database architectures using MySQL and MongoDB.",
        tech: ["MySQL", "MongoDB"],
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    blurb: "Cross-platform apps that feel native on both iOS and Android.",
    projectsFilter: "fullstack",
    items: [
      {
        id: "cross-platform-mobile",
        title: "Cross-Platform Mobile Apps",
        description:
          "Develop fluid, responsive mobile applications for both iOS and Android from a single codebase using Flutter and Dart.",
        tech: ["Flutter", "Dart"],
      },
    ],
  },
  {
    id: "desktop",
    title: "Desktop Software Development",
    blurb:
      "Secure, high-performance utilities and automation tools built for reliability.",
    projectsFilter: "all",
    items: [
      {
        id: "desktop-utilities",
        title: "Custom Desktop Utilities",
        description:
          "Build secure desktop applications with graphical interfaces (like PyQt5 or Tkinter in Python) or object-oriented software in Java and C++.",
        tech: ["Python", "PyQt5", "Tkinter", "Java", "C++"],
      },
      {
        id: "scripting-automation",
        title: "Scripting & Automation",
        description:
          "Write Python, C++, or Java scripts to automate workflows, manage files, or build terminal-based tools.",
        tech: ["Python", "C++", "Java"],
      },
    ],
  },
];
