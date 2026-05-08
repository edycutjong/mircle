import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 max-w-3xl mx-auto">
      <div className="w-full space-y-8">
        <Link href="/" className="text-xs font-mono text-primary hover:underline">
          ← Back to Dashboard
        </Link>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold gradient-text tracking-tight">Mircle</h1>
          <p className="text-lg text-slate-400">Zero-Cost GTM Incentive Layer</p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 tracking-wider">WHAT IT DOES</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Mircle is a wallet-native security scanner that simulates transactions, detects drainers and honeypots,
            and warns users before signing malicious contracts. The Lifetime Pro License incentive achieves
            $5,000+ in perceived value at zero marginal cost — a database boolean flip.
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 tracking-wider">BENEFIT PROPOSAL</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Audience", value: "DeFi-active wallets > $1K" },
              { label: "Action", value: "Connect → scan → enable shield" },
              { label: "Incentive", value: "100 Lifetime Pro @ $50/yr = $5K" },
              { label: "Value", value: "Your wallet now has an airbag" },
            ].map((b) => (
              <div key={b.label} className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="text-[10px] text-slate-500 font-mono mb-1">{b.label.toUpperCase()}</div>
                <div className="text-xs text-slate-300">{b.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 tracking-wider">TECH STACK</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "TheMiracle SDK"].map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-300 tracking-wider">HACKATHON</h2>
          <p className="text-sm text-slate-400">
            Built for <span className="text-white font-semibold">Colosseum Frontier Hackathon 2026</span> —
            TheMiracle Wallet Placement Track ($10,000 in placement value).
          </p>
        </div>

        <div className="text-center pt-4">
          <Link href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-primary-light text-slate-950 font-bold px-6 py-3 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(217,119,6,0.4)] text-sm">
            Launch Dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}
