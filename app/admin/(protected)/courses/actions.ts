"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteCourse(formData: FormData) {
	"use server";
	const id = formData.get("id") as string;
	if (!id) return redirect("/admin/courses");

	const cookieStore = await cookies();
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!, // dùng service role
		{
			cookies: {
				get: (name: string) => cookieStore.get(name)?.value,
				set() {},
				remove() {},
			},
		}
	);

	await supabase.from("courses").delete().eq("id", id);
	redirect("/admin/courses");
}
