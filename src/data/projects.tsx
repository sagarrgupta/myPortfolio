import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  const hasLiveLink = live && live !== "#";
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {hasLiveLink && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo ? (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      ) : (
        <div className="font-mono flex gap-2 group">
          <Button variant={"default"} size={"sm"}>
            <span className="group-hover:hidden">Github</span>
            <span className="hidden group-hover:inline">Private repo</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  neo4j: {
    title: "Neo4j",
    bg: "black",
    fg: "white",
    icon: <img src="https://cdn.simpleicons.org/neo4j/008cc1" alt="Neo4j" className="w-6 h-6" />,
  },
  fastapi: {
    title: "FastAPI",
    bg: "black",
    fg: "white",
    icon: <img src="https://cdn.simpleicons.org/fastapi/009688" alt="FastAPI" className="w-6 h-6" />,
  },
  sqlite: {
    title: "SQLite",
    bg: "black",
    fg: "white",
    icon: <img src="https://cdn.simpleicons.org/sqlite/003B57" alt="SQLite" className="w-6 h-6" />,
  },
  tensorflow: {
    title: "TensorFlow",
    bg: "black",
    fg: "white",
    icon: <img src="https://cdn.simpleicons.org/tensorflow/FF6F00" alt="TensorFlow" className="w-6 h-6" />,
  },
  dynamodb: {
    title: "DynamoDB",
    bg: "black",
    fg: "white",
    icon: <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234053D6' d='M20.61 4.58a10.11 10.11 0 0 0-8.24-2.48 10.11 10.11 0 0 0-8.24 2.48A10.11 10.11 0 0 0 2.05 12a10.11 10.11 0 0 0 2.08 7.42 10.11 10.11 0 0 0 8.24 2.48 10.11 10.11 0 0 0 8.24-2.48A10.11 10.11 0 0 0 21.95 12a10.11 10.11 0 0 0-1.34-7.42zM12 20.5a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17zm-1.5-9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm3 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-6 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z'/%3E%3C/svg%3E" alt="DynamoDB" className="w-6 h-6" />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  /** Light mode cover image; used when theme is light */
  srcLight?: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "pathfinder",
    category: "AI Agents",
    title: "Pathfinder – AI Agent for Academic Guidance",
    src: "/assets/projects-screenshots/portfolio/pathfinder.png",
    srcLight: "/assets/projects-screenshots/portfolio/pathfinder-light.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.fastapi, PROJECT_SKILLS.neo4j, PROJECT_SKILLS.sqlite],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI agent platform for academic and career guidance with multi-agent orchestration.
          </TypographyP>
          <TypographyP className="font-mono ">
            Architected an 11-node LangGraph multi-agent system with an orchestrator routing to 4 specialist agents, achieving 90% user satisfaction. Built a production-grade FastAPI backend with server-sent events (SSE) handling 5+ concurrent sessions with less than 500ms response time.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="font-mono mb-2 space-y-2 list-disc list-inside">
            <li>Implemented Neo4j hybrid retrieval (graph + vector) with 1024-dim embeddings, improving relevance by 55%</li>
            <li>Integrated 4 web search providers (Tavily, Google CSE) with failure analysis and fallback logic</li>
            <li>React/Vite/Tailwind frontend with SQLite memory for session management</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "timeseries",
    category: "Machine Learning",
    title: "Time Series Forecasting using LSTM and CNN",
    src: "/assets/projects-screenshots/portfolio/timeseries.png",
    srcLight: "/assets/projects-screenshots/portfolio/timeseries-light.png",
    screenshots: ["1.png"],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.tensorflow],
    },
    live: "#",
    get content(): JSX.Element {
      return (
        <div>
          <TypographyP className="font-mono ">
            Developed LSTM and CNN models using TensorFlow/Keras for time series forecasting, achieving 92% classification accuracy on 500k+ time-series data points.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="font-mono mb-2 space-y-2 list-disc list-inside">
            <li>Built data pipelines with Python/Pandas, preprocessing 500k+ time-series data points</li>
            <li>Tuned hyperparameters with Keras Tuner using grid search and cross-validation</li>
            <li>Evaluated models using precision, recall, confusion matrices visualized in Matplotlib</li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "book-search-system",
    category: "Backend Systems",
    title: "Book Search System using DynamoDB",
    src: "/assets/projects-screenshots/portfolio/book-search.png",
    srcLight: "/assets/projects-screenshots/portfolio/book-search-light.png",
    screenshots: ["1.png"],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.dynamodb],
    },
    live: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Built a scalable search system on AWS DynamoDB with GSI/LSI optimization, achieving &lt;100ms query latency for complex book searches.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <ul className="font-mono mb-2 space-y-2 list-disc list-inside">
            <li>Developed RESTful backend with Node.js/Express and AWS SDK, supporting complex search filters</li>
            <li>Automated data processing with Python, batch-loading 10,000+ records in &lt;5 minutes</li>
            <li>Optimized DynamoDB queries with Global and Local Secondary Indexes for efficient retrieval</li>
          </ul>
        </div>
      );
    },
  },
];
export default projects;
