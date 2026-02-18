import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.event_type === "transaction.completed") {
    const sellerId = body.data.custom_data?.seller_id;

    await supabaseAdmin
      .from("seller_profiles")
      .update({
        is_premium: true,
        premium_until: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })
      .eq("id", sellerId);
  }

  return NextResponse.json({ received: true });
}
