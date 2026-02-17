"use client";

export default function SellerDashboard() {
  const handleUpgrade = () => {
    window.Paddle.Checkout.open({
      items: [{ priceId: "PRI_XXXX" }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
      },
    });
  };

  return (
    <div className="min-h-screen p-12 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">
        Satıcı Paneli
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Daha Fazla Müşteri Kazan
        </h2>
        <p className="text-gray-500 mb-6">
          30 gün boyunca en üstte görün.
        </p>

        <button
          onClick={handleUpgrade}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          ⭐ Öne Çık (₺1499)
        </button>
      </div>
    </div>
  );
}
