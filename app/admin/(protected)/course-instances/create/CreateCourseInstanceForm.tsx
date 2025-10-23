import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default async function CreateCourseInstancePage() {
  // Lấy danh sách courses ở server
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
  const { data: courses } = await supabase
    .from("courses")
    .select("id, name")
    .order("name", { ascending: true });

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

    let schedule = null;
    try {
      schedule = formData.get("schedule") ? JSON.parse(formData.get("schedule") as string) : null;
    } catch {
      throw new Error("Schedule phải là JSON hợp lệ!");
    }

    const data = {
      course_id: formData.get("course_id") as string,
      code: formData.get("code") as string || null,
      start_date: formData.get("start_date") ? new Date(formData.get("start_date") as string) : null,
      end_date: formData.get("end_date") ? new Date(formData.get("end_date") as string) : null,
      schedule,
      timezone: formData.get("timezone") as string,
      seats: formData.get("seats") ? Number(formData.get("seats")) : null,
      enrolled: formData.get("enrolled") ? Number(formData.get("enrolled")) : 0,
      price_override: formData.get("price_override") ? Number(formData.get("price_override")) : null,
      sale_price_override: formData.get("sale_price_override") ? Number(formData.get("sale_price_override")) : null,
      sale_starts_at: formData.get("sale_starts_at") ? new Date(formData.get("sale_starts_at") as string) : null,
      sale_ends_at: formData.get("sale_ends_at") ? new Date(formData.get("sale_ends_at") as string) : null,
      status: formData.get("status") as string,
      note: formData.get("note") as string || null,
    };

    const { error } = await supabase.from("course_instances").insert([data]);
    if (error) {
      console.error(error);
      throw new Error("Error creating course instance: " + error.message);
    }
    redirect("/admin/course-instances");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tạo lớp học</h1>
      <Card>
        <CardContent>
          <form action={create} className="space-y-4">
            <div>
              <Label>Khóa học</Label>
              <Select name="course_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khóa học" />
                </SelectTrigger>
                <SelectContent>
                  {courses?.map((course: { id: string; name: string }) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Code</Label>
              <Input name="code" />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input name="start_date" type="date" />
            </div>
            <div>
              <Label>End Date</Label>
              <Input name="end_date" type="date" />
            </div>
            <div>
              <Label>Schedule (JSON)</Label>
              <Textarea name="schedule" placeholder='{}' />
            </div>
            <div>
              <Label>Timezone</Label>
              <Input name="timezone" defaultValue="Asia/Ho_Chi_Minh" />
            </div>
            <div>
              <Label>Seats</Label>
              <Input name="seats" type="number" />
            </div>
            <div>
              <Label>Enrolled</Label>
              <Input name="enrolled" type="number" defaultValue="0" />
            </div>
            <div>
              <Label>Price Override</Label>
              <Input name="price_override" type="number" />
            </div>
            <div>
              <Label>Sale Price Override</Label>
              <Input name="sale_price_override" type="number" />
            </div>
            <div>
              <Label>Sale Starts At</Label>
              <Input name="sale_starts_at" type="datetime-local" />
            </div>
            <div>
              <Label>Sale Ends At</Label>
              <Input name="sale_ends_at" type="datetime-local" />
            </div>
            <div>
              <Label>Status</Label>
              <Select name="status" defaultValue="PLANNED">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Note</Label>
              <Textarea name="note" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Tạo</Button>
              <Button variant="outline" asChild>
                <Link href="/admin/course-instances">Hủy</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}