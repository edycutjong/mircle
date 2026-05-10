import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Mircle | Zero-Cost GTM Incentive Layer",
  description: "Lifetime Pro Licenses as a $5,000 value proposition. Zero marginal cost. TheMiracle SDK integration for wallet-native user acquisition.",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Mircle — $5K in Protection, Zero Cost",
    description: "Wallet-native security scanner with Lifetime Pro License incentives. Built for Colosseum Frontier 2026.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mircle | Zero-Cost GTM Incentive Layer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-full flex flex-col bg-[#020617] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
