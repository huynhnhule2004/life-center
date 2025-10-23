'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Courses } from '@/lib/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'sonner';

// CKEditor: tắt SSR để tránh lỗi hydrate
const CKEditor = dynamic(async () => (await import('@ckeditor/ckeditor5-react')).CKEditor, { ssr: false });

// ---- Types ----
type CourseFormState = Omit<
  Partial<Courses>,
  'sale_starts_at' | 'sale_ends_at' | 'published_at' | 'content'
> & {
  sale_starts_at?: Date | null;
  sale_ends_at?: Date | null;
  published_at?: Date | null;
  content?: { text: string };
};

// Kiểu tối thiểu cho editor trong callback (tránh dùng any)
type EditorLike = { getData: () => string };

// ---- Helpers ----
function parseMaybeDate(v: unknown): Date | null {
  if (!v) return null;
  try {
    const d = new Date(v as string | number | Date);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

export default function EditCourseForm({
  initialData,
}: {
  initialData: Courses & { content: unknown };
}) {
  const router = useRouter();

  // Chuẩn hoá content
  const normalizedContent: { text: string } = (() => {
    if (!initialData.content) return { text: '' };
    if (typeof initialData.content === 'string') return { text: initialData.content };
    if (
      typeof initialData.content === 'object' &&
      initialData.content !== null &&
      'text' in initialData.content
    ) {
      return { text: (initialData.content as { text?: string }).text || '' };
    }
    return { text: '' };
  })();

  const [formData, setFormData] = useState<CourseFormState>({
    title: initialData.title ?? '',
    slug: initialData.slug ?? '',
    summary: initialData.summary ?? '',
    content: normalizedContent,
    cover_url: initialData.cover_url ?? '',
    mode: initialData.mode ?? '',
    duration_wk: initialData.duration_wk ?? undefined,
    price: initialData.price ?? undefined,
    sale_price: initialData.sale_price ?? undefined,
    sale_starts_at: parseMaybeDate(initialData.sale_starts_at),
    sale_ends_at: parseMaybeDate(initialData.sale_ends_at),
    status: (initialData.status as string) ?? 'DRAFT',
    published_at: parseMaybeDate(initialData.published_at),
    seo_title: initialData.seo_title ?? '',
    seo_description: initialData.seo_description ?? '',
    seo_og_image: initialData.seo_og_image ?? '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = (initialData as { id?: string | number })?.id;
    if (!id) {
      toast.error('Thiếu ID khóa học — không thể cập nhật.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title ?? '',
        slug: formData.slug ?? '',
        summary: formData.summary ?? '',
        content: formData.content ?? { text: '' },
        cover_url: formData.cover_url || null,
        mode: formData.mode || null,
        duration_wk: formData.duration_wk ?? null,
        price: formData.price ?? null,
        sale_price: formData.sale_price ?? null,
        sale_starts_at: formData.sale_starts_at ? formData.sale_starts_at.toISOString() : null,
        sale_ends_at: formData.sale_ends_at ? formData.sale_ends_at.toISOString() : null,
        status: formData.status ?? 'DRAFT',
        published_at: formData.published_at ? formData.published_at.toISOString() : null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        seo_og_image: formData.seo_og_image || null,
      };

      const url = `/api/admin/courses/${encodeURIComponent(String(id))}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: unknown = null;
      let rawText = '';
      try {
        data = await res.clone().json();
      } catch {
        rawText = await res.text();
      }

      if (!res.ok) {
        const message = typeof data === 'object' && data !== null && 'message' in data
          ? (data as { message?: string }).message
          : '';
        const code = typeof data === 'object' && data !== null && 'code' in data
          ? (data as { code?: string }).code
          : '';
        const details = typeof data === 'object' && data !== null && 'details' in data
          ? (data as { details?: string }).details
          : '';
        const pieces = [
          `HTTP ${res.status}`,
          message ? `– ${message}` : '',
          code ? ` (${code})` : '',
          details ? ` – ${details}` : '',
          !message && rawText ? ` – ${rawText.slice(0, 200)}` : '',
        ].filter(Boolean);
        toast.error(pieces.join(' '));
        console.error('[PUT] FAIL', { status: res.status, data, rawText, url, payload });
        return;
      }

      toast.success('Cập nhật khóa học thành công');
      router.push('/admin/courses');
    } catch (err) {
      const error = err as Error;
      console.error('[PUT] EXCEPTION', error);
      toast.error(error?.message || 'Lỗi khi cập nhật khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const next = type === 'number' ? (value === '' ? null : Number(value)) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: next as never,
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chỉnh sửa khóa học</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={formData.slug || ''} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Tóm tắt</Label>
            <Textarea id="summary" name="summary" value={formData.summary || ''} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Nội dung</Label>
            <CKEditor
              // Ép kiểu duy nhất tại prop editor để vượt qua mismatch type (Watchdog)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              editor={ClassicEditor as unknown as any}
              data={formData.content?.text || ''}
              onChange={(_, editor) => {
                const data = (editor as unknown as EditorLike).getData();
                setFormData((prev) => ({ ...prev, content: { text: data } }));
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_url">Ảnh bìa (URL)</Label>
            <Input id="cover_url" name="cover_url" value={formData.cover_url || ''} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">Hình thức</Label>
            <Input id="mode" name="mode" value={formData.mode || ''} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration_wk">Thời lượng (tuần)</Label>
            <Input
              id="duration_wk"
              name="duration_wk"
              type="number"
              value={formData.duration_wk ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá</Label>
            <Input id="price" name="price" type="number" value={formData.price ?? ''} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sale_price">Giá khuyến mãi</Label>
            <Input id="sale_price" name="sale_price" type="number" value={formData.sale_price ?? ''} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sale_starts_at">Bắt đầu khuyến mãi</Label>
            <Input
              id="sale_starts_at"
              name="sale_starts_at"
              type="datetime-local"
              value={formData.sale_starts_at?.toISOString().slice(0, 16) || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sale_starts_at: e.target.value ? new Date(e.target.value) : null,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sale_ends_at">Kết thúc khuyến mãi</Label>
            <Input
              id="sale_ends_at"
              name="sale_ends_at"
              type="datetime-local"
              value={formData.sale_ends_at?.toISOString().slice(0, 16) || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sale_ends_at: e.target.value ? new Date(e.target.value) : null,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              name="status"
              value={(formData.status as string) || 'DRAFT'}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Bản nháp</SelectItem>
                <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="published_at">Ngày xuất bản</Label>
            <Input
              id="published_at"
              name="published_at"
              type="datetime-local"
              value={formData.published_at?.toISOString().slice(0, 16) || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  published_at: e.target.value ? new Date(e.target.value) : null,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_title">Tiêu đề SEO</Label>
            <Input id="seo_title" name="seo_title" value={formData.seo_title || ''} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_description">Mô tả SEO</Label>
            <Textarea id="seo_description" name="seo_description" value={formData.seo_description || ''} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_og_image">Ảnh OG (SEO)</Label>
            <Input id="seo_og_image" name="seo_og_image" value={formData.seo_og_image || ''} onChange={handleChange} />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
