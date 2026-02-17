import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  if (body.event_type === "subscription.created") {
    await supabase.from("subscriptions").insert({
      user_id: body.data.custom_data.user_id,
      paddle_subscription_id: body.data.id,
      status: "active"
    });
  }

  if (body.event_type === "transaction.completed") {
    await supabase.rpc("set_featured", {
      days: 7,
      uid: body.data.custom_data.user_id
    });
  }

  return NextResponse.json({ ok: true });
}
