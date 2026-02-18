import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminPage() {
  const { data: sellers } = await supabase
    .from("seller_profiles")
    .select("*");

  const premiumCount =
    sellers?.filter((s) => s.is_premium).length || 0;

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Toplam Satıcı</h3>
          <p>{sellers?.length || 0}</p>
        </div>

        <div className="admin-card">
          <h3>Premium Satıcı</h3>
          <p>{premiumCount}</p>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Premium</th>
            <th>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {sellers?.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.title}</td>
              <td>{seller.is_premium ? "✔" : "-"}</td>
              <td>₺{seller.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
