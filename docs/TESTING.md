# Testing & Quality Assurance

Dokumen ini mendefinisikan standar pengujian dan kepatuhan kualitas untuk portofolio.

## 1. Ambang Batas Kualitas (Quality Gates)

| Parameter | Target Minimum | Metode Pengujian |
| --- | --- | --- |
| **Lighthouse Mobile Performance** | ≥ 90 | CI via Lighthouse CLI |
| **Lighthouse Accessibility** | ≥ 95 | axe-core + Lighthouse |
| **Lighthouse Best Practices** | ≥ 95 | Lighthouse CI |
| **Lighthouse SEO** | ≥ 95 | Lighthouse CI |
| **LCP (Largest Contentful Paint)** | < 2.5s (4G) | Web Vitals report |
| **Kontras Teks WCAG AA** | ≥ 4.5:1 | Script otomatis / WebAIM |

## 2. Pengujian Kontras Warna (Tokens)

Warna aksen wajib diverifikasi pada kedua tema sebelum rilis:
- `--text` vs `--surface`
- `--text-muted` vs `--surface`
- `--slate` (`#8FA6BB` dark, `#3F566B` light) vs `--surface`
- `--accent` (CTA) vs warna teks tombol

Script pengujian kontras disimpan di [scripts/check-contrast.js](file:///home/mathfha/Today-I-Learn/Programming/portofolio/scripts/check-contrast.js).

## 3. Pengujian Aksesibilitas & Keyboard

- **Keyboard Trap Check**: Pastikan fokus `Tab` tidak terjebak pada modal atau dialog command palette.
- **Shortcuts**: Pastikan shortcut `1-7` dan `?` tidak aktif saat input pencarian command palette sedang fokus.
- **Reduced Motion**: Periksa seluruh transisi dinonaktifkan ketika `prefers-reduced-motion: reduce` aktif di browser.

## 4. Pengujian Rute & i18n

- Rute root `/` mengembalikan status redirect 307 ke `/id` atau `/en`.
- Header `hreflang` dan tag `canonical` terpasang valid di seluruh halaman.
- Halaman 404 merender layout bertema "Workspace tidak ditemukan" dengan opsi kembali ke `一`.
