import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function AdminPage() {
  const { data } = await supabaseAdmin
    .from("transactions")
    .select("amount");

  const total =
    data?.reduce((acc, t) => acc + t.amount, 0) || 0;

  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <h2>Toplam Ciro: ₺{total}</h2>
    </div>
  );
}
