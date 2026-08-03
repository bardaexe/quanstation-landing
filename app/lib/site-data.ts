export const primaryNav = [
  { href: "/platform", label: "Platform" },
  { href: "/pricing", label: "Pricing" },
  { href: "/security", label: "Security" },
  { href: "/resources", label: "Resources" },
] as const;

export const platformLinks = [
  { href: "/platform#research", label: "Research", description: "Code, data, and validation" },
  { href: "/platform#backtesting", label: "Backtesting", description: "Simulation and optimization" },
  { href: "/platform#execution", label: "Execution", description: "Charts, orders, and risk" },
  { href: "/platform#reports", label: "Reports", description: "Evidence after every run" },
] as const;

export const resourceLinks = [
  { href: "/resources#guides", label: "Guides", description: "Workflows for systematic traders" },
  { href: "/resources#integrations", label: "Integrations", description: "Brokers, runtimes, and data" },
  { href: "/resources#faq", label: "FAQ", description: "Product and account answers" },
  { href: "/contact", label: "Contact", description: "Talk with the QuantStation team" },
] as const;

export type Tier = {
  name: string;
  group: "Start" | "Build & trade" | "Scale";
  price: string;
  cadence?: string;
  description: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const tiers: Tier[] = [
  {
    name: "Free",
    group: "Start",
    price: "€0",
    cadence: "/month",
    description: "Learn the workflow and validate a first idea locally.",
    cta: "Start free",
    features: ["1 local dataset", "Level 1 and Level 2 data", "Single-threaded CPU research", "Reports and notebook"],
  },
  {
    name: "Starter",
    group: "Start",
    price: "Launch access",
    description: "Add portfolio construction, simulations, and private sync.",
    cta: "Request Starter",
    features: ["3 local datasets", "1 GiB remote capacity", "Portfolio workspace", "Prop simulations"],
  },
  {
    name: "Pro",
    group: "Build & trade",
    price: "Launch access",
    description: "Move from research into a controlled live workstation.",
    cta: "Request Pro",
    features: ["10 local datasets", "10 GiB remote capacity", "Trading workspace", "Remote projects and reports"],
  },
  {
    name: "Premium",
    group: "Build & trade",
    price: "Launch access",
    description: "Accelerate research with Quant AI and richer capture tools.",
    cta: "Request Premium",
    featured: true,
    features: ["50 local datasets", "50 GiB remote capacity", "Quant AI", "Remote datasets", "Replay export and capture"],
  },
  {
    name: "Elite",
    group: "Scale",
    price: "Launch access",
    description: "More capacity for advanced researchers and trading teams.",
    cta: "Talk to us",
    features: ["250 local datasets", "250 GiB remote capacity", "Higher AI quotas", "Webcam and custom watermark"],
  },
  {
    name: "Privateer",
    group: "Scale",
    price: "Custom",
    description: "The highest encoded limits for demanding workstations.",
    cta: "Talk to us",
    features: ["Unlimited encoded capacity", "Highest AI quotas", "4K / 60 capture", "Priority planning session"],
  },
];

export const comparisonRows = [
  { category: "Research", feature: "Local datasets", values: ["1", "3", "10", "50", "250", "Unlimited"] },
  { category: "Research", feature: "Market data depth", values: ["L1–L2", "L1–L3", "L1–L3", "L1–L3", "L1–L3", "L1–L3"] },
  { category: "Research", feature: "Parallel compute", values: ["1 CPU", "Included", "Included", "Included", "Included", "Included"] },
  { category: "Platform", feature: "Portfolio workspace", values: ["—", "Included", "Included", "Included", "Included", "Included"] },
  { category: "Platform", feature: "Trading workspace", values: ["—", "—", "Included", "Included", "Included", "Included"] },
  { category: "Storage", feature: "Remote capacity", values: ["—", "1 GiB", "10 GiB", "50 GiB", "250 GiB", "Unlimited"] },
  { category: "AI", feature: "Quant AI", values: ["—", "—", "—", "Included", "Higher quota", "Highest quota"] },
  { category: "Capture", feature: "Chart capture", values: ["—", "—", "—", "1080p / 30", "+ webcam", "4K / 60"] },
] as const;

export const integrations = ["Python", "Rust", "NautilusTrader", "ProjectX", "CUDA", "ROCm"] as const;
