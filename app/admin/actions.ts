"use server";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { redirect } from "next/navigation";

type SignInState = { error?: string };

export async function signIn(_: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Vui lòng nhập email và mật khẩu." };
  }

  // Next.js 15: cookies() là async
  const cookieStore = await cookies();

  // Adapter cookies cho Supabase SSR
  const cookieAdapter = {
    get(name: string) {
      return cookieStore.get(name)?.value;
    },
    set(name: string, value: string, options: CookieOptions) {
      // next/headers hỗ trợ cả object form
      cookieStore.set({ name, value, ...options });
    },
    remove(name: string, _options: CookieOptions) {
      // xóa cookie: dùng API delete của Next (path/domain nếu cần,
      // Supabase sẽ truyền kèm; ở đây có thể bỏ qua an toàn)
      cookieStore.delete(name);
    },
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieAdapter }
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  // Chỉ cho admin vào
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Không xác thực được người dùng." };

  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (pErr || !profile?.is_admin) {
    await supabase.auth.signOut();
    return { error: "Tài khoản này không có quyền admin." };
  }

  // OK → vào Dashboard
  redirect("/admin/dashboard");
}
