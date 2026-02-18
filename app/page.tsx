import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function Home() {
  const { data: sellers } = await supabaseAdmin
    .from("seller_profiles")
    .select("*")
    .order("is_premium", { ascending: false });

  return (
    <div className="container">
      <h1>Türkiye'nin Premium Uzman Platformu</h1>

      <div className="grid">
        {sellers?.map((seller) => (
          <div key={seller.id} className="card">
            <h3>
              {seller.name}
              {seller.is_premium && (
                <span className="badge">Premium</span>
              )}
            </h3>
            <p>₺{seller.base_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
