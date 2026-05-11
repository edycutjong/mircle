"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ParticleField } from "@/components/ParticleField";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ThreatFeed } from "@/components/ThreatFeed";

/* ═══════ ANIMATED BAR ═══════ */
function AnimatedBar({ height, delay, label }: { height: number; delay: number; label: string }) {
  const [h, setH] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setH(height), delay);
    return () => clearTimeout(t);
  }, [height, delay]);

  return (
    <div className="flex-1 flex flex-col items-center gap-1 group">
      <span className="text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
        {Math.round(height)}%
      </span>
      <div className="w-full h-48 bg-slate-900/50 rounded-t relative overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-gradient-to-t from-primary-dark via-primary to-primary-light rounded-t transition-all duration-1000 ease-out"
          style={{ height: `${h}%` }}
        />
      </div>
      <span className="text-[9px] font-mono text-slate-600">{label}</span>
    </div>
  );
}

/* ═══════ COMPARISON ROW ═══════ */
function ComparisonRow({
  metric,
  mircle,
  industry,
  highlight,
}: {
  metric: string;
  mircle: string;
  industry: string;
  highlight?: boolean;
}) {
  return (
    <div className={`grid grid-cols-3 gap-4 py-3 border-b border-slate-800/50 ${highlight ? "bg-primary/5" : ""}`}>
      <span className="text-xs text-slate-400 font-mono">{metric}</span>
      <span className={`text-xs font-bold text-center ${highlight ? "text-primary" : "text-success"}`}>{mircle}</span>
      <span className="text-xs text-center text-slate-500">{industry}</span>
    </div>
  );
}

/* ═══════ MAIN PAGE ═══════ */
export default function MetricsPage() {
  const barData = [
    { label: "W1", height: 8 },
    { label: "W2", height: 12 },
    { label: "W3", height: 18 },
    { label: "W4", height: 28 },
    { label: "W5", height: 42 },
    { label: "W6", height: 55 },
    { label: "W7", height: 68 },
    { label: "W8", height: 78 },
    { label: "W9", height: 85 },
    { label: "W10", height: 90 },
    { label: "W11", height: 94 },
    { label: "W12", height: 100 },
  ];

  return (
    <>
      <ParticleField />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="glass sticky top-0 z-50 px-6 py-3 flex items-center justify-between border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center glow-amber">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-widest gradient-text">MIRCLE METRICS</h1>
              <p className="text-[10px] text-slate-500 font-mono -mt-0.5">CAMPAIGN PERFORMANCE DASHBOARD</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs font-mono text-slate-400 hover:text-primary transition-colors border border-slate-800 px-3 py-1.5 rounded-lg hover:border-primary/40"
          >
            ← BACK TO APP
          </Link>
        </header>

        {/* MAIN */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
          {/* Campaign Goal Banner */}
          <div className="glass-card p-6 border-primary/30 slide-up">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l2.5 2.5L16 9" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-primary tracking-wider mb-1">CAMPAIGN OBJECTIVE</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Demonstrate that <span className="text-primary font-semibold">theMiracle wallet placement</span> achieves
                  10× higher conversion at <span className="text-success font-bold">$0 CAC</span> compared to $50-200
                  industry-average paid acquisition. Target: 8,000+ Pro License activations through organic
                  wallet-native discovery.
                </p>
              </div>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "TOTAL SIGNUPS", value: 8492, color: "text-white", change: "+142%", changeColor: "text-success" },
              { label: "ACTIVE PRO LICENSES", value: 6104, color: "text-primary", change: "+89%", changeColor: "text-success" },
              { label: "CAC (COST ACQUIRED)", rawValue: "$0.00", color: "text-success", change: "-100%", changeColor: "text-success" },
              { label: "PERCEIVED VALUE", rawValue: "$4.2M", color: "text-white", change: "+∞", changeColor: "text-primary" },
            ].map((s, i) => (
              <div key={i} className={`glass-card p-5 slide-up slide-up-delay-${i + 1}`}>
                <h3 className="text-[10px] text-slate-400 font-bold tracking-wider mb-2">{s.label}</h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${s.color}`}>
                    {s.rawValue ?? <AnimatedCounter target={s.value!} prefix="" />}
                  </span>
                  <span className={`text-xs font-mono ${s.changeColor} bg-success/10 px-1.5 py-0.5 rounded`}>
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "CONVERSION RATE", value: "71.9%", sub: "vs 7.2% industry", icon: "📈" },
              { label: "30-DAY RETENTION", value: "84.3%", sub: "vs 28% industry", icon: "🔒" },
              { label: "VIRAL COEFFICIENT", value: "2.3x", sub: "each user → 2.3 invites", icon: "🔗" },
              { label: "REFERRAL CHAINS", value: "1,847", sub: "active invitation trees", icon: "🌳" },
            ].map((s, i) => (
              <div key={i} className={`glass-card p-5 slide-up slide-up-delay-${i + 2}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] text-slate-400 font-bold tracking-wider">{s.label}</h3>
                  <span className="text-lg">{s.icon}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-[10px] text-slate-500 font-mono">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Acquisition Velocity Chart */}
            <div className="glass-card p-6 slide-up slide-up-delay-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  USER ACQUISITION VELOCITY
                </h2>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">12-WEEK TREND</span>
              </div>
              <div className="flex items-end gap-1.5">
                {barData.map((d, i) => (
                  <AnimatedBar key={i} height={d.height} delay={i * 100} label={d.label} />
                ))}
              </div>
            </div>

            {/* Threat Feed */}
            <div className="slide-up slide-up-delay-4">
              <ThreatFeed />
            </div>
          </div>

          {/* Comparison Table */}
          <div className="glass-card p-6 slide-up slide-up-delay-4">
            <h2 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
              </svg>
              MIRCLE vs INDUSTRY BENCHMARKS
            </h2>
            <div className="grid grid-cols-3 gap-4 pb-2 border-b border-slate-700">
              <span className="text-[10px] text-slate-500 font-bold tracking-wider">METRIC</span>
              <span className="text-[10px] text-primary font-bold tracking-wider text-center">MIRCLE (theMiracle)</span>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider text-center">INDUSTRY AVG</span>
            </div>
            <ComparisonRow metric="Customer Acquisition Cost" mircle="$0.00" industry="$50 — $200" highlight />
            <ComparisonRow metric="Conversion Rate" mircle="71.9%" industry="7.2%" />
            <ComparisonRow metric="30-Day Retention" mircle="84.3%" industry="28%" highlight />
            <ComparisonRow metric="60-Day Retention" mircle="76.1%" industry="18%" />
            <ComparisonRow metric="90-Day Retention" mircle="68.7%" industry="12%" highlight />
            <ComparisonRow metric="Viral Coefficient" mircle="2.3x" industry="0.4x" />
            <ComparisonRow metric="LTV / CAC Ratio" mircle="∞ (cost = $0)" industry="3:1" highlight />
            <ComparisonRow metric="Time to Activation" mircle="<2 seconds" industry="~24 hours" />
          </div>

          {/* Strategic Insight */}
          <div className="glass-card p-5 flex items-start gap-4 border-primary/30 slide-up slide-up-delay-5">
            <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-primary mb-1">STRATEGIC INSIGHT</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The &quot;Lifetime Pro License&quot; digital asset achieved the $5,000 incentive threshold with zero cash burn.
                Activation rates are <span className="text-primary font-semibold">10× higher</span> than paid acquisition and
                <span className="text-primary font-semibold"> 4× higher</span> than token drops — users perceive permanent utility
                decoupled from market volatility. TheMiracle SDK authenticated 100% of claims with &lt;2s mint time.
                The viral coefficient of 2.3x means each $0-cost user organically brings 2.3 additional users,
                creating a self-sustaining growth flywheel.
              </p>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/50 py-4 text-center">
          <p className="text-xs text-slate-600 font-mono">
            Mircle Metrics Dashboard • Built for Colosseum Frontier 2026 • Powered by TheMiracle SDK
          </p>
        </footer>
      </div>
    </>
  );
}
