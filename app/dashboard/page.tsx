"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Paddle: any
  }
}

export default function SellerDashboard() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js"
    script.async = true
    script.onload = () => {
      if (window.Paddle) {
        window.Paddle.Environment.set("sandbox") // production'da sil
        window.Paddle.Initialize({
          seller: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
        })
      }
    }
    document.body.appendChild(script)
  }, [])

  const handleUpgrade = () => {
    if (!window.Paddle) return

    window.Paddle.Checkout.open({
      items: [{ priceId: "pri_xxxxx" }], // Paddle product price id
      settings: {
        displayMode: "overlay",
      },
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Satıcı Paneli</h1>

      <div className="bg-white shadow rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-4">
          Premium Öne Çıkarma
        </h2>

        <p className="text-neutral-600 mb-6">
          Profilinizi ana sayfada en üstte gösterin.
        </p>

        <button
          onClick={handleUpgrade}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition"
        >
          Premium Satın Al
        </button>
      </div>
    </div>
  )
}
