import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { AudioProvider } from "@/context/AudioContext";

export const metadata: Metadata = {
  title: "adit",
  description:
    "Portofolio pribadi Aditya Rahman: Web Security, System Hardening, Linux Administration, and Penetration Testing.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-base text-text min-h-screen font-mono selection:bg-accent selection:text-base grain-overlay flex flex-col">
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
