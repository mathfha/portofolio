"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeButtonProps {
  code: string;
  label?: string;
  copiedLabel?: string;
}

export function CopyCodeButton({
  code,
  label = "COPY CODE",
  copiedLabel = "TERSALIN",
}: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="px-3 py-1.5 rounded-sm bg-surface hover:bg-surface-subtle text-text hover:text-accent border border-white/5 transition-colors flex items-center gap-1.5 text-xs font-mono"
      title="Salin script"
      aria-label="Salin script"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-text" />
          <span className="text-text font-bold">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
