"use client";

export default function SellerPage() {
  const handleUpgrade = () => {
    // @ts-ignore
    window.Paddle.Checkout.open({
      items: [{ priceId: "PRI_XXXXXXX" }],
      customData: {
        seller_id: "SELLER_UUID_BURAYA",
      },
      settings: {
        displayMode: "overlay",
      },
    });
  };

  return (
    <div className="container">
      <h1>Satıcı Paneli</h1>

      <div className="card glass">
        <h2>Premium'a Geç</h2>
        <p>En üstte çık. Daha fazla müşteri al.</p>

        <button className="btn-primary" onClick={handleUpgrade}>
          Premium Satın Al
        </button>
      </div>
    </div>
  );
}
