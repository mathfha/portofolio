"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  getSiteConfig,
  getExperience,
  getSkills,
  getCertifications,
  Locale,
} from "@/lib/data";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Sun,
  Moon,
  BookOpen,
  X,
} from "lucide-react";
import CERTIFICATES from "@/../data/certifications.json";
import POSTS from "@/../data/posts.json";
import {
  LinuxIcon,
  DockerIcon,
  AnsibleIcon,
  BurpSuiteIcon,
  NmapIcon,
  GhidraIcon,
  NginxIcon,
  WiresharkIcon,
  CIcon,
  JavaScriptIcon,
  GoIcon,
  PythonIcon,
  PhpIcon,
  LaravelIcon,
  BashIcon,
} from "@/components/ui/TechIcons";
import { DraggableMarquee } from "@/components/ui/DraggableMarquee";
import { InteractivePhotoCard } from "@/components/ui/InteractivePhotoCard";
import { MusicToggleButton } from "@/context/AudioContext";

const TOOLS_LIST = [
  { name: "Linux", Icon: LinuxIcon },
  { name: "Docker", Icon: DockerIcon },
  { name: "Ansible", Icon: AnsibleIcon },
  { name: "Burp Suite", Icon: BurpSuiteIcon },
  { name: "Nmap", Icon: NmapIcon },
  { name: "Ghidra", Icon: GhidraIcon },
  { name: "Nginx", Icon: NginxIcon },
  { name: "Wireshark", Icon: WiresharkIcon },
];

const LANGS_LIST = [
  { name: "C", Icon: CIcon },
  { name: "JavaScript", Icon: JavaScriptIcon },
  { name: "Go", Icon: GoIcon },
  { name: "Python", Icon: PythonIcon },
  { name: "PHP", Icon: PhpIcon },
  { name: "Laravel", Icon: LaravelIcon },
  { name: "Bash", Icon: BashIcon },
];

export default function StructuredBentoPortfolioPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;
  const config = getSiteConfig();
  const experiences = getExperience();
  const skills = getSkills();
  const certifications = getCertifications();

  const [isDark, setIsDark] = useState(true);
  const [selectedCert, setSelectedCert] = useState<(typeof CERTIFICATES)[0] | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const rightColRef = React.useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (window.innerWidth >= 1024 && rightColRef.current) {
      rightColRef.current.scrollTo({
        top: el.offsetTop - 12,
        behavior: "smooth",
      });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
  };

  useEffect(() => {
    try {
      sessionStorage.setItem("portfolio_navigated", "true");
    } catch {}

    const handleInitialHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          if (window.innerWidth >= 1024 && rightColRef.current) {
            rightColRef.current.scrollTo({
              top: el.offsetTop - 12,
              behavior: "smooth",
            });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
          setActiveSection(hash);
        }
      }, 100);

      return () => clearTimeout(timer);
    };

    handleInitialHash();
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "skill", "experience", "certificate", "post"];
    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024;
      const scrollPos = isDesktop && rightColRef.current
        ? rightColRef.current.scrollTop + 140
        : window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPos) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const col = rightColRef.current;
    if (col) col.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (col) col.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { id: "about", label: locale === "id" ? "Tentang" : "About" },
    { id: "skill", label: locale === "id" ? "Keahlian" : "Skills" },
    { id: "experience", label: locale === "id" ? "Pengalaman" : "Experience" },
    { id: "certificate", label: locale === "id" ? "Sertifikat" : "Certificates" },
    { id: "post", label: locale === "id" ? "Artikel" : "Posts" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-base text-text selection:bg-accent selection:text-base flex flex-col justify-between">
      {/* ─────────────────────────────────────────────
          TOP BAR (Fixed Header on Desktop: Language & Theme)
          ───────────────────────────────────────────── */}
      <header className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-5 flex items-center justify-end gap-3 text-xs font-mono shrink-0 z-30">
        <Link
          href={`/${locale === "id" ? "en" : "id"}`}
          className="px-2.5 py-1 rounded bg-surface hover:bg-surface-subtle border border-white/10 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
          title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
        >
          <span className={locale === "id" ? "text-accent font-black" : "text-text-dim hover:text-text"}>ID</span>
          <span className="text-text-dim">/</span>
          <span className={locale === "en" ? "text-accent font-black" : "text-text-dim hover:text-text"}>EN</span>
        </Link>

        <MusicToggleButton
          locale={locale}
          className="p-1.5 text-text-muted hover:text-text transition-colors rounded-sm hover:bg-surface"
          iconClassName="w-4 h-4"
        />

        <button
          onClick={toggleTheme}
          className="p-1.5 text-text-muted hover:text-text transition-colors"
          title="Toggle Theme"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-text" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* ─────────────────────────────────────────────
          MAIN CONTENT
          ───────────────────────────────────────────── */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-2 lg:py-4 flex relative lg:overflow-hidden min-h-0">
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full lg:h-full lg:overflow-hidden">
          {/* ═══════════════════════════════════════════
              LEFT COLUMN: HERO IDENTITY & ACTIONS (Fixed/Static on Desktop)
              ═══════════════════════════════════════════ */}
          <section className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4 w-full lg:h-full shrink-0">
            <div className="space-y-3 w-full flex flex-col items-center justify-center">
              <h1 className="font-heading font-extrabold tracking-tight text-text leading-tight text-center w-full mx-auto flex flex-col items-center">
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-[1.65rem] xl:text-[1.95rem] whitespace-nowrap">
                  Web Developer
                </span>
                <span className="block text-base sm:text-lg lg:text-xl text-text-muted font-normal py-0.5 font-mono">
                  &amp;
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-[1.65rem] xl:text-[1.95rem] whitespace-nowrap">
                  Security Enthusiast
                </span>
              </h1>

              {/* Interactive Dual-Photo Card Stack (Centered) */}
              <div className="flex justify-center items-center w-full py-1">
                <InteractivePhotoCard />
              </div>

              <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-mono max-w-sm text-center mx-auto pt-0.5">
                {locale === "id"
                  ? "Mahasiswa Sistem Informasi & cybersecurity enthusiast. Fokus di web development, Linux server hardening, dan analisa vulnerability aplikasi."
                  : "Information system student & cybersecurity enthusiast. Focused on web development, Linux server hardening, and vulnerability assessments."}
              </p>
            </div>

            {/* Social & Contact Direct Links (Centered & Authentic Brand Colors) */}
            <div className="flex items-center justify-center gap-3 pt-1 font-mono text-xs w-full">
              <a
                href="https://github.com/mathfha"
                target="_blank"
                rel="noreferrer"
                title="GitHub: mathfha"
                aria-label="GitHub"
                className="p-3 rounded-sm bg-surface hover:bg-surface-subtle text-text transition-colors flex items-center justify-center shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/aditya-rahman-680938267/?isSelfProfile=true"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn: Aditya Rahman"
                aria-label="LinkedIn"
                className="p-3 rounded-sm bg-surface hover:bg-surface-subtle transition-colors flex items-center justify-center shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              </a>

              <a
                href="https://www.instagram.com/aditwastakenn/"
                target="_blank"
                rel="noreferrer"
                title="Instagram: @aditwastakenn"
                aria-label="Instagram"
                className="p-3 rounded-sm bg-surface hover:bg-surface-subtle transition-colors flex items-center justify-center shadow-sm"
              >
                <Instagram className="w-4 h-4 text-[#E4405F]" />
              </a>

              <a
                href="mailto:adit.rwet@gmail.com"
                title="Email: adit.rwet@gmail.com"
                aria-label="Email"
                className="p-3 rounded-sm bg-surface hover:bg-surface-subtle transition-colors flex items-center justify-center shadow-sm"
              >
                <Mail className="w-4 h-4 text-[#EA4335]" />
              </a>
            </div>
          </section>

          {/* ═══════════════════════════════════════════
              RIGHT COLUMN: CARDS & SIDE NAVIGATION (Scrollable Independently on Desktop)
              ═══════════════════════════════════════════ */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 flex flex-col lg:flex-row items-start gap-6 lg:gap-8 relative w-full lg:h-full lg:overflow-y-auto no-scrollbar py-2"
          >
            {/* The 5 Cards */}
            <section className="flex-1 min-w-0 space-y-6 w-full pb-16 lg:pb-24">
              {/* Mobile Quick Navigation Strip (<lg - Sticky so it never disappears) */}
              <nav
                aria-label="Navigasi Bagian Cepat"
                className="lg:hidden sticky top-0 z-20 flex items-center justify-between gap-1 overflow-x-auto py-3 px-3 bg-base/95 backdrop-blur-md font-mono text-sm sm:text-base no-scrollbar w-full shadow-sm border-b border-white/5"
              >
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap text-sm sm:text-base font-bold ${
                      activeSection === item.id
                        ? "text-text font-black bg-surface"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* ── CARD 1: ABOUT (Borderless & Prominent Title) ── */}
              <div id="about" className="scroll-mt-6 p-5 sm:p-7 sm:p-9 rounded-sm bg-surface hover:bg-surface-subtle transition-colors space-y-4 shadow-sm">
                <h2 className="font-mono text-lg sm:text-xl font-black tracking-widest text-text uppercase">
                  {locale === "id" ? "TENTANG" : "ABOUT"}
                </h2>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-mono">
                  {locale === "id"
                    ? "Suka banget ngulik dan ngobrolin perkembangan teknologi. Sehari-hari yang saya pelajari nggak jauh-jauh dari dunia tech, terutama dua bidang yang paling saya minati: Web Development dan Cyber Security - mulai dari cara merancang aplikasi web sampai mencari celah dan mengamankannya."
                    : "I genuinely enjoy discussing technology and where it's heading. What I explore and learn every day revolves around tech, especially two areas I'm most passionate about: Web Development and Cybersecurity - from building web applications to finding and fixing security vulnerabilities."}
                </p>
              </div>

              {/* ── CARD 2: SKILL (Borderless & Prominent Title) ── */}
              <div id="skill" className="scroll-mt-6 p-5 sm:p-7 sm:p-9 rounded-sm bg-surface hover:bg-surface-subtle transition-colors space-y-6 shadow-sm">
                <h2 className="font-mono text-lg sm:text-xl font-black tracking-widest text-text uppercase">
                  {locale === "id" ? "KEAHLIAN" : "SKILLS"}
                </h2>

                {/* Tools & Infrastructure (Draggable & Auto-scrolling) */}
                <div className="space-y-3">
                  <div className="font-mono text-[11px] text-text-dim uppercase tracking-wider">
                    {locale === "id" ? "ALAT & KEAMANAN SISTEM" : "TOOLS & SYSTEM SECURITY"}
                  </div>
                  <DraggableMarquee speed={0.65} direction="left">
                    {[...TOOLS_LIST, ...TOOLS_LIST].map((item, idx) => (
                      <div
                        key={`tool-${idx}`}
                        title={item.name}
                        className="flex flex-col items-center justify-center gap-2 shrink-0 group transition-transform hover:-translate-y-1 w-20"
                      >
                        <item.Icon className="w-8 h-8 transition-transform group-hover:scale-110 drop-shadow-sm pointer-events-none" />
                        <span className="text-[11px] font-mono text-text-muted group-hover:text-text transition-colors text-center truncate w-full select-none">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </DraggableMarquee>
                </div>

                {/* Languages & Frameworks (Draggable & Auto-scrolling) */}
                <div className="space-y-3">
                  <div className="font-mono text-[11px] text-text-dim uppercase tracking-wider">
                    {locale === "id" ? "BAHASA & KERANGKA KERJA" : "LANGUAGES & FRAMEWORKS"}
                  </div>
                  <DraggableMarquee speed={0.6} direction="left">
                    {[...LANGS_LIST, ...LANGS_LIST, ...LANGS_LIST].map((item, idx) => (
                      <div
                        key={`lang-${idx}`}
                        title={item.name}
                        className="flex flex-col items-center justify-center gap-2 shrink-0 group transition-transform hover:-translate-y-1 w-20"
                      >
                        <item.Icon className="w-8 h-8 transition-transform group-hover:scale-110 drop-shadow-sm pointer-events-none" />
                        <span className="text-[11px] font-mono text-text-muted group-hover:text-text transition-colors text-center truncate w-full select-none">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </DraggableMarquee>
                </div>
              </div>

              {/* ── CARD 3: EXPERIENCE (Borderless & Prominent Title) ── */}
              <div id="experience" className="scroll-mt-6 p-5 sm:p-7 sm:p-9 rounded-sm bg-surface hover:bg-surface-subtle transition-colors space-y-5 shadow-sm">
                <h2 className="font-mono text-lg sm:text-xl font-black tracking-widest text-text uppercase">
                  {locale === "id" ? "PENGALAMAN" : "EXPERIENCE"}
                </h2>

                <div className="space-y-4 font-mono text-xs pt-1">
                  {/* Job 1 */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-text font-bold text-sm">
                      <span>PT Inovasi Informatik Sinergi</span>
                      <span className="text-text-dim text-xs font-normal">
                        {locale === "id" ? "Jul 2026 - Okt 2026" : "Jul 2026 - Oct 2026"}
                      </span>
                    </div>
                    <div className="text-text font-semibold">Security Engineer</div>
                    <p className="font-mono text-text-muted text-xs leading-relaxed pt-0.5">
                      {locale === "id"
                        ? "Mitigasi insiden keamanan, system hardening, continuous server monitoring, dan membuat sistem monitoring."
                        : "Security incident mitigation, system hardening, continuous server monitoring, and developing monitoring systems."}
                    </p>
                  </div>

                  {/* Job 2 */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-text font-bold text-sm">
                      <span>Pentester.ID</span>
                      <span className="text-text-dim text-xs font-normal">
                        {locale === "id" ? "Des 2021 - Sep 2023" : "Dec 2021 - Sep 2023"}
                      </span>
                    </div>
                    <div className="text-text font-semibold">Penetration Tester Intern</div>
                    <p className="font-mono text-text-muted text-xs leading-relaxed pt-0.5">
                      {locale === "id"
                        ? "Reconnaissance jaringan via Nmap, eksploitasi web application, dan asesmen segmentasi keamanan."
                        : "Network reconnaissance via Nmap, web application exploitation, and security segmentation assessments."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CARD 4: CERTIFICATE (Borderless & Prominent Title) ── */}
              <div id="certificate" className="scroll-mt-6 p-5 sm:p-7 sm:p-9 rounded-sm bg-surface hover:bg-surface-subtle transition-colors space-y-5 shadow-sm">
                <h2 className="font-mono text-lg sm:text-xl font-black tracking-widest text-text uppercase">
                  {locale === "id" ? "SERTIFIKAT" : "CERTIFICATES"}
                </h2>

                {/* Draggable & Auto-scrolling Certificate Stream */}
                <DraggableMarquee speed={0.55} direction="left">
                  {CERTIFICATES.map((cert) => (
                    <div
                      key={cert.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedCert(cert)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedCert(cert);
                        }
                      }}
                      className="group flex flex-col text-left bg-base/80 hover:bg-base p-3 rounded-sm transition-all w-64 sm:w-72 shrink-0 cursor-pointer select-none shadow-sm"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface-subtle mb-2.5 relative">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                      <div className="font-heading font-bold text-xs text-text line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                        {cert.title}
                      </div>
                      <div className="font-mono text-[10px] text-text-dim truncate mt-1.5 flex items-center justify-between">
                        <span className="truncate">{cert.issuer}</span>
                        <span className="text-text shrink-0 ml-1 font-semibold">{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </DraggableMarquee>
              </div>

              {/* ── CARD 5: POST (Borderless & Prominent Title) ── */}
              <div id="post" className="scroll-mt-6 p-5 sm:p-7 sm:p-9 rounded-sm bg-surface hover:bg-surface-subtle transition-colors space-y-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-mono text-lg sm:text-xl font-black tracking-widest text-text uppercase">
                    {locale === "id" ? "ARTIKEL" : "POSTS"}
                  </h2>
                  <span className="font-mono text-xs text-text-dim">
                    {POSTS.length} {locale === "id" ? "Artikel" : "Articles"}
                  </span>
                </div>

                {/* Draggable & Auto-scrolling Post Stream (Smooth Horizontal Marquee) */}
                <DraggableMarquee speed={0.5} direction="left">
                  {POSTS.concat(POSTS).map((post, idx) => {
                    const postTitle = typeof post.title === "string" ? post.title : post.title[locale];
                    const postCategory = typeof post.category === "string" ? post.category : post.category[locale];
                    const postSummary = typeof post.summary === "string" ? post.summary : post.summary[locale];
                    const postReadTime = typeof post.readTime === "string" ? post.readTime : post.readTime[locale];

                    return (
                      <Link
                        key={`${post.slug}-${idx}`}
                        href={`/${locale}/post/${post.slug}`}
                        className="group flex flex-col justify-between text-left bg-base/80 hover:bg-base p-4 sm:p-5 rounded-sm transition-all w-80 sm:w-96 min-h-[210px] shrink-0 cursor-pointer select-none shadow-sm border border-transparent hover:border-white/10"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between font-mono text-[10px] text-text-dim">
                            <span className="text-text font-bold uppercase tracking-wider truncate max-w-[200px]">
                              {postCategory}
                            </span>
                            <span className="text-[10px] shrink-0">{postReadTime}</span>
                          </div>

                          <div className="space-y-1.5">
                            <h3 className="font-heading text-sm sm:text-base font-bold text-text group-hover:text-accent transition-colors flex items-center justify-between gap-2 leading-snug">
                              <span className="line-clamp-2">{postTitle}</span>
                              <ArrowUpRight className="w-4 h-4 text-text-dim group-hover:text-accent shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </h3>
                            <p className="text-[11px] sm:text-xs text-text-muted font-mono leading-relaxed line-clamp-3">
                              {postSummary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 font-mono text-xs text-text border-t border-white/5 mt-3">
                          <span className="group-hover:underline font-bold text-[11px]">
                            {locale === "id" ? "Baca Selengkapnya" : "Read Full Post"}
                          </span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </Link>
                    );
                  })}
                </DraggableMarquee>
              </div>
            </section>

            {/* Sticky Side Navigation (Directly beside the Cards on the right - as requested) */}
            <nav
              aria-label="Navigasi Halaman Desktop"
              className="hidden lg:flex flex-col gap-5 sticky top-6 font-mono text-base xl:text-lg select-none shrink-0 w-44 pt-2"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(item.id, e)}
                  className={`transition-all flex items-center gap-3 cursor-pointer py-1.5 group ${
                    activeSection === item.id
                      ? "text-text font-extrabold translate-x-2"
                      : "text-text-muted hover:text-text hover:translate-x-1 font-semibold"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full transition-all shrink-0 ${
                      activeSection === item.id
                        ? "bg-text scale-110 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                        : "bg-transparent border border-text-dim/60 group-hover:bg-text/50"
                    }`}
                  />
                  <span className="tracking-wide">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </main>
      </div>

      {/* Footer (Fixed Footer on Desktop) */}
      <footer className="w-full py-3 sm:py-4 px-4 sm:px-12 font-mono text-xs text-text-muted flex flex-col items-center justify-center gap-1 max-w-7xl mx-auto text-center shrink-0 z-30">
        <div className="text-text font-bold text-sm tracking-wide">Aditya Rahman</div>
        <div className="text-text-muted text-xs tracking-wider">Dev &amp; Sec</div>
      </footer>

      {/* Lightbox Modal for Certificate Preview */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-surface border border-border p-4 sm:p-5 rounded-sm shadow-2xl space-y-3 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-2.5 font-mono text-xs">
              <div className="space-y-0.5">
                <div className="font-heading text-sm sm:text-base font-bold text-text">
                  {selectedCert.title}
                </div>
                <div className="text-text-muted text-[11px]">
                  {selectedCert.issuer} · {selectedCert.date}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1 text-text-muted hover:text-text transition-colors"
                aria-label={locale === "id" ? "Tutup" : "Close"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center min-h-0 bg-base/50 p-2 rounded-sm">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 font-mono text-xs border-t border-border/40">
              <span className="text-[11px] text-text-dim">{selectedCert.category}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/certificate/${selectedCert.slug}`}
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-accent text-base font-bold hover:bg-accent-hover transition-colors text-xs"
                >
                  <span>{locale === "id" ? "Detail Sertifikat" : "Certificate Details"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
