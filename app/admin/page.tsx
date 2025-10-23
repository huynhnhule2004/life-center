import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

// shadcn-ui components
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Đăng nhập Admin",
  description: "Trang đăng nhập quản trị",
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set() {},
        remove() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // Kiểm tra quyền admin: nếu đúng → vào dashboard
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (profile?.is_admin) {
      redirect("/admin/dashboard");
    }
    // Nếu login nhưng không phải admin → vẫn hiển thị form + cảnh báo
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">English Life Center</CardTitle>
          <CardDescription>Đăng nhập quản trị</CardDescription>
        </CardHeader>

        <CardContent>
          {/* LoginForm is a client component that should contain the form and use shadcn inputs/buttons */}
          <LoginForm />

          <Separator className="my-4" />

          <p className="text-center text-sm text-muted-foreground">
            Bằng việc đăng nhập, bạn đồng ý với Điều khoản &amp; Chính sách bảo mật.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
