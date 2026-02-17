import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage() {
  const { data: featured } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .order("featured_until", { ascending: false })
    .limit(6);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Türkiye'nin Premium Uzman Platformu
        </h1>
        <p className="text-gray-500 mt-6 text-lg">
          En iyi uzmanları keşfet. Güvenli ödeme. Premium görünürlük.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-8">
          🔥 Öne Çıkan Uzmanlar
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featured?.map((seller) => (
            <a
              key={seller.id}
              href={`/uzman/${seller.slug}`}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">
                {seller.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                {seller.city}
              </p>
              <p className="text-indigo-600 font-bold mt-4">
                ₺{seller.price}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
