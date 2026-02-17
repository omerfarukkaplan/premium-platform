import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  if (body.event_type === "transaction.completed") {
    const sellerId = body.data.custom_data.seller_id;

    await supabase
      .from("seller_profiles")
      .update({
        featured_until: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        is_active: true,
      })
      .eq("id", sellerId);
  }

  return NextResponse.json({ success: true });
}
