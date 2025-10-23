'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

const slugify = (s: string) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 120);

export default function CreateCategoryForm() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<{ name: string; slug: string; kind: KindValue }>({
    name: '',
    slug: '',
    kind: 'general',
  });

  // Auto slug khi user nhập name lần đầu
  const nameRef = React.useRef(form.name);
  React.useEffect(() => {
    const prevSlugFromPrevName = slugify(nameRef.current);
    const currentSlugFromCurrentName = slugify(form.name);
    const userCustomizedSlug = form.slug.length > 0 && form.slug !== prevSlugFromPrevName;
    if (!userCustomizedSlug) setForm((p) => ({ ...p, slug: currentSlugFromCurrentName }));
    nameRef.current = form.name;
  }, [form.name, form.slug]); // Added form.slug to dependencies

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

      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: { message?: string } | null = null; // Specify type instead of any
      try { data = await res.clone().json(); } catch {}
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status} lỗi`);

      router.push('/admin/categories');
      router.refresh();
    } catch (err: unknown) { // Use unknown instead of any
      if (err instanceof Error) {
        setErrorMsg(err.message || 'Error creating category');
      } else {
        setErrorMsg('Error creating category');
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

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
}
