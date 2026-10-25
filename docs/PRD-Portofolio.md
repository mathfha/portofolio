# PRD: Portofolio Website - Konsep "Workspace"

Owner: Aditya Rahman · Versi 0.3 (draft untuk review) · 24 Oktober 2026

## Perubahan dari v0.2

Bagian yang ditandai **\[BARU\]** atau **\[USULAN\]** perlu kamu cek. \[USULAN\] artinya itu usulan saya dan belum kamu putuskan.

- **\[KEPUTUSAN\]** Bahasa dan tema default ikut sistem/browser, tetap bisa diubah pengunjung (FR-09, FR-22).
- **\[KEPUTUSAN\]** Tulisan Writing boleh satu bahasa per tulisan (FR-25 jadi final).
- **\[KEPUTUSAN\]** Email publik memakai email pribadi (FR-17).
- **\[USULAN\]** Semua rute memakai prefix bahasa; `/` hanya redirect (FR-02, FR-22).
- **\[USULAN\]** Jam di tengah = WIB; jam lokal pengunjung jadi tooltip, FR-07 digabung (FR-01, FR-07).
- **\[USULAN\]** Form kontak dihapus dari tabel IA agar konsisten dengan FR-17.
- **\[USULAN\]** CV tersedia dua versi (ID dan EN), tombol mengikuti bahasa aktif (FR-16).
- **\[USULAN\]** Workspace 八〜十 tidak punya rute dan tidak di-index (bagian 6).
- **\[USULAN\]** Catatan kontras: beberapa warna aksen kemungkinan gagal 4.5:1 di dark theme (bagian 5.2).
- **\[USULAN\]** Daftar event analytics ditetapkan (FR-27).
- **\[USULAN\]** Open Graph image satu per bahasa (FR-21).

## 1. Ringkasan

Website portofolio pribadi yang tampilannya meniru desktop tiling window manager: top bar dengan workspace berangka kanji (一 二 三 …), jam di tengah, modul status di kanan, dan konten disajikan sebagai "window" yang ditata rapi di atas background polos bertekstur grain dengan warna sage, salmon, dan peach. Tidak memakai wallpaper ilustrasi.

Ide utamanya: pengunjung "masuk" ke desktop kamu. Tiap section = satu workspace. Beda dari portofolio template biasa, tapi isinya tetap mudah dibaca recruiter dalam 30 detik.

## 2. Tujuan & Non-tujuan

**Tujuan**

- Satu link untuk CV, LinkedIn, GitHub, dan form aplikasi (magang, program, beasiswa, dll).
- Menampilkan 3–5 project terbaik lengkap dengan konteks: masalah, peran, stack, hasil.
- Identitas visual yang mudah diingat (desktop-style) tanpa mengorbankan keterbacaan dan kecepatan.
- Mudah di-update: menambah project cukup menambah satu file konten.

**Non-tujuan (v1)**

- Bukan OS emulator penuh (tidak ada file manager palsu, tidak ada window yang bisa di-resize bebas).
- Bukan CMS dengan admin panel.
- Belum ada komentar atau login.

## 3. Target Pengunjung

1. **Recruiter / HR**: butuh info cepat: siapa, bisa apa, kontak, CV.
2. **Tech lead / engineer reviewer**: ingin melihat kedalaman project, stack, link repo atau demo.
3. **Reviewer program / beasiswa / komunitas**: ingin melihat pengalaman, inisiatif, dan karakter.
4. **Teman dan sesama dev**: eksplor, memberi feedback.

Prinsip: kalau pengunjung tidak paham konsep desktop-nya, mereka tetap harus menemukan semua info penting dalam 2 klik.

## 4. Metrik Sukses

- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- LCP < 2.5 detik di koneksi 4G biasa.
- Tombol CV dan kontak ditemukan tanpa scroll atau maksimal 1 klik dari halaman mana pun.
- Klik "Download CV" dan "Contact" tercatat di analytics (lihat FR-27).
- Minimal 1 link ke website ini dipakai di CV dan profil online sebelum dianggap "launch".

## 5. Design Direction

### 5.1 Mood

Industrial sci-fi isometrik, hangat tapi muted. Bukan neon cyberpunk. Warna kusam, tekstur speckle seperti cetakan lama, garis tegas, bayangan keras (hard shadow). Terasa seperti poster retro-futuristik yang dipakai jadi UI.

### 5.2 Palet

Nilai dark diperkirakan dari screenshot; ambil nilai pasti dengan color picker dari screenshot desktop kamu.

**Dark**

| Token | Nilai | Peran |
| --- | --- | --- |
| `--base` | `#0E1014` | Background, top bar |
| `--surface` | `#1A1F27` | Surface window |
| `--border` | `#2B3441` | Border |
| `--sage` | `#9AA27C` | Aksen sekunder, status "ok" |
| `--salmon` | `#C9605B` | Highlight, error |
| `--accent` (peach) | `#E0A47A` | Aksen utama, CTA, workspace aktif |
| `--slate` | `#5C7185` | Link, aksen dingin |
| `--text` | `#E8E2D4` | Teks utama (krem, bukan putih murni) |
| `--text-muted` | `#9A9A8C` | Teks sekunder |

**Light** (nilai awal, perkiraan; cek ulang kontrasnya di browser)

| Token | Nilai |
| --- | --- |
| `--base` | `#EDE6D6` (krem hangat seperti kertas) |
| `--surface` | `#F6F1E4` |
| `--border` | `#CFC6B0` |
| `--accent` (peach/CTA) | `#9A5329` (digelapkan supaya teks terbaca di atas krem) |
| `--salmon` | `#A8453F` |
| `--sage` | `#5F6A47` |
| `--slate` | `#3F566B` |
| `--text` | `#1B1E24` |
| `--text-muted` | `#5E5F55` |

Top bar tetap gelap (`#0E1014`) di kedua tema agar nuansa desktop tetap terbawa.

Semua warna dibuat sebagai design token (CSS variable) dengan nama yang sama di kedua tema. Komponen hanya mengenal `--accent`, `--surface`, dst., bukan hex-nya.

**\[USULAN\] Catatan kontras (hitungan kasar, wajib diverifikasi dengan tool seperti WebAIM Contrast Checker)**

Minimal 4.5:1 untuk teks biasa. Perkiraan saya untuk dark theme di atas `--surface`:

| Kombinasi | Perkiraan rasio | Status |
| --- | --- | --- |
| `--text` di surface | sangat tinggi | Aman |
| `--text-muted` di surface | ± 5.8:1 | Aman |
| `--sage` di surface | ± 6.2:1 | Aman |
| `--salmon` di surface | ± 4.2:1 | Berisiko untuk teks kecil |
| `--slate` di surface | ± 3.3:1 | Gagal untuk teks/link |

Tindak lanjut: terangkan `--slate` (mis. ke sekitar `#8FA6BB`) untuk link di dark theme, dan pakai salmon hanya untuk ikon, border, atau teks besar (≥ 18.66px bold / 24px) kecuali nilainya dinaikkan. Teks di atas tombol CTA: gelap (`#0E1014`) di atas peach dark; krem (`#F6F1E4`) di atas `#9A5329` di light (± 5:1). Kombinasi light theme lainnya dicek saat implementasi.

### 5.3 Tipografi

- Label, top bar, kode, metadata: monospace (JetBrains Mono / IBM Plex Mono / Geist Mono).
- Heading: sans tegas dengan karakter (mis. Space Grotesk atau sejenis).
- Body: sans netral yang enak dibaca (Inter / Geist).
- Angka kanji (一〜十): Noto Sans JP yang di-**subset** hanya untuk karakter yang dipakai, supaya ukuran font kecil.

### 5.4 Bahasa visual

- Window chrome: title bar tipis berisi nama workspace + titik status kecil, sudut hampir tajam (radius 2–4px), border 1px.
- Pola garis diagonal oranye-hitam (hazard stripe) dipakai sebagai divider, loading bar, dan badge "WIP".
- Tekstur grain/speckle tipis di atas background (SVG noise di CSS, bukan gambar besar).
- Hindari glassmorphism blur berlebihan; kalau window perlu transparan, cukup 85–92% opacity.
- Motion: pindah workspace = slide/fade 200–300ms. Hover window = border berubah ke peach. Semua motion mati jika `prefers-reduced-motion` aktif.

### 5.5 Background (tanpa wallpaper)

- Polos: warna base di dark, krem kertas di light, plus grain tipis lewat SVG noise.
- Hazard stripe untuk divider, loading bar, dan badge WIP.
- Opsional: dot grid atau garis grid halus beropacity rendah di area kosong.

Hasilnya halaman lebih ringan dan tidak ada urusan lisensi ilustrasi.

## 6. Information Architecture

Top bar punya 10 slot workspace. Slot yang dipakai aktif, sisanya redup.

| Workspace | Label (wajib tampil) | Isi |
| --- | --- | --- |
| 一 | Home | Nama, role, satu kalimat pitch, CTA: Lihat Project + Download CV, ringkasan 3 highlight |
| 二 | About | Cerita singkat, foto, fokus saat ini, hal yang sedang dipelajari |
| 三 | Projects | Grid project (3–5), klik buka detail |
| 四 | Experience | Magang, organisasi, kepanitiaan, sertifikasi, dalam bentuk timeline |
| 五 | Skills | Stack dikelompokkan (bahasa, framework, tools, keamanan, dll) |
| 六 | Writing | Daftar tulisan + halaman tulisan |
| 七 | Contact | Email (mailto), LinkedIn, GitHub, tombol Download CV |
| 八〜十 | (kosong) | Easter egg, lihat di bawah |

**Penting:** kanji hanya dekorasi identitas. Setiap tab wajib punya label teks yang terlihat, minimal saat hover/focus dan di mobile, plus `aria-label`.

**\[USULAN\] Workspace 八〜十**: tidak punya rute URL dan tidak masuk sitemap. Ditampilkan redup di top bar; saat diklik muncul pesan kecil (toast/popover) "workspace ini kosong, balik ke 一" dengan tombol kembali. Dengan begitu tidak ada halaman tipis yang ikut ter-index.

## 7. Requirement Fungsional

Prioritas: **P0** wajib saat launch · **P1** sebaiknya ada · **P2** kalau sempat.

### Layout & Navigasi

- **FR-01 (P0)** Top bar tetap di atas: workspace tabs di kiri, tanggal + jam **WIB (live)** di tengah, modul status di kanan.
- **FR-02 (P0)** \[USULAN\] Klik tab pindah workspace tanpa reload penuh. URL ikut berubah dengan **prefix bahasa di semua rute**: `/id`, `/id/about`, `/id/projects`, `/en/writing/...`, dst. `/` hanya redirect ke bahasa terpilih (lihat FR-22) supaya tiap URL punya satu bahasa dan bisa di-share dan di-index.
- **FR-03 (P0)** Konten tiap workspace ditata sebagai window tiling (grid), bukan floating bebas.
- **FR-04 (P1)** Shortcut keyboard: `Alt + 1…7` atau `1…7` untuk pindah workspace, `?` membuka daftar shortcut. Nonaktif saat fokus ada di input.
- **FR-05 (P1)** Command palette (`Ctrl/Cmd + K`): cari halaman, project, atau aksi (download CV, copy email).

### Modul Top Bar (kanan)

- **FR-06 (P0)** Status ketersediaan (mis. "open to opportunities" / "busy"), diatur dari satu file config.
- **FR-07 (P1)** \[USULAN, diubah\] Tooltip pada jam di tengah menampilkan jam lokal pengunjung dan selisihnya dengan WIB. Tidak ada modul jam kedua di kanan.
- **FR-08 (P2)** Aktivitas GitHub 30 hari terakhir (GitHub API, di-cache, jangan fetch di tiap kunjungan).
- **FR-09 (P0)** Ikon bulan: ganti tema dark/light. **Default mengikuti `prefers-color-scheme`**; pilihan manual pengunjung menimpa default dan disimpan.
- **FR-10 (P2)** Ikon refresh: replay intro / reset layout.
- **FR-11 (P0)** Ikon power: menu kontak cepat (Download CV, Email, LinkedIn, GitHub).

### Halaman Project

- **FR-12 (P0)** Kartu project: judul, satu kalimat deskripsi, tag stack, status (selesai / WIP).
- **FR-13 (P0)** Detail project (overlay atau halaman sendiri): masalah, peran kamu, keputusan teknis penting, hasil, screenshot, link repo/demo.
- **FR-14 (P1)** Filter berdasarkan tag (web, security, mobile, dll).
- **FR-15 (P0)** Konten project di file terpisah (MDX/JSON); menambah project tidak perlu mengubah komponen.

### Lain-lain

- **FR-16 (P0)** Tombol Download CV (PDF) selalu bisa diakses. \[USULAN\] Ada dua file (ID dan EN); tombol mengikuti bahasa aktif.
- **FR-17 (P0)** Kontak lewat mailto + link sosial, **tanpa form kontak** di v1. Alamat memakai email pribadi. Alamat tidak ditulis mentah di HTML (dirakit lewat JS atau di-encode) supaya tidak mudah dipanen bot; tombol "copy email" tetap tersedia.
- **FR-18 (P1)** Intro boot ala terminal (maks 2 detik, bisa di-skip, sekali per sesi).
- **FR-19 (P2)** Window bisa di-drag kecil-kecilan di desktop (snap balik ke grid).
- **FR-20 (P1)** Halaman 404 bergaya "workspace tidak ditemukan".
- **FR-21 (P1)** Meta tag, sitemap, `lang` sesuai bahasa halaman, `hreflang` antar versi bahasa. \[USULAN\] Open Graph image bertema, **satu per bahasa** (dibuat dinamis atau statis), dengan fallback satu gambar umum.

### Writing & Bahasa

- **FR-22 (P0)** Toggle bahasa Indonesia / English di top bar. Bahasa jadi bagian URL (`/id/...`, `/en/...`). **Default saat kunjungan pertama**: `/` redirect berdasarkan `Accept-Language` (ID jika browser berbahasa Indonesia, selain itu EN). Pilihan manual menimpa default dan disimpan.
- **FR-23 (P0)** Semua konten statis (Home, About, Experience, Skills) dan label UI tersedia dalam dua bahasa dari file terjemahan terpisah, bukan di-hardcode.
- **FR-24 (P0)** Section Writing: daftar tulisan (judul, tanggal, tag, estimasi waktu baca) dan halaman tulisan dari MDX.
- **FR-25 (P1)** **\[KEPUTUSAN\]** Satu tulisan boleh punya satu bahasa saja. Jika versi bahasa lain belum ada, tampilkan badge bahasa dan link ke versi yang tersedia. Daftar tulisan di `/id/writing` dan `/en/writing` menampilkan tulisan sesuai bahasa aktif, plus penanda untuk tulisan bahasa lain.
- **FR-26 (P1)** RSS feed untuk Writing dan filter tag sederhana.
- **FR-27 (P0)** \[BARU, USULAN\] Event analytics (tanpa cookie): `cv_download` (dengan bahasa), `contact_click` (email / linkedin / github / power-menu), `project_open`, `repo_click`, `demo_click`, `lang_toggle`, `theme_toggle`. Tidak mencatat data pribadi.

## 8. Requirement Non-Fungsional

- **Performa**: JS awal < 150 KB gzip, total gambar di layar pertama < 300 KB, font di-subset dan `font-display: swap`.
- **Responsif**: di mobile, top bar jadi bar ringkas (logo + menu), tiling grid satu kolom, tab workspace pindah ke bottom nav atau drawer. Desktop pengalaman penuh, tapi mobile harus nyaman karena banyak recruiter membuka dari HP.
- **Aksesibilitas**: HTML semantik, urutan fokus keyboard masuk akal, focus ring jelas, kontras ≥ 4.5:1 di kedua tema, alt text, hormati `prefers-reduced-motion`.
- **SEO**: konten penting ada di HTML (server-rendered / static), bukan hanya muncul setelah JS jalan.
- **Privasi**: analytics ringan tanpa cookie (Umami / Plausible / Vercel Analytics); pastikan tool yang dipilih mendukung custom event (FR-27).
- **Browser**: 2 versi terakhir Chrome, Firefox, Safari, Edge.
- **Dua tema**: dark dan light masing-masing lolos kontras. Tema diset sebelum render pertama (script inline kecil) supaya tidak ada flash tema yang salah.
- **Dua bahasa**: bahasa diambil dari URL, jadi tidak ada flash bahasa. Ganti bahasa berarti pindah ke URL bahasa lain (client-side navigation, tanpa reload penuh). `lang` dan `hreflang` diset per halaman.
- **Writing**: tiap tulisan punya halaman statis sendiri (bisa di-index) dan estimasi waktu baca.

## 9. Rekomendasi Tech Stack

- **Framework**: Next.js (App Router) + TypeScript. Alternatif ringan: Astro dengan React islands.
- **Styling**: Tailwind CSS dengan design token (warna, spacing, font) didefinisikan sekali di config.
- **Animasi**: Motion (Framer Motion) untuk transisi workspace; sisanya CSS.
- **Konten**: MDX atau JSON/TS di repo (project, pengalaman, skill).
- **i18n**: next-intl atau routing i18n bawaan Next.js; file terjemahan JSON per bahasa; tulisan Writing di MDX per bahasa.
- **Tema**: CSS variable per tema + `next-themes` (atau script kecil sebelum render).
- **Hosting**: Vercel atau Cloudflare Pages. Domain diputuskan belakangan.
- **Kontak**: mailto, tanpa backend atau layanan form.
- **Tooling**: ESLint, Prettier, Lighthouse CI di tiap deploy.

## 10. Konten yang Perlu Disiapkan

- Bio pendek (2–3 kalimat) + versi panjang, dalam ID dan EN.
- Foto profil (kualitas bagus, background rapi).
- 3–5 project terbaik, masing-masing: tujuan, peran, stack, tantangan, hasil, screenshot, link.
- Pengalaman (magang, organisasi, kepanitiaan) dengan hasil terukur kalau ada.
- Daftar skill yang jujur (yang benar-benar dipakai).
- **CV terbaru (PDF) dalam dua versi: ID dan EN.**
- Link: GitHub, LinkedIn, email pribadi.
- Aset visual lain, pastikan milik sendiri atau berlisensi.
- Semua label UI dalam dua bahasa.
- Minimal 2 tulisan untuk Writing saat launch (boleh pendek, boleh satu bahasa).

## 11. Milestone (perkiraan, sambil kuliah dan magang)

| Minggu | Target |
| --- | --- |
| 1 | Kumpulkan konten (ID + EN), ambil palet dark dari screenshot, turunkan palet light, **verifikasi kontras awal**, wireframe tiap workspace |
| 2 | Setup project, design token dua tema, i18n + routing berprefix bahasa, top bar + routing, halaman Home dan About |
| 3 | Projects (kartu + detail), Experience, Skills, Contact (mailto) |
| 4 | Writing (MDX, daftar + halaman tulisan), toggle bahasa dan tema rampung, responsif mobile |
| 5 | Aksesibilitas, SEO, cek kontras dua tema, event analytics, P1 (shortcut, command palette, intro boot), Lighthouse, soft launch |

Kalau waktu mepet, potong P1 dan P2 dulu. P0 saja cukup untuk launch.

## 12. Risiko & Mitigasi

- **Konsep kebanyakan gaya, konten tertutup** → info penting (nama, role, CV, kontak) selalu terlihat tanpa interaksi khusus.
- **Kanji membingungkan** → label teks selalu ada, tooltip, aria-label.
- **Konten dua bahasa dan blog menumpuk kerjaan** → UI dan halaman inti wajib dua bahasa, tulisan Writing boleh satu bahasa (FR-25).
- **Dua tema berarti dua kali cek visual dan kontras** → design token dari awal, uji kedua tema di tiap komponen; warna aksen yang berisiko (salmon, slate) ditangani sejak minggu 1.
- **Flash tema atau bahasa yang salah saat load** → tema diset sebelum render, bahasa dari URL.
- **Redirect `/` berdasarkan `Accept-Language` bisa mengganggu cache/SEO** → gunakan redirect sementara (307), pasang `hreflang` dan `x-default`, dan pastikan crawler bisa membuka `/id` dan `/en` langsung.
- **Scope creep (terlalu banyak fitur OS)** → kalau fitur tidak membantu pengunjung memahami kamu, jadikan P2 atau buang.
- **Susah di-maintain** → semua konten di satu folder, komponen kecil dan reusable.
- **Email terpapar spam** → obfuscation ringan (FR-17); pakai email pribadi yang bisa difilter.

## 13. Keputusan

**Sudah diputuskan**

1. Wallpaper: tanpa wallpaper, background polos + grain (5.5).
2. Bahasa konten: Indonesia dan Inggris, ada toggle (FR-22, FR-23).
3. Writing / blog: masuk v1 (FR-24).
4. Tema: dark dan light di v1 (FR-09).
5. Domain: diputuskan saat deploy.
6. Kontak: mailto saja, tanpa form (FR-17), memakai email pribadi.
7. Default bahasa dan tema: ikut sistem/browser, bisa diubah pengunjung (FR-09, FR-22).
8. Tulisan Writing: boleh satu bahasa per tulisan (FR-25).

**Menunggu review kamu (usulan di v0.3)**

1. Rute selalu berprefix bahasa, `/` hanya redirect (FR-02).
2. Jam tengah WIB, jam lokal pengunjung sebagai tooltip (FR-01, FR-07).
3. Dua versi CV, tombol mengikuti bahasa (FR-16).
4. Workspace 八〜十 tanpa rute, tidak di-index (bagian 6).
5. Penyesuaian warna `--slate` dan penggunaan salmon di dark theme (5.2).
6. Daftar event analytics (FR-27).
7. Open Graph image per bahasa (FR-21).
