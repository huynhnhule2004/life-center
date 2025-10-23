"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { signIn } from "../../app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";

export default function LoginForm() {
  const [state, formAction] = useFormState(signIn, {});
  const [loading, setLoading] = React.useState(false);

  return (
    <form
      action={async (fd) => {
        setLoading(true);
        try { await formAction(fd); }
        finally { setLoading(false); }
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input id="password" name="password" type="password" placeholder="••••••••" required />
      </div>

      {state?.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang đăng nhập...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Lock className="h-4 w-4" /> Đăng nhập
          </span>
        )}
      </Button>
    </form>
  );
}
