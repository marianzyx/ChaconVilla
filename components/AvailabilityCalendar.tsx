"use client";

import { useState, useEffect, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isBefore,
  parseISO,
  format,
} from "date-fns";
import { enUS, es, type Locale } from "date-fns/locale";
import { useLanguage } from "./LanguageProvider";

type House = "small" | "large";
type Interval = { start: Date; end: Date };
type BookingData = { small: { from: string; to: string }[]; large: { from: string; to: string }[] };

const today = new Date();

const WEEK_DAYS = eachDayOfInterval({
  start: startOfWeek(today, { weekStartsOn: 1 }),
  end: endOfWeek(today, { weekStartsOn: 1 }),
});

function toIntervals(ranges: { from: string; to: string }[]): Interval[] {
  return ranges.map(({ from, to }) => ({ start: parseISO(from), end: parseISO(to) }));
}

function CalendarMonth({
  baseDate,
  intervals,
  locale,
}: {
  baseDate: Date;
  intervals: Interval[];
  locale: Locale;
}) {
  const monthStart = startOfMonth(baseDate);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(baseDate), { weekStartsOn: 1 }),
  });

  return (
    <div className="w-full min-w-65">
      <p className="text-base font-semibold mb-3 text-center">
        {format(baseDate, "MMMM yyyy", { locale })}
      </p>

      <div className="grid grid-cols-7 mb-1">
        {WEEK_DAYS.map((d) => (
          <div key={d.toISOString()} className="text-center text-xs font-medium text-(--muted) py-1">
            {format(d, "EEEEE", { locale })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day) => {
          const inMonth = isSameMonth(day, baseDate);
          const past = isBefore(day, today) && !isSameDay(day, today);
          const booked = inMonth && intervals.some((iv) => isWithinInterval(day, iv));
          const isToday = isSameDay(day, today);

          let cls = "aspect-square flex items-center justify-center text-sm rounded-full select-none";
          if (!inMonth)       cls += " invisible";
          else if (past)      cls += " text-(--muted) opacity-30";
          else if (booked)    cls += " bg-(--border) text-(--muted) line-through";
          else if (isToday)   cls += " ring-2 ring-(--accent) font-semibold";
          else                cls += " font-medium";

          return (
            <div key={day.toISOString()} className={cls}>
              {inMonth ? format(day, "d") : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const HOUSES: { key: House; label: (t: ReturnType<typeof useLanguage>["t"]) => string }[] = [
  { key: "small", label: (t) => t.pricing.smallTitle },
  { key: "large", label: (t) => t.pricing.largeTitle },
];

export default function AvailabilityCalendar() {
  const { t, lang } = useLanguage();
  const [house, setHouse] = useState<House>("small");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<BookingData>({ small: [], large: [] });

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const locale = lang === "es" ? es : enUS;
  const intervals = useMemo(() => toIntervals(data[house]), [data, house]);

  return (
    <div>
      <div className="flex gap-2 mb-8">
        {HOUSES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setHouse(key)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              house === key
                ? "bg-(--accent) text-white border-(--accent)"
                : "border-(--border) hover:bg-(--bg-2)"
            }`}
          >
            {label(t)}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-10">
        <CalendarMonth baseDate={addMonths(today, offset)} intervals={intervals} locale={locale} />
        <CalendarMonth baseDate={addMonths(today, offset + 1)} intervals={intervals} locale={locale} />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset === 0}
          className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center hover:bg-(--bg-2) transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous months"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center hover:bg-(--bg-2) transition"
          aria-label="Next months"
        >
          ›
        </button>
      </div>

      <div className="flex gap-6 mt-5 text-sm text-(--muted)">
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-(--accent)" />
          {t.availability.available}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-(--border)" />
          {t.availability.booked}
        </span>
      </div>
    </div>
  );
}
