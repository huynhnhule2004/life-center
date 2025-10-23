import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Categories } from '@/lib/types/database';
import EditCategoryForm from './EditCategoryForm';

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  );

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, kind')
    .eq('id', params.id)
    .maybeSingle();

  if (error) console.error('[categories/[id]] load error:', error);
  if (!data) notFound();

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Chỉnh sửa danh mục</h1>
      <EditCategoryForm initialData={data as Pick<Categories, 'id' | 'name' | 'slug' | 'kind'>} />
    </div>
  );
}
