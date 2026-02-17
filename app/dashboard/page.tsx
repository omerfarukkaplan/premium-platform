"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats,setStats]=useState<any>(null);

  useEffect(()=>{
    const load=async()=>{
      const {data}=await supabase
        .from("seller_profiles")
        .select("views,leads,featured_until")
        .single();
      setStats(data);
    };
    load();
  },[]);

  return (
    <div className="p-8">
      <h1>Satıcı Paneli</h1>
      <p>Görüntülenme: {stats?.views}</p>
      <p>Lead: {stats?.leads}</p>
      <p>Featured: {stats?.featured_until}</p>
    </div>
  );
}
