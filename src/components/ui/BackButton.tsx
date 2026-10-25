"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackHref: string;
  label: string;
  className?: string;
  iconClassName?: string;
}

export function BackButton({
  fallbackHref,
  label,
  className = "inline-flex items-center gap-3 text-text hover:text-accent font-bold text-lg sm:text-xl transition-colors group py-1.5",
  iconClassName = "w-6 h-6 transition-transform group-hover:-translate-x-1.5",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      const hasInternalHistory =
        sessionStorage.getItem("portfolio_navigated") === "true";

      if (hasInternalHistory && window.history.length > 1) {
        router.back();
        return;
      }
    }

    router.push(fallbackHref);
  };

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      className={className}
      title={label}
    >
      <ArrowLeft className={iconClassName} />
      <span>{label}</span>
    </a>
  );
}
