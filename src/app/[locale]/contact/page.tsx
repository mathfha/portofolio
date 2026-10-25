"use client";

import React, { useState } from "react";
import { getSiteConfig, Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { Mail, Copy, Check, FileText, Linkedin, Github, Phone, ShieldCheck } from "lucide-react";

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;
  const config = getSiteConfig();

  const [copied, setCopied] = useState(false);

  // Email obfuscation assembly
  const emailFull = `${config.contact.emailUser}@${config.contact.emailDomain}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailFull);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailto = () => {
    window.location.href = `mailto:${emailFull}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Contact Main Window (7 Cols) */}
      <TilingWindow
        title="WORKSPACE 七 // COMM_UPLINK"
        badge="DIRECT_CHANNELS"
        className="lg:col-span-7"
      >
        <div className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-text">
              {locale === "id" ? "Hubungi Aditya Rahman" : "Connect with Aditya Rahman"}
            </h2>
            <p className="text-text-muted text-xs mt-1">
              {locale === "id"
                ? "Tersedia untuk peluang magang, kolaborasi keamanan siber, atau konsultasi hardening infrastruktur."
                : "Open to internship opportunities, cybersecurity collaborations, or infrastructure hardening advisory."}
            </p>
          </div>

          {/* Email Obfuscation Box */}
          <div className="p-3.5 bg-base/80 border border-border rounded-sharp space-y-2">
            <div className="text-[11px] font-mono text-text-muted flex items-center justify-between">
              <span>PRIMARY_EMAIL // OBFUSCATED_BOT_GUARD</span>
              <span className="text-sage flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <span className="font-mono text-sm font-bold text-accent select-all">
                {emailFull}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text font-mono text-xs rounded-sharp hover:border-accent hover:text-accent transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-sage" />
                      <span className="text-sage">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-text-muted" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleMailto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-base font-mono text-xs font-bold rounded-sharp hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-base/60 border border-border rounded-sharp flex items-center justify-between hover:border-accent hover:text-accent transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text">
                <Linkedin className="w-4 h-4 text-accent" />
                <span>LinkedIn</span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">↗ profile</span>
            </a>

            <a
              href={config.contact.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-base/60 border border-border rounded-sharp flex items-center justify-between hover:border-accent hover:text-accent transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text">
                <Github className="w-4 h-4 text-accent" />
                <span>GitHub (mathfha)</span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">↗ repositories</span>
            </a>
          </div>
        </div>
      </TilingWindow>

      {/* CV Download Window (5 Cols) */}
      <TilingWindow
        title="DOCUMENT_VAULT"
        badge="PDF_READY"
        className="lg:col-span-5"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3 bg-base/80 border border-border rounded-sharp space-y-1">
            <div className="text-text-muted">CURRICULUM VITAE:</div>
            <div className="text-text font-bold">Aditya Rahman - Security &amp; Systems</div>
            <div className="text-[11px] text-sage">Format: PDF // 2 Halaman // Versi 2026</div>
          </div>

          <p className="text-text-muted leading-relaxed font-mono text-xs">
            {locale === "id"
              ? "Dokumen CV resmi memuat ringkasan pengalaman keamanan siber di PT Inovasi Informatik Sinergi, rekam jejak Pentester.ID, capaian Juara 1 KMIPN, dan lisensi EC-Council."
              : "Official resume detailing cybersecurity engineering experience at PT Inovasi Informatik Sinergi, Pentester.ID track record, KMIPN awards, and EC-Council credentials."}
          </p>

          <a
            href="/assets/cv-aditya-rahman-en.pdf"
            download
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-base font-bold rounded-sharp shadow-hard hover:opacity-90 transition-all text-xs"
          >
            <FileText className="w-4 h-4" />
            <span>DOWNLOAD CV RESMI (PDF)</span>
          </a>
        </div>
      </TilingWindow>
    </div>
  );
}
