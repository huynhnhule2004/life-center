import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Courses } from "@/lib/types/database";
import EditCourseForm from './EditCourseForm';

export default async function EditCoursePage({ params }: { params: { id: string } }) {
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

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !course) {
    return <div>Error loading course</div>;
  }

  // Render the client edit form which uses CKEditor and matches CreateCourseForm
  return <EditCourseForm initialData={course as Courses & { content: Record<string, unknown> }} />;
}
