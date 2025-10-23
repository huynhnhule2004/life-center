'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { Categories } from '@/lib/types/database';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type KindValue = 'general' | 'course' | 'blog';
type CategoryEditInput = Pick<Categories, 'id' | 'name' | 'slug' | 'kind'>;

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 120);

export default function EditCategoryForm({ initialData }: { initialData: CategoryEditInput }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<{ name: string; slug: string; kind: KindValue }>({
    name: initialData.name ?? '',
    slug: initialData.slug ?? '',
    kind: (initialData.kind as KindValue) ?? 'general',
  });

  // Auto-update slug nếu user chưa tùy biến
  const nameRef = React.useRef(form.name);
  React.useEffect(() => {
    const prevSlugFromPrevName = slugify(nameRef.current);
    const currentSlugFromCurrentName = slugify(form.name);
    const userCustomizedSlug = form.slug !== prevSlugFromPrevName;
    if (!userCustomizedSlug) setForm((p) => ({ ...p, slug: currentSlugFromCurrentName }));
    nameRef.current = form.name;
  }, [form.name, form.slug]);

  const original = React.useMemo(
    () => ({ name: initialData.name ?? '', slug: initialData.slug ?? '', kind: (initialData.kind as KindValue) ?? 'general' }),
    [initialData]
  );
  const dirty =
    form.name.trim() !== original.name.trim() ||
    form.slug.trim() !== original.slug.trim() ||
    form.kind !== original.kind;

  const onChange =
    (key: 'name' | 'slug') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setForm((p) => ({ ...p, [key]: key === 'slug' ? slugify(v) : v }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const payload = { name: form.name.trim(), slug: form.slug.trim(), kind: form.kind };
      if (!payload.name || !payload.slug) throw new Error('Vui lòng nhập đầy đủ Name và Slug');

      await fetch(`/api/admin/categories/${encodeURIComponent(String(initialData.id))}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      router.push('/admin/categories');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Error updating category');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={form.name} onChange={onChange('name')} required autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={form.slug} onChange={onChange('slug')} required autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label>Kind</Label>
        <Select value={form.kind} onValueChange={(v) => setForm((p) => ({ ...p, kind: v as KindValue }))}>
          <SelectTrigger><SelectValue placeholder="Chọn loại" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="course">Course</SelectItem>
            <SelectItem value="blog">Blog</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

      <Button type="submit" disabled={loading || !dirty} className="w-full">
        {loading ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
}
