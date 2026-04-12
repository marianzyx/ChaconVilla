/**
 * DISPONIBILITATE — editează manual acest fișier pentru a marca datele rezervate.
 *
 * Adaugă intervale în format "YYYY-MM-DD".
 * Exemplu: { from: "2026-06-01", to: "2026-06-05" }
 *
 * Datele marcate aici vor apărea ca REZERVATE în calendar.
 * Zilele nemarcate sunt considerate DISPONIBILE.
 */

export const bookedRanges: {
  small: { from: string; to: string }[];
  large: { from: string; to: string }[];
} = {
  // Casa mică (până la 4 persoane)
  small: [
    // { from: "2026-05-01", to: "2026-05-04" },
    // { from: "2026-05-17", to: "2026-05-19" },
  ],

  // Casa mare (până la 6 persoane)
  large: [
    // { from: "2026-05-10", to: "2026-05-13" },
  ],
};
