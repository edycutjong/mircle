"use client";

import { useEffect, useState } from "react";

export function LiveStatusBar() {
  const [latency, setLatency] = useState(12);
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(8 + Math.floor(Math.random() * 12));
    }, 2000);

    const timeInterval = setInterval(() => {
      setTime(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    }, 1000);

    // Initialize immediately
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="glass flex items-center justify-between px-4 py-2 text-xs font-mono rounded-none border-x-0 border-t-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-400">MIRCLE ONLINE</span>
        </div>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">v1.0.0</span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">TheMiracle SDK</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-500">
          LATENCY: <span className={latency < 15 ? "text-emerald-400" : "text-amber-400"}>{latency}ms</span>
        </span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">
          UPTIME: <span className="text-emerald-400">99.97%</span>
        </span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-600">{time}</span>
      </div>
    </div>
  );
}
