import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const { data } = await supabase
    .from("seller_profiles")
    .select("*")
    .ilike("title", `%${q}%`)
    .eq("is_active", true);

  return NextResponse.json(data);
}
