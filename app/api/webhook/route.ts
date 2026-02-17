import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ÖNEMLİ
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventType = body.event_type;

    // Subscription created veya updated event
    if (eventType === "subscription.created" || eventType === "subscription.updated") {

      const userId = body.data.custom_data?.user_id;

      // 30 gün featured ver
      const featuredUntil = new Date();
      featuredUntil.setDate(featuredUntil.getDate() + 30);

      await supabase
        .from("seller_profiles")
        .update({
          featured_until: featuredUntil.toISOString()
        })
        .eq("user_id", userId);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
