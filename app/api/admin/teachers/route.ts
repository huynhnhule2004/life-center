import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize') ?? '20')));
  const q = url.searchParams.get('q')?.trim() ?? '';

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let qy = supabase.from('teachers').select('*', { count: 'exact' })
    .order('created_at', { ascending: false }).range(from, to);
  if (q) qy = qy.ilike('name', `%${q}%`);

  const { data, error, count } = await qy;
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  return NextResponse.json({ data, page, pageSize, total: count ?? 0 }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const safeParseJSON = (s: unknown) => {
      if (!s) return null;
      if (typeof s === 'object') return s;
      try { return JSON.parse(String(s)); } catch { return null; }
    };

    const payload = {
      name: body.name ?? '',
      slug: body.slug ?? '',
      bio: body.bio ?? '',                  // nếu DB là JSONB: typeof body.bio==='string'?{text:body.bio}:body.bio
      avatar_url: body.avatar_url || null,
      socials: safeParseJSON(body.socials), // JSONB/null
      status: body.status ?? 'ACTIVE',
    };

    if (!payload.name || !payload.slug || !payload.bio) {
      return NextResponse.json({ message: 'Thiếu trường bắt buộc (name, slug, bio)' }, { status: 400 });
    }

    const { data, error } = await supabase.from('teachers').insert([payload]).select('*').single();
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ message: (e as Error)?.message || 'Create failed' }, { status: 500 });
  }
}
