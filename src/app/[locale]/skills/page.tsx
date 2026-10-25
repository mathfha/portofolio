import React from "react";
import { getSkills, Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { Terminal, Cpu, Shield, Layers } from "lucide-react";

export default function SkillsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;
  const skillCategories = getSkills();

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-border">
        <h2 className="font-heading text-2xl font-bold text-text">
          {locale === "id" ? "Spesialisasi & Stack Teknis" : "Technical Stack & Capabilities"}
        </h2>
        <p className="font-mono text-xs text-text-muted mt-0.5">
          // WORKSPACE 五: MATRIX_MODULE_LOADED
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((cat, idx) => (
          <TilingWindow
            key={idx}
            title={cat.category[locale].toUpperCase()}
            badge={`CAT_0${idx + 1}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {cat.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 p-2 bg-base/70 border border-border/80 rounded-sharp hover:border-accent/60 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-text font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </TilingWindow>
        ))}
      </div>

      {/* Terminal Command Spec Window */}
      <TilingWindow title="SHELL_ENVIRONMENT" badge="SYS_AUDIT">
        <div className="p-3 bg-base font-mono text-xs text-text-muted space-y-2 border border-border/60 rounded-sharp">
          <p className="text-accent">&gt; env | grep -E &quot;SECURITY|LINUX|AUTOMATION&quot;</p>
          <p>LINUX_KERNEL=Hardened // Sysctl tuned // UFW &amp; Fail2ban enabled</p>
          <p>CONTAINER_RUNTIME=Docker // Isolated bridges // Non-root user execution</p>
          <p>AUDIT_FRAMEWORK=OWASP Top 10 // Nmap // Gobuster // Burp Suite // CTF Toolkit</p>
        </div>
      </TilingWindow>
    </div>
  );
}
