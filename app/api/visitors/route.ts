import { NextResponse } from "next/server";
import { incrementVisitors, getVisitorStats } from "@/lib/storage";

export async function GET() {
  const stats = await getVisitorStats();
  return NextResponse.json(stats);
}

export async function POST() {
  await incrementVisitors();
  return NextResponse.json({ ok: true });
}
