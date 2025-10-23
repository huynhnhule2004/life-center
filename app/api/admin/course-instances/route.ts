import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// GET /api/admin/course-instances?page=1&pageSize=20&course_id=...&q=...
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize') ?? '20')));
  const courseId = url.searchParams.get('course_id') ?? '';
  const q = url.searchParams.get('q')?.trim() ?? '';

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let qy = supabase
    .from('course_instances')
    .select('*', { count: 'exact' })
    .order('start_date', { ascending: false })
    .range(from, to);

  if (courseId) qy = qy.eq('course_id', courseId);
  if (q) qy = qy.ilike('title', `%${q}%`); // Nếu bảng không có cột title, xóa dòng này.

  const { data, error, count } = await qy;
  if (error) return NextResponse.json({ message: error.message }, { status: 400 });

  return NextResponse.json({ data, page, pageSize, total: count ?? 0 }, { status: 200 });
}

// ---- Helpers an toàn kiểu ----
const toISO = (v: unknown): string | null => {
  if (v == null || v === '') return null;
  const d = new Date(v as string | number | Date);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const toNum = (v: unknown): number | null => {
  if (v == null || v === '') return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Map field theo schema của bạn
    const payload = {
      course_id: body.course_id,                 // FK -> courses.id (bắt buộc)
      title: body.title ?? null,                 // nếu bảng có title riêng
      start_date: toISO(body.start_date),
      end_date: toISO(body.end_date),
      mode: body.mode ?? null,                   // online/offline/hybrid
      status: body.status ?? 'SCHEDULED',        // enum của bạn
      capacity: toNum(body.capacity),
      price: toNum(body.price),
      note: body.note ?? null,                   // JSONB/TEXT -> chỉnh nếu cần
      teacher_id: body.teacher_id ?? null,       // nếu có FK -> teachers.id
    };

    if (!payload.course_id) {
      return NextResponse.json({ message: 'Thiếu course_id' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('course_instances')
      .insert([payload])
      .select('*')
      .single();

    if (error) return NextResponse.json({ message: error.message }, { status: 400 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ message: (e as Error)?.message || 'Create failed' }, { status: 500 });
  }
}
