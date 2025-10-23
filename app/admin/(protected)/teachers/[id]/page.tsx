import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Teachers } from "@/lib/types/database";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditTeacherPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role to bypass RLS
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set() {}, remove() {},
      },
    }
  );

  const { data: teacher, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !teacher) {
    return <div>Error loading teacher</div>;
  }

  async function update(formData: FormData) {
    "use server";
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

    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      bio: formData.get("bio") as string,
      avatar_url: formData.get("avatar_url") as string || null,
      socials: formData.get("socials") ? JSON.parse(formData.get("socials") as string) : null,
    };

    const { error } = await supabase.from("teachers").update(data).eq("id", params.id);
    if (error) {
      console.error(error);
      throw new Error("Error updating teacher");
    }
    redirect("/admin/teachers");
  }

  const initialData = teacher as Teachers;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chỉnh sửa giảng viên</h1>

      <Card>
        <CardContent>
          <form action={update} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" defaultValue={initialData.name} required />
            </div>
            <div>
              <Label>Slug</Label>
              <Input name="slug" defaultValue={initialData.slug} required />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea name="bio" defaultValue={initialData.bio} required />
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input name="avatar_url" defaultValue={initialData.avatar_url || ""} />
            </div>
            <div>
              <Label>Socials (JSON)</Label>
              <Textarea name="socials" defaultValue={JSON.stringify(initialData.socials) || "{}"} />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Cập nhật</Button>
              <Button variant="outline" asChild><Link href="/admin/teachers">Hủy</Link></Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
