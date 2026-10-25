import React from "react";
import { getSiteConfig, getEducation, Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { User, BookOpen, GraduationCap, Compass } from "lucide-react";

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;
  const config = getSiteConfig();
  const education = getEducation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Bio Narrative Window (8 Cols) */}
      <TilingWindow
        title="WORKSPACE 二 // BIO_DOSSIER"
        badge="SECURITY_PROFILE"
        className="lg:col-span-8"
      >
        <div className="space-y-4 text-sm leading-relaxed text-text">
          <div className="p-3 bg-base/60 border border-border rounded-sharp">
            <p className="font-mono text-xs text-accent">
              [IDENTITAS]: {config.name} // Banjarmasin, Kalimantan Selatan
            </p>
          </div>

          <p>
            {locale === "id"
              ? "Saya adalah seorang Security Engineer dan praktisi keamanan siber dengan fokus pada keamanan aplikasi web, mitigasi insiden, administrasi Linux, serta system hardening. Terbiasa membedah arsitektur sistem dari sudut pandang defensif maupun ofensif untuk memastikan integritas infrastruktur dari potensi serangan."
              : "I am a Security Engineer and cybersecurity practitioner focused on web application security, incident triage, Linux administration, and system hardening. Experienced in analyzing systems from both defensive and offensive perspectives to safeguard critical infrastructure."}
          </p>

          <p className="text-text-muted">
            {locale === "id"
              ? "Selain menangani monitoring server dan otomatisasi backup di PT Inovasi Informatik Sinergi serta audit kerentanan di Pentester.ID, saya aktif berkompetisi di Capture The Flag (CTF) nasional, meraih Juara 1 pada ajang KMIPN VII (Padang) dan KMIPN VIII (Makassar)."
              : "Beyond managing server monitoring and backup pipelines at PT Inovasi Informatik Sinergi and conducting vulnerability assessments at Pentester.ID, I actively compete in national Capture The Flag (CTF) competitions, securing 1st Place in KMIPN VII (Padang) and KMIPN VIII (Makassar)."}
          </p>
        </div>
      </TilingWindow>

      {/* Focus & Currently Learning (4 Cols) */}
      <TilingWindow
        title="FOCUS_&_R&D"
        badge="ACTIVE"
        className="lg:col-span-4"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-accent font-bold mb-2">
              <Compass className="w-4 h-4" />
              <span>CURRENT FOCUS</span>
            </div>
            <ul className="space-y-1.5 text-text-muted">
              <li>• Automated Threat Detection</li>
              <li>• Linux Kernel & Container Hardening</li>
              <li>• Incident Response Orchestration</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-1.5 text-sage font-bold mb-2">
              <BookOpen className="w-4 h-4" />
              <span>EXPLORING / LEARNING</span>
            </div>
            <ul className="space-y-1.5 text-text-muted">
              <li>• Rust for Systems & Network Tools</li>
              <li>• Advanced Binary Exploitation</li>
              <li>• AI Agent Security Guardrails</li>
            </ul>
          </div>
        </div>
      </TilingWindow>

      {/* Education Timeline (Full 12 cols) */}
      <TilingWindow
        title="ACADEMIC_RECORD"
        badge="VERIFIED"
        className="lg:col-span-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-3 bg-base/60 border border-border rounded-sharp space-y-1 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-accent font-bold">
                <span>{edu.institution}</span>
                <span className="text-text-muted text-[11px]">{edu.period}</span>
              </div>
              <div className="text-text">{edu.degree[locale]}</div>
              {"grade" in edu && (
                <div className="text-[11px] text-sage">{edu.grade}</div>
              )}
            </div>
          ))}
        </div>
      </TilingWindow>
    </div>
  );
}
