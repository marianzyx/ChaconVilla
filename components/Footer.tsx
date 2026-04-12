"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-(--border) bg-(--bg)">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-semibold text-lg">Ebro Relax Homes</p>
            <p className="text-sm text-(--muted) mt-3 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <p className="font-semibold mb-4">{t.footer.quickLinks}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="text-(--muted) hover:text-(--text) transition">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="text-(--muted) hover:text-(--text) transition">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-(--muted) hover:text-(--text) transition">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-(--muted) hover:text-(--text) transition">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-4">{t.contact.title}</p>

            <div className="space-y-3 text-sm">
              <a
                href="tel:+34617266646"
                className="block text-(--muted) hover:text-(--text) transition"
              >
                {t.contact.phone}: +34 617 266 646
              </a>

              <a
                href="https://wa.me/34617266646"
                target="_blank"
                rel="noreferrer"
                className="block text-(--muted) hover:text-(--text) transition"
              >
                WhatsApp: {t.contact.messageUs}
              </a>

              <p className="text-(--muted)">
                Playas de Chacón, Caspe (Zaragoza)
              </p>
            </div>

            <a
              href="#hero"
              className="inline-flex mt-6 px-4 py-2 rounded-full border border-(--border) text-sm hover:bg-(--bg-2) transition"
            >
              {t.footer.backToTop}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-(--border) flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-(--muted)">
            © {new Date().getFullYear()} Ebro Relax Homes. {t.footer.rights}
          </p>

          <p className="text-xs text-(--muted)">{t.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
