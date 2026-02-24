// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  NODEJS = "nodejs",
  PYTHON = "python",
  REACT = "react",
  NEXTJS = "nextjs",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  DYNAMODB = "dynamodb",
  NEO4J = "neo4j",
  AWS = "aws",
  GCP = "gcp",
  DOCKER = "docker",
  DATABRICKS = "databricks",
  AZURE = "azure",
  FIREBASE = "firebase",
  SWIFT = "swift",
  GOOGLE_ANALYTICS = "google-analytics",
  MIXPANEL = "mixpanel",
  FASTLANE = "fastlane",
  EMERGETOOLS = "emergetools",
  SOURCETREE = "sourcetree",
  MQTT = "mqtt",
  ZOOM_SDK = "zoom-sdk",
  PAYMENT_INTEGRATION = "payment-integration",
  BITRISE = "bitrise",
  PYTORCH = "pytorch",
  LANGCHAIN = "langchain",
  LANGFLOW = "langflow",
  GITHUB = "github",
  JENKINS = "jenkins",
  BLOCKCHAIN = "blockchain",
  LANGGRAPH = "langgraph",
  FASTAPI = "fastapi",
  KUBERNETES = "kubernetes",
  CRASHLYTICS = "crashlytics",
  STRIPE = "stripe",
  TAILWIND = "tailwind",
  BITBUCKET = "bitbucket",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "Modern JavaScript for full-stack and tooling-heavy workflows.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "Type-safe backends and frontends with strong DX and reliability.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.REACT]: {
    id: 3,
    name: "react",
    label: "React",
    shortDescription:
      "Building responsive frontends and dashboards when needed for ML/backends.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 4,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "Full-stack React framework for dashboards, APIs, and personal projects.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 5,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "REST backends, data pipelines, and integrations using Node.js and Express.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.PYTHON]: {
    id: 6,
    name: "python",
    label: "Python",
    shortDescription:
      "Primary language for ML pipelines, data processing, and AI agents.",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 7,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Relational data modeling and analytics-friendly schemas.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 8,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "NoSQL storage for flexible, document-shaped data.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  [SkillNames.DYNAMODB]: {
    id: 9,
    name: "dynamodb",
    label: "DynamoDB",
    shortDescription:
      "High-throughput key-value and document store with GSI/LSI optimization.",
    color: "#4053D6",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234053D6' d='M20.61 4.58a10.11 10.11 0 0 0-8.24-2.48 10.11 10.11 0 0 0-8.24 2.48A10.11 10.11 0 0 0 2.05 12a10.11 10.11 0 0 0 2.08 7.42 10.11 10.11 0 0 0 8.24 2.48 10.11 10.11 0 0 0 8.24-2.48A10.11 10.11 0 0 0 21.95 12a10.11 10.11 0 0 0-1.34-7.42zM12 20.5a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17zm-1.5-9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm3 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-6 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z'/%3E%3C/svg%3E",
  },
  [SkillNames.NEO4J]: {
    id: 10,
    name: "neo4j",
    label: "Neo4j",
    shortDescription:
      "Graph database powering hybrid graph + vector retrieval and recommendations.",
    color: "#008cc1",
    icon: "https://cdn.simpleicons.org/neo4j/008cc1",
  },
  [SkillNames.DOCKER]: {
    id: 11,
    name: "docker",
    label: "Docker",
    shortDescription: "Containerized services and reproducible development environments.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.AWS]: {
    id: 12,
    name: "aws",
    label: "AWS",
    shortDescription:
      "Building cloud-native systems with DynamoDB, Lambda, and related services.",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
  },
  [SkillNames.GCP]: {
    id: 13,
    name: "gcp",
    label: "Google Cloud",
    shortDescription:
      "Deploying microservices and ML workloads on GCP and Kubernetes.",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  [SkillNames.DATABRICKS]: {
    id: 14,
    name: "databricks",
    label: "Databricks",
    shortDescription:
      "Unified analytics platform for ML model deployment, monitoring, and scalable data processing.",
    color: "#FF3621",
    icon: "https://cdn.simpleicons.org/databricks/FF3621",
  },
  [SkillNames.AZURE]: {
    id: 15,
    name: "azure",
    label: "Microsoft Azure",
    shortDescription:
      "Cloud platform for deploying and managing enterprise ML pipelines and services.",
    color: "#0078D4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 16,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "Backend-as-a-Service for real-time db, analytics, and crash reporting in mobile apps.",
    color: "#FFCA28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  [SkillNames.SWIFT]: {
    id: 17,
    name: "swift",
    label: "Swift",
    shortDescription:
      "Modern iOS development language for building native apps with UIKit and SwiftUI.",
    color: "#FA7343",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  [SkillNames.GOOGLE_ANALYTICS]: {
    id: 18,
    name: "google-analytics",
    label: "Google Analytics",
    shortDescription:
      "User behavior analytics and performance monitoring for mobile and web applications.",
    color: "#F4B400",
    icon: "https://cdn.simpleicons.org/googleanalytics/F4B400",
  },
  [SkillNames.MIXPANEL]: {
    id: 19,
    name: "mixpanel",
    label: "Mixpanel",
    shortDescription:
      "Product analytics platform for tracking user events and measuring engagement.",
    color: "#7856FF",
    icon: "https://cdn.simpleicons.org/mixpanel/7856FF",
  },
  [SkillNames.FASTLANE]: {
    id: 20,
    name: "fastlane",
    label: "Fastlane",
    shortDescription:
      "CI/CD automation tool for iOS app deployment, testing, and release management.",
    color: "#FF6B6B",
    icon: "https://cdn.simpleicons.org/fastlane/FF6B6B",
  },
  [SkillNames.EMERGETOOLS]: {
    id: 21,
    name: "emergetools",
    label: "Emerge Tools",
    shortDescription:
      "iOS app size optimization and binary analysis tools for performance tuning.",
    color: "#000000",
    icon: "https://emergetools.com/favicon.ico",
  },
  [SkillNames.SOURCETREE]: {
    id: 22,
    name: "sourcetree",
    label: "SourceTree",
    shortDescription:
      "Git GUI client for version control and repository management.",
    color: "#2684FF",
    icon: "https://cdn.simpleicons.org/sourcetree/2684FF",
  },
  [SkillNames.MQTT]: {
    id: 23,
    name: "mqtt",
    label: "MQTT",
    shortDescription:
      "Lightweight messaging protocol for real-time communication and IoT applications.",
    color: "#660066",
    icon: "https://cdn.simpleicons.org/eclipsemosquitto/660066",
  },
  [SkillNames.ZOOM_SDK]: {
    id: 24,
    name: "zoom-sdk",
    label: "Zoom SDK",
    shortDescription:
      "Video conferencing SDK for integrating real-time video calls and media processing.",
    color: "#2D8CFF",
    icon: "https://cdn.simpleicons.org/zoom/2D8CFF",
  },
  [SkillNames.PAYMENT_INTEGRATION]: {
    id: 25,
    name: "payment-integration",
    label: "Payment Integration",
    shortDescription:
      "Payment gateway integrations including Stripe, Razorpay, and PayPal for e-commerce.",
    color: "#635BFF",
    icon: "https://cdn.simpleicons.org/stripe/635BFF",
  },
  [SkillNames.BITRISE]: {
    id: 26,
    name: "bitrise",
    label: "Bitrise",
    shortDescription:
      "Mobile CI/CD platform for automated builds, testing, and deployment pipelines.",
    color: "#683D87",
    icon: "https://cdn.simpleicons.org/bitrise/683D87",
  },
  [SkillNames.PYTORCH]: {
    id: 27,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "Deep learning framework for ML model development and training.",
    color: "#EE4C2C",
    icon: "https://cdn.simpleicons.org/pytorch/EE4C2C",
  },
  [SkillNames.LANGCHAIN]: {
    id: 28,
    name: "langchain",
    label: "LangChain",
    shortDescription: "Framework for building LLM applications and RAG pipelines.",
    color: "#1C3C3C",
    icon: "https://cdn.simpleicons.org/langchain/1C3C3C",
  },
  [SkillNames.LANGFLOW]: {
    id: 29,
    name: "langflow",
    label: "Langflow",
    shortDescription: "Visual framework for building and deploying LLM workflows.",
    color: "#22C55E",
    icon: "https://cdn.simpleicons.org/langflow/22C55E",
  },
  [SkillNames.GITHUB]: {
    id: 30,
    name: "github",
    label: "GitHub",
    shortDescription: "Version control, collaboration, and CI/CD with Git repositories.",
    color: "#181717",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.JENKINS]: {
    id: 31,
    name: "jenkins",
    label: "Jenkins",
    shortDescription: "Open-source automation server for CI/CD pipelines and build automation.",
    color: "#D24939",
    icon: "https://cdn.simpleicons.org/jenkins/D24939",
  },
  [SkillNames.BLOCKCHAIN]: {
    id: 32,
    name: "blockchain",
    label: "Blockchain",
    shortDescription: "Distributed ledger technology and smart contract development.",
    color: "#3D5A80",
    icon: "https://cdn.simpleicons.org/blockchaindotcom/3D5A80",
  },
  [SkillNames.LANGGRAPH]: {
    id: 33,
    name: "langgraph",
    label: "LangGraph",
    shortDescription: "Framework for building stateful, multi-agent LLM applications.",
    color: "#1C3C3C",
    icon: "https://cdn.simpleicons.org/langchain/1C3C3C",
  },
  [SkillNames.FASTAPI]: {
    id: 34,
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "Modern, fast Python web framework for building APIs.",
    color: "#009688",
    icon: "https://cdn.simpleicons.org/fastapi/009688",
  },
  [SkillNames.KUBERNETES]: {
    id: 35,
    name: "kubernetes",
    label: "Kubernetes",
    shortDescription: "Container orchestration for deploying and scaling applications.",
    color: "#326CE5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  [SkillNames.CRASHLYTICS]: {
    id: 36,
    name: "crashlytics",
    label: "Crashlytics",
    shortDescription: "Crash reporting and analytics for mobile and web apps.",
    color: "#F04E37",
    icon: "https://cdn.simpleicons.org/firebase/F04E37",
  },
  [SkillNames.STRIPE]: {
    id: 37,
    name: "stripe",
    label: "Stripe",
    shortDescription: "Payment processing and billing APIs for subscriptions and one-time payments.",
    color: "#635BFF",
    icon: "https://cdn.simpleicons.org/stripe/635BFF",
  },
  [SkillNames.TAILWIND]: {
    id: 38,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription: "Utility-first CSS framework for rapid UI development.",
    color: "#06B6D4",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  [SkillNames.BITBUCKET]: {
    id: 39,
    name: "bitbucket",
    label: "Bitbucket",
    shortDescription: "Git repository hosting and collaboration for version control and CI/CD.",
    color: "#0052CC",
    icon: "https://cdn.simpleicons.org/bitbucket/0052CC",
  },
};

/** Keyboard keycap order (4 rows × 6). Spline keycap object names must match each skill's `name`. */
export const KEYBOARD_SKILL_ORDER: SkillNames[] = [
  // Row 1: Swift, Python, GCP, Jenkins, React, Stripe
  SkillNames.SWIFT,
  SkillNames.PYTHON,
  SkillNames.GCP,
  SkillNames.JENKINS,
  SkillNames.REACT,
  SkillNames.STRIPE,
  // Row 2: SourceTree, Tailwind, DynamoDB, Blockchain, PostgreSQL, MongoDB
  SkillNames.SOURCETREE,
  SkillNames.TAILWIND,
  SkillNames.DYNAMODB,
  SkillNames.BLOCKCHAIN,
  SkillNames.POSTGRES,
  SkillNames.MONGODB,
  // Row 3: Neo4j, GitHub, PyTorch, LangChain, Firebase, Langflow
  SkillNames.NEO4J,
  SkillNames.GITHUB,
  SkillNames.PYTORCH,
  SkillNames.LANGCHAIN,
  SkillNames.FIREBASE,
  SkillNames.LANGFLOW,
  // Row 4: Databricks, Docker, Fastlane, AWS, Kubernetes, Bitrise
  SkillNames.DATABRICKS,
  SkillNames.DOCKER,
  SkillNames.FASTLANE,
  SkillNames.AWS,
  SkillNames.KUBERNETES,
  SkillNames.BITRISE,
];

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Jun 2025",
    endDate: "Oct 2025",
    title: "AI/ML Engineer Intern",
    company: "Veterinary Information Network",
    description: [
      "Deployed enterprise-grade ML pipelines classifying 1,000+ veterinary documents into 7+ categories using fine-tuned models with evaluation and QA.",
      "Built conversational AI agents with safety guardrails using Langflow and RAG, automating developer workflows and reducing manual review time by ~30%.",
      "Operationalized models on Databricks with monitoring and alerting, enabling scalable, reproducible workflows for stakeholders across multiple teams.",
      "Developed PySpark-based data ingestion pipelines to process large-scale datasets and implemented semantic search with embeddings to automate knowledge extraction.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.DATABRICKS,
      SkillNames.AZURE,
      SkillNames.PYTORCH,
      SkillNames.LANGCHAIN,
      SkillNames.LANGFLOW,
    ],
  },
  {
    id: 2,
    startDate: "May 2022",
    endDate: "Jul 2024",
    title: "Senior Software Engineer II (iOS)",
    company: "Nykaa",
    description: [
      "Led development of 15+ iOS features in Swift/SwiftUI, partnering with product and design while monitoring quality via Crashlytics and Firebase.",
      "Architected CI/CD with Fastlane on Mac mini, reducing release time by ~40% and enabling 2x faster deployments.",
      "Optimized performance-critical flows, reducing binary size by ~15 MB and startup time by ~1s for an app serving 35M+ active users.",
      "Implemented 400+ unit and BDD tests using XCTest and Quick/Nimble, increasing coverage to ~75% and cutting crashes by ~30%.",
      "Designed 5+ reusable UI component architectures using async/await and Swift actors, reducing development time by ~30%.",
    ],
    skills: [
      SkillNames.SWIFT,
      SkillNames.FIREBASE,
      SkillNames.GOOGLE_ANALYTICS,
      SkillNames.MIXPANEL,
      SkillNames.FASTLANE,
      SkillNames.EMERGETOOLS,
      SkillNames.SOURCETREE,
    ],
  },
  {
    id: 3,
    startDate: "Feb 2020",
    endDate: "Apr 2022",
    title: "iOS Developer",
    company: "Appscrip",
    description: [
      "Built and maintained iOS features including real-time messaging with MQTT handling 10+ concurrent connections with sub-100ms latency.",
      "Integrated Zoom SDK for 1:1 video calls with real-time media processing, enabling 5,000+ monthly sessions with ~99% call success rate.",
      "Implemented Apple Push Notifications (APNs) across multiple apps, delivering 10k+ notifications monthly with ~99.9% delivery.",
      "Integrated payment gateways (Stripe, Razorpay, PayPal), processing $10K+ monthly volume with ~99.9% success rate.",
      "Automated builds via Fastlane and Bitrise, reducing QA time by ~50% and mentoring 2 developers through 50+ code reviews.",
    ],
    skills: [
      SkillNames.SWIFT,
      SkillNames.MQTT,
      SkillNames.ZOOM_SDK,
      SkillNames.PAYMENT_INTEGRATION,
      SkillNames.BITRISE,
      SkillNames.BITBUCKET,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

