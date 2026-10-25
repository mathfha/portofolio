import React from "react";
import { getExperience, getCertifications, Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { Briefcase, Award, Shield, CheckCircle2 } from "lucide-react";

export default function ExperiencePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;
  const experiences = getExperience();
  const certifications = getCertifications();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Work Experience Timeline (7 Cols) */}
      <TilingWindow
        title="WORKSPACE 四 // CAREER_LOG"
        badge="PRODUCTION"
        className="lg:col-span-7"
      >
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-5 border-l-2 border-border/80 space-y-2 pb-2"
            >
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-accent" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-text">
                  {exp.role[locale]}
                </h3>
                <span className="font-mono text-[11px] text-text-muted">
                  {exp.period.start} - {exp.period.end}
                </span>
              </div>

              <div className="font-mono text-xs text-accent">
                @ {exp.company}
              </div>

              <ul className="mt-2 space-y-1.5 text-xs text-text-muted">
                {exp.highlights[locale].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sage flex-shrink-0">▪</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TilingWindow>

      {/* Awards & Certifications (5 Cols) */}
      <TilingWindow
        title="HONORS_&_CREDENTIALS"
        badge="VERIFIED"
        className="lg:col-span-5"
      >
        <div className="space-y-3 font-mono text-xs">
          {certifications.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-base/60 border border-border rounded-sharp space-y-1 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-text">{item.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-border/40 text-accent rounded-sharp flex-shrink-0">
                  {item.date}
                </span>
              </div>
              <div className="text-[11px] text-text-muted">{item.issuer}</div>
            </div>
          ))}
        </div>
      </TilingWindow>
    </div>
  );
}
