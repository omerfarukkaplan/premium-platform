import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function Admin() {

  const { count } = await supabase
    .from("seller_profiles")
    .select("*", { count: "exact" });

  const { data } = await supabase
    .from("seller_profiles")
    .select("*");

  return (
    <div className="p-8">
      <h1>Admin Panel</h1>
      <p>Toplam Satıcı: {count}</p>

      {data?.map(s => (
        <div key={s.id}>
          {s.title} - {s.leads} leads
        </div>
      ))}
    </div>
  );
}
