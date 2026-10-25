# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Motion (Framer Motion), next-intl

## Users

1. **Recruiter / HR**: Memeriksa nama, kapabilitas, CV (ID/EN), dan kontak dalam ≤ 30 detik tanpa hambatan navigasi.
2. **Tech Lead / Engineer**: Menilai kedalaman arsitektur 3–5 proyek, stack, keputusan teknis, dan tautan repository/demo.
3. **Reviewer Program / Beasiswa**: Mengamati rekam jejak, organisasi, dan inisiatif kepemimpinan.
4. **Peer Dev**: Memeriksa detail craft, estetika industrial, dan artikel teknis.

## Product Purpose

Situs portofolio pribadi Aditya Rahman beridentitas *Tiling Window Manager* industrial sci-fi yang menyajikan profil profesional secara cepat, terstruktur, dan mudah dipindai tanpa gimmick emulator OS yang membingungkan.

## Positioning

Portofolio dengan analogi desktop minimalis (tab kanji `一` s/d `十`, jam WIB live, modul status shell) di atas kanvas bertutup grain netral, membedakan diri dari template portofolio korporat tanpa mengurangi keterbacaan recruiter.

## Operating Context

- Diuji pada koneksi 4G mobile dan desktop modern.
- Kunjungan cepat recruiter (fokus pada tombol aksi langsung tanpa scroll panjang).

## Capabilities and Constraints

- Routing dwibahasa berbasis prefix (`/id`, `/en`) dengan redirect awal 307.
- Tema Dark dan Light lolos kontras WCAG AA (≥ 4.5:1), default mengikuti preferensi sistem.
- Tidak ada form kontak dinamis atau backend; murni mailto terproteksi (obfuscated) dan tautan sosial.
- Pelacakan analitik ringan tanpa cookie (Umami / Plausible) tanpa mencatat data pribadi.
- Workspace `八〜十` tidak memiliki URL statis dan menampilkan popover arah kembali.

## Brand Commitments

- Visual industrial retro sci-fi hangat (muted, bukan neon cyberpunk).
- Aksen warna: peach (`--accent`), sage (`--sage`), salmon (`--salmon`), slate (`--slate`).
- Tekstur speckle grain halus via SVG, tanpa gambar wallpaper ilustrasi besar.

## Evidence on Hand

- **CV Asli**: [assets/cv-aditya-rahman-en.pdf](file:///home/mathfha/Today-I-Learn/Programming/portofolio/assets/cv-aditya-rahman-en.pdf) (Pengalaman di PT Inovasi Informatik Sinergi & Pentester.ID).
- **Prestasi Nyata**: Juara 1 KMIPN VIII (Consistent Flag Seeker, 2026), Juara 1 KMIPN VII (Write-Up Documentation, 2025), Sertifikasi EC-Council Ethical Hacking Essentials.
- **Proyek Nyata**: Inciro (Incident Monitoring), KMIPN Security Research/CTF, dan Automation Recon Tools.
- **Repositori & Kontak**: [github.com/mathfha](https://github.com/mathfha), [linkedin.com/aditya-rahman-680938267](https://linkedin.com/aditya-rahman-680938267), email `adit.rwet@gmail.com`.
- Dokumen spesifikasi di [docs/PRD-Portofolio.md](docs/PRD-Portofolio.md).
- Skema data di [docs/DATA_MODEL.md](docs/DATA_MODEL.md).

## Product Principles

1. **Info Inti Selalu Tampak**: Nama, role, CV, dan kontak dapat diakses dalam ≤ 2 klik dari mana saja.
2. **Keterbacaan Mengalahkan Dekorasi**: Tipografi tajam, kontras terverifikasi, dan struktur grid konsisten.
3. **Bukan OS Palsu**: Tiling window hanya untuk pengorganisasian konten, bukan jendela bebas geser tanpa arah.
4. **Performa Bersih**: Ukuran awal JS < 150 KB gzip, waktu muat LCP < 2.5s.

## Accessibility & Inclusion

- Kepatuhan WCAG AA (rasio kontras teks normal ≥ 4.5:1 di kedua tema).
- Dukungan keyboard navigation penuh (`Alt + 1..7`, `Cmd + K`, `?`).
- Menghormati pengaturan OS `prefers-reduced-motion`.
