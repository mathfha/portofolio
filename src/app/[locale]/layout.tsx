import React from "react";
import { AudioProvider } from "@/context/AudioContext";

export async function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale === "en" ? "en" : "id";

  return (
    <AudioProvider locale={locale}>
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    </AudioProvider>
  );
}
