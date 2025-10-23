import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function CreateTeacherPage() {
  async function create(formData: FormData) {
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

    const { error } = await supabase.from("teachers").insert([data]);
    if (error) {
      console.error(error);
      throw new Error("Error creating teacher");
    }
    redirect("/admin/teachers");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tạo giảng viên</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tạo giảng viên</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={create} className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium">Tên</Label>
              <Input id="name" name="name" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="slug" className="block text-sm font-medium">Slug</Label>
              <Input id="slug" name="slug" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bio" className="block text-sm font-medium">Bio</Label>
              <Textarea id="bio" name="bio" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="avatar_url" className="block text-sm font-medium">Avatar URL</Label>
              <Input id="avatar_url" name="avatar_url" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="socials" className="block text-sm font-medium">Socials (JSON)</Label>
              <Textarea id="socials" name="socials" placeholder='{}' className="mt-1" />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Tạo</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/teachers">Hủy</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
