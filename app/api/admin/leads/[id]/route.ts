// app/api/admin/leads/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// --- helpers ---
const looksLikeUuid = (s: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

type LeadUpdateBody = Partial<{
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  assigned_to: string | null;
  note: string | null;
  source: string | null;
  archived_at: string | null; // nếu bạn dùng timestamptz, có thể chuyển ISO ở client trước khi gửi
}>;

/** PUT /api/admin/leads/[id] */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const idFilter: string | number = looksLikeUuid(id) ? id : Number(id);
  if (!looksLikeUuid(id) && !Number.isFinite(idFilter)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = (await request.json()) as LeadUpdateBody;

  const { data, error } = await supabase
    .from('leads')
    .update(body)
    .eq('id', idFilter)
    .select('*')
    .maybeSingle<Record<string, unknown>>();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 200 });
}

/** DELETE /api/admin/leads/[id] */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const idFilter: string | number = looksLikeUuid(id) ? id : Number(id);
  if (!looksLikeUuid(id) && !Number.isFinite(idFilter)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const { error } = await supabase.from('leads').delete().eq('id', idFilter);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true }, { status: 200 });
}
