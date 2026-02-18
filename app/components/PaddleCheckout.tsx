"use client";

export default function PaddleCheckout({ priceId }) {
  const handleCheckout = () => {
    if (!window.Paddle) return;

    window.Paddle.Checkout.open({
      items: [{ priceId }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
      },
    });
  };

  return (
    <button className="premium-btn" onClick={handleCheckout}>
      Premium Satın Al
    </button>
  );
}
