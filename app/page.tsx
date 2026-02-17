import { createClient } from "@/lib/supabase-server";

export default async function HomePage() {
  const supabase = createClient();

  // FEATURED
  const { data: featured } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .gte("featured_until", new Date().toISOString())
    .order("views", { ascending: false })
    .limit(6);

  // NEW SELLERS
  const { data: newSellers } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);

  // CATEGORIES
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .limit(8);

  // BLOG
  const { data: blog } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">

      {/* HERO */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold">
          Türkiye'nin Premium Uzman Platformu
        </h1>
        <p className="text-gray-600">
          Online ders, spor, freelancer ve danışmanları keşfet.
        </p>
      </section>

      {/* FEATURED */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🔥 Öne Çıkan Uzmanlar</h2>
        <div className="grid grid-cols-3 gap-6">
          {featured?.map((seller) => (
            <div key={seller.id} className="p-4 bg-white shadow rounded">
              <h3 className="font-semibold">{seller.title}</h3>
              <p>{seller.city}</p>
              <p className="text-sm text-gray-500">{seller.price}₺</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Kategoriler</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories?.map((cat) => (
            <div key={cat.id} className="p-4 bg-gray-100 rounded">
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      {/* NEW SELLERS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Yeni Uzmanlar</h2>
        <div className="grid grid-cols-3 gap-6">
          {newSellers?.map((seller) => (
            <div key={seller.id} className="p-4 bg-white shadow rounded">
              <h3 className="font-semibold">{seller.title}</h3>
              <p>{seller.city}</p>
              <p className="text-sm text-gray-500">{seller.price}₺</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Blog</h2>
        <div className="grid grid-cols-3 gap-6">
          {blog?.map((post) => (
            <div key={post.id} className="p-4 bg-white shadow rounded">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {post.meta_description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
