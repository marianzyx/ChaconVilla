"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setOpen(false);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition",
        scrolled
          ? "bg-[var(--bg)]/80 backdrop-blur border-b border-[var(--border)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="font-semibold tracking-wide">
          Ebro Relax Homes
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#hero" className="text-[var(--muted)] hover:text-[var(--text)] transition">
            {t.nav.home}
          </a>
          <a href="#about" className="text-[var(--muted)] hover:text-[var(--text)] transition">
            {t.nav.about}
          </a>
          <a href="#pricing" className="text-[var(--muted)] hover:text-[var(--text)] transition">
            {t.nav.pricing}
          </a>
          <a href="#gallery" className="text-[var(--muted)] hover:text-[var(--text)] transition">
            {t.nav.gallery}
          </a>
          <a href="#contact" className="text-[var(--muted)] hover:text-[var(--text)] transition">
            {t.nav.contact}
          </a>

          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-[var(--accent)] text-white font-semibold hover:brightness-110 transition"
          >
            {t.nav.cta}
          </a>

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="px-3 py-2 rounded-full border border-[var(--border)] text-sm hover:bg-[var(--bg-2)] transition"
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="md:hidden px-3 py-2 rounded-lg border border-[var(--border)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3 text-sm">
            <a href="#hero" onClick={closeMobile} className="py-2">
              {t.nav.home}
            </a>
            <a href="#about" onClick={closeMobile} className="py-2">
              {t.nav.about}
            </a>
            <a href="#pricing" onClick={closeMobile} className="py-2">
              {t.nav.pricing}
            </a>
            <a href="#gallery" onClick={closeMobile} className="py-2">
              {t.nav.gallery}
            </a>
            <a href="#contact" onClick={closeMobile} className="py-2">
              {t.nav.contact}
            </a>

            <a
              href="#contact"
              onClick={closeMobile}
              className="mt-2 px-4 py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-center"
            >
              {t.nav.cta}
            </a>

            {/* Language toggle mobile */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="mt-2 px-4 py-3 rounded-full border border-[var(--border)] text-center hover:bg-[var(--bg-2)] transition"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
