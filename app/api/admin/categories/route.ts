import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// GET /api/admin/categories?page=1&pageSize=20&q=...
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get("pageSize") ?? "20")));
  const q = url.searchParams.get("q")?.trim() ?? "";

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("categories").select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) query = query.ilike("name", `%${q}%`);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });

  return NextResponse.json({ data, page, pageSize, total: count ?? 0 }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name||"").trim();
    const slug = String(body.slug||"").trim();
    const kind = String(body.kind||"general");
    if (!name || !slug) {
      return NextResponse.json({ message: "Thiếu Name hoặc Slug" }, { status: 400 });
    }
    const { data, error } = await supabase.from("categories").insert([{ name, slug, kind }]).select("*").single();
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    const message = typeof e === "object" && e !== null && "message" in e
      ? String((e as { message?: unknown }).message)
      : "Create failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
