import { supabase } from "@/lib/supabase";

export default async function Category({ params }: any) {
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  const { data: sellers } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("featured_until", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      {sellers?.map(s => (
        <a key={s.id} href={`/uzman/${s.slug}`}>
          <div className="bg-white p-6 rounded-xl shadow mb-4">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p>{s.city}</p>
            <p className="font-bold">{s.price} TL</p>
          </div>
        </a>
      ))}
    </div>
  );
}
