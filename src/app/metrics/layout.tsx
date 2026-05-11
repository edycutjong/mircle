import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mircle Metrics | Campaign Performance Dashboard",
  description:
    "Real-time campaign metrics for Mircle's zero-cost GTM incentive layer. Track signups, retention, CAC, and viral growth powered by theMiracle wallet placement.",
  openGraph: {
    title: "Mircle Metrics — $0 CAC, 10× Conversion",
    description:
      "Live dashboard: 8,492 signups, 71.9% conversion, 84.3% retention — all at $0 acquisition cost via theMiracle.",
    type: "website",
  },
};

export default function MetricsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
