import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (body.event_type === "transaction.completed") {
    const sellerId = body.data?.custom_data?.seller_id;

    if (sellerId) {
      await supabase
        .from("seller_profiles")
        .update({
          is_premium: true,
          premium_until: new Date(Date.now() + 30 * 86400000),
          featured_score: 100,
        })
        .eq("id", sellerId);
    }
  }

  return NextResponse.json({ success: true });
}
