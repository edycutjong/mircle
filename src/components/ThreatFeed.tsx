"use client";

import { useEffect, useState } from "react";

interface SimulationEvent {
  id: number;
  time: string;
  wallet: string;
  action: string;
  status: "safe" | "blocked" | "warning";
  detail: string;
}

const MOCK_EVENTS: Omit<SimulationEvent, "id" | "time">[] = [
  { wallet: "7xKp...9mN2", action: "Token Approve", status: "blocked", detail: "Infinite allowance → known drainer 0xBAD" },
  { wallet: "3fRt...1aB5", action: "NFT Mint", status: "safe", detail: "Verified collection — Magic Eden" },
  { wallet: "9pLm...6cD4", action: "Swap USDC→SOL", status: "safe", detail: "Jupiter aggregator — best route" },
  { wallet: "2gHn...4eF7", action: "Bridge ETH→SOL", status: "warning", detail: "Unverified bridge contract — proceed?" },
  { wallet: "5kWp...8jG1", action: "Token Approve", status: "blocked", detail: "Honeypot token detected — reverted" },
  { wallet: "8rBv...0zX3", action: "Stake SOL", status: "safe", detail: "Marinade Finance — validated" },
  { wallet: "1dNs...7yQ6", action: "DApp Connect", status: "warning", detail: "New contract — 2 hours old" },
  { wallet: "4hFt...2wE9", action: "Token Transfer", status: "safe", detail: "Verified recipient — Coinbase" },
];

export function ThreatFeed() {
  const [events, setEvents] = useState<SimulationEvent[]>([]);

  useEffect(() => {
    // Seed initial events
    const initial = MOCK_EVENTS.slice(0, 4).map((e, i) => ({
      ...e,
      id: i,
      time: new Date(Date.now() - (3 - i) * 3000).toLocaleTimeString("en-US", { hour12: false }),
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvents(initial);

    let index = 4;
    const interval = setInterval(() => {
      const event = MOCK_EVENTS[index % MOCK_EVENTS.length];
      setEvents((prev) => [
        {
          ...event,
          id: Date.now(),
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
        },
        ...prev.slice(0, 7),
      ]);
      index++;
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    safe: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", label: "SAFE" },
    blocked: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", label: "BLOCKED" },
    warning: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "WARN" },
  };

  return (
    <div className="glass-card p-5 relative overflow-hidden scanline">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          LIVE THREAT FEED
        </h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs font-mono text-red-400">SCANNING</span>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        {events.map((event) => {
          const cfg = statusConfig[event.status];
          return (
            <div
              key={event.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${cfg.bg} border ${cfg.border} transition-all duration-500 slide-up`}
            >
              <span className="text-xs font-mono text-slate-500 w-16 flex-shrink-0">{event.time}</span>
              <span className="text-xs font-mono text-slate-400 w-24 flex-shrink-0">{event.wallet}</span>
              <span className="text-xs text-slate-300 flex-1 truncate">{event.action} — {event.detail}</span>
              <span className={`text-[10px] font-bold ${cfg.color} px-2 py-0.5 rounded-full ${cfg.bg} border ${cfg.border}`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
