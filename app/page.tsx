import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const dynamic = "force-dynamic"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const metadata = {
  title: "Türkiye'nin Premium Uzman Platformu",
  description: "Online ders, spor, freelancer ve danışmanlık hizmetlerini keşfet."
}

export default async function HomePage() {

  // 🔥 Featured Uzmanlar
  const { data: featured } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .gt("featured_until", new Date().toISOString())
    .order("views", { ascending: false })
    .limit(6)

  // 🆕 Yeni Uzmanlar
  const { data: latest } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6)

  // 📂 Kategoriler
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .limit(8)

  // 📝 Blog
  const { data: blog } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <main className="bg-gray-50">

      {/* 1️⃣ HERO + SEARCH */}
      <section className="py-20 text-center bg-white">
        <h1 className="text-4xl font-bold">
          Türkiye'nin Premium Uzman Platformu
        </h1>
        <p className="text-gray-600 mt-4">
          Online ders, spor, freelancer ve danışmanları keşfet.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <input
            placeholder="Uzman ara..."
            className="px-4 py-3 border rounded w-80"
          />
          <button className="bg-black text-white px-6 py-3 rounded">
            Ara
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Link href="/uzman-ol" className="px-6 py-3 bg-black text-white rounded">
            Uzman Ol
          </Link>
          <Link href="/premium" className="px-6 py-3 border rounded">
            Premium Öne Çık
          </Link>
        </div>
      </section>

      {/* 2️⃣ FEATURED */}
      <section className="py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">🔥 Premium Uzmanlar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured?.map((item) => (
            <Link key={item.id} href={`/uzman/${item.slug}`}>
              <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500">{item.city}</p>
                <p className="mt-2 font-bold">{item.price}₺</p>
                <span className="text-xs text-yellow-600">⭐ Premium</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3️⃣ KATEGORİLER */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Kategoriler</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {categories?.map((cat) => (
              <Link key={cat.id} href={`/kategori/${cat.slug}`}>
                <div className="p-6 border rounded text-center hover:bg-gray-100">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ YENİ UZMANLAR */}
      <section className="py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Yeni Uzmanlar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {latest?.map((item) => (
            <Link key={item.id} href={`/uzman/${item.slug}`}>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.city}</p>
                <p className="mt-2">{item.price}₺</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5️⃣ NASIL ÇALIŞIR */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-10">Nasıl Çalışır?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="font-semibold text-lg">1. Uzmanı Bul</h3>
            <p className="text-gray-600 mt-2">Kategori veya arama ile keşfet.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">2. İletişime Geç</h3>
            <p className="text-gray-600 mt-2">Talep gönder, teklif al.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">3. Anlaş</h3>
            <p className="text-gray-600 mt-2">Hizmeti başlat.</p>
          </div>
        </div>
      </section>

      {/* 6️⃣ BLOG */}
      <section className="py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Blog</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blog?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-500 mt-2">
                  {post.meta_description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7️⃣ SATIŞ CTA */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl font-bold">
          Günde 10+ müşteri talebi almaya başla
        </h2>
        <div className="mt-6">
          <Link href="/premium" className="bg-white text-black px-8 py-3 rounded">
            Premium Satın Al
          </Link>
        </div>
      </section>

      {/* 8️⃣ FOOTER */}
      <footer className="py-10 bg-gray-900 text-gray-400 text-center">
        <p>© {new Date().getFullYear()} FollowOps</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/blog">Blog</Link>
          <Link href="/kategori">Kategoriler</Link>
          <Link href="/iletisim">İletişim</Link>
        </div>
      </footer>

    </main>
  )
}
