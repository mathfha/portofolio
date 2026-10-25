# Architecture & Technical Specifications

Dokumen ini menjelaskan arsitektur perangkat lunak, routing i18n, design token, dan spesifikasi keamanan.

## 1. Arsitektur Komponen

Aplikasi menggunakan pola Next.js App Router dengan pemisahan Server dan Client Components:

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx         # Shell utama: TopBar, Grain overlay, Root Provider
│       ├── page.tsx           # Workspace 一: Home
│       ├── about/page.tsx     # Workspace 二: About
│       ├── projects/
│       │   ├── page.tsx       # Workspace 三: Projects Grid
│       │   └── [slug]/page.tsx# Project detail
│       ├── experience/page.tsx# Workspace 四: Experience
│       ├── skills/page.tsx    # Workspace 五: Skills
│       ├── writing/
│       │   ├── page.tsx       # Workspace 六: Writing List
│       │   └── [slug]/page.tsx# MDX Article Viewer
│       └── contact/page.tsx   # Workspace 七: Contact
├── components/
│   ├── chrome/                # TopBar, WorkspaceTabs, ClockModule, StatusModule
│   ├── ui/                    # TilingWindow, HazardBadge, GrainTexture, Modal
│   └── features/              # CommandPalette, KeyboardShortcuts, BootIntro
├── lib/
│   ├── mdx.ts                 # Parser MDX untuk Projects & Writing
│   └── analytics.ts           # Wrapper event analytics tanpa cookie
└── styles/
    └── tokens.css             # CSS Variables untuk dark & light mode
```

## 2. Navigasi & Routing i18n

- Rute root `/` mendeteksi header `Accept-Language` dan me-redirect dengan status 307 ke `/id` atau `/en`.
- Setiap rute memiliki prefix bahasa yang valid untuk indexing SEO, `hreflang`, dan Open Graph terpisah.
- Transisi antar halaman memanfaatkan App Router client navigation tanpa reload penuh.

## 3. Design Tokens & theming

Token warna dideklarasikan sebagai variabel CSS pada `:root` dan `.dark`:
- Top bar selalu berlatar `#0E1014` pada kedua mode.
- Nilai aksen link `--slate` diterangkan ke `#8FA6BB` pada dark mode untuk menjamin rasio kontras WCAG AA ≥ 4.5:1.
- Inisialisasi tema dilakukan via script inline di `<head>` untuk mencegah *Flash of Unstyled Theme* (FOUT).

## 4. Keamanan & Privasi (Security Scope)

Karena aplikasi adalah Static Site Generation (SSG) tanpa server database atau endpoint autentikasi, pertimbangan keamanan berfokus pada:

1. **Obfuscation Alamat Email**:
   - Email tidak dirender sebagai string mentah dalam HTML statis guna mencegah scraping bot spam.
   - Menggunakan encoding HTML entities atau perakitan string saat event klik (mailto handler) dijalankan.
2. **Content Security Policy (CSP)**:
   - Header HTTP ketat disiapkan di `next.config.js` (`default-src 'self'`, script dari provider analytics resmi saja).
3. **Privasi Pengunjung**:
   - Analytics menggunakan penyedia tanpa cookie (Umami / Plausible / Vercel Web Analytics).
   - Event yang dicatat: `cv_download`, `contact_click`, `project_open`, `lang_toggle`, `theme_toggle`. Tanpa data pribadi (PII).
