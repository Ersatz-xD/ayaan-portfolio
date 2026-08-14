export interface Project {
  id: string;
  title: string;
  date: string;
  category: "ai" | "fullstack";
  tech: string[];
  metric?: string;
  githubUrl: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: "pearl-aqi",
    title: "Pearl AQI Engine",
    date: "Jun 2026",
    category: "ai",
    tech: ["scikit-learn", "Hopsworks", "GitHub Actions", "FastAPI", "React", "TreeSHAP"],
    metric: "72-Hour AQI Forecasts",
    githubUrl: "https://github.com/Ersatz-xD/Pearl-AQI-Engine",
    description:
      "Architected a serverless MLOps pipeline for automated CI/CD and built a FastAPI/React dashboard using TreeSHAP for explainable 72-hour AQI forecasts.",
  },
  {
    id: "prof-gpt",
    title: "Prof GPT – Academic Navigator",
    date: "Apr 2026",
    category: "ai",
    tech: ["Python", "FastAPI", "ChromaDB", "Gemini API", "scikit-learn"],
    metric: "96% Precision@3 Accuracy",
    githubUrl: "https://github.com/BinaryVibe/prof-gpt",
    description:
      "Built a Full-Stack RAG pipeline with dynamic PDF ingestion and ChromaDB vector search, incorporating a scikit-learn intent classifier and LLM anti-hallucination guardrails.",
  },
  {
    id: "ml-unsupervised",
    title: "ML – Unsupervised Learning Repository",
    date: "Sep 2025",
    category: "ai",
    tech: ["Python", "NumPy"],
    githubUrl: "https://github.com/Ersatz-xD/ml-unsupervised",
    description:
      "Implemented anomaly detection for fraud and a Collaborative Filtering recommender system using Multivariate Gaussian distributions.",
  },
  {
    id: "ml-supervised",
    title: "ML – Supervised Learning Repository",
    date: "Aug 2025",
    category: "ai",
    tech: ["NumPy", "TensorFlow", "XGBoost"],
    githubUrl: "https://github.com/Ersatz-xD/ml-supervised",
    description:
      "Engineered regression, classification, and CNN architectures from scratch using NumPy, TensorFlow, and XGBoost.",
  },
  {
    id: "vibe-snitch",
    title: "Vibe Snitch – AI Personality Insights",
    date: "May 2025",
    category: "ai",
    tech: ["Python", "PyQt5", "Gemini API", "NLP"],
    metric: "85% MBTI Accuracy",
    githubUrl: "https://github.com/Ersatz-xD/VibeSnitch-AI",
    description:
      "Engineered an AI-driven platform using PyQt5 and the Gemini API to predict MBTI types through NLP sentiment analysis.",
  },
  {
    id: "auth2x",
    title: "Auth2X – Biometric Security Suite",
    date: "Apr 2025",
    category: "ai",
    tech: ["Python", "OpenCV", "Computer Vision"],
    metric: "Real-Time Tracking",
    githubUrl: "https://github.com/C0deCrypt/Auth2X",
    description:
      "Built a multi-factor authentication system utilizing OpenCV computer vision for real-time identity verification and tracking.",
  },
  {
    id: "brobroke",
    title: "BroBroke – Peer Debt Tracker",
    date: "Mar 2026",
    category: "fullstack",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    githubUrl: "https://github.com/Ersatz-xD/BroBroke",
    description:
      "Built and deployed a full-stack MERN application to track and balance shared financial records among peers.",
  },
  {
    id: "acm-website",
    title: "ACM Website – Official Society Portal",
    date: "Jan 2026",
    category: "fullstack",
    tech: ["React.js", "Bootstrap"],
    metric: "100% Mobile Responsive",
    githubUrl: "https://github.com/ACM-CUI-Wah/ACM-CUI-Web",
    description:
      "Developed and deployed the official student chapter portal using React.js and Bootstrap, ensuring full mobile responsiveness.",
  },
  {
    id: "edugate",
    title: "EduGate Pakistan – University Admission Portal",
    date: "Dec 2025",
    category: "fullstack",
    tech: ["Laravel", "PHP", "MySQL"],
    metric: "High-Concurrency",
    githubUrl: "https://github.com/BinaryVibe/edugate-pk",
    description:
      "Engineered a scalable web admission platform using Laravel and MySQL with an Admin Dashboard for real-time university data management.",
  },
  {
    id: "fyp-hub",
    title: "FYP Hub – Project Management App",
    date: "Dec 2025",
    category: "fullstack",
    tech: ["Flutter"],
    githubUrl: "https://github.com/BinaryVibe/fyp-hub",
    description:
      "Developed a cross-platform mobile application in Flutter with interactive project tracking and real-time notifications.",
  },
  {
    id: "campus-crave",
    title: "Campus Crave – Stealth Food Ordering",
    date: "Nov 2025",
    category: "fullstack",
    tech: ["PHP", "MySQL"],
    githubUrl: "https://github.com/Ersatz-xD/campus-crave",
    description:
      "Designed a high-concurrency web portal with optimized routing for discreet lecture-time cafeteria ordering.",
  },
  {
    id: "pawpal",
    title: "PawPal – Civic Engagement Platform",
    date: "Jun 2025",
    category: "fullstack",
    tech: ["JavaScript", "CSS"],
    githubUrl: "https://github.com/Ersatz-xD/PawPal",
    description:
      "Designed a full-stack civic-tech web prototype to streamline animal cruelty reporting and shelter discovery.",
  },
  {
    id: "redacted-vault",
    title: "Redacted Vault – Cryptographic Storage",
    date: "May 2025",
    category: "fullstack",
    tech: ["Python", "AES", "MySQL", "Tkinter"],
    githubUrl: "https://github.com/C0deCrypt/RedactedVault",
    description:
      "Developed a secure Python backend utilizing AES encryption, biometric multi-factor authentication, and MySQL with a Tkinter GUI.",
  },
  {
    id: "padhlo-ai",
    title: "Padhlo AI – EdTech Assistant",
    date: "Apr 2025",
    category: "fullstack",
    tech: ["MongoDB", "Gemini API"],
    githubUrl: "https://github.com/Ersatz-xD/Padhlo-ai",
    description:
      "Architected an AI-powered study tool leveraging MongoDB and the Gemini API for automated quiz and summary generation.",
  },
  {
    id: "stay-tracked",
    title: "Stay Tracked – Java Project Management",
    date: "Dec 2024",
    category: "fullstack",
    tech: ["Java", "MySQL"],
    githubUrl: "https://github.com/BinaryVibe/StayTracked",
    description:
      "Created a Java project management suite implementing OOP principles and MySQL database integration.",
  },
];

export const FEATURED_PROJECT_IDS = [
  "pearl-aqi",
  "prof-gpt",
  "redacted-vault",
  "padhlo-ai",
];