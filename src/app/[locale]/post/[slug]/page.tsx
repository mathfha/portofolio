"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, FileText, Sun, Moon, Terminal } from "lucide-react";
import { MusicToggleButton } from "@/context/AudioContext";
import POSTS from "@/../data/posts.json";

interface PostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function PostArticlePage({ params }: PostPageProps) {
  const { slug } = params;
  const post =
    POSTS.find((p) => p.slug === slug || p.aliases.includes(slug)) || POSTS[0];

  const [copiedCode, setCopiedCode] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(post.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return (
    <div className="min-h-screen bg-base text-text selection:bg-accent selection:text-base font-mono grain-overlay flex flex-col">
      {/* Top Header Bar (.md viewer aesthetic - aligned with article width) */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-5 sm:py-6 bg-base/95 backdrop-blur-md border-b border-white/5 font-mono">
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
          <Link
            href={`/${params.locale === "en" ? "en" : "id"}`}
            className="inline-flex items-center gap-3 text-text hover:text-accent font-bold text-lg sm:text-xl transition-colors py-1.5 group"
            title={params.locale === "en" ? "Back to Portfolio" : "Kembali ke Portofolio"}
          >
            <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            <span>{params.locale === "en" ? "Back" : "Kembali"}</span>
          </Link>

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
            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-text transition-colors rounded-sm hover:bg-surface"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-text" /> : <Moon className="w-5 h-5" />}
            </button>
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
              <span className="text-accent font-bold">{post.category}</span>
              <span>·</span>
              <span>Penulis: {post.author}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Section 1: Dasar Teori */}
          <section className="space-y-4 text-xs sm:text-sm text-text-muted leading-relaxed">
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

            <div className="space-y-3 text-xs sm:text-sm text-text-muted leading-relaxed pl-3 border-l-2 border-accent/40">
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
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-sm bg-surface hover:bg-surface-subtle text-text hover:text-accent border border-white/5 transition-colors flex items-center gap-1.5 text-xs"
                title="Salin script Python"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-text" />
                    <span className="text-text font-bold">TERSALIN</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
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

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                <div className="text-accent font-bold text-sm">
                  1. Symmetric Key (Satu Kunci untuk Semua)
                </div>
                <p className="text-text-muted leading-relaxed">
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
                <p className="text-text-muted leading-relaxed">
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
                <p className="text-text-muted leading-relaxed">
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
                <p className="text-text-muted leading-relaxed">
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
                <p className="text-text-muted leading-relaxed">
                  <strong className="text-text">Konsep:</strong> Enkripsi modern bukan sekadar operasi aritmatika linier seperti 1 + 1 = 2.
                </p>
                <div className="p-3 rounded-sm bg-surface-subtle border-l-2 border-accent text-xs text-text-dim">
                  <strong className="text-text">Analogi Blender:</strong> Bayangkan sebuah blender. Plaintext (buah) dimasukkan, ditambah Key (pisau blender), lalu diputar berkali-kali (ronde substitusi &amp; permutasi) sampai hancur lebur menjadi Jus (Ciphertext). Mustahil membalikkan jus kembali menjadi buah utuh tanpa kunci dan algoritma pembalik yang tepat.
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
