"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({
  className = "p-2 text-text-muted hover:text-text transition-colors rounded-sm hover:bg-surface",
  iconClassName = "w-5 h-5",
}: {
  className?: string;
  iconClassName?: string;
}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isLightMode = document.documentElement.classList.contains("light");
    setIsDark(!isLightMode);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      title="Toggle Theme"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className={`${iconClassName} text-text`} />
      ) : (
        <Moon className={iconClassName} />
      )}
    </button>
  );
}
