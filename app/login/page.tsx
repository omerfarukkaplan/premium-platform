"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) router.push("/satici");
    else alert(error.message);
  };

  return (
    <div className="auth-container">
      <h1>Satıcı Giriş</h1>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Şifre" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}
