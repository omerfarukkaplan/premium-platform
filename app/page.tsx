import { createClient } from "@supabase/supabase-js";

export default async function HomePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: sellers } = await supabase
    .from("seller_profiles")
    .select("*")
    .order("is_premium", { ascending: false })
    .order("featured_score", { ascending: false })
    .limit(6);

  return (
    <div className="container hero">
      <h1>Türkiye'nin Premium Uzman Platformu</h1>
      <p>En iyi uzmanları keşfet. Güvenli ödeme. Premium görünürlük.</p>

      <div className="search-box">
        <input placeholder="Uzman ara..." />
        <button>Ara</button>
      </div>

      <section className="featured">
        <h2>🔥 Öne Çıkan Uzmanlar</h2>

        <div className="grid">
          {sellers?.map((s) => (
            <div key={s.id} className="card glass">
              <h3>{s.name}</h3>
              <p>₺{s.price}</p>
              {s.is_premium && <span className="badge">Premium</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
