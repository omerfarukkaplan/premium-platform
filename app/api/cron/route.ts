import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  await supabaseAdmin
    .from("seller_profiles")
    .update({ is_premium: false })
    .lt("premium_until", new Date().toISOString());

  return NextResponse.json({ ok: true });
}
