export type BookingRange = { from: string; to: string };
export type BookingData = { small: BookingRange[]; large: BookingRange[] };

const DEFAULT: BookingData = { small: [], large: [] };
const KV_KEY = "chaconvilla_bookings";

async function kv() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

export async function getBookings(): Promise<BookingData> {
  if (!process.env.KV_REST_API_URL) return DEFAULT;
  try {
    const store = await kv();
    return (await store.get<BookingData>(KV_KEY)) ?? DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export async function saveBookings(data: BookingData): Promise<void> {
  const store = await kv();
  await store.set(KV_KEY, data);
}
