export default function HomePage() {
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
          <div className="card">Uzman 1 - ₺2500</div>
          <div className="card">Uzman 2 - ₺1800</div>
          <div className="card">Uzman 3 - ₺3200</div>
        </div>
      </section>
    </div>
  );
}
