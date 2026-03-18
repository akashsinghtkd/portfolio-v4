// ═══════════════════════════════════════════════════
// PORTFOLIO DATA — Akash Singh
// ═══════════════════════════════════════════════════

export const personalInfo = {
  name: "Akash Singh",
  firstName: "Akash",
  lastName: "Singh",
  title: "Fullstack Developer & AI Engineer",
  tagline: "I don't just write code. I engineer solutions.",
  subtitle: "Not just another developer. A partner who delivers.",
  experience: "10+",
  email: "akashsinghtkd01@gmail.com",
  phone: ["+91 91208 93137", "+91 90058 93137"],
  location: "India — Available Worldwide",
  github: "https://github.com/akashsinghtkd",
  linkedin: "https://linkedin.com/in/akash-singh-37878a146/",
  bio: "10+ years building software with focus on fullstack development and AI integration. From crafting pixel-perfect UIs to architecting complex backend systems — I turn ambitious ideas into production-ready products.",
  stats: [
    { label: "Projects Shipped", value: "50+" },
    { label: "Years in the Game", value: "10+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Chai Consumed", value: "∞" },
  ],
};

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "AI / ML",
    icon: "🧠",
    skills: [
      { name: "OpenAI / GPT APIs", level: 92 },
      { name: "LangChain & RAG", level: 88 },
      { name: "LLM Fine-tuning", level: 78 },
      { name: "AI Automation", level: 90 },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "Vue.js / Alpine.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "TypeScript", level: 90 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js / Express", level: 94 },
      { name: "Python / FastAPI", level: 85 },
      { name: "PHP / Laravel", level: 88 },
      { name: "REST & GraphQL", level: 92 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 80 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      { name: "Docker", level: 85 },
      { name: "CI/CD Pipelines", level: 88 },
      { name: "AWS / Cloud", level: 82 },
      { name: "Git & VCS", level: 95 },
    ],
  },
];

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    title: "Software Engineer & AI Solutions Lead",
    company: "Jamtech Technologies Pvt. Ltd.",
    location: "Lucknow",
    period: "2021 — Present",
    current: true,
    description: [
      "Lead project teams end-to-end — architecture, development, deployment",
      "Built and shipped AI-powered features across client platforms",
      "Set up CI/CD pipelines, dedicated servers, and DevOps workflows",
      "Managed large-scale e-commerce platforms handling heavy traffic",
    ],
  },
  {
    title: "Web Developer",
    company: "WebTechHive Technologies Pvt. Ltd.",
    location: "Lucknow",
    period: "2020 — 2021",
    description: [
      "Built full websites using JavaScript, PHP, MySQL",
      "Created custom themes and plugins",
      "Integrated third-party APIs and payment systems",
    ],
  },
  {
    title: "Freelance Developer & AI Exploration",
    company: "Self-Employed",
    location: "Remote",
    period: "2018 — 2020",
    description: [
      "Delivered 20+ freelance projects across industries",
      "Transitioned to modern React/Node stack",
      "Started building AI prototypes and automation scripts",
    ],
  },
  {
    title: "Self-Taught Developer",
    company: "The Grind",
    location: "The Internet",
    period: "2016 — 2018",
    description: [
      "Built 30+ practice projects to learn the craft",
      "Mastered core web technologies through hands-on building",
      "Landed first paid project through pure hustle",
    ],
  },
];

export interface Service {
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Fullstack Web Development",
    shortTitle: "Fullstack",
    description:
      "From landing pages to complex web apps — frontend, backend, database, and deployment, all handled.",
    icon: "01",
  },
  {
    title: "AI Integration",
    shortTitle: "AI",
    description:
      "Chatbots, smart search, document Q&A, content generation — making your product smarter with AI.",
    icon: "02",
  },
  {
    title: "SaaS Development",
    shortTitle: "SaaS",
    description:
      "Multi-tenant apps with auth, billing, dashboards, user management — the full SaaS stack.",
    icon: "03",
  },
  {
    title: "Automation Systems",
    shortTitle: "Automation",
    description:
      "Workflow automation, data pipelines, scheduled jobs — eliminate repetitive work with smart systems.",
    icon: "04",
  },
  {
    title: "Custom Software",
    shortTitle: "Custom",
    description:
      "Software that fits your exact workflow. No bloat, no unnecessary features — just what you need.",
    icon: "05",
  },
  {
    title: "API Development",
    shortTitle: "APIs",
    description:
      "Clean, well-documented REST or GraphQL APIs with proper auth and rate limiting.",
    icon: "06",
  },
];

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  url?: string;
  featured?: boolean;
  color: string;
}

export const projects: Project[] = [
  {
    title: "Remtra",
    subtitle: "Office Furniture Store",
    description:
      "Built entire Shopify store from scratch — custom theme, optimized product pages, and seamless checkout experience.",
    technologies: ["Shopify", "Liquid", "Theme Dev", "E-commerce"],
    url: "https://shop.remtra.de/",
    featured: true,
    color: "#4a6741",
  },
  {
    title: "Ethical Swag",
    subtitle: "Sustainable Merch Platform",
    description:
      "North America's leading B Corp sustainable promo company. Full e-commerce app with custom product builder.",
    technologies: ["Node.js", "Next.js", "E-commerce", "Custom Builder"],
    url: "https://ethicalswag.com/",
    featured: true,
    color: "#2d5a27",
  },
  {
    title: "Dealord",
    subtitle: "Custom CRM System",
    description:
      "Multi-role access, quotation pipelines, logistics assignment, invoice tracking — a complete CRM solution.",
    technologies: ["Node.js", "React.js", "PostgreSQL", "REST API"],
    url: "https://developer.dealord.it/",
    color: "#5a3d8a",
  },
  {
    title: "AI Chatbot",
    subtitle: "Task Automation Agent",
    description:
      "Intelligent chatbot that handles follow-ups, manages operational tasks, and automates client communications.",
    technologies: ["React.js", "Xano", "OpenAI", "AI Automation"],
    color: "#1a5276",
  },
  {
    title: "Pear Diamonds",
    subtitle: "Luxury Jewelry E-commerce",
    description:
      "Elegant product pages, appointment booking, and travel ring feature for a premium jewelry brand.",
    technologies: ["Shopify", "Liquid", "E-commerce", "Performance"],
    url: "https://peardiamondsco.com/",
    color: "#8b6914",
  },
  {
    title: "Plezi Life",
    subtitle: "Lifestyle Brand",
    description:
      "India's first brand in its category. Premium Shopify store with bold visuals and smooth animations.",
    technologies: ["Shopify", "Theme Design", "Liquid", "UI/UX"],
    url: "https://plezilife.com/",
    color: "#6b2737",
  },
  {
    title: "Handwriting Extractor",
    subtitle: "OCR Automation Tool",
    description:
      "Extract contact details from handwritten notes using OCR, piped into Make.com and n8n automations.",
    technologies: ["Node.js", "React.js", "OCR", "n8n"],
    color: "#2c3e50",
  },
  {
    title: "Full House Wholesale",
    subtitle: "B2B E-commerce",
    description:
      "Shopify Plus with B2B wholesale and D2C flows — different pricing tiers, bulk ordering, customer-specific catalogs.",
    technologies: ["Shopify Plus", "B2B", "D2C", "Liquid"],
    url: "https://fullhousewholesale.shop/",
    color: "#34495e",
  },
  {
    title: "CocoVeda",
    subtitle: "Wellness E-commerce",
    description:
      "Singapore wellness brand with custom product pages and subscription flows for a holistic health experience.",
    technologies: ["WordPress", "PHP", "WooCommerce", "JavaScript"],
    url: "https://cocoveda.sg",
    color: "#1e8449",
  },
  {
    title: "The Designer Club",
    subtitle: "Fashion Platform",
    description:
      "Australian fashion platform connecting designers with buyers — custom collection showcases and ordering system.",
    technologies: ["Laravel", "Vue.js", "MySQL", "AWS S3"],
    url: "https://thedesignerclub.com.au",
    color: "#922b21",
  },
];

export interface WhyReason {
  title: string;
  description: string;
  number: string;
}

export const whyReasons: WhyReason[] = [
  {
    title: "I Ship Fast",
    description:
      "No endless planning cycles. I deliver on tight timelines without cutting corners.",
    number: "01",
  },
  {
    title: "Full Ownership",
    description:
      "I own the entire lifecycle — from architecture through deployment and maintenance.",
    number: "02",
  },
  {
    title: "AI-First Thinking",
    description:
      "Every project gets evaluated for AI opportunities that multiply value.",
    number: "03",
  },
  {
    title: "10+ Years Deep",
    description:
      "Shipping production code across industries and tech stacks since 2016.",
    number: "04",
  },
  {
    title: "Clear Communication",
    description:
      "No jargon, no surprises. I explain complex things simply and keep you in the loop.",
    number: "05",
  },
  {
    title: "Long-Term Partner",
    description:
      "Most clients return. I build relationships, not just projects.",
    number: "06",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
