import { supabase } from "@/lib/supabase";

export default async function Profile({ params }: any) {
  const { data } = await supabase
    .from("seller_profiles")
    .select("*")
    .eq("slug", params.slug)
    .single();

  await supabase
    .from("seller_profiles")
    .update({ views: data.views + 1 })
    .eq("id", data.id);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p>{data.description}</p>
      <p>{data.city}</p>
      <p className="font-bold">{data.price} TL</p>

      <form action="/api/lead" method="POST">
        <input type="hidden" name="seller_id" value={data.id}/>
        <button className="bg-black text-white px-6 py-3 mt-4 rounded-lg">
          İletişime Geç
        </button>
      </form>
    </div>
  );
}
