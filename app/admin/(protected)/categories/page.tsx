import { createServerClient } from "@supabase/ssr";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";

// Define Category type for better type safety
type Category = {
  id: string;
  name: string;
  slug: string;
  kind: string;
  // ...add other fields if needed
};

export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // server role: bypass RLS để liệt kê admin
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  );

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading categories</div>;
  }

  // Server action: gọi API DELETE bằng URL tuyệt đối (ổn trong mọi runtime)
  async function deleteCategory(id: string) {
    "use server";
    const h = await headers();
    const baseFromHeaders = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("x-forwarded-host") ?? h.get("host")}`;
    const base = process.env.NEXT_PUBLIC_SITE_URL || baseFromHeaders;

    await fetch(`${base}/api/admin/categories/${id}`, { method: "DELETE", cache: "no-store" });

    redirect("/admin/categories");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Danh mục</h1>
          <p className="text-sm text-muted-foreground">Quản lý danh sách danh mục</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/create">
            <Plus className="h-4 w-4 mr-2" />
            Thêm danh mục
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Kind</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(categories as Category[] | null)?.map((c: Category) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.slug}</TableCell>
                  <TableCell>{c.kind}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {/* Edit */}
                      <Button asChild variant="ghost" size="icon" aria-label="Sửa">
                        <Link href={`/admin/categories/${c.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Sửa</span>
                        </Link>
                      </Button>

                      {/* Delete */}
                      <form action={async () => { "use server"; await deleteCategory(c.id); }} className="inline">
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          aria-label="Xoá"
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

              {(!categories || (categories as Category[]).length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                    Chưa có danh mục nào.
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
