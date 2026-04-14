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

// --- Visitor tracking ---

function todayKey(): string {
  return `chaconvilla_visitors_${new Date().toISOString().slice(0, 10)}`;
}

export async function incrementVisitors(): Promise<void> {
  if (!process.env.KV_REST_API_URL) return;
  try {
    const store = await kv();
    const key = todayKey();
    await store.incr(key);
    await store.expire(key, 60 * 60 * 24 * 30);
  } catch {
    // silently ignore tracking errors
  }
}

export async function getVisitorStats(): Promise<{ today: number; yesterday: number }> {
  if (!process.env.KV_REST_API_URL) return { today: 0, yesterday: 0 };
  try {
    const store = await kv();
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const yest = new Date(now);
    yest.setDate(yest.getDate() - 1);
    const yesterdayStr = yest.toISOString().slice(0, 10);

    const [t, y] = await Promise.all([
      store.get<number>(`chaconvilla_visitors_${todayStr}`),
      store.get<number>(`chaconvilla_visitors_${yesterdayStr}`),
    ]);
    return { today: t ?? 0, yesterday: y ?? 0 };
  } catch {
    return { today: 0, yesterday: 0 };
  }
}
