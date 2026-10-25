"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Globe, Clock, ArrowUpRight } from "lucide-react";
import { Locale } from "@/lib/data";

interface TopBarProps {
  locale: Locale;
}

const NAV_ITEMS = [
  { index: "01", label: { id: "Karya", en: "Work" }, anchor: "#work" },
  { index: "02", label: { id: "Tentang", en: "About" }, anchor: "#about" },
  { index: "03", label: { id: "Karier", en: "Experience" }, anchor: "#experience" },
  { index: "04", label: { id: "Kemampuan", en: "Skills" }, anchor: "#skills" },
  { index: "05", label: { id: "Kontak", en: "Contact" }, anchor: "#contact" },
];

export function TopBar({ locale }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [wibTime, setWibTime] = useState("");
  const [localTimeInfo, setLocalTimeInfo] = useState("");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const wibString = now.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const localString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setWibTime(`${wibString} WIB`);
      setLocalTimeInfo(`Visitor local time: ${localString}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode || !document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleLanguage = () => {
    const targetLocale = locale === "id" ? "en" : "id";
    const subPath = pathname.replace(/^\/(id|en)/, "");
    router.push(`/${targetLocale}${subPath}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-3.5 backdrop-blur-md bg-base/85 border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Name & Availability */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}`}
            className="font-mono text-xs font-bold tracking-widest uppercase text-text hover:text-accent transition-colors"
          >
            ADITYA RAHMAN
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sage/10 border border-sage/20 text-sage text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            <span className="tracking-wide">OPEN FOR ENGAGEMENT</span>
          </div>
        </div>

        {/* Center: Editorial Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-text-muted">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.index}
              href={item.anchor}
              className="group flex items-center gap-1 hover:text-text transition-colors"
            >
              <span className="text-[10px] text-text-dim group-hover:text-accent transition-colors">
                {item.index}
              </span>
              <span>{item.label[locale]}</span>
            </a>
          ))}
        </nav>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Live Clock */}
          <div
            className="hidden lg:flex items-center gap-1.5 text-text-muted text-[11px] cursor-help"
            title={localTimeInfo}
          >
            <Clock className="w-3 h-3 text-accent" />
            <span>{wibTime || "WIB"}</span>
          </div>

          <div className="h-3 w-[1px] bg-border hidden lg:block" />

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="min-h-[36px] px-2.5 py-1 rounded-sm border border-border text-text-muted hover:text-text hover:border-border-hover transition-colors text-[11px] uppercase tracking-wider flex items-center justify-center"
            title="Switch Language"
          >
            {locale === "id" ? "EN" : "ID"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="min-h-[36px] min-w-[36px] p-1.5 rounded-sm border border-border text-text-muted hover:text-text hover:border-border-hover transition-colors flex items-center justify-center"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-text-muted" />
            )}
          </button>

          {/* Quick CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-accent text-base font-bold text-xs hover:bg-accent-hover transition-colors"
          >
            <span>{locale === "id" ? "Kontak" : "Connect"}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
