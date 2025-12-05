import { Check, Zap, Crown, Rocket } from "lucide-react";
export const PRICING_PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for casual movie watchers",
    icon: Zap,
    features: [
      "Browse 10,000+ movies",
      "Basic search functionality",
      "Create watchlist (up to 50 movies)",
      "Standard quality posters",
      "Community reviews access",
    ],
    gradient: "from-slate-700 to-slate-800",
    popular: false,
  },
  {
    name: "Pro",
    price: "9.99",
    description: "For dedicated movie enthusiasts",
    icon: Crown,
    features: [
      "Browse 50,000+ movies",
      "Advanced search & filters",
      "Unlimited watchlist",
      "High quality posters & trailers",
      "Priority customer support",
      "Personalized recommendations",
      "Ad-free experience",
      "Early access to new features",
    ],
    gradient: "from-rose-600 to-rose-700",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "29.99",
    description: "For teams and businesses",
    icon: Rocket,
    features: [
      "Everything in Pro",
      "API access (10,000 calls/month)",
      "Team collaboration tools",
      "Custom integrations",
      "Advanced analytics dashboard",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label options",
    ],
    gradient: "from-indigo-600 to-indigo-700",
    popular: false,
  },
];

export const FAQ = [
  {
    q: "Can I change plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and various local payment methods depending on your region.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No, all our plans are month-to-month with no long-term commitment. You can cancel anytime.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
];
