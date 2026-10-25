import React from "react";

export async function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {children}
    </div>
  );
}
