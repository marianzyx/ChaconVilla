"use client";

import { useState, useEffect } from "react";

type BookingRange = { from: string; to: string };
type BookingData = { small: BookingRange[]; large: BookingRange[] };
type House = "small" | "large";

const HOUSES: { key: House; label: string; cap: string }[] = [
  { key: "small", label: "Casa mică", cap: "până la 4 persoane" },
  { key: "large", label: "Casa mare", cap: "până la 6 persoane" },
];

function formatDisplay(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function AdminPanel() {
  const [bookings, setBookings] = useState<BookingData>({ small: [], large: [] });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saved" | "error">("");
  const [form, setForm] = useState<Record<House, { from: string; to: string }>>({
    small: { from: "", to: "" },
    large: { from: "", to: "" },
  });

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function persist(data: BookingData) {
    setSaving(true);
    setSaveStatus("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaveStatus(res.ok ? "saved" : "error");
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(""), 3000);
    }
  }

  function addBooking(house: House) {
    const { from, to } = form[house];
    if (!from || !to || from > to) return;
    const updated: BookingData = {
      ...bookings,
      [house]: [...bookings[house], { from, to }].sort((a, b) =>
        a.from.localeCompare(b.from)
      ),
    };
    setBookings(updated);
    setForm((f) => ({ ...f, [house]: { from: "", to: "" } }));
    persist(updated);
  }

  function deleteBooking(house: House, index: number) {
    const updated: BookingData = {
      ...bookings,
      [house]: bookings[house].filter((_, i) => i !== index),
    };
    setBookings(updated);
    persist(updated);
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-(--muted)">Se încarcă…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg) px-6 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold">Ebro Relax Homes — Rezervări</h1>
          <div className="text-sm">
            {saving && <span className="text-(--muted)">Se salvează…</span>}
            {saveStatus === "saved" && <span className="text-green-600">Salvat ✓</span>}
            {saveStatus === "error" && <span className="text-red-500">Eroare — încearcă din nou</span>}
          </div>
        </div>

        {/* One card per house */}
        <div className="space-y-8">
          {HOUSES.map(({ key, label, cap }) => {
            const { from, to } = form[key];
            const dateError = from && to && from > to;

            return (
              <div
                key={key}
                className="rounded-2xl border border-(--border) bg-(--bg-2) p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold mb-1">{label}</h2>
                <p className="text-sm text-(--muted) mb-6">{cap}</p>

                {/* Current bookings */}
                <p className="text-sm font-medium mb-3">Rezervări active</p>
                {bookings[key].length === 0 ? (
                  <p className="text-sm text-(--muted) italic mb-6">
                    Nicio rezervare adăugată.
                  </p>
                ) : (
                  <ul className="space-y-2 mb-6">
                    {bookings[key].map((b, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between rounded-xl border border-(--border) bg-(--bg) px-4 py-3"
                      >
                        <span className="text-sm font-medium">
                          {formatDisplay(b.from)} → {formatDisplay(b.to)}
                        </span>
                        <button
                          onClick={() => deleteBooking(key, i)}
                          className="text-sm text-red-500 hover:text-red-700 transition ml-6 shrink-0"
                        >
                          Șterge
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Add new booking */}
                <p className="text-sm font-medium mb-3">Adaugă rezervare nouă</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-(--muted) mb-1">
                      De la
                    </label>
                    <input
                      type="date"
                      value={from}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          [key]: { ...f[key], from: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 outline-none focus:ring-2 focus:ring-(--accent)"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-(--muted) mb-1">
                      Până la
                    </label>
                    <input
                      type="date"
                      value={to}
                      min={from}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          [key]: { ...f[key], to: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 outline-none focus:ring-2 focus:ring-(--accent)"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => addBooking(key)}
                      disabled={!from || !to || !!dateError}
                      className="w-full sm:w-auto px-5 py-3 rounded-full bg-(--accent) text-white font-semibold hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Adaugă
                    </button>
                  </div>
                </div>
                {dateError && (
                  <p className="text-xs text-red-500 mt-2">
                    Data de început trebuie să fie înainte de data de sfârșit.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-(--muted) mt-12">
          Modificările se salvează automat și apar imediat pe site.
        </p>
      </div>
    </div>
  );
}
