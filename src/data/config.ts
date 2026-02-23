const config = {
  title: "Sagar Gupta | AI/ML & iOS Engineer",
  description: {
    long:
      "Portfolio of Sagar Gupta, an AI/ML & iOS engineer with experience building production-grade machine learning pipelines, conversational agents, and high-performance mobile apps. Explore projects across AI agents, time series modeling, scalable backends, and cloud-native systems.",
    short:
      "AI/ML & iOS engineer building production ML systems, scalable backends, and high-quality mobile experiences.",
  },
  keywords: [
    "Sagar Gupta",
    "Sagar",
    "portfolio",
    "AI engineer",
    "machine learning engineer",
    "iOS engineer",
    "mobile engineer",
    "Swift",
    "Python",
    "LangChain",
    "RAG",
    "FastAPI",
    "Neo4j",
    "DynamoDB",
    "Time series",
    "ML pipelines",
    "Databricks",
  ],
  author: "Sagar Gupta",
  email: "gsr1745@gmail.com",
  site: "https://example.com", // Update to your live portfolio URL (e.g. https://yourname.vercel.app)

  // GitHub stars button in header
  githubUsername: "sagarrgupta",
  githubRepo: "myPortfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/sagarrgupta_",
    linkedin: "https://www.linkedin.com/in/sagarrgupta",
    instagram: "https://www.instagram.com/sagarrgupta/",
    facebook: "",
    github: "https://github.com/sagarrgupta",
  },
};
export { config };
