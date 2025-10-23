import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const toISO = (v: unknown) => {
  if (!v) return null;
  const d = new Date(v as string | number | Date);
  return isNaN(d.getTime()) ? null : d.toISOString();
};

// Helper to support both Promise and non-Promise params
async function getParams(context: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const raw = context.params;
  return raw instanceof Promise ? await raw : raw;
}

export async function GET(_req: Request, context: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const params = await getParams(context);
  const { data, error } = await supabase
    .from('course_instances')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  if (!data) return NextResponse.json({ message: 'CourseInstance not found', id: params.id }, { status: 404 });
  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(req: Request, context: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const params = await getParams(context);
  try {
    const body = await req.json();

    const { data: exists, error: ce } = await supabase
      .from('course_instances')
      .select('id, course_id')
      .eq('id', params.id)
      .maybeSingle();

    if (ce) return NextResponse.json({ message: ce.message }, { status: 400 });
    if (!exists) return NextResponse.json({ message: 'CourseInstance not found', id: params.id }, { status: 404 });

    const payload = {
      course_id: body.course_id ?? exists.course_id,
      title: body.title ?? null,
      start_date: toISO(body.start_date),
      end_date: toISO(body.end_date),
      mode: body.mode ?? null,
      status: body.status ?? 'SCHEDULED',
      capacity: body.capacity ?? null,
      price: body.price ?? null,
      note: body.note ?? null,
      teacher_id: body.teacher_id ?? null,
    };

    const { data, error } = await supabase
      .from('course_instances')
      .update(payload)
      .eq('id', params.id)
      .select('*')
      .maybeSingle();

    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    const err = e as { message?: string };
    return NextResponse.json({ message: err?.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const params = await getParams(context);
  const { error } = await supabase.from('course_instances').delete().eq('id', params.id);
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  return NextResponse.json({ ok: true }, { status: 200 });
}
