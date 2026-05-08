"use client";

import { useState } from "react";
import { theMiracleService } from "@/lib/themiracle";
import { ParticleField } from "@/components/ParticleField";
import { LiveStatusBar } from "@/components/LiveStatusBar";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ConfettiExplosion } from "@/components/ConfettiExplosion";
import { ThreatFeed } from "@/components/ThreatFeed";
import { PricingTable } from "@/components/PricingTable";
import { BenefitCard } from "@/components/BenefitCard";

type View = "hero" | "activate" | "metrics" | "pricing";

export default function Home() {
  const [view, setView] = useState<View>("hero");
  const [isActivating, setIsActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [licenseId, setLicenseId] = useState("");

  const handleActivate = async () => {
    setIsActivating(true);
    const result = await theMiracleService.claimIncentive("user_demo");
    setLicenseId(result.licenseId);
    setIsActivating(false);
    setActivated(true);
  };

  return (
    <>
      <ParticleField />
      <LiveStatusBar />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAV */}
        <header className="glass sticky top-0 z-50 px-6 py-3 flex items-center justify-between border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary to-primary-dark flex items-center justify-center glow-amber">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-widest gradient-text">MIRCLE</h1>
              <p className="text-[10px] text-slate-500 font-mono -mt-0.5">INCENTIVE LAYER</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-900/80 rounded-lg p-1 border border-slate-800">
            {(["hero", "activate", "metrics", "pricing"] as View[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold tracking-wider transition-all ${
                  view === v ? "bg-primary text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {v === "hero" ? "HOME" : v === "activate" ? "ACTIVATE" : v === "metrics" ? "METRICS" : "PRICING"}
              </button>
            ))}
          </nav>
        </header>

        {/* CONTENT */}
        <main className="flex-1 flex items-center justify-center p-6">
          {view === "hero" && <HeroSection onNavigate={setView} />}
          {view === "activate" && (
            <ActivationSection
              activated={activated}
              isActivating={isActivating}
              licenseId={licenseId}
              onActivate={handleActivate}
            />
          )}
          {view === "metrics" && <MetricsSection />}
          {view === "pricing" && <PricingSection />}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/50 py-4 text-center">
          <p className="text-xs text-slate-600 font-mono">
            Mircle — Zero-Cost GTM Incentive Layer • Built for Colosseum Frontier 2026 • Powered by TheMiracle SDK
          </p>
        </footer>
      </div>

      <ConfettiExplosion active={activated} />
    </>
  );
}

/* ═══════ HERO ═══════ */
function HeroSection({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-10">
      {/* Badge */}
      <div className="slide-up">
        <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-xs font-mono text-primary">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary" /></span>
          COLOSSEUM FRONTIER 2026
        </span>
      </div>

      {/* Title */}
      <div className="space-y-4 slide-up slide-up-delay-1">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tight">
          <span className="gradient-text-hero">$5,000 in Protection.</span>
          <br />
          <span className="text-white">Zero Cost.</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Lifetime Pro Licenses for wallet security — the zero-marginal-cost incentive that 
          converts <span className="text-primary font-semibold">35 million wallet users</span> into 
          protected, loyal customers.
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center gap-4 slide-up slide-up-delay-2">
        <button onClick={() => onNavigate("activate")}
          className="bg-linear-to-r from-primary to-primary-light text-slate-950 font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(217,119,6,0.4)] transition-all text-sm">
          CLAIM YOUR LICENSE →
        </button>
        <button onClick={() => onNavigate("metrics")}
          className="border border-slate-700 text-slate-300 font-bold px-8 py-3.5 rounded-xl hover:border-primary/50 hover:text-white transition-all text-sm">
          VIEW METRICS
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto slide-up slide-up-delay-3">
        {[
          { label: "LICENSES ISSUED", value: "8,492" },
          { label: "CASH SPENT", value: "$0" },
          { label: "PERCEIVED VALUE", value: "$4.2M" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Benefit cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
        <BenefitCard delay="slide-up-delay-2"
          icon={<svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2.5 2.5L16 9"/></svg>}
          title="Audience" description="DeFi-active wallets holding >$1K in assets" metric="35M WALLETS" />
        <BenefitCard delay="slide-up-delay-3"
          icon={<svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3"/></svg>}
          title="Action" description="Connect wallet, run security scan, enable Protected Mode" metric="1-CLICK" />
        <BenefitCard delay="slide-up-delay-4"
          icon={<svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          title="Incentive" description="Free Lifetime Pro License valued at $50/yr — 100 seats" metric="$5,000 VALUE" />
        <BenefitCard delay="slide-up-delay-5"
          icon={<svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
          title="Value" description="Sleep easy. Your wallet now has an airbag." metric="∞ PRICELESS" />
      </div>
    </div>
  );
}

/* ═══════ ACTIVATION ═══════ */
function ActivationSection({ activated, isActivating, licenseId, onActivate }: {
  activated: boolean; isActivating: boolean; licenseId: string; onActivate: () => void;
}) {
  return (
    <div className="max-w-md w-full">
      <div className="glass-card p-8 flex flex-col items-center relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/15 blur-[100px] rounded-full pointer-events-none" />

        {/* Badge icon */}
        <div className="mb-6 relative">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 ${
            activated
              ? "bg-primary/20 glow-amber-intense border-2 border-primary"
              : "bg-slate-800/80 border border-slate-700"
          }`}>
            {activated ? (
              <svg className="h-12 w-12 text-primary float" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ) : (
              <svg className="h-12 w-12 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            )}
          </div>
          {activated && <div className="absolute inset-0 rounded-full pulse-ring" />}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {activated ? "LIFETIME PRO UNLOCKED" : "UPGRADE TO PRO"}
        </h2>
        <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto">
          {activated
            ? "Your wallet is permanently linked to a Guardian License. Enjoy priority access and zero fees."
            : "Connect with TheMiracle to claim your free Lifetime Pro License. Limited time incentive."}
        </p>

        {activated ? (
          <div className="w-full space-y-3 slide-up">
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-left space-y-2.5">
              {[
                { label: "LICENSE ID", value: licenseId, color: "text-primary font-bold" },
                { label: "TIER", value: "LIFETIME PRO", color: "text-primary-light" },
                { label: "ISSUED", value: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase(), color: "text-white" },
                { label: "VALUE", value: "♾️ PRICELESS", color: "text-success font-bold" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">{row.label}</span>
                  <span className={`font-mono text-xs ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-success/10 border border-success/30 rounded-xl p-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <p className="text-xs text-success">Protected Mode active — all transactions will be scanned before signing.</p>
            </div>
          </div>
        ) : (
          <button onClick={onActivate} disabled={isActivating}
            className="w-full bg-linear-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 px-6 rounded-xl transition-all glow-amber hover:glow-amber-intense disabled:opacity-70 flex justify-center items-center gap-2 text-sm">
            {isActivating ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                ACTIVATING VIA THEMIRACLE...
              </>
            ) : "CLAIM INCENTIVE WITH THEMIRACLE"}
          </button>
        )}
        {!activated && <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-wider font-mono">Powered by TheMiracle SDK</p>}
      </div>
    </div>
  );
}

/* ═══════ METRICS ═══════ */
function MetricsSection() {
  const stats = [
    { label: "TOTAL SIGNUPS", value: 8492, prefix: "", color: "text-white" },
    { label: "ACTIVE LICENSES", value: 6104, prefix: "", color: "text-primary" },
    { label: "CAC (SPENT)", rawValue: "$0.00", color: "text-success" },
    { label: "PERCEIVED VALUE", rawValue: "$4.2M", color: "text-white" },
  ];

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`glass-card p-5 slide-up slide-up-delay-${i + 1}`}>
            <h3 className="text-[10px] text-slate-400 font-bold tracking-wider mb-2">{s.label}</h3>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${s.color}`}>
                {s.rawValue ?? <AnimatedCounter target={s.value!} prefix={s.prefix} />}
              </span>
              <span className="text-xs font-mono text-success bg-success/10 px-1.5 py-0.5 rounded">
                {s.rawValue === "$0.00" ? "0%" : s.rawValue ? "+∞" : "+142%"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Feed side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="glass-card p-6 flex flex-col slide-up slide-up-delay-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              USER ACQUISITION VELOCITY
            </h2>
            <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">ZERO MARGINAL COST</span>
          </div>
          <div className="flex-1 min-h-[200px] relative flex items-end gap-1.5">
            {[12,15,18,25,42,65,89,124,180,245,310,480,650,890,1200].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group">
                <div className="w-full bg-slate-800 group-hover:bg-primary rounded-t transition-colors duration-300"
                  style={{ height: `${(h / 1200) * 100}%` }} />
              </div>
            ))}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-b border-dashed border-slate-800/50 flex justify-end pb-1"><span className="text-[10px] text-slate-600 font-mono">1.2K</span></div>
              <div className="w-full border-b border-dashed border-slate-800/50 flex justify-end pb-1"><span className="text-[10px] text-slate-600 font-mono">600</span></div>
              <div className="w-full border-b border-dashed border-slate-800/50 flex justify-end pb-1"><span className="text-[10px] text-slate-600 font-mono">0</span></div>
            </div>
          </div>
        </div>

        {/* Threat feed */}
        <div className="slide-up slide-up-delay-4">
          <ThreatFeed />
        </div>
      </div>

      {/* Insight banner */}
      <div className="glass-card p-4 flex items-start gap-4 border-primary/30 slide-up slide-up-delay-5">
        <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>
          <h4 className="text-sm font-bold text-primary mb-1">STRATEGIC INSIGHT</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The &quot;Lifetime Pro License&quot; digital asset achieved the $5,000 incentive threshold without cash burn.
            Activation rates are 4× higher than token drops — users perceive utility decoupled from market volatility.
            TheMiracle SDK authenticated 100% of claims.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════ PRICING ═══════ */
function PricingSection() {
  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="text-center space-y-3 slide-up">
        <h2 className="text-4xl font-bold gradient-text">Free vs Pro</h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          100 Lifetime Pro Licenses at $50/yr = <span className="text-primary font-bold">$5,000 committed value</span>.
          Actual cost: <span className="text-success font-bold">$0.00</span>.
        </p>
      </div>
      <div className="slide-up slide-up-delay-2">
        <PricingTable />
      </div>
      <div className="text-center slide-up slide-up-delay-3">
        <p className="text-xs text-slate-500 font-mono">
          is_pro = true // That&apos;s it. A database boolean. Zero marginal cost. Infinite perceived value.
        </p>
      </div>
    </div>
  );
}
