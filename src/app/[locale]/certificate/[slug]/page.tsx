import React from "react";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { MusicToggleButton } from "@/context/AudioContext";
import CERTIFICATES from "@/../data/certifications.json";

export function generateStaticParams() {
  const locales = ["id", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const cert of CERTIFICATES) {
      params.push({ locale, slug: cert.slug });
      if (cert.alias) {
        params.push({ locale, slug: cert.alias });
      }
    }
  }

  return params;
}

export default function CertificateDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const safeLocale = locale === "en" ? "en" : "id";

  const cert = CERTIFICATES.find(
    (c) => c.slug === slug || c.alias === slug || c.id === slug
  );

  if (!cert) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base text-text selection:bg-accent selection:text-base flex flex-col justify-between">
      {/* Top Bar (Centered with max-w-4xl container) */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex items-center justify-between font-mono">
        <BackButton
          fallbackHref={`/${safeLocale}#certificate`}
          label={safeLocale === "en" ? "Back" : "Kembali"}
        />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 text-text-muted text-sm sm:text-base font-semibold">
            <span className="text-text font-bold uppercase tracking-wider">{cert.category}</span>
            <span>-</span>
            <span>{cert.date}</span>
          </div>
          <MusicToggleButton
            className="p-1.5 text-text-muted hover:text-text transition-colors rounded-sm hover:bg-surface"
            iconClassName="w-5 h-5"
          />
        </div>
      </header>

      {/* Main Content (Centered max-w-4xl) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-6 pb-16 space-y-6">
        {/* Certificate Title & Metadata */}
        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text leading-tight">
            {cert.title}
          </h1>

          <div className="font-mono text-xs text-text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-text font-semibold">{cert.issuer}</span>
            <span>·</span>
            <span className="text-text-dim">{cert.date}</span>
            {cert.credentialId && (
              <>
                <span>·</span>
                <span className="text-text">ID: {cert.credentialId}</span>
              </>
            )}
            {cert.team && (
              <>
                <span>·</span>
                <span className="text-text-dim">{cert.team}</span>
              </>
            )}
          </div>
        </div>

        {/* Certificate Image Frame (Borderless & Clean) */}
        <div className="bg-surface rounded-sm p-3 sm:p-5 shadow-2xl flex items-center justify-center">
          <div className="w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-sm bg-base/50">
            <img
              src={cert.image}
              alt={cert.title}
              className="max-h-[78vh] w-auto max-w-full object-contain rounded-sm"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
