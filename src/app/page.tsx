"use client";

import { useState } from "react";
import { theMiracleService } from "@/lib/themiracle";

export default function Home() {
  const [view, setView] = useState<"activation" | "metrics">("activation");
  const [isActivating, setIsActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  const [licenseId, setLicenseId] = useState("MRC-782A-99B1");

  const handleActivate = async () => {
    setIsActivating(true);
    const result = await theMiracleService.claimIncentive("user_123");
    setLicenseId(result.licenseId);
    setIsActivating(false);
    setActivated(true);
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden p-6 gap-6">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-surface p-4 rounded-xl border border-primary/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(217,119,6,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest">MIRCLE</h1>
            <p className="text-xs text-primary font-mono opacity-80">INCENTIVE LAYER</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 rounded-lg p-1 border border-slate-800">
          <button 
            onClick={() => setView("activation")}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${view === 'activation' ? 'bg-primary text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
          >
            USER VIEW
          </button>
          <button 
            onClick={() => setView("metrics")}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${view === 'metrics' ? 'bg-primary text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}
          >
            ADMIN METRICS
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-h-0 flex items-center justify-center">
        {view === "activation" ? (
          /* USER VIEW - ACTIVATION FLOW */
          <div className="max-w-md w-full bg-surface border border-slate-800 rounded-2xl p-8 flex flex-col items-center relative overflow-hidden text-center shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="mb-6 relative">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ${activated ? 'bg-primary/20 shadow-[0_0_30px_rgba(217,119,6,0.5)] border-2 border-primary' : 'bg-slate-800 border border-slate-700'}`}>
                {activated ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {activated ? "LIFETIME PRO UNLOCKED" : "UPGRADE TO PRO"}
            </h2>
            <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto">
              {activated 
                ? "Your wallet is now permanently linked to a Guardian License. Enjoy priority access and zero fees." 
                : "Connect with TheMiracle to claim your free Lifetime Pro License. Limited time incentive offer."}
            </p>

            {activated ? (
              <div className="w-full bg-primary/10 border border-primary/30 rounded-xl p-4 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">LICENSE ID</span>
                  <span className="font-mono text-xs text-primary">{licenseId}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">ISSUED</span>
                  <span className="font-mono text-xs text-white">MAY 07, 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">VALUE</span>
                  <span className="font-mono text-xs text-success font-bold">♾️ PRICELESS</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleActivate}
                disabled={isActivating}
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isActivating ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                    ACTIVATING...
                  </>
                ) : (
                  "CLAIM INCENTIVE WITH THEMIRACLE"
                )}
              </button>
            )}
            
            {!activated && (
              <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-wider">Powered by TheMiracle SDK</p>
            )}
          </div>
        ) : (
          /* ADMIN VIEW - METRICS DASHBOARD */
          <div className="w-full max-w-5xl h-full flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: "TOTAL SIGNUPS", value: "8,492", trend: "+142%", color: "text-white" },
                { label: "ACTIVE LICENSES", value: "6,104", trend: "+89%", color: "text-primary" },
                { label: "CAC (SPENT)", value: "$0.00", trend: "0%", color: "text-success" },
                { label: "PERCEIVED VALUE", value: "$4.2M", trend: "+∞", color: "text-white" },
              ].map((stat, i) => (
                <div key={i} className="bg-surface border border-slate-800 rounded-xl p-5">
                  <h3 className="text-xs text-slate-400 font-bold tracking-wider mb-2">{stat.label}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
                    <span className="text-xs font-mono text-success bg-success/10 px-1.5 py-0.5 rounded">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 bg-surface border border-slate-800 rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  THEMIRACLE USER ACQUISITION VELOCITY
                </h2>
                <div className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">ZERO MARGINAL COST</div>
              </div>
              
              <div className="flex-1 relative flex items-end gap-2">
                {/* Mock Chart */}
                {[12, 15, 18, 25, 42, 65, 89, 124, 180, 245, 310, 480, 650, 890, 1200].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <div 
                      className="w-full bg-slate-800 group-hover:bg-primary transition-colors rounded-t-sm"
                      style={{ height: `${(h / 1200) * 100}%` }}
                    />
                  </div>
                ))}
                
                {/* Overlay lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full border-b border-dashed border-slate-800/50 flex justify-end pb-1"><span className="text-[10px] text-slate-500 font-mono">1.2K</span></div>
                  <div className="w-full border-b border-dashed border-slate-800/50 flex justify-end pb-1"><span className="text-[10px] text-slate-500 font-mono">600</span></div>
                  <div className="w-full border-b border-dashed border-slate-800/50 flex justify-end pb-1"><span className="text-[10px] text-slate-500 font-mono">0</span></div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-start gap-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
               <div>
                 <h4 className="text-sm font-bold text-primary mb-1">STRATEGIC INSIGHT</h4>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   The deployment of the "Lifetime Pro License" digital asset achieved the required $5,000 incentive threshold without cash burn. Activation rates are 4x higher than standard token drops, as users perceive the utility to be decoupled from market volatility. TheMiracle SDK integration successfully authenticated 100% of claims.
                 </p>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
