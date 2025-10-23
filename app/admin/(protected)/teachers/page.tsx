import { createServerClient } from "@supabase/ssr";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export default async function TeachersPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // server role => bypass RLS khi đọc trong admin
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set() {},
        remove() {},
      },
    }
  );

  const { data: teachers, error } = await supabase
    .from("teachers")
    .select("*")
    .order("created_at", { ascending: false });

  // Define a minimal Teacher type
  type Teacher = {
    id: string;
    name: string;
    slug: string;
    // ...add other fields as needed
  };

  if (error) {
    console.error(error);
    return <div>Error loading teachers</div>;
  }

  // Server action: gọi API DELETE bằng URL tuyệt đối
  async function deleteTeacher(id: string) {
    "use server";
    const h = await headers();
    const baseFromHeaders =
      `${h.get("x-forwarded-proto") ?? "http"}://${h.get("x-forwarded-host") ?? h.get("host")}`;
    const base = process.env.NEXT_PUBLIC_SITE_URL || baseFromHeaders;

    const res = await fetch(`${base}/api/admin/teachers/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    let data: unknown = null;
    try { data = await res.json(); } catch {}

    if (!res.ok) {
      console.error("DELETE /teachers failed", { status: res.status, data });
    }

    redirect("/admin/teachers");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Giảng viên</h1>
          <p className="text-sm text-muted-foreground">Quản lý danh sách giảng viên</p>
        </div>
        <Button asChild>
          <Link href="/admin/teachers/create">Thêm giảng viên</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách giảng viên</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers?.map((teacher: Teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.slug}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {/* Edit */}
                      <Button asChild variant="ghost" size="icon" aria-label="Sửa giảng viên">
                        <Link href={`/admin/teachers/${teacher.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Sửa</span>
                        </Link>
                      </Button>

                      {/* Delete */}
                      <form action={async () => { "use server"; await deleteTeacher(teacher.id); }} className="inline">
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          aria-label="Xoá giảng viên"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Xoá</span>
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!teachers || teachers.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    Chưa có giảng viên nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
