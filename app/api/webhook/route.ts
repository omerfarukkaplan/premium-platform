import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Paddle ödeme başarılıysa
    if (body.event_type === "transaction.completed") {
      const sellerId = body.data?.custom_data?.seller_id

      if (!sellerId) {
        return NextResponse.json({ error: "seller_id missing" })
      }

      const expires = new Date()
      expires.setDate(expires.getDate() + 7)

      await supabase
        .from("seller_profiles")
        .update({
          featured_until: expires.toISOString()
        })
        .eq("id", sellerId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
