import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import EditBlogPostForm from "./EditBlogPostForm";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set() {}, remove() {},
      },
    }
  );
  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single();
  if (error || !post) return <div>Error loading blog post</div>;
  return <EditBlogPostForm initialData={post} />;
}