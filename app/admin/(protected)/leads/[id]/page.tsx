import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Leads } from "@/lib/types/database";
import { Card, CardContent } from "@/components/ui/card";
import EditLeadForm from "./EditLeadForm";

export default async function EditLeadPage({ params }: { params: { id: string } }) {
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

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !lead) {
    return <div>Error loading lead</div>;
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
      phone: formData.get("phone") as string,
      email: formData.get("email") as string || null,
      student: formData.get("student") as string || null,
      age: formData.get("age") ? Number(formData.get("age")) : null,
      interest: formData.get("interest") as string || null,
      course_id: formData.get("course_id") as string || null,
      message: formData.get("message") as string || null,
      source: formData.get("source") as string || null,
      consent: formData.get("consent") === "on",
    };

    const { error } = await supabase.from("leads").update(data).eq("id", params.id);
    if (error) {
      console.error(error);
      throw new Error("Error updating lead");
    }
    redirect("/admin/leads");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chỉnh sửa lead</h1>
      <Card>
        <CardContent>
          <EditLeadForm initialData={lead as Leads} action={update} />
        </CardContent>
      </Card>
    </div>
  );
}