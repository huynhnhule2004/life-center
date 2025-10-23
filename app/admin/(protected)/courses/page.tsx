import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Edit2, Trash2 } from 'lucide-react';

// import client DeleteCourseForm
import DeleteCourseForm from "@/components/admin/DeleteCourseForm";

export default async function CoursesPage() {
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

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Lỗi tải khóa học</div>;
  }

  // đảm bảo courses luôn là mảng để tránh lỗi khi data = null
  const courseList = courses ?? [];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Khóa học</CardTitle>
        <Link href="/admin/courses/create">
          <Button className="mt-2">Thêm mới</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseList.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Link href={`/admin/courses/${course.id}`} className="text-blue-500" title="Chỉnh sửa" aria-label="Chỉnh sửa">
                    <Edit2 className="h-5 w-5" aria-hidden="true" />
                  </Link>

                  
                  <DeleteCourseForm id={course.id}>
                    <Trash2 className="h-5 w-5 text-red-600" aria-hidden="true" data-title="Xóa" />
                  </DeleteCourseForm>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
