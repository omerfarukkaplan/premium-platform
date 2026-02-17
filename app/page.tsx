import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function HomePage() {
  const { data: featured } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .gt("featured_until", new Date().toISOString())
    .order("featured_until", { ascending: false })
    .limit(6)

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .limit(6)

  const { data: newSellers } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6)

  const { data: blogs } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <main className="max-w-6xl mx-auto px-6">

      {/* HERO */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Türkiye'nin Premium Uzman Platformu
        </h1>
        <p className="text-gray-600 mb-8">
          Online ders, spor, freelancer ve danışmanları keşfet.
        </p>
      </section>

      {/* FEATURED */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">🔥 Öne Çıkan Uzmanlar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured?.map((seller) => (
            <div key={seller.id} className="p-6 border rounded-xl shadow">
              <h3 className="font-bold text-lg">{seller.title}</h3>
              <p className="text-sm text-gray-600">{seller.city}</p>
              <p className="mt-2 text-blue-600 font-semibold">
                ₺{seller.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Kategoriler</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories?.map((cat) => (
            <div key={cat.id} className="p-6 border rounded-xl">
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      {/* NEW SELLERS */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Yeni Uzmanlar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {newSellers?.map((seller) => (
            <div key={seller.id} className="p-6 border rounded-xl">
              <h3 className="font-bold">{seller.title}</h3>
              <p className="text-sm text-gray-500">{seller.city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Blog</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <div key={blog.id} className="p-6 border rounded-xl">
              <h3 className="font-bold">{blog.title}</h3>
              <p className="text-sm text-gray-600">
                {blog.meta_description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 border-t">
        <h2 className="text-2xl font-bold mb-4">
          Uzman mısın? Hemen Katıl
        </h2>
        <p className="text-gray-600 mb-6">
          Profil oluştur, müşteri kazanmaya başla.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Uzman Ol
        </button>
      </section>

    </main>
  )
}
