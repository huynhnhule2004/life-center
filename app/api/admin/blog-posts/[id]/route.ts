import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type ParamsType = Promise<{ id: string }> | { id: string };

export async function PUT(
  request: NextRequest,
  context: { params: ParamsType }
) {
  const params = "then" in context.params ? await context.params : context.params;
  const body = await request.json();
  const { error, data } = await supabase
    .from("blog_posts")
    .update(body)
    .eq("id", params.id)
    .select()
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  context: { params: ParamsType }
) {
  const params = "then" in context.params ? await context.params : context.params;
  const { error } = await supabase.from("blog_posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}