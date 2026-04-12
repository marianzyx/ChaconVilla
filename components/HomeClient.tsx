"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LanguageProvider, useLanguage } from "./LanguageProvider";
import {useState} from "react";
import HousePhotosModal from "./HousePhotosModal";
import AvailabilityCalendar from "./AvailabilityCalendar";


function HomeContent() {
  const { t } = useLanguage();
  const [openSmall, setOpenSmall] = useState(false);
const [openLarge, setOpenLarge] = useState(false);

// Placeholder images (you will replace them later)
const smallInteriorImages = [
  { src: "/images/interiors/small-1.jpg", alt: "Small house interior photo 1" },
  { src: "/images/interiors/small-2.jpg", alt: "Small house interior photo 2" },
  { src: "/images/interiors/small-3.jpg", alt: "Small house interior photo 3" },
];

const largeInteriorImages = [
  { src: "/images/interiors/large1.jpg", alt: "Large house - master bedroom" },
  { src: "/images/interiors/large2.jpg", alt: "Large house - bathroom" },
  { src: "/images/interiors/large3.jpg", alt: "Large house - twin bedroom" },
  { src: "/images/interiors/large4.jpg", alt: "Large house - living and kitchen" },
  { src: "/images/interiors/large5.jpg", alt: "Large house - dining area" },
  { src: "/images/interiors/large6.jpg", alt: "Large house - exterior" },
  { src: "/images/interiors/large7.jpg", alt: "Large house - toilet" },
];


  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section
        id="hero"
        className="relative isolate min-h-screen overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src="/images/hero/hero.png"
              alt="Sunset on the Ebro River near Caspe"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />

        <div className="relative z-20 w-full">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/85 mb-10">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:brightness-110 transition shadow-sm"
              >
                {t.hero.cta1}
              </a>

              <a
                href="#gallery"
                className="px-6 py-3 rounded-full border border-white/45 text-white hover:bg-white/10 transition backdrop-blur-sm"
              >
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl mb-6">{t.about.title}</h2>

              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                {t.about.p1}
              </p>

              <p className="text-[var(--muted)] mb-8 leading-relaxed">
                {t.about.p2}
              </p>

              <ul className="space-y-3 text-[var(--text)]">
                <li className="text-[var(--muted)]">{t.about.li1}</li>
                <li className="text-[var(--muted)]">{t.about.li2}</li>
                <li className="text-[var(--muted)]">{t.about.li3}</li>
                <li className="text-[var(--muted)]">{t.about.li4}</li>
              </ul>
            </div>

            <div className="md:w-1/2">
              <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/about/about.jpg"
                  alt="Accommodation near Playas de Chacón"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & SERVICES */}
      <section id="area" className="py-24 px-6 bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">{t.services.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="text-lg font-semibold mb-2">{t.services.c1t}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {t.services.c1p}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="text-lg font-semibold mb-2">{t.services.c2t}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {t.services.c2p}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="text-lg font-semibold mb-2">{t.services.c3t}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {t.services.c3p}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="text-lg font-semibold mb-2">{t.services.c4t}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {t.services.c4p}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">{t.pricing.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* SMALL */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-6 md:p-8">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {t.pricing.smallTitle}{" "}
                    <span className="text-base font-normal text-[var(--muted)]">
                      – {t.pricing.smallCap}
                    </span>
                  </h3>
                  <p className="text-[var(--muted)]">
                    Fully furnished, private bathroom and bedrooms.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-[var(--muted)]">{t.pricing.standard}</p>
                  <p className="text-4xl font-semibold">
                    €110{" "}
                    <span className="text-base font-normal text-[var(--muted)]">
                      {t.pricing.perNight}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--muted)]">{t.pricing.min2}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="text-xs text-[var(--muted)]">{t.pricing.weekend}</p>
                  <p className="text-lg font-semibold">€260</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="text-xs text-[var(--muted)]">{t.pricing.minStay}</p>
                  <p className="text-lg font-semibold">2</p>
                </div>
              </div>
              <div className="mt-6">
  <button
    type="button"
    onClick={() => setOpenSmall(true)}
    className="px-5 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--bg)] transition"
  >
    {t.pricing.smallInteriorTitle}
  </button>
</div>
            </div>
            
            

            {/* LARGE */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-6 md:p-8">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {t.pricing.largeTitle}{" "}
                    <span className="text-base font-normal text-[var(--muted)]">
                      – {t.pricing.largeCap}
                    </span>
                  </h3>
                  <p className="text-[var(--muted)]">
                    More space, fully furnished, private bathroom and bedrooms.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-[var(--muted)]">{t.pricing.standard}</p>
                  <p className="text-4xl font-semibold">
                    €130{" "}
                    <span className="text-base font-normal text-[var(--muted)]">
                      {t.pricing.perNight}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--muted)]">{t.pricing.min3}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="text-xs text-[var(--muted)]">{t.pricing.weekend}</p>
                  <p className="text-lg font-semibold">€300</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="text-xs text-[var(--muted)]">{t.pricing.minStay}</p>
                  <p className="text-lg font-semibold">3</p>
                </div>
              </div>
              <div className="mt-6">
<div className="mt-6">
  <button
    type="button"
    onClick={() => setOpenLarge(true)}
    className="px-5 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--bg)] transition"
  >
    {t.pricing.largeInteriorTitle}
  </button>
</div>

</div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-2">{t.pricing.includedTitle}</h3>
              <p className="text-sm text-[var(--muted)] mb-6">{t.pricing.includedSubtitle}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.pool}</div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.gazebo}</div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.wifi}</div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.parking}</div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.furnished}</div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.bathroom}</div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">{t.pricing.petFriendly}</div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:brightness-110 transition text-center"
                >
                  {t.nav.cta}
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full border border-[var(--border)] hover:bg-[var(--bg-2)] transition text-center"
                >
                  {t.pricing.askOffer}
                </a>
              </div>
            </div>
            

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-2">{t.pricing.extrasTitle}</h3>
              <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
                {t.pricing.extrasSubtitle}
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>
                    <span className="font-semibold">{t.pricing.smallBoat}</span>{" "}
                    <span className="text-[var(--muted)]">({t.pricing.rods})</span>
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>
                    <span className="font-semibold">{t.pricing.largeBoat}</span>{" "}
                    <span className="text-[var(--muted)]">({t.pricing.rods})</span>
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>
                    <span className="font-semibold">{t.pricing.gear}</span>
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>
                    <span className="font-semibold">{t.pricing.airport}</span>
                  </span>
                </li>
              </ul>

              <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {t.pricing.extrasNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABILITY */}
      <section id="availability" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">{t.availability.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">{t.availability.subtitle}</p>
          </div>
          <AvailabilityCalendar />
        </div>
      </section>

      {/* GALLERY (placeholder) */}
      <section id="gallery" className="py-24 px-6 bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl mb-4">{t.gallery.title}</h2>
          <p className="text-[var(--muted)]">{t.gallery.subtitle}</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">{t.contact.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a
                  href="tel:+34617266646"
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-5 hover:brightness-[0.98] transition"
                >
                  <p className="text-sm text-[var(--muted)] mb-2">{t.contact.phone}</p>
                  <p className="text-xl font-semibold">+34 617 266 646</p>
                  <p className="text-sm text-[var(--muted)] mt-2">{t.contact.tapToCall}</p>
                </a>

                <a
                  href="https://wa.me/34617266646"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-5 hover:brightness-[0.98] transition"
                >
                  <p className="text-sm text-[var(--muted)] mb-2">{t.contact.whatsapp}</p>
                  <p className="text-xl font-semibold">{t.contact.messageUs}</p>
                  <p className="text-sm text-[var(--muted)] mt-2">{t.contact.fastReplies}</p>
                </a>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{t.contact.sendTitle}</h3>
                <p className="text-sm text-[var(--muted)] mb-6">{t.contact.sendSubtitle}</p>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" htmlFor="name">
                        {t.contact.name}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t.contact.placeholderName}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-2)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2" htmlFor="email">
                        {t.contact.email}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t.contact.placeholderEmail}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-2)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" htmlFor="message">
                      {t.contact.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t.contact.placeholderMsg}
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-2)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold hover:brightness-110 transition"
                  >
                    {t.contact.sendBtn}
                  </button>

                  <p className="text-xs text-[var(--muted)]">{t.contact.consent}</p>
                </form>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
              <div className="p-6 md:p-8 border-b border-[var(--border)]">
                <h3 className="text-xl font-semibold mb-2">{t.contact.locationTitle}</h3>
                <p className="text-sm text-[var(--muted)]">
                  {t.contact.locationSubtitle}
                </p>
              </div>

              <div className="relative w-full h-[420px]">
                <iframe
                  title="Map - Playas de Chacón"
                  src="https://www.google.com/maps?q=Playas%20de%20Chac%C3%B3n%2C%20Caspe%2C%20Zaragoza&output=embed"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
<HousePhotosModal
  open={openSmall}
  title="Small house - interior"
  images={smallInteriorImages}
  onClose={() => setOpenSmall(false)}
/>

<HousePhotosModal
  open={openLarge}
  title="Large house - interior"
  images={largeInteriorImages}
  onClose={() => setOpenLarge(false)}
/>

      <Footer />
    </main>
  );
}

export default function HomeClient() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
