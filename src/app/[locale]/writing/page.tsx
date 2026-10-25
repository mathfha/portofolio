import React from "react";
import { Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { BookOpen, Calendar, Clock, Tag } from "lucide-react";

const ARTICLES = [
  {
    slug: "linux-server-hardening-guide",
    title: {
      id: "Panduan Praktis Hardening Server Linux untuk Lingkungan Produksi",
      en: "Practical Linux Server Hardening Guide for Production Environments",
    },
    date: "2026-10-15",
    readTime: "6 min read",
    lang: "id",
    summary: {
      id: "Langkah terukur mengamankan server Linux: konfigurasi SSH tanpa password root, firewall UFW, fail2ban, audit kernel sysctl, dan pembatasan izin kontainer.",
      en: "Actionable steps to secure Linux servers: rootless SSH, UFW firewall, fail2ban policies, sysctl kernel audits, and container permission boundaries.",
    },
    tags: ["Linux", "Hardening", "Security"],
  },
  {
    slug: "kmipn-ctf-writeup-notes",
    title: {
      id: "Catatan Riset & Write-up Juara 1 KMIPN: Dari Web Eksploitasi ke Binary Reversing",
      en: "KMIPN 1st Place CTF Writeup Notes: From Web Exploitation to Binary Reversing",
    },
    date: "2026-09-28",
    readTime: "8 min read",
    lang: "id",
    summary: {
      id: "Bedah metodologi pemecahan tantangan keamanan di KMIPN VIII dan VII, fokus pada analisis pola kerentanan logic flaw dan dekompilasi binary bertahap.",
      en: "Methodology breakdown for national CTF challenges across KMIPN VIII & VII, focusing on logic flaw exploitation and reverse engineering workflows.",
    },
    tags: ["CTF", "Writeup", "Reverse Engineering"],
  },
];

export default function WritingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-border">
        <h2 className="font-heading text-2xl font-bold text-text">
          {locale === "id" ? "Catatan Teknis & Riset" : "Technical Notes & Research"}
        </h2>
        <p className="font-mono text-xs text-text-muted mt-0.5">
          // WORKSPACE 六: 2 ENTRIES INDEXED
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARTICLES.map((article) => (
          <TilingWindow
            key={article.slug}
            title={article.slug.toUpperCase()}
            badge={`${article.lang.toUpperCase()} // ${article.readTime}`}
            className="flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h3 className="font-heading text-base font-bold text-text hover:text-accent transition-colors">
                {article.title[locale] || article.title.id}
              </h3>

              <div className="flex items-center gap-3 font-mono text-[11px] text-text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-accent" />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-sage" />
                  {article.readTime}
                </span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                {article.summary[locale] || article.summary.id}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                {article.tags.map((tag) => (
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
