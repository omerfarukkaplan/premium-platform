import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔥 PREMIUM ÖDEME
    if (body.event_type === "transaction.completed") {
      const sellerId = body.data.custom_data?.seller_id;

      if (sellerId) {
        await supabase
          .from("seller_profiles")
          .update({
            is_premium: true,
            premium_until: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
          })
          .eq("id", sellerId);
      }
    }

    // 🔥 ABONELİK
    if (body.event_type === "subscription.activated") {
      const sellerId = body.data.custom_data?.seller_id;

      if (sellerId) {
        await supabase
          .from("seller_profiles")
          .update({
            subscription_active: true,
          })
          .eq("id", sellerId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
