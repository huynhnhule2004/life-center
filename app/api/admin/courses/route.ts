import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // This will be visible in server logs during runtime if env missing
  console.error('Missing Supabase server config (SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL).');
}

const supabaseServer = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Optional: validate body here
    const { data, error } = await supabaseServer.from('courses').insert([body]);
    if (error) {
      return NextResponse.json({ message: error.message, details: error }, { status: 400 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    const message =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message
        : 'Internal server error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
