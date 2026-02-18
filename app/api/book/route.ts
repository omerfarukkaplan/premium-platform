import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json();

  await supabaseAdmin.from("bookings").insert({
    seller_id: body.sellerId,
    user_id: body.userId,
    date: body.date,
    status: "pending",
  });

  return NextResponse.json({ ok: true });
}
