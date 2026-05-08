"use client";

import { useState } from "react";

const TIERS = [
  {
    name: "FREE",
    price: "$0",
    period: "forever",
    highlight: false,
    features: [
      { name: "Basic transaction scan", included: true },
      { name: "Known drainer detection", included: true },
      { name: "Community threat feed", included: true },
      { name: "Real-time simulation", included: false },
      { name: "Unlimited scan history", included: false },
      { name: "Priority alerting", included: false },
      { name: "Custom watchlists", included: false },
      { name: "API access", included: false },
    ],
  },
  {
    name: "PRO",
    price: "$50",
    period: "/year",
    highlight: true,
    badge: "LIFETIME FREE",
    features: [
      { name: "Basic transaction scan", included: true },
      { name: "Known drainer detection", included: true },
      { name: "Community threat feed", included: true },
      { name: "Real-time simulation", included: true },
      { name: "Unlimited scan history", included: true },
      { name: "Priority alerting", included: true },
      { name: "Custom watchlists", included: true },
      { name: "API access", included: true },
    ],
  },
];

export function PricingTable() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          onMouseEnter={() => setHoveredTier(tier.name)}
          onMouseLeave={() => setHoveredTier(null)}
          className={`relative glass-card p-6 transition-all duration-500 ${
            tier.highlight
              ? "border-primary/40 glow-amber"
              : "border-slate-800"
          } ${hoveredTier === tier.name ? "scale-[1.02]" : ""}`}
        >
          {tier.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-slate-950 text-xs font-bold px-4 py-1 rounded-full">
              {tier.badge}
            </div>
          )}

          <div className="text-center mb-6 pt-2">
            <h3 className="text-sm font-bold tracking-widest text-slate-400 mb-2">
              {tier.name}
            </h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-4xl font-bold ${tier.highlight ? "gradient-text" : "text-white"}`}>
                {tier.price}
              </span>
              <span className="text-sm text-slate-500">{tier.period}</span>
            </div>
            {tier.highlight && (
              <p className="text-xs text-primary mt-2 font-mono">
                100 licenses × $50/yr = $5,000 value
              </p>
            )}
          </div>

          <div className="space-y-3">
            {tier.features.map((feat) => (
              <div key={feat.name} className="flex items-center gap-3">
                {feat.included ? (
                  <svg className="w-4 h-4 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
                <span className={`text-sm ${feat.included ? "text-slate-300" : "text-slate-600"}`}>
                  {feat.name}
                </span>
              </div>
            ))}
          </div>

          <button
            className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all ${
              tier.highlight
                ? "bg-linear-to-r from-primary to-primary-light text-slate-950 hover:shadow-[0_0_25px_rgba(217,119,6,0.5)]"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tier.highlight ? "CLAIM LIFETIME PRO" : "CURRENT PLAN"}
          </button>
        </div>
      ))}
    </div>
  );
}
