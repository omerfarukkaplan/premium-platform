"use client";

export default function SellerPage() {

  const handleUpgrade = () => {
    // @ts-ignore
    window.Paddle.Checkout.open({
      items: [{ priceId: "PRI_XXXXXXX" }],
      settings: {
        displayMode: "overlay",
      },
    });
  };

  return (
    <div className="container">
      <h1>Satıcı Paneli</h1>

      <div className="card">
        <h2>Premium Ol</h2>
        <p>En üstte çık. Daha fazla müşteri al.</p>

        <button className="btn-primary" onClick={handleUpgrade}>
          Premium'a Geç
        </button>
      </div>
    </div>
  );
}
