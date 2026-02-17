import { supabase } from "@/lib/supabase";

export default async function BlogPost({ params }: any) {

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!data) {
    return <div className="p-10">Yazı bulunamadı</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-600 mb-6">{data.meta_description}</p>
      <div>{data.content}</div>
    </div>
  );
}
