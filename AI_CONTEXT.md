# AI Context & Coding Guidelines

Dokumen ini berisi konteks arsitektur, batasan desain, dan konvensi kode untuk asisten AI (vibecoding).

## 1. Identitas & Visi Proyek

- **Nama**: Portofolio Pribadi Aditya Rahman (Konsep "Workspace")
- **Konsep**: Tiling Window Manager industrial sci-fi isometrik (warm muted, speckle grain, tanpa wallpaper ilustrasi).
- **Filosofi**: Recruiter harus bisa menemukan info inti (nama, role, CV, kontak) dalam ≤ 2 klik atau ≤ 30 detik tanpa bingung dengan konsep desktop.

## 2. Batasan Keras (No AI Slop & Impeccable Design Floor)

- **JANGAN** membuat OS emulator penuh (tidak ada draggable free window, file manager palsu, window resize sembarangan).
- **JANGAN** menggunakan wallpaper gambar ilustrasi besar; gunakan background solid `--base` dengan SVG noise / grain tipis.
- **JANGAN** menggunakan pola visual AI Slop:
  - Dilarang gradient ungu-sian (purple/cyan) dan border neon glowing pada dark mode.
  - Dilarang kartu bertumpuk (nested cards inception) atau glassmorphism berlebihan (`backdrop-blur-md` berlapis).
  - Dilarang transisi membal (bounce/elastic easing); gunakan slide/fade bersih 200–300ms.
- **JANGAN** menggunakan frasa klise AI pada teks: *delve, leverage, foster, streamline, robust, cutting-edge, paradigm shift, game changer, elevate, embark, supercharge, tapestry, realm*. Gunakan kalimat aktif, fakta angka konkret, dan bahasa manusia yang natural.
- **JANGAN** mengekspos alamat email mentah di HTML (gunakan obfuscation ringan atau mailto dinamis via client click).
- **JANGAN** hardcode warna hex langsung di komponen; gunakan design token CSS variable (`var(--accent)`, `var(--surface)`, dll.).
- **JANGAN** hardcode teks bahasa; gunakan `next-intl` dengan file pesan di `data/locales/` atau `messages/`.
- **DETEKSI KUALITAS**: Selalu jalankan `npx impeccable detect src/` dan `node scripts/check-contrast.js` untuk memverifikasi kepatuhan desain.

## 3. Design Tokens (Wajib Dipatuhi)

| Token | Dark Mode | Light Mode | Penggunaan |
| --- | --- | --- | --- |
| `--base` | `#0E1014` | `#EDE6D6` | Background kanvas utama, top bar |
| `--surface` | `#1A1F27` | `#F6F1E4` | Permukaan window/kartu |
| `--border` | `#2B3441` | `#CFC6B0` | Garis tepi window (1px) |
| `--accent` | `#E0A47A` | `#9A5329` | CTA utama, highlight workspace aktif |
| `--sage` | `#9AA27C` | `#5F6A47` | Aksen sekunder, status ketersediaan "ok" |
| `--salmon` | `#C9605B` | `#A8453F` | Highlight peringatan, status error/WIP |
| `--slate` | `#8FA6BB` (adjusted) | `#3F566B` | Link dan aksen dingin |
| `--text` | `#E8E2D4` | `#1B1E24` | Teks utama |
| `--text-muted` | `#9A9A8C` | `#5E5F55` | Teks sekunder/metadata |

*Catatan: Top bar tetap gelap (`#0E1014`) pada kedua tema untuk menjaga nuansa shell terminal.*

## 4. Struktur Workspace (Routing & IA)

Navigasi top bar menggunakan kanji dengan teks label eksplisit:
- `一` `/id` / `/en` : **Home** (Pitch, highlight, CTA)
- `二` `/id/about` / `/en/about` : **About** (Bio, fokus, hal yang dipelajari)
- `三` `/id/projects` / `/en/projects` : **Projects** (Grid 3-5 proyek, detail)
- `四` `/id/experience` / `/en/experience` : **Experience** (Timeline karier & organisasi)
- `五` `/id/skills` / `/en/skills` : **Skills** (Kategori bahasa, framework, tools)
- `六` `/id/writing` / `/en/writing` : **Writing** (MDX blog artikel)
- `七` `/id/contact` / `/en/contact` : **Contact** (Email mailto, LinkedIn, GitHub, CV)
- `八〜十` : Workspace kosong / easter egg (tanpa URL sitemap, menampilkan toast kembali ke `一`).

## 5. Konvensi Kode

- Gunakan TypeScript strict mode.
- Komponen berada di `src/components/` dipisah per domain: `ui/`, `workspace/`, `modules/`.
- Konten disimpan dalam bentuk JSON/MDX di folder `data/`.
- Motion framer hanya digunakan untuk transisi antar workspace (slide/fade 200-300ms) dan hover ringkas. Hormati `prefers-reduced-motion`.
