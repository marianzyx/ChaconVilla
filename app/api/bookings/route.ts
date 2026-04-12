import { NextRequest, NextResponse } from "next/server";
import { getBookings, saveBookings } from "../../../lib/storage";

export async function GET() {
  return NextResponse.json(await getBookings());
}

export async function POST(req: NextRequest) {
  await saveBookings(await req.json());
  return NextResponse.json({ ok: true });
}
