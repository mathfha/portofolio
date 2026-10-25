import React from "react";
import { notFound } from "next/navigation";
import { FileText, Terminal, AlertTriangle, ShieldCheck, Cpu } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { MusicToggleButton } from "@/context/AudioContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CopyCodeButton } from "@/components/ui/CopyCodeButton";
import POSTS from "@/../data/posts.json";

export function generateStaticParams() {
  const locales = ["id", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const post of POSTS) {
      params.push({ locale, slug: post.slug });
      for (const alias of post.aliases || []) {
        params.push({ locale, slug: alias });
      }
    }
  }

  return params;
}

interface PostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function PostArticlePage({ params }: PostPageProps) {
  const { slug } = params;
  const safeLocale = params.locale === "en" ? "en" : "id";
  const post = POSTS.find((p) => p.slug === slug || p.aliases.includes(slug));

  if (!post) {
    notFound();
  }

  const isPhp2Shell = post.slug === "php2shell-cve-2026-109618" || post.aliases.includes("php2shell");

  return (
    <div className="min-h-screen bg-base text-text selection:bg-accent selection:text-base font-mono grain-overlay flex flex-col">
      {/* Top Header Bar (.md viewer aesthetic - aligned with article width) */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-5 sm:py-6 bg-base/95 backdrop-blur-md border-b border-white/5 font-mono">
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
          <BackButton
            fallbackHref={`/${safeLocale}#post`}
            label={safeLocale === "en" ? "Back" : "Kembali"}
          />

          {/* Virtual File Path Badge */}
          <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-sm bg-surface text-text-muted text-sm sm:text-base border border-white/10 font-medium">
            <FileText className="w-5 h-5 text-accent" />
            <span>notes/{post.slug}.md</span>
          </div>

          <div className="flex items-center gap-2">
            <MusicToggleButton
              className="p-2 text-text-muted hover:text-text transition-colors rounded-sm hover:bg-surface"
              iconClassName="w-5 h-5"
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Markdown Article Document */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <article className="space-y-8 bg-surface/50 border border-white/5 p-6 sm:p-12 rounded-sm shadow-xl">
          {/* YAML Frontmatter Preview */}
          <div className="p-4 rounded-sm bg-base border border-white/5 text-[11px] text-text-dim space-y-1 font-mono leading-relaxed select-all">
            <div className="text-text-muted font-bold">---</div>
            <div>title: "{post.title}"</div>
            <div>date: "{post.date}"</div>
            <div>category: "{post.category}"</div>
            <div>author: "{post.author}"</div>
            <div>tags: [{post.tags.join(", ")}]</div>
            <div>readTime: "{post.readTime}"</div>
            <div className="text-text-muted font-bold">---</div>
          </div>

          {/* Article Main Title */}
          <div className="space-y-3 border-b border-white/5 pb-6">
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
              # {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-text-dim">
              <span className="text-accent font-bold uppercase">{post.category}</span>
              <span>·</span>
              <span>Penulis: {post.author}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {isPhp2Shell ? (
            /* ─────────────────────────────────────────────────────────────
               ARTICLE CONTENT: PHP2Shell (CVE-2026-109618 & CVE-2026-109619)
               ───────────────────────────────────────────────────────────── */
            <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed">
              {/* Alert Callout */}
              <div className="p-4 rounded-sm bg-base border-l-4 border-accent space-y-2">
                <div className="flex items-center gap-2 text-text font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  <span>Security Advisory: Critical RCE in PHP Core Engine</span>
                </div>
                <p className="text-text-dim text-xs leading-relaxed">
                  Dua kerentanan Remote Code Execution (RCE) tingkat kritis dengan skor CVSS 4.0: 9.2 baru saja diungkap pada runtime PHP. Eksploitasi tidak memerlukan autentikasi dan langsung menargetkan engine memori Zend.
                </p>
              </div>

              {/* Section 1: Pengantar */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  ## 1. Apa Itu PHP2Shell?
                </h2>
                <p>
                  Beberapa hari terakhir, <strong className="text-text font-bold">PHP2Shell</strong> ramai dibicarakan di dunia keamanan siber internasional. Nama ini merujuk pada dua kerentanan kritis di PHP yang memungkinkan penyerang menjalankan kode dari jarak jauh (Remote Code Execution / RCE) pada server yang belum diperbarui.
                </p>
                <p>
                  Berbeda dengan kerentanan umum pada plugin atau tema CMS (seperti WordPress atau Drupal), celah ini berada langsung di dalam core runtime engine PHP (Zend Engine). Artinya, meskipun aplikasi web ditulis tanpa celah SQL Injection atau File Upload, server tetap berisiko jika runtime PHP yang mendasarinya belum menerima patch resmi.
                </p>
              </section>

              {/* Section 2: Penemuan Berbasis AI */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  <span>## 2. Ditemukan dengan Bantuan AI: Ryan Austin &amp; Tim Wiz</span>
                </h2>
                <p>
                  Hal yang membuat kasus ini menjadi tonggak sejarah baru dalam riset keamanan siber adalah keterlibatan kecerdasan buatan (AI) mutakhir dalam proses penemuannya:
                </p>
                <div className="space-y-2 pl-3 border-l-2 border-accent/40">
                  <p>
                    <strong className="text-text font-semibold">Ryan Austin</strong>, peneliti keamanan dari Calif, menggunakan model frontier AI <strong className="text-text">GPT-5.6 Sol</strong> dalam proyek riset <em className="text-accent not-italic">Patch the Planet</em> untuk menyisir dan menganalisis kode sumber C berumur puluhan tahun pada repositori PHP, yang akhirnya mengarahkan pada salah satu celah memori tersebut.
                  </p>
                  <p>
                    Secara independen, <strong className="text-text font-semibold">Tim Wiz</strong> juga berhasil menemukan dan melaporkan kedua kerentanan tersebut ke tim pengembang PHP.
                  </p>
                  <p>
                    Setelah kedua temuan diverifikasi, para peneliti bekerja sama secara tertutup dengan tim inti PHP dalam skema <em>Coordinated Vulnerability Disclosure</em> guna menyiapkan perbaikan resmi sebelum rincian teknisnya dipublikasikan ke publik.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-base border border-white/5 space-y-2">
                  <span className="text-accent font-bold text-xs uppercase tracking-wider">
                    Catatan Penting: Kolaborasi Manusia + AI
                  </span>
                  <p className="text-text-dim text-xs leading-relaxed">
                    Ini bukan berarti AI menemukan semuanya secara otomatis tanpa campur tangan manusia. Peneliti tetap perlu memahami arsitektur kode secara mendalam, merumuskan hipotesis uji, menguji temuannya melalui Proof of Concept (PoC), dan membantu memastikan patch perbaikan bekerja tanpa merusak fungsionalitas lain. Namun, kasus PHP2Shell membuktikan bahwa AI dapat mengakselerasi pencarian celah keamanan yang sebelumnya sangat tersembunyi dan sulit dieksploitasi.
                  </p>
                </div>
              </section>

              {/* Section 3: Ilustrasi Alur Eksploitasi (Markdown Format) */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  ## 3. Ilustrasi Teknis Eksploitasi CVE (Markdown Flow)
                </h2>
                <p>
                  Kerentanan ini berakar dari penanganan kondisi kehabisan memori (Out-Of-Memory / OOM) pada Zend Engine saat memanggil instruksi <code className="text-accent bg-base px-1.5 py-0.5 rounded-sm">longjmp()</code>:
                </p>

                {/* ASCII Diagram Box */}
                <div className="rounded-sm bg-base border border-white/10 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-surface-subtle border-b border-white/5 text-[11px] text-text-dim">
                    <span className="font-mono text-text">diagram_eksploitasi_php2shell.md</span>
                    <span>ASCII ARCHITECTURE MAP</span>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-text leading-relaxed text-[11px] sm:text-xs">
{`+-------------------------------------------------------------------------+
|                  PHP2Shell (RCE) Execution Attack Path                  |
+-------------------------------------------------------------------------+
       [ Permintaan HTTP Berbahaya dari Penyerang ]
                            |
                            v
       [ Alokasi Memori Heap Melewati Batas (Memory Limit) ]
                            |
                            v
       [ Zend Engine Memicu Kondisi Out-of-Memory (OOM) Fatal ]
                            |
                            v
       [ Eksekusi C Function longjmp() Dipanggil untuk Abort Request ]
                            |
             +--------------+--------------+
             |                             |
             v                             v
  [ CVE-2026-109618 ]            [ CVE-2026-109619 ]
  Alokasi Memori Request         Pointer Global Tertinggal
  Gagal Direset Bersih           Menunjuk ke Region Heap yang
  (Memory Safety Bypass)         Sudah Dibebaskan (Dangling/UAF)
             |                             |
             +--------------+--------------+
                            |
                            v
       [ Siklus Request Berikutnya Membaca Heap Terdistorsi ]
                            |
                            v
   [ EKSPLOITASI BERHASIL: Arbitrary Remote Code Execution (RCE) ]`}
                  </pre>
                </div>

                {/* Technical CVE Comparison Table */}
                <div className="space-y-2 pt-2">
                  <span className="text-text font-bold text-xs">Tabel Rincian Cve PHP2Shell:</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/10 bg-base text-text">
                          <th className="p-2.5 font-bold">Parameter</th>
                          <th className="p-2.5 font-bold">CVE-2026-109618</th>
                          <th className="p-2.5 font-bold">CVE-2026-109619</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-text-dim">
                        <tr>
                          <td className="p-2.5 text-text font-semibold">Skor Keparahan</td>
                          <td className="p-2.5 text-accent font-bold">CVSS 4.0: 9.2 (Critical)</td>
                          <td className="p-2.5 text-accent font-bold">CVSS 4.0: 9.2 (Critical)</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-text font-semibold">Mekanisme Celah</td>
                          <td className="p-2.5">Uninitialized Request Memory pasca OOM longjmp</td>
                          <td className="p-2.5">Dangling pointer memori global menunjuk heap bebas</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-text font-semibold">Dampak Eksploitasi</td>
                          <td className="p-2.5">Remote Code Execution tanpa autentikasi</td>
                          <td className="p-2.5">Kebocoran memori proses &amp; Eksekusi kode acak</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-text font-semibold">Komponen Terdampak</td>
                          <td className="p-2.5">Zend Engine Memory Manager</td>
                          <td className="p-2.5">Zend Engine Global Exception Handler</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section 4: Kode Verifikasi Audit */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-text">
                    ## 4. Script Audit Versi PHP Server
                  </h2>
                  <CopyCodeButton code={post.code} label="COPY AUDIT SCRIPT" />
                </div>

                <div className="rounded-sm bg-base border border-white/10 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface-subtle border-b border-white/5 text-[11px] text-text-dim">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-accent" />
                      <span className="font-mono text-text">check_php2shell.sh</span>
                    </div>
                    <span>Bash / Shell Utility</span>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-text leading-relaxed text-xs">
                    <code>{post.code}</code>
                  </pre>
                </div>
              </section>

              {/* Section 5: Langkah Mitigasi & Versi Patch */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>## 5. Tindakan Mitigasi &amp; Daftar Versi Patch Resmi</span>
                </h2>
                <p>
                  Tim pengembang PHP telah merilis versi rilis resmi yang memuat patch keamanan untuk mengatasi kerentanan ini. Pengelola server diwajibkan memeriksa versi yang terpasang dan memastikan versi minimal memenuhi kriteria berikut:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[10px] text-text-dim block">Cabang 8.2</span>
                    <span className="text-text font-bold text-sm text-accent">&gt;= 8.2.35</span>
                  </div>
                  <div className="p-3 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[10px] text-text-dim block">Cabang 8.3</span>
                    <span className="text-text font-bold text-sm text-accent">&gt;= 8.3.36</span>
                  </div>
                  <div className="p-3 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[10px] text-text-dim block">Cabang 8.4</span>
                    <span className="text-text font-bold text-sm text-accent">&gt;= 8.4.27</span>
                  </div>
                  <div className="p-3 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[10px] text-text-dim block">Cabang 8.5</span>
                    <span className="text-text font-bold text-sm text-accent">&gt;= 8.5.12</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-text font-bold text-xs">Perintah Cepat Update Server (Ubuntu / Debian):</span>
                  <div className="p-3 bg-base border border-white/5 rounded-sm font-mono text-xs text-text select-all">
                    <code>sudo apt update &amp;&amp; sudo apt --only-upgrade install php* &amp;&amp; sudo systemctl restart php*-fpm</code>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
               ARTICLE CONTENT: Memecahkan AES ECB (Fallback & Classic Post)
               ───────────────────────────────────────────────────────────── */
            <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed">
              {/* Section 1: Dasar Teori */}
              <section className="space-y-4">
                <p>
                  AES (Advanced Encryption Standard) adalah algoritma enkripsi simetris yang digunakan secara luas dan dapat beroperasi dalam berbagai mode. ECB (Electronic Codebook) adalah salah satu mode operasi paling sederhana untuk AES.
                </p>
                <p>
                  Dalam mode ECB, setiap blok plaintext (teks asli) dienkripsi secara terpisah dengan kunci yang sama, dan <strong className="text-text">tidak ada mekanisme umpan balik (feedback mechanism)</strong> antar blok.
                </p>
              </section>

              {/* Section 2: Cara Kerja */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  ## Alur Kerja Enkripsi AES ECB
                </h2>

                <div className="space-y-3 pl-3 border-l-2 border-accent/40">
                  <div className="space-y-1">
                    <span className="text-text font-bold">1. Pembangkitan Kunci (Key Generation):</span>
                    <p>
                      Memilih kunci enkripsi rahasia dengan panjang tetap (128, 192, atau 256 bit sesuai varian AES yang dipakai).
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text font-bold">2. Padding (Pengisian Byte):</span>
                    <p>
                      Jika panjang plaintext bukan kelipatan ukuran blok AES (16 byte), dilakukan pengisian padding (standar PKCS#7) agar pas tepat kelipatan 16 byte.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text font-bold">3. Enkripsi Blok:</span>
                    <p>
                      Plaintext dibagi menjadi blok-blok tetap berukuran 16 byte. Setiap blok dienkripsi secara independen menggunakan algoritma AES dengan kunci yang sama, menghasilkan blok ciphertext.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text font-bold">4. Penggabungan (Concatenation):</span>
                    <p>
                      Seluruh blok ciphertext yang dihasilkan digabungkan berurutan untuk membentuk ciphertext akhir utuh.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Kode Python */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-text">
                    ## Implementasi Python (`pycryptodome`)
                  </h2>
                  <CopyCodeButton code={post.code} label="COPY CODE" />
                </div>

                <div className="rounded-sm bg-base border border-white/10 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface-subtle border-b border-white/5 text-[11px] text-text-dim">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-accent" />
                      <span className="font-mono text-text">aes_ecb_demo.py</span>
                    </div>
                    <span>Python 3 · pycryptodome</span>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-text leading-relaxed text-xs">
                    <code>{post.code}</code>
                  </pre>
                </div>
              </section>

              {/* Section 4: Logika Dasar & Analogi */}
              <section className="space-y-5">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  ## Logika Enkripsi &amp; Analogi Nyata
                </h2>

                <div className="space-y-4">
                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      1. Symmetric Key (Satu Kunci untuk Semua)
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-text">Konsep:</strong> Kunci untuk mengunci (enkripsi) dan membuka kembali (dekripsi) adalah kunci yang sama persis.
                    </p>
                    <div className="p-3 rounded-sm bg-surface-subtle border-l-2 border-accent text-xs text-text-dim">
                      <strong className="text-text">Analogi:</strong> Seperti kunci pintu rumah. Kunci fisik yang dipakai untuk mengunci pintu dari luar dipakai juga untuk membukanya kembali dari dalam. Kunci ini mutlak harus dijaga agar tidak dicuri atau bocor ke pihak lain.
                    </div>
                  </div>

                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      2. Block Cipher (Potong-Potong Data)
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-text">Konsep:</strong> Data yang panjang tidak diproses sekaligus dalam satu tarikan nafas, melainkan dipotong-potong menjadi kotak-kotak kecil berukuran tetap (blok).
                    </p>
                    <div className="p-3 rounded-sm bg-surface-subtle border-l-2 border-accent text-xs text-text-dim space-y-1">
                      <p><strong className="text-text">Aturan Emas AES:</strong> Ukuran potongan (blok) selalu 16 byte (tetap, tidak bisa ditawar).</p>
                      <p>Angka 128, 192, atau 256 adalah ukuran kunci (kompleksitas keamanan kunci), bukan ukuran potongan datanya.</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      3. Mode Operasi: ECB (Si Polos) vs CBC (Si Rantai)
                    </div>
                    <p className="leading-relaxed">
                      Mode operasi ibarat cara kita menyusun dan mengacak potongan-potongan tadi:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3.5 rounded-sm bg-surface-subtle space-y-1.5 border border-border/40">
                        <span className="text-text font-bold">ECB (Electronic Codebook) - Si Polos</span>
                        <p className="text-text-dim leading-relaxed text-[11px]">
                          Setiap potongan diacak sendiri-sendiri tanpa peduli temannya.
                        </p>
                        <p className="text-text-muted leading-relaxed text-[11px]">
                          <strong className="text-text font-bold">Kelemahan Fatal:</strong> Kalau ada dua potongan isinya sama (misal: "AAAA"), hasil acakannya juga pasti identik. Pola data masih terbaca jelas (seperti fenomena ECB Penguin). Tidak aman untuk data terstruktur.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-sm bg-surface-subtle space-y-1.5 border border-border/40">
                        <span className="text-text font-bold">CBC (Cipher Block Chaining) - Si Rantai</span>
                        <p className="text-text-dim leading-relaxed text-[11px]">
                          Saling menyambung. Hasil acakan potongan pertama dipakai untuk mengacak potongan kedua, dan seterusnya.
                        </p>
                        <p className="text-text-muted leading-relaxed text-[11px]">
                          <strong className="text-text font-bold">Kelebihan:</strong> Walaupun ada potongan yang isinya sama ("AAAA"), hasil akhirnya akan beda total karena efek berantai ini. Jauh lebih aman.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      4. IV (Initialization Vector) - Bumbu Awal
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-text">Konsep:</strong> Karena CBC bekerja secara berantai, potongan pertama butuh "lawan main" untuk memulai rantai (karena belum ada potongan sebelumnya).
                    </p>
                    <p className="text-text-dim leading-relaxed text-xs">
                      <strong className="text-text">Fungsi:</strong> Angka acak (random) yang ditambahkan di awal supaya hasil enkripsi selalu unik, meskipun pesan yang dienkripsi dan kuncinya sama persis.
                    </p>
                  </div>

                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      5. Logika Enkripsi (Bukan Matematika Biasa)
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-text">Konsep:</strong> Enkripsi modern bukan sekadar operasi aritmatika linier seperti 1 + 1 = 2.
                    </p>
                    <div className="p-3 rounded-sm bg-surface-subtle border-l-2 border-accent text-xs text-text-dim">
                      <strong className="text-text">Analogi Blender:</strong> Bayangkan sebuah blender. Plaintext (buah) dimasukkan, ditambah Key (pisau blender), lalu diputar berkali-kali (ronde substitusi &amp; permutasi) sampai hancur lebur menjadi Jus (Ciphertext). Mustahil membalikkan jus kembali menjadi buah utuh tanpa kunci dan algoritma pembalik yang tepat.
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
