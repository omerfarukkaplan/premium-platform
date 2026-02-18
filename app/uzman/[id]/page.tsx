"use client";
import { useState } from "react";

export default function SellerDetail({ params }: any) {
  const [date, setDate] = useState("");

  const book = async () => {
    await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify({
        seller_id: params.id,
        appointment_time: date,
      }),
    });
    alert("Randevu alındı");
  };

  return (
    <div>
      <h1>Uzman Detay</h1>
      <input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
      <button onClick={book}>Randevu Al</button>
    </div>
  );
}
