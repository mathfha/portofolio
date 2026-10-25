# Aditya Rahman - Portfolio (Workspace Concept)

Website portofolio berkonsep *Tiling Window Manager* bergaya industrial retro sci-fi.

## Tech Stack

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS + CSS Design Tokens
- **Animation**: Motion (Framer Motion)
- **Content**: MDX / JSON
- **i18n**: next-intl (`/id`, `/en`)
- **Theme**: `next-themes` (Dark/Light mode)

## Dokumentasi

Dokumentasi lengkap proyek berada di folder `docs/`:
- [PRD-Portofolio.md](docs/PRD-Portofolio.md): Dokumen Product Requirement asli (v0.3).
- [PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md): Ringkasan visi, tujuan, dan batasan scope.
- [USER_FLOWS.md](docs/USER_FLOWS.md): Alur interaksi recruiter, navigasi workspace, dan keyboard shortcut.
- [ARCHITECTURE.md](docs/ARCHITECTURE.md): Arsitektur teknis, token desain, routing i18n, dan keamanan dasar.
- [DATA_MODEL.md](docs/DATA_MODEL.md): Skema TypeScript / MDX untuk proyek, riwayat, dan artikel.
- [TESTING.md](docs/TESTING.md): Standar kualitas, Lighthouse, kontras WCAG, dan pengujian.
- [DEPLOYMENT.md](docs/DEPLOYMENT.md): Panduan build, hosting (Vercel/Cloudflare Pages), dan analytics.
- [decisions/](docs/decisions/): Rekaman keputusan arsitektur (ADR).

## Menjalankan Proyek

```bash
# Install dependencies
pnpm install

# Jalankan development server
pnpm dev

# Build untuk produksi
pnpm build
```
