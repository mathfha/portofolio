# Project Brief: Portofolio "Workspace"

Owner: Aditya Rahman  
Versi: 1.0 (Berdasarkan PRD v0.3)

## 1. Visi & Tujuan

Membangun website portofolio personal dengan identitas visual khas *Tiling Window Manager* industrial retro sci-fi yang tetap memprioritaskan kecepatan akses recruiter dalam mengevaluasi profil, proyek, dan CV dalam ≤ 30 detik.

### Tujuan Utama
- Sentralisasi profil: Satu tautan untuk CV (ID & EN), LinkedIn, GitHub, dan portofolio proyek.
- Menampilkan 3–5 proyek unggulan dengan studi kasus lengkap (masalah, peran, arsitektur, hasil).
- Desain unik dan berkesan tanpa mengorbankan keterbacaan (WCAG AA ≥ 4.5:1) dan performa.
- Manajemen konten mandiri tanpa CMS (berbasis file JSON & MDX).

### Non-Tujuan (v1)
- Bukan emulator sistem operasi penuh (tanpa floating window bebas resize, tanpa desktop file explorer palsu).
- Tidak menyediakan fitur login, database interaktif, komentar, atau admin dashboard.
- Tidak menggunakan form kontak dinamis dengan backend; murni mailto terproteksi.

## 2. Target Pengguna
1. **Recruiter / HR**: Mengakses CV dan kontak dalam 1–2 klik dari mana saja.
2. **Tech Lead / Reviewer**: Memeriksa kedalaman teknis proyek, demo, dan repository GitHub.
3. **Komunitas / Rekan Dev**: Eksplorasi estetika dan tulisan teknis.

## 3. Metrik Sukses
- **Lighthouse Score**: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- **LCP**: < 2.5 detik pada jaringan 4G.
- **Waktu Temu CV & Kontak**: ≤ 2 klik dari landing page mana pun.
