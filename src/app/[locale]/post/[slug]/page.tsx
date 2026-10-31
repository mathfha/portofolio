import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Terminal, AlertTriangle, ShieldCheck, Cpu, Binary, ExternalLink } from "lucide-react";
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
  const safeLocale: "id" | "en" = params.locale === "en" ? "en" : "id";
  const post = POSTS.find((p) => p.slug === slug || p.aliases.includes(slug));

  if (!post) {
    notFound();
  }

  const isPhp2Shell =
    post.slug === "php2shell-cve-2026-109618" || post.aliases.includes("php2shell");
  const isAiRust =
    post.slug === "ai-reverse-engineering-rust" ||
    post.aliases.includes("rea-rust") ||
    post.aliases.includes("artcraft-rust") ||
    post.aliases.includes("ai-rust") ||
    post.aliases.includes("post3");

  const postTitle = typeof post.title === "string" ? post.title : post.title[safeLocale];
  const postCategory = typeof post.category === "string" ? post.category : post.category[safeLocale];
  const postReadTime = typeof post.readTime === "string" ? post.readTime : post.readTime[safeLocale];
  const postDate = typeof post.date === "string" ? post.date : post.date[safeLocale];

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
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-surface border border-white/15 text-xs sm:text-sm font-medium">
            <FileText className="w-4 h-4 text-accent shrink-0" />
            <span className="text-text font-semibold font-mono">notes/{post.slug}.md</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${safeLocale === "id" ? "en" : "id"}/post/${slug}`}
              className="px-2.5 py-1 rounded bg-surface hover:bg-surface-subtle border border-white/10 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
              title={safeLocale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <span className={safeLocale === "id" ? "text-accent font-black" : "text-text-dim hover:text-text"}>ID</span>
              <span className="text-text-dim">/</span>
              <span className={safeLocale === "en" ? "text-accent font-black" : "text-text-dim hover:text-text"}>EN</span>
            </Link>

            <MusicToggleButton
              locale={safeLocale}
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
            <div>title: "{postTitle}"</div>
            <div>date: "{postDate}"</div>
            <div>category: "{postCategory}"</div>
            <div>author: "{post.author}"</div>
            <div>tags: [{post.tags.join(", ")}]</div>
            <div>readTime: "{postReadTime}"</div>
            <div className="text-text-muted font-bold">---</div>
          </div>

          {/* Article Main Title */}
          <div className="space-y-3 border-b border-white/5 pb-6">
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
              # {postTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-text-dim">
              <span className="text-accent font-bold uppercase">{postCategory}</span>
              <span>·</span>
              <span>{safeLocale === "en" ? "Author" : "Penulis"}: {post.author}</span>
              <span>·</span>
              <span>{postReadTime}</span>
            </div>
          </div>

          {isAiRust ? (
            /* ─────────────────────────────────────────────────────────────
               ARTICLE CONTENT: AI, Reverse Engineering, and Rust
               ───────────────────────────────────────────────────────────── */
            <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed">
              {/* Alert Callout */}
              <div className="p-4 rounded-sm bg-base border-l-4 border-accent space-y-2">
                <div className="flex items-center gap-2 text-text font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <Binary className="w-4 h-4 text-accent" />
                  <span>
                    {safeLocale === "en"
                      ? "Architecture & Security Brief: AI Reversing & Memory Safety"
                      : "Ringkasan Arsitektur & Keamanan: Analisis Biner AI & Keamanan Memori"}
                  </span>
                </div>
                <p className="text-text-dim text-xs leading-relaxed">
                  {safeLocale === "en"
                    ? "Evaluating how coding agents interact with disassembly toolchains, where automated decompilation reaches its limits, and why Rust's compile-time memory model provides a reliable destination for ported systems."
                    : "Membahas bagaimana coding agent memanfaatkan alat dekompilasi dan disassembly, batasan analisis biner otomatis, serta alasan model kompilasi Rust menjadi target ideal untuk software performa tinggi."}
                </p>
              </div>

              {/* Section 1: AI & Coding Agents */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en"
                    ? "## Beyond Autocomplete: The Agentic Loop"
                    : "## Dari Autocomplete ke Siklus Otonom"}
                </h2>
                {safeLocale === "en" ? (
                  <>
                    <p>
                      AI is shifting how software gets engineered. Modern coding agents no longer just suggest lines or functions inside an editor. They execute shell commands, parse compiler diagnostics, inspect runtime failures, and iterate until a feature satisfies its test constraints.
                    </p>
                    <p>
                      This closed-loop feedback shifts developer effort away from writing repetitive boilerplate and toward architectural evaluation, threat modeling, and correctness validation.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      AI mengubah cara software dibangun. Alih-alih sebatas melengkapi baris kode (autocomplete) di editor, coding agent kini mampu menjalankan perintah CLI, menginterpretasikan error compiler, memeriksa kegagalan runtime, dan mengulang siklus perbaikan hingga implementasi lolos pengujian.
                    </p>
                    <p>
                      Pergeseran ke siklus tertutup ini mengalihkan fokus pengembang dari pengetikan boilerplate repetitif ke arah peninjauan arsitektur, pemodelan ancaman, dan pembuktian kebenaran logika sistem.
                    </p>
                  </>
                )}
              </section>

              {/* Section 2: REA and Binary Analysis */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-accent" />
                  <span>
                    {safeLocale === "en"
                      ? "## REA: Bridging Agents to Binary Analysis"
                      : "## REA: Menghubungkan Agent dengan Analisis Biner"}
                  </span>
                </h2>
                {safeLocale === "en" ? (
                  <>
                    <p>
                      Tools like <strong className="text-text font-bold">REA</strong> (<em>Reverse Engineer Anything</em>) connect coding agents directly to binary analysis engines. An agent can inspect disassembled routines, trace call graphs, examine strings, and reconstruct compatible reimplementations for another runtime.
                    </p>
                    <p>
                      However, REA’s documentation clearly defines its technical boundary: the toolkit does not magically dump original source code or synthesize identical duplicates. It provides observability into compiled artifacts.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Toolkit seperti <strong className="text-text font-bold">REA</strong> (<em>Reverse Engineer Anything</em>) menjembatani coding agent dengan peralatan analisis biner. Agent dapat menelusuri rutin hasil disassembly, membaca call graph, memeriksa string dan simbol, lalu merekonstruksi logika yang kompatibel pada basis kode lain.
                    </p>
                    <p>
                      Kendati demikian, dokumentasi resmi REA secara eksplisit menegaskan batasannya: alat ini bukan dekompiler instan yang mengambil source code asli atau mencetak replika sempurna. REA berfungsi memberikan bukti dan observabilitas terhadap artefak biner.
                    </p>
                  </>
                )}

                <div className="p-4 rounded-sm bg-base border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-bold text-xs uppercase tracking-wider">
                      {safeLocale === "en" ? "Source Reference" : "Referensi Resmi"}
                    </span>
                    <a
                      href="https://github.com/morluto/rea"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors inline-flex items-center gap-1 font-mono text-xs"
                    >
                      <span>github.com/morluto/rea</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-text-dim text-xs leading-relaxed">
                    {safeLocale === "en"
                      ? "Observable behavior does not equal complete understanding. Confirming what an isolated subroutine produces does not reveal every environmental condition, edge-case boundary, or concurrency hazard embedded in the original system."
                      : "Mengetahui perilaku output suatu fungsi biner tidak serta-merta mencakup penanganan kasus ekstrem (edge cases), asumsi lingkungan runtime, serta race condition tersembunyi di balik sistem aslinya."}
                  </p>
                </div>
              </section>

              {/* Section 3: Architecture Diagram */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en"
                    ? "## Technical Flow: From Binary to Verified Rust"
                    : "## Alur Teknis: Dari Biner ke Implementasi Rust"}
                </h2>
                <p>
                  {safeLocale === "en"
                    ? "How automated reverse engineering pairs with compiler-driven verification:"
                    : "Bagaimana proses analisis biner berbantuan agent berpadu dengan verifikasi compiler:"}
                </p>

                <div className="rounded-sm bg-base border border-white/10 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-surface-subtle border-b border-white/5 text-[11px] text-text-dim">
                    <span className="font-mono text-text">rea_agent_rust_pipeline.md</span>
                    <span>ARCHITECTURE FLOW</span>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-text leading-relaxed text-[11px] sm:text-xs">
{safeLocale === "en"
? `+-------------------------------------------------------------------------+
|        AI Agent Assisted Binary Analysis & Rust Reconstruction Flow     |
+-------------------------------------------------------------------------+
   [ Target Compiled Executable / Legacy Binary ]
                         |
                         v
   [ REA Analysis Tools (Static Disassembly, Strings, Symbol Maps) ]
                         |
                         v
   [ Coding Agent Identifies Function Contracts & Observable State ]
                         |
                         v
   [ Draft Rust Module Implementation (Idiomatic Types & Traits) ]
                         |
                         v
   [ rustc Compiler Verification (Borrow Checker & Lifetime Audit) ]
                         |
                         v
   [ Verified Native Rust Implementation (Zero-Cost Abstractions) ]`
: `+-------------------------------------------------------------------------+
|     Alur Analisis Biner Berbantuan AI Agent & Rekonstruksi ke Rust      |
+-------------------------------------------------------------------------+
   [ Biner Terkompilasi / Aplikasi Legacy ]
                         |
                         v
   [ Toolkit Analisis REA (Disassembly Statis, Strings, Simbol, dsb.) ]
                         |
                         v
   [ Coding Agent Mengidentifikasi Kontrak Fungsi & Alur State ]
                         |
                         v
   [ Draf Implementasi Modul Rust (Tipe Data & Trait Idiomatis) ]
                         |
                         v
   [ Verifikasi Compiler rustc (Pemeriksaan Borrow Checker & Lifetimes) ]
                         |
                         v
   [ Implementasi Native Rust Terverifikasi (Aman & Performa Tinggi) ]`}
                  </pre>
                </div>
              </section>

              {/* Section 4: Why Rust */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>
                    {safeLocale === "en"
                      ? "## Why Rust Serves as the Ideal Target"
                      : "## Alasan Rust Menjadi Target Pilihan"}
                  </span>
                </h2>
                <p>
                  {safeLocale === "en"
                    ? "Rust delivers native C/C++ performance without a garbage collector while preventing memory safety bugs through its strict ownership model and compile-time borrow checker."
                    : "Rust menawarkan kecepatan eksekusi setara C/C++ tanpa jeda garbage collector, sekaligus mengeliminasi kerentanan memori lewat sistem kepemilikan (ownership) dan borrow checker saat kompilasi."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-sm bg-base border border-white/10 space-y-1.5">
                    <span className="text-accent font-bold font-mono text-xs block">
                      {safeLocale === "en" ? "01. Compile-Time Safety" : "01. Keamanan Saat Kompilasi"}
                    </span>
                    <p className="text-text-dim text-[11px] leading-relaxed">
                      {safeLocale === "en"
                        ? "Buffer overflows, use-after-free, and data races fail to compile, removing runtime vulnerability classes."
                        : "Kesalahan use-after-free, buffer overflow, dan data race digagalkan langsung oleh rustc sebelum kode sempat dieksekusi."}
                    </p>
                  </div>
                  <div className="p-4 rounded-sm bg-base border border-white/10 space-y-1.5">
                    <span className="text-accent font-bold font-mono text-xs block">
                      {safeLocale === "en" ? "02. Lowering Adoption Friction" : "02. Menurunkan Hambatan Adopsi"}
                    </span>
                    <p className="text-text-dim text-[11px] leading-relaxed">
                      {safeLocale === "en"
                        ? "AI agents parse verbose compiler errors and help developers navigate borrow checker rules quickly."
                        : "Agent membantu membedah error compiler yang kompleks dan memandu penyesuaian lifetime tanpa frustrasi."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-1 font-mono text-xs">
                  <a
                    href="https://rust-lang.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors inline-flex items-center gap-1"
                  >
                    <span>rust-lang.org</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.reversinglabs.com/blog/ai-coding-rust"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors inline-flex items-center gap-1"
                  >
                    <span>ReversingLabs: AI & Rust Migration</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </section>

              {/* Section 5: ArtCraft Project Context */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  <span>
                    {safeLocale === "en"
                      ? "## Case Context: ArtCraft as Independent Rust Software"
                      : "## Konteks Kasus: ArtCraft sebagai Software Rust Mandiri"}
                  </span>
                </h2>
                {safeLocale === "en" ? (
                  <>
                    <p>
                      <strong className="text-text font-bold">ArtCraft</strong> develops open-source native desktop applications in Rust across image manipulation, vector illustration, video processing, documents, and spreadsheets. Their documentation indicates these applications were built from the ground up.
                    </p>
                    <p>
                      Operating in identical product categories does not mean replicating commercial source code. There is also zero public verification linking ArtCraft to REA toolchains. ArtCraft serves as an independent demonstration that Rust’s ecosystem is mature enough to support full-scale desktop productivity suites.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong className="text-text font-bold">ArtCraft</strong> mengembangkan aplikasi desktop open-source berbasis Rust untuk pengolahan gambar, ilustrasi vektor, video, dokumen, hingga spreadsheet. Dokumentasi resminya menyatakan bahwa aplikasi tersebut dirancang mandiri dari nol sebagai software native.
                    </p>
                    <p>
                      Berada di kategori produktivitas yang sama tidak berarti menyalin kode produk komersial. Data publik ArtCraft juga tidak mengonfirmasi keterkaitan dengan REA. ArtCraft adalah bukti nyata bahwa ekosistem Rust kini sudah matang untuk membangun rangkaian software desktop performa tinggi secara mandiri.
                    </p>
                  </>
                )}

                <div className="pt-1">
                  <a
                    href="https://getartcraft.com/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors inline-flex items-center gap-1 font-mono text-xs"
                  >
                    <span>getartcraft.com/apps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </section>

              {/* Section 6: Rigor & Long-Term Reliability */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en"
                    ? "## Speed vs Precision: Engineering Maturity"
                    : "## Kecepatan vs Presisi: Kematangan Rekayasa"}
                </h2>
                {safeLocale === "en" ? (
                  <>
                    <p>
                      AI substantially accelerates exploratory analysis and initial scaffolding. However, spinning up an initial proof-of-concept remains fundamentally different from maintaining production software. File format compatibility, error handling, security hardening, and interface latency still require deliberate human engineering.
                    </p>
                    <p>
                      The true benefit is leverage: small teams can now evaluate technical architectures that previously required larger engineering groups. AI handles boilerplate exploration, while Rust provides strict compile-time guarantees. The deciding factor remains software reliability in production.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      AI memangkas waktu analisis awal dan penyusunan prototipe secara drastis. Kendati demikian, menghasilkan versi awal yang berjalan berbeda jauh dengan merawat software produksi yang stabil. Kompatibilitas format file, penanganan eror, audit keamanan, dan responsivitas UI tetap membutuhkan ketelitian manusia.
                    </p>
                    <p>
                      Keuntungan terbesarnya adalah efisiensi: tim kecil kini dapat menguji arsitektur ambisius yang dulu butuh tim besar. AI mengurus eksplorasi kode berulang, sedangkan Rust memberi jaminan memori di level compiler. Nilai akhir sebuah software tetap dinilai dari keandalannya saat bekerja di tangan pengguna.
                    </p>
                  </>
                )}
              </section>
            </div>
          ) : isPhp2Shell ? (
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
                  {safeLocale === "en"
                    ? "Two critical Remote Code Execution (RCE) vulnerabilities with CVSS 4.0: 9.2 severity ratings have been disclosed in the PHP core runtime. Exploitation requires zero authentication and targets the internal Zend memory management engine."
                    : "Dua kerentanan Remote Code Execution (RCE) tingkat kritis dengan skor CVSS 4.0: 9.2 baru saja diungkap pada runtime PHP. Eksploitasi tidak memerlukan autentikasi dan langsung menargetkan engine memori Zend."}
                </p>
              </div>

              {/* Section 1: Overview */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en" ? "## What is PHP2Shell?" : "## Apa Itu PHP2Shell?"}
                </h2>
                {safeLocale === "en" ? (
                  <>
                    <p>
                      Over the past few days, <strong className="text-text font-bold">PHP2Shell</strong> has become a prominent topic in the global cybersecurity community. The name designates two critical vulnerabilities in PHP that enable unauthenticated remote threat actors to execute arbitrary code (Remote Code Execution / RCE) on unpatched host servers.
                    </p>
                    <p>
                      Unlike commonplace flaws located inside CMS plugins or third-party themes (such as WordPress or Drupal extensions), this vulnerability exists directly within the core PHP runtime interpreter (the Zend Engine). Consequently, even if a web application possesses zero SQL Injection or File Upload bugs, the host machine remains exposed if the underlying PHP runtime has not received the security patch.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Beberapa hari terakhir, <strong className="text-text font-bold">PHP2Shell</strong> ramai dibicarakan di dunia keamanan siber internasional. Nama ini merujuk pada dua kerentanan kritis di PHP yang memungkinkan penyerang menjalankan kode dari jarak jauh (Remote Code Execution / RCE) pada server yang belum diperbarui.
                    </p>
                    <p>
                      Berbeda dengan kerentanan umum pada plugin atau tema CMS (seperti WordPress atau Drupal), celah ini berada langsung di dalam core runtime engine PHP (Zend Engine). Artinya, meskipun aplikasi web ditulis tanpa celah SQL Injection atau File Upload, server tetap berisiko jika runtime PHP yang mendasarinya belum menerima patch resmi.
                    </p>
                  </>
                )}
              </section>

              {/* Section 2: AI-Assisted Discovery */}
              <section className="space-y-3">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  <span>
                    {safeLocale === "en"
                      ? "## Discovered with AI Assistance: Ryan Austin & Wiz Team"
                      : "## Ditemukan dengan Bantuan AI: Ryan Austin & Tim Wiz"}
                  </span>
                </h2>
                <p>
                  {safeLocale === "en"
                    ? "What makes this incident a landmark milestone in offensive and defensive security research is the active role played by frontier artificial intelligence:"
                    : "Hal yang membuat kasus ini menjadi tonggak sejarah baru dalam riset keamanan siber adalah keterlibatan kecerdasan buatan (AI) mutakhir dalam proses penemuannya:"}
                </p>
                <div className="space-y-2 pl-3 border-l-2 border-accent/40">
                  {safeLocale === "en" ? (
                    <>
                      <p>
                        <strong className="text-text font-semibold">Ryan Austin</strong>, a security researcher at Calif, utilized the frontier AI model <strong className="text-text">GPT-5.6 Sol</strong> during the <em className="text-accent not-italic">Patch the Planet</em> initiative to audit and reason through legacy C source code across the PHP repository, ultimately discovering one of the memory corruption paths.
                      </p>
                      <p>
                        Independently, the <strong className="text-text font-semibold">Wiz Research Team</strong> uncovered and responsibly reported both vulnerabilities to the upstream PHP maintainers.
                      </p>
                      <p>
                        Following verified proof-of-concept submissions, the researchers worked closely with the PHP core team under a <em>Coordinated Vulnerability Disclosure</em> framework to deploy fixes before technical exploitation details went public.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong className="text-text font-semibold">Ryan Austin</strong>, peneliti keamanan dari Calif, menggunakan model frontier AI <strong className="text-text">GPT-5.6 Sol</strong> dalam proyek riset <em className="text-accent not-italic">Patch the Planet</em> untuk menyisir dan menganalisis kode sumber C berumur puluhan tahun pada repositori PHP, yang akhirnya mengarahkan pada salah satu celah memori tersebut.
                      </p>
                      <p>
                        Secara independen, <strong className="text-text font-semibold">Tim Wiz</strong> juga berhasil menemukan dan melaporkan kedua kerentanan tersebut ke tim pengembang PHP.
                      </p>
                      <p>
                        Setelah kedua temuan diverifikasi, para peneliti bekerja sama secara tertutup dengan tim inti PHP dalam skema <em>Coordinated Vulnerability Disclosure</em> guna menyiapkan perbaikan resmi sebelum rincian teknisnya dipublikasikan ke publik.
                      </p>
                    </>
                  )}
                </div>

                <div className="p-4 rounded-sm bg-base border border-white/5 space-y-2">
                  <span className="text-accent font-bold text-xs uppercase tracking-wider">
                    {safeLocale === "en" ? "Key Note: Human + AI Synergy" : "Catatan Penting: Kolaborasi Manusia + AI"}
                  </span>
                  <p className="text-text-dim text-xs leading-relaxed">
                    {safeLocale === "en"
                      ? "This does not imply that AI discovered the full chain in isolation. Skilled researchers still had to interpret the codebase, validate hypotheses, build reproducible triggers, and verify remediation patches. Nevertheless, PHP2Shell demonstrates that AI dramatically speeds up finding deeply buried flaws in foundational software."
                      : "Ini bukan berarti AI menemukan semuanya tanpa campur tangan manusia. Peneliti tetap perlu memahami kode, menguji temuannya, dan membantu memastikan perbaikan bekerja. Namun, kasus PHP2Shell menunjukkan bahwa AI dapat membantu mempercepat pencarian celah keamanan yang sebelumnya sulit ditemukan atau dieksploitasi."}
                  </p>
                </div>
              </section>

              {/* Section 3: Technical Diagram */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en" ? "## Technical CVE Exploitation Flow" : "## Ilustrasi Teknis Eksploitasi CVE"}
                </h2>
                <p>
                  {safeLocale === "en"
                    ? "The vulnerability is triggered during Out-Of-Memory (OOM) handling inside the Zend Engine when executing C `longjmp()` exception unwinding:"
                    : "Kerentanan ini berakar dari penanganan kondisi kehabisan memori (Out-Of-Memory / OOM) pada Zend Engine saat memanggil instruksi longjmp():"}
                </p>

                {/* ASCII Diagram Box */}
                <div className="rounded-sm bg-base border border-white/10 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-surface-subtle border-b border-white/5 text-[11px] text-text-dim">
                    <span className="font-mono text-text">diagram_eksploitasi_php2shell.md</span>
                    <span>ASCII ARCHITECTURE MAP</span>
                  </div>
                  <pre className="p-4 sm:p-5 overflow-x-auto text-text leading-relaxed text-[11px] sm:text-xs">
{safeLocale === "en"
? `+-------------------------------------------------------------------------+
|                  PHP2Shell (RCE) Execution Attack Path                  |
+-------------------------------------------------------------------------+
       [ Malicious HTTP Payload Delivered by Remote Attacker ]
                            |
                            v
       [ Heap Allocation Exceeds Server memory_limit ]
                            |
                            v
       [ Zend Engine Triggers Fatal Out-of-Memory (OOM) Condition ]
                            |
                            v
       [ C longjmp() Routine Invoked to Abort Active Request ]
                            |
             +--------------+--------------+
             |                             |
             v                             v
  [ CVE-2026-109618 ]            [ CVE-2026-109619 ]
  Request-bound Memory           Dangling Global Pointer
  Fails Clean State Reset        References Freed Heap Region
  (Memory Safety Bypass)         (Use-After-Free / State Leak)
             |                             |
             +--------------+--------------+
                            |
                            v
       [ Subsequent Request Cycle Reads Corrupted Heap State ]
                            |
                            v
   [ EXPLOITATION SUCCESSFUL: Arbitrary Remote Code Execution (RCE) ]`
: `+-------------------------------------------------------------------------+
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
              </section>

              {/* Section 4: Mitigations & Patched Versions */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>{safeLocale === "en" ? "## Remediation & Patching Guidance" : "## Rekomendasi Mitigasi dan Patching"}</span>
                </h2>
                <p>
                  {safeLocale === "en"
                    ? "The PHP maintainers have shipped official patches resolving both flaws: 8.2.35, 8.3.36, 8.4.27, and 8.5.12. Server administrators should immediately audit running PHP binaries and upgrade accordingly:"
                    : "PHP sudah merilis versi resmi yang memperbaiki masalah ini: 8.2.35, 8.3.36, 8.4.27, dan 8.5.12. Pengelola server sebaiknya segera memeriksa versi PHP yang digunakan pada sistem dan memasang pembaruan yang sesuai:"}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-1">
                  <div className="p-3.5 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[11px] text-text font-bold block">PHP 8.2.x</span>
                    <span className="text-accent font-mono text-xs font-bold block">&gt;= 8.2.35</span>
                  </div>
                  <div className="p-3.5 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[11px] text-text font-bold block">PHP 8.3.x</span>
                    <span className="text-accent font-mono text-xs font-bold block">&gt;= 8.3.36</span>
                  </div>
                  <div className="p-3.5 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[11px] text-text font-bold block">PHP 8.4.x</span>
                    <span className="text-accent font-mono text-xs font-bold block">&gt;= 8.4.27</span>
                  </div>
                  <div className="p-3.5 bg-base border border-white/10 rounded-sm space-y-1">
                    <span className="text-[11px] text-text font-bold block">PHP 8.5.x</span>
                    <span className="text-accent font-mono text-xs font-bold block">&gt;= 8.5.12</span>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
               ARTICLE CONTENT: Memecahkan AES ECB (Fallback & Classic Post)
               ───────────────────────────────────────────────────────────── */
            <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed">
              {/* Section 1: Theory */}
              <section className="space-y-4">
                <p>
                  {safeLocale === "en"
                    ? "AES (Advanced Encryption Standard) is a symmetric block cipher widely employed in production systems. ECB (Electronic Codebook) is the most basic mode of operation for AES."
                    : "AES (Advanced Encryption Standard) adalah algoritma enkripsi simetris yang digunakan secara luas dan dapat beroperasi dalam berbagai mode. ECB (Electronic Codebook) adalah salah satu mode operasi paling sederhana untuk AES."}
                </p>
                <p>
                  {safeLocale === "en" ? (
                    <>
                      Under ECB mode, each plaintext block is encrypted in complete isolation using identical keying material, with <strong className="text-text">no feedback mechanism or chaining</strong> between adjacent blocks.
                    </>
                  ) : (
                    <>
                      Dalam mode ECB, setiap blok plaintext (teks asli) dienkripsi secara terpisah dengan kunci yang sama, dan <strong className="text-text">tidak ada mekanisme umpan balik (feedback mechanism)</strong> antar blok.
                    </>
                  )}
                </p>
              </section>

              {/* Section 2: Workflow */}
              <section className="space-y-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en" ? "## AES ECB Encryption Workflow" : "## Alur Kerja Enkripsi AES ECB"}
                </h2>

                <div className="space-y-3 pl-3 border-l-2 border-accent/40">
                  <div className="space-y-1">
                    <span className="text-text font-bold">
                      {safeLocale === "en" ? "1. Key Generation:" : "1. Pembangkitan Kunci (Key Generation):"}
                    </span>
                    <p>
                      {safeLocale === "en"
                        ? "Select a secret symmetric key of fixed bit-length (128, 192, or 256 bits depending on security parameters)."
                        : "Memilih kunci enkripsi rahasia dengan panjang tetap (128, 192, atau 256 bit sesuai varian AES yang dipakai)."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text font-bold">
                      {safeLocale === "en" ? "2. Padding (Byte Alignment):" : "2. Padding (Pengisian Byte):"}
                    </span>
                    <p>
                      {safeLocale === "en"
                        ? "If plaintext size is not an exact multiple of 16 bytes (the AES block standard), PKCS#7 padding is appended to align the final block."
                        : "Jika panjang plaintext bukan kelipatan ukuran blok AES (16 byte), dilakukan pengisian padding (standar PKCS#7) agar pas tepat kelipatan 16 byte."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text font-bold">
                      {safeLocale === "en" ? "3. Block-by-Block Encryption:" : "3. Enkripsi Blok:"}
                    </span>
                    <p>
                      {safeLocale === "en"
                        ? "The payload is separated into sequential 16-byte blocks. Each block undergoes AES transformation independently using the key."
                        : "Plaintext dibagi menjadi blok-blok tetap berukuran 16 byte. Setiap blok dienkripsi secara independen menggunakan algoritma AES dengan kunci yang sama, menghasilkan blok ciphertext."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text font-bold">
                      {safeLocale === "en" ? "4. Concatenation:" : "4. Penggabungan (Concatenation):"}
                    </span>
                    <p>
                      {safeLocale === "en"
                        ? "All encrypted blocks are concatenated in order to assemble the final ciphertext output."
                        : "Seluruh blok ciphertext yang dihasilkan digabungkan berurutan untuk membentuk ciphertext akhir utuh."}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Python Implementation */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-text">
                    {safeLocale === "en" ? "## Python Implementation (`pycryptodome`)" : "## Implementasi Python (`pycryptodome`)"}
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

              {/* Section 4: Deep Dive & Real-World Analogy */}
              <section className="space-y-5">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-text border-b border-white/5 pb-2">
                  {safeLocale === "en" ? "## Cryptographic Principles & Analogies" : "## Logika Enkripsi & Analogi Nyata"}
                </h2>

                <div className="space-y-4">
                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      {safeLocale === "en" ? "1. Symmetric Keying" : "1. Symmetric Key (Satu Kunci untuk Semua)"}
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-text">{safeLocale === "en" ? "Principle:" : "Konsep:"}</strong>{" "}
                      {safeLocale === "en"
                        ? "The exact same secret key is used both to encrypt and subsequently decrypt the data."
                        : "Kunci untuk mengunci (enkripsi) dan membuka kembali (dekripsi) adalah kunci yang sama persis."}
                    </p>
                    <div className="p-3 rounded-sm bg-surface-subtle border-l-2 border-accent text-xs text-text-dim">
                      <strong className="text-text">{safeLocale === "en" ? "Analogy:" : "Analogi:"}</strong>{" "}
                      {safeLocale === "en"
                        ? "Like a physical front-door lock. The physical key used to lock the deadbolt from the exterior is the identical key needed to unlock it from the interior."
                        : "Seperti kunci pintu rumah. Kunci fisik yang dipakai untuk mengunci pintu dari luar dipakai juga untuk membukanya kembali dari dalam. Kunci ini mutlak harus dijaga agar tidak dicuri atau bocor ke pihak lain."}
                    </div>
                  </div>

                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      {safeLocale === "en" ? "2. Block Cipher Geometry" : "2. Block Cipher (Potong-Potong Data)"}
                    </div>
                    <p className="leading-relaxed">
                      <strong className="text-text">{safeLocale === "en" ? "Principle:" : "Konsep:"}</strong>{" "}
                      {safeLocale === "en"
                        ? "Long messages are partitioned into standardized, fixed-size blocks rather than processed as a continuous stream."
                        : "Data yang panjang tidak diproses sekaligus dalam satu tarikan nafas, melainkan dipotong-potong menjadi kotak-kotak kecil berukuran tetap (blok)."}
                    </p>
                    <div className="p-3 rounded-sm bg-surface-subtle border-l-2 border-accent text-xs text-text-dim space-y-1">
                      <p>
                        <strong className="text-text">{safeLocale === "en" ? "AES Rule:" : "Aturan Emas AES:"}</strong>{" "}
                        {safeLocale === "en" ? "Block size is permanently 16 bytes (128 bits)." : "Ukuran potongan (blok) selalu 16 byte (tetap, tidak bisa ditawar)."}
                      </p>
                      <p>
                        {safeLocale === "en"
                          ? "Key sizes (128, 192, 256 bits) define security strength, not block dimensions."
                          : "Angka 128, 192, atau 256 adalah ukuran kunci (kompleksitas keamanan kunci), bukan ukuran potongan datanya."}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-sm bg-base border border-white/5 space-y-2">
                    <div className="text-accent font-bold text-sm">
                      {safeLocale === "en" ? "3. Operating Modes: ECB vs CBC" : "3. Mode Operasi: ECB (Si Polos) vs CBC (Si Rantai)"}
                    </div>
                    <p className="leading-relaxed">
                      {safeLocale === "en"
                        ? "Modes dictate how adjacent blocks interact during transformation:"
                        : "Mode operasi ibarat cara kita menyusun dan mengacak potongan-potongan tadi:"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3.5 rounded-sm bg-surface-subtle space-y-1.5 border border-border/40">
                        <span className="text-text font-bold">
                          {safeLocale === "en" ? "ECB (Electronic Codebook)" : "ECB (Electronic Codebook) - Si Polos"}
                        </span>
                        <p className="text-text-dim leading-relaxed text-[11px]">
                          {safeLocale === "en"
                            ? "Each block is encrypted completely independently."
                            : "Setiap potongan diacak sendiri-sendiri tanpa peduli temannya."}
                        </p>
                        <p className="text-text-muted leading-relaxed text-[11px]">
                          <strong className="text-text font-bold">{safeLocale === "en" ? "Vulnerability:" : "Kelemahan Fatal:"}</strong>{" "}
                          {safeLocale === "en"
                            ? "Identical plaintext blocks produce identical ciphertext blocks (e.g., the infamous ECB Penguin). Unsafe for structured or bitmap payloads."
                            : "Kalau ada dua potongan isinya sama (misal: 'AAAA'), hasil acakannya juga pasti identik. Pola data masih terbaca jelas (seperti fenomena ECB Penguin). Tidak aman untuk data terstruktur."}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-sm bg-surface-subtle space-y-1.5 border border-border/40">
                        <span className="text-text font-bold">
                          {safeLocale === "en" ? "CBC (Cipher Block Chaining)" : "CBC (Cipher Block Chaining) - Si Rantai"}
                        </span>
                        <p className="text-text-dim leading-relaxed text-[11px]">
                          {safeLocale === "en"
                            ? "Blocks are chained using XOR operations before each AES round."
                            : "Saling menyambung. Hasil acakan potongan pertama dipakai untuk mengacak potongan kedua, dan seterusnya."}
                        </p>
                        <p className="text-text-muted leading-relaxed text-[11px]">
                          <strong className="text-text font-bold">{safeLocale === "en" ? "Advantage:" : "Kelebihan:"}</strong>{" "}
                          {safeLocale === "en"
                            ? "Even repeated plaintext blocks yield radically distinct ciphertext, eradicating patterns completely."
                            : "Walaupun ada potongan yang isinya sama ('AAAA'), hasil akhirnya akan beda total karena efek berantai ini. Jauh lebih aman."}
                        </p>
                      </div>
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
