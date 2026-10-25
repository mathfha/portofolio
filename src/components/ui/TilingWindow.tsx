import React from "react";

interface TilingWindowProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function TilingWindow({
  title,
  badge,
  children,
  className = "",
  action,
}: TilingWindowProps) {
  return (
    <div
      className={`flex flex-col bg-surface border border-border rounded-window overflow-hidden transition-colors duration-150 hover:border-accent/60 ${className}`}
    >
      {/* Window Chrome Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-base/60 border-b border-border select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage inline-block" />
          <span className="font-mono text-xs font-medium text-text uppercase tracking-wider">
            {title}
          </span>
          {badge && (
            <span className="px-1.5 py-0.2 font-mono text-[10px] bg-border/40 text-text-muted rounded-sharp">
              {badge}
            </span>
          )}
        </div>
        {action && <div className="text-xs">{action}</div>}
      </div>

      {/* Window Body */}
      <div className="p-4 flex-1 overflow-auto">{children}</div>
    </div>
  );
}
