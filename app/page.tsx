"use client";

import { useEffect, useState } from "react";

type Seller = {
  id: string;
  title: string;
  price: number;
  category: string;
  is_premium: boolean;
  premium_until: string | null;
  rating: number;
  sales: number;
  response_time: number;
};

export default function HomePage() {
  const [data, setData] = useState<Seller[]>([]);
  const [filtered, setFiltered] = useState<Seller[]>([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/search?q=");
    const sellers = await res.json();

    // 🔥 AI FEATURE SCORE
    const scored = sellers.map((s: Seller) => ({
      ...s,
      ai_score:
        s.rating * 2 +
        s.sales * 0.5 -
        s.response_time * 0.2 +
        (s.is_premium ? 50 : 0),
    }));

    scored.sort((a: any, b: any) => b.ai_score - a.ai_score);

    setData(scored);
    setFiltered(scored);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
    if (cat === "all") return setFiltered(data);
    setFiltered(data.filter((s) => s.category === cat));
  };

  return (
    <div className="apple-container">
      <section className="hero-apple">
        <h1>Türkiye'nin Premium Uzman Platformu</h1>
        <p>Kalite. Güven. Prestij.</p>
      </section>

      <section className="categories-filter">
        {["all", "yazilim", "spor", "danismanlik"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => handleCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </section>

      <section className="grid-apple">
        {filtered.map((seller) => (
          <div key={seller.id} className="card-apple">
            {seller.is_premium && (
              <span className="premium-badge">PREMIUM</span>
            )}

            <h3>{seller.title}</h3>
            <p>₺{seller.price}</p>
            <a href={`/uzman/${seller.id}`}>Detay</a>
          </div>
        ))}
      </section>
    </div>
  );
}
