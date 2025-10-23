import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  if (!data) return NextResponse.json({ message: "Category not found", id }, { status: 404 });
  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const name = String(body.name||"").trim();
    const slug = String(body.slug||"").trim();
    const kind = String(body.kind||"general");
    if (!name || !slug) {
      return NextResponse.json({ message: "Thiếu Name hoặc Slug" }, { status: 400 });
    }

    const { data: exists, error: ce } = await supabase.from("categories").select("id").eq("id", id).maybeSingle();
    if (ce) return NextResponse.json({ message: ce.message }, { status: 400 });
    if (!exists) return NextResponse.json({ message: "Category not found", id }, { status: 404 });

    const { data, error } = await supabase.from("categories").update({ name, slug, kind }).eq("id", id).select("*").maybeSingle();
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    const message = typeof e === "object" && e !== null && "message" in e
      ? (e as { message?: string }).message
      : "Update failed";
    return NextResponse.json({ message: message || "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  return NextResponse.json({ ok: true }, { status: 200 });
}
