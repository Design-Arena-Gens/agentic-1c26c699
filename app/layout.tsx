"use client";

import "./globals.css";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

type ThemeState = "aurora" | "void";

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<ThemeState>("aurora");

  useEffect(() => {
    const stored = window.localStorage.getItem("cosmic-theme") as ThemeState | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cosmic-theme", theme);
  }, [theme]);

  return (
    <html lang="en" className={clsx(jetBrains.variable, spaceGrotesk.variable)}>
      <body className={clsx("bg-slate-950 text-slate-100 antialiased", `theme-${theme}`)}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-aurora-900 via-black to-slate-950 opacity-90" />
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-aurora-500/40 blur-3xl mix-blend-screen" />
          <div className="aurora-grid pointer-events-none absolute inset-0 opacity-40" />
        </div>
        <div className="relative min-h-screen">
          <header className="flex items-center justify-between px-4 py-6 sm:px-10">
            <div>
              <h1 className="text-2xl font-semibold tracking-[0.3em] text-aurora-200 sm:text-3xl">
                LIFEPATH·33
              </h1>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-aurora-300/80 sm:text-sm">
                Cosmic Guidance Interface
              </p>
            </div>
            <button
              onClick={() => setTheme((prev) => (prev === "aurora" ? "void" : "aurora"))}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-aurora-100 transition hover:border-white/30 hover:bg-white/10"
            >
              {theme === "aurora" ? "Enter Void" : "Enter Aurora"}
            </button>
          </header>
          <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
