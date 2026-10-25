# Design System & Craft Guidelines

Dokumen ini memuat standar visual, token desain, dan aturan anti-pattern (No AI Slop & Impeccable Craft Floor) untuk antarmuka portofolio.

## 1. Visual World: Industrial Retro Sci-fi (Tiling WM)

- **Karakter**: Garis tegas (1px border), sudut hampir tajam (radius 2–4px), hard shadow terukur, permukaan solid berlapis SVG grain speckle halus.
- **Top Bar**: Shell bar hitam pekat (`#0E1014`) permanen di kedua tema dengan indikator monospace, jam WIB live, dan modul status.
- **Aksen Khas**: Hazard stripe diagonal (kuning/oranye-hitam) untuk pembatas, progress loading, dan badge status "WIP".

## 2. Design Tokens

### Dark Mode
- `--base`: `#0E1014` (Kanvas utama)
- `--surface`: `#1A1F27` (Permukaan window)
- `--border`: `#2B3441` (Garis tepi 1px)
- `--accent`: `#E0A47A` (Peach; CTA utama & tab aktif)
- `--sage`: `#9AA27C` (Status normal / ok)
- `--salmon`: `#C9605B` (Badge peringatan / error)
- `--slate`: `#8FA6BB` (Tautan & aksen dingin; disesuaikan agar kontras ≥ 4.5:1)
- `--text`: `#E8E2D4` (Krem hangat, bukan putih murni)
- `--text-muted`: `#9A9A8C` (Label & metadata sekunder)

### Light Mode
- `--base`: `#EDE6D6` (Krem kertas retro)
- `--surface`: `#F6F1E4` (Kartu window)
- `--border`: `#CFC6B0` (Border netral)
- `--accent`: `#9A5329` (Peach pekat untuk kontras di atas krem)
- `--sage`: `#5F6A47`
- `--salmon`: `#A8453F`
- `--slate`: `#3F566B`
- `--text`: `#1B1E24` (Tinta gelap)
- `--text-muted`: `#5E5F55`

## 3. Tipografi

- **Metadata, Top Bar, Shortcut & Angka**: Monospace (JetBrains Mono / IBM Plex Mono).
- **Heading Window**: Sans tegas berkarakter (Space Grotesk).
- **Body & Isi Paragraf**: Sans netral yang bersih dan mudah dibaca (Inter / Geist).
- **Label Kanji (一〜十)**: Noto Sans JP (di-subset hanya untuk 10 karakter kanji agar file sangat kecil).

---

## 4. No AI Slop Design Floor (Larangan Keras)

Sesuai standar Impeccable dan anti-slop:

1. **Dilarang Efek Neon & Glow Cyberpunk**:
   - TIDAK ADA teks gradient ungu-sian (purple/cyan gradients).
   - TIDAK ADA box-shadow glowing neon atau kartu `backdrop-blur` transparan berlebihan.
2. **Dilarang Struktur Kartu Bertumpuk (Nested Cards Inception)**:
   - Window tiling hanya satu tingkat kedalaman; tidak boleh membungkus kartu di dalam kartu berulang-ulang tanpa tujuan hierarki.
3. **Dilarang Animasi Berlebihan (Bounce / Elastic)**:
   - Gerakan transisi hanya slide/fade tajam 200–300ms dengan timing function linear atau cubic-bezier bersih (`ease-out`). Tidak ada efek mantul (bouncy).
4. **Dilarang Teks Kosong & Kata Klise AI**:
   - Dilarang menggunakan kata: *delve, leverage, foster, streamline, robust, cutting-edge, paradigm shift, game changer, elevate, embark, supercharge, tapestry, realm*.
   - Copywriting harus berbasis fakta konkret, angka terukur, dan kalimat aktif manusiawi.
5. **Dilarang Elemen Dekoratif Tanpa Makna**:
   - Tidak ada blob 3D melayang, ilustrasi abstrak AI, atau wallpaper ilustrasi berat. Semua elemen visual (hazard stripe, dot grid, kanji label) memiliki fungsi navigasi atau status nyata.

---

## 5. Pemeriksaan Kualitas (Verification)

Jalankan perintah berikut sebelum merilis perubahan antarmuka:
- Cek rasio kontras warna: `node scripts/check-contrast.js`
- Deteksi anti-pattern desain: `npx impeccable detect src/`
