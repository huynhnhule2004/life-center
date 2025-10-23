import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { CourseInstances } from "@/lib/types/database";
import EditCourseInstanceForm from "./EditCourseInstanceForm"; // <-- cùng folder với page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic"; // tránh cache khi edit

export default async function EditCourseInstancePage({
  params,
}: {
  params: { id: string };
}) {
  // Server: dùng service role để khỏi dính RLS
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set() {},
        remove() {},
      },
    }
  );

  // Lấy bản ghi theo id
  const { data, error } = await supabase
    .from("course_instances")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error) {
    console.error("[Edit CI] load error:", error);
    notFound();
  }
  if (!data) {
    notFound();
  }

  const initialData = data as CourseInstances;

  return (
    <div className="space-y-6">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Chỉnh sửa lớp</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Client form nhận initialData */}
          <EditCourseInstanceForm initialData={initialData} />
        </CardContent>
      </Card>
    </div>
  );
}
