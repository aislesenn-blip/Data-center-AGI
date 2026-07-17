import { ArrowRight, Wallet, CheckCircle2, Building, GraduationCap, LucideIcon } from "lucide-react";

export type Step = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const HOW_IT_WORKS_STEPS: Step[] = [
  { icon: Building, title: "1. The Provider Partner", desc: "An essential service provider partners with FEEP to offer flexible payment options to their customers." },
  { icon: Wallet, title: "2. The Customer Chooses", desc: "The customer selects FEEP to pay their bill, choosing a schedule that fits their natural income." },
  { icon: CheckCircle2, title: "3. The Provider Gets Paid", desc: "FEEP immediately pays the provider the full amount, so they have the funds they need to operate." },
  { icon: ArrowRight, title: "4. Everyone Wins", desc: "The provider gets their cash upfront, and the customer gets the flexibility they deserve." }
];

export type Category = {
  icon: LucideIcon;
  title: string;
  desc: string;
  status: "Active" | "Future";
};

export const CATEGORIES: Category[] = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Schools need fees on time. Parents need flexibility. We bridge the gap.",
    status: "Active",
  },
  {
    icon: Wallet,
    title: "Housing",
    desc: "Landlords need rent on time. Tenants need flexibility. We bridge the gap.",
    status: "Future",
  },
  {
    icon: CheckCircle2,
    title: "Healthcare",
    desc: "Clinics need payment on time. Patients need flexibility. We bridge the gap.",
    status: "Future",
  },
  {
    icon: ArrowRight,
    title: "Utilities",
    desc: "Utility providers need payment immediately. People need flexibility. We bridge the gap.",
    status: "Future",
  },
];

export const IMPACT_METRICS = [
  { value: "50k+", label: "Families Supported" },
  { value: "200+", label: "Providers Partnered" },
  { value: "99%", label: "Retention Rate" },
  { value: "$10M+", label: "Payments Enabled" }
];

export const INVESTOR_BULLETS = [
  'High LTV/CAC ratio through B2B2C distribution',
  'Proprietary risk assessment algorithms',
  'Massive unserved TAM in emerging markets',
  'Asset-light technology platform'
];

export const FAQS = [
  { q: "Is this a loan?", a: "No. We simply help providers accept flexible payments. We don't charge interest, we don't ask people to understand complicated financial models, and we don't charge hidden fees." },
  { q: "How does it work for the customer?", a: "If your service provider uses FEEP, you can select us as your payment method. You choose a payment schedule that works for you, and we handle the rest with the provider." },
  { q: "What's the benefit for the provider?", a: "We pay the provider the full amount immediately. This gives them the reliable cash flow they need to operate, without having to chase late payments." },
  { q: "Who can partner with FEEP?", a: "Our beachhead market is education, with rapid expansion planned for housing, healthcare, and utilities. Providers must meet our operational criteria." }
];
