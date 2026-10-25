import React from "react";
import { getProjects, Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { Github, ExternalLink, Terminal, Shield } from "lucide-react";

export default function ProjectsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;
  const projects = getProjects();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-border">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text">
            {locale === "id" ? "Proyek & Riset Keamanan" : "Projects & Security Research"}
          </h2>
          <p className="font-mono text-xs text-text-muted mt-0.5">
            // WORKSPACE 三: 3 REPOSITORIES LOADED
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <TilingWindow
            key={proj.slug}
            title={proj.slug.toUpperCase()}
            badge={proj.status.toUpperCase()}
            className="h-full flex flex-col justify-between"
            action={
              proj.links.repo && (
                <a
                  href={proj.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-muted hover:text-accent inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>SRC</span>
                </a>
              )
            }
          >
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-base font-bold text-text hover:text-accent transition-colors">
                  {proj.title[locale]}
                </h3>

                <p className="font-mono text-[11px] text-accent mt-1">
                  ROLE: {proj.role}
                </p>

                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  {proj.description[locale]}
                </p>

                <ul className="mt-3 space-y-1 font-mono text-[11px] text-text border-t border-border/60 pt-2">
                  {proj.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-sage">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-base border border-border text-text-muted font-mono text-[10px] rounded-sharp"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </TilingWindow>
        ))}
      </div>
    </div>
  );
}
