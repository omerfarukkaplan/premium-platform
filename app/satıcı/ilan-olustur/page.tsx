"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = async () => {
    const { data: user } = await supabase.auth.getUser();

    await supabase.from("seller_profiles").upsert({
      id: user.user?.id,
      name: user.user?.email,
      title,
      price: Number(price),
    });

    alert("İlan oluşturuldu");
  };

  return (
    <div className="container">
      <h1>İlan Oluştur</h1>
      <input placeholder="Başlık" onChange={(e)=>setTitle(e.target.value)} />
      <input placeholder="Fiyat" onChange={(e)=>setPrice(e.target.value)} />
      <button onClick={handleCreate}>Kaydet</button>
    </div>
  );
}
