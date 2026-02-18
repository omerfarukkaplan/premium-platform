import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Paddle webhook geldi:", body);

  if (body.event_type === "transaction.completed") {
    console.log("Premium satın alındı.");
  }

  return NextResponse.json({ success: true });
}
