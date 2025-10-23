import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin - English Life Center",
  description: "Trang quản trị English Life Center",
};

async function requireAdmin() {
  const cookieStore = await cookies(); // ⬅️ Next 15: cookies() là Promise

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set() {}, remove() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin"); // ⬅️ chưa login → tới trang login

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (error || !profile?.is_admin) redirect("/"); // không phải admin → về trang chủ
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin(); // ⬅️ đảm bảo vào được thì chắc chắn là admin

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Tìm kiếm..." className="pl-10" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                <span className="sr-only">Thông báo</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Nội dung */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
