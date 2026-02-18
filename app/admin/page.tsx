import { createClient } from "@supabase/supabase-js";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase.from("seller_profiles").select("*");

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div className="grid">
        {data?.map((s)=>(
          <div key={s.id} className="card">
            <h3>{s.title}</h3>
            <p>Premium: {s.is_premium ? "Evet" : "Hayır"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
