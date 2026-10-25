# Deployment & Ops

Dokumen ini merinci prosedur build, hosting, dan konfigurasi deployment.

## 1. Target Lingkungan & Hosting

- **Platform Utama**: Vercel atau Cloudflare Pages (Static Site Generation / Edge Middleware).
- **Node.js Runtime**: LTS (v20+).
- **Package Manager**: pnpm.

## 2. Pipeline Build

```bash
# Perintah build standar
pnpm build

# Output direktori
.next / out
```

Sebelum build produksi dijalankan, pastikan linting dan type-checking lolos:
```bash
pnpm lint
pnpm tsc --noEmit
```

## 3. Environment Variables

Variabel lingkungan yang didukung (lihat [.env.example](file:///home/mathfha/Today-I-Learn/Programming/portofolio/.env.example)):
- `NEXT_PUBLIC_SITE_URL`: Domain produksi untuk Open Graph dan canonical URL.
- `NEXT_PUBLIC_ANALYTICS_ID`: ID pelacak analitik tanpa cookie (Umami / Plausible).
- `NEXT_PUBLIC_ANALYTICS_HOST`: Endpoint host analitik mandiri.
- `GITHUB_READ_TOKEN`: Token read-only untuk pembacaan riwayat komit 30 hari jika modul FR-08 diaktifkan.

## 4. Konfigurasi Domain & DNS

- Pasang record DNS CNAME atau A record ke hosting target saat domain sudah ditentukan.
- Pastikan sertifikat SSL/TLS aktif otomatis (HSTS diaktifkan).
- Redirect domain root `example.com` ke `www.example.com` (atau sebaliknya) secara konsisten.
