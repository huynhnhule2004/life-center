// app/api/admin/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // log server-side for visibility
  // eslint-disable-next-line no-console
  console.error('❌ Missing Supabase server config (URL or SERVICE_ROLE_KEY).');
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

// ---------- helpers & types ----------
const looksLikeUuid = (s: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

const cleanNumber = (v: unknown): number | null => {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const toISO = (v: unknown): string | null => {
  if (!v) return null;
  const i: string | number | Date =
    typeof v === 'string' || typeof v === 'number' || v instanceof Date ? v : '';
  const d = new Date(i);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

type ContentJson = { text: string };

const hasTextProp = (u: unknown): u is { text?: unknown } =>
  typeof u === 'object' && u !== null && 'text' in u;

/**
 * If column `content` is JSONB with shape { text: string }, keep JSON.
 * If it's TEXT, pass string by setting isJSONB=false.
 */
const normalizeContent = (raw: unknown, isJSONB = true): ContentJson | string => {
  let text = '';
  if (typeof raw === 'string') {
    text = raw;
  } else if (hasTextProp(raw) && typeof raw.text === 'string') {
    text = raw.text;
  } else if (hasTextProp(raw) && raw.text == null) {
    text = '';
  }
  return isJSONB ? { text } : text;
};

type CourseBody = {
  title?: string;
  slug?: string;
  summary?: string;
  content?: unknown;
  cover_url?: string | null;
  mode?: string | null;
  duration_wk?: number | string | null;
  price?: number | string | null;
  sale_price?: number | string | null;
  sale_starts_at?: unknown;
  sale_ends_at?: unknown;
  status?: string;
  published_at?: unknown;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_og_image?: string | null;
};

// ---------- PUT /api/admin/courses/[id] ----------
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: 'Missing course id' }, { status: 400 });
    }

    const idFilter: string | number = looksLikeUuid(id) ? id : Number(id);
    if (!looksLikeUuid(id) && !Number.isFinite(idFilter)) {
      return NextResponse.json({ message: 'Invalid course id' }, { status: 400 });
    }

    const body = (await request.json()) as CourseBody;

    // Check exists
    const { data: exists, error: checkErr } = await supabase
      .from('courses')
      .select('id')
      .eq('id', idFilter)
      .maybeSingle<{ id: string }>();

    if (checkErr) {
      return NextResponse.json({ message: checkErr.message }, { status: 400 });
    }
    if (!exists) {
      return NextResponse.json(
        { message: 'Course not found', id },
        { status: 404 }
      );
    }

    // Build payload safely
    const payload = {
      title: body.title ?? '',
      slug: body.slug ?? '',
      summary: body.summary ?? '',
      // 👉 If `content` column is TEXT, use normalizeContent(body.content, false)
      content: normalizeContent(body.content, /* isJSONB */ true),
      cover_url: body.cover_url ?? null,
      mode: body.mode ?? null,
      duration_wk: cleanNumber(body.duration_wk),
      price: cleanNumber(body.price),
      sale_price: cleanNumber(body.sale_price),
      sale_starts_at: toISO(body.sale_starts_at),
      sale_ends_at: toISO(body.sale_ends_at),
      status: body.status ?? 'DRAFT',
      published_at: toISO(body.published_at),
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
      seo_og_image: body.seo_og_image ?? null,
    };

    // Basic validation
    if (!payload.title || !payload.slug || !payload.summary) {
      return NextResponse.json(
        { message: 'Thiếu trường bắt buộc (title, slug, summary)' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('courses')
      .update(payload)
      .eq('id', idFilter)
      .select('*')
      .maybeSingle<Record<string, unknown>>();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    // eslint-disable-next-line no-console
    console.error('🔴 PUT /api/admin/courses/[id] error:', message);
    return NextResponse.json({ message: message || 'Update failed' }, { status: 500 });
  }
}
