"use client";

import { useEffect, useState } from "react";

type Seller = {
  id: string;
  title: string;
  price: number;
  is_premium: boolean;
  premium_until: string | null;
  featured_score: number;
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Seller[]>([]);
  const [featured, setFeatured] = useState<Seller[]>([]);

  // 🔥 FEATURED ALGORİTMA
  const fetchFeatured = async () => {
    const res = await fetch("/api/search?q=");
    const data = await res.json();

    const sorted = data.sort((a: Seller, b: Seller) => {
      const aPremium = a.is_premium && new Date(a.premium_until || "") > new Date();
      const bPremium = b.is_premium && new Date(b.premium_until || "") > new Date();

      if (aPremium && !bPremium) return -1;
      if (!aPremium && bPremium) return 1;

      return (b.featured_score || 0) - (a.featured_score || 0);
    });

    setFeatured(sorted.slice(0, 6));
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  // 🔎 GERÇEK ARAMA
  const handleSearch = async () => {
    if (!query) return fetchFeatured();

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="main-container">
      {/* HERO */}
      <section className="hero glass">
        <h1>Türkiye'nin Premium Uzman Platformu</h1>
        <p>En iyi uzmanları keşfet. Güvenli ödeme. Premium görünürlük.</p>

        <div className="search-box">
          <input
            placeholder="Uzman ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Ara</button>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>🔥 Öne Çıkan Uzmanlar</h2>
        <div className="grid">
          {(query ? results : featured).map((seller) => (
            <div key={seller.id} className="card glass">
              <h3>{seller.title}</h3>
              <p className="price">₺{seller.price}</p>

              {seller.is_premium && (
                <span className="premium-badge">PREMIUM</span>
              )}

              <a href={`/uzman/${seller.id}`} className="btn">
                Profili Gör
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* KATEGORİLER */}
      <section className="categories">
        <h2>Kategoriler</h2>
        <div className="grid">
          <a href="/kategori/yazilim" className="card">Yazılım</a>
          <a href="/kategori/spor" className="card">Spor</a>
          <a href="/kategori/danismanlik" className="card">Danışmanlık</a>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog">
        <h2>Blog</h2>
        <a href="/blog" className="btn-secondary">Tüm Yazılar</a>
      </section>
    </div>
  );
}
