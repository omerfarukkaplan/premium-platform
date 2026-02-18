"use client";

export default function PremiumModal({ sellerId }: any) {
  const handleCheckout = () => {
    // @ts-ignore
    window.Paddle.Checkout.open({
      items: [{ priceId: "PRI_XXXX" }],
      customData: { seller_id: sellerId },
      settings: {
        displayMode: "overlay",
        theme: "dark",
      },
    });
  };

  return (
    <div className="modal glass">
      <h2>Premium Paket</h2>
      <ul>
        <li>✔ Üst sıralama</li>
        <li>✔ Öne çıkan rozet</li>
        <li>✔ Daha fazla görünürlük</li>
      </ul>
      <button onClick={handleCheckout} className="btn-primary">
        ₺499 / Ay Premium Ol
      </button>
    </div>
  );
}
