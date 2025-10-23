// app/api/admin/teachers/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// Kiểu context mới: params là Promise<{ id: string }>
type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  if (!data) {
    return NextResponse.json({ message: 'Teacher not found', id }, { status: 404 });
  }
  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const safeParseJSON = (s: unknown) => {
      if (!s) return null;
      if (typeof s === 'object') return s as Record<string, unknown>;
      try {
        return JSON.parse(String(s));
      } catch {
        return null;
      }
    };

    const { data: exists, error: ce } = await supabase
      .from('teachers')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (ce) return NextResponse.json({ message: ce.message }, { status: 400 });
    if (!exists) return NextResponse.json({ message: 'Teacher not found', id }, { status: 404 });

    const payload = {
      name: body.name ?? '',
      slug: body.slug ?? '',
      bio: body.bio ?? '',
      avatar_url: body.avatar_url || null,
      socials: safeParseJSON(body.socials),
      status: body.status ?? 'ACTIVE',
    };

    if (!payload.name || !payload.slug || !payload.bio) {
      return NextResponse.json({ message: 'Thiếu trường bắt buộc (name, slug, bio)' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('teachers')
      .update(payload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ message: (e as Error)?.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  const { error } = await supabase.from('teachers').delete().eq('id', id);
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  return NextResponse.json({ ok: true }, { status: 200 });
}
