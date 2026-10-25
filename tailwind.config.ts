import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{json,ts,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        surface: "var(--surface)",
        "surface-subtle": "var(--surface-subtle)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        sage: "var(--sage)",
        salmon: "var(--salmon)",
        slate: "var(--slate)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
      },
      fontFamily: {
        mono: ["Consolas", '"YaHei Consolas Hybrid"', '"Courier New"', "Courier", "monospace"],
        sans: ["Consolas", '"YaHei Consolas Hybrid"', '"Courier New"', "Courier", "monospace"],
        heading: ["Consolas", '"YaHei Consolas Hybrid"', '"Courier New"', "Courier", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.05em",
        widest: "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
