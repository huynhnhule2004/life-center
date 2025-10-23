'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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

// ==== Types cho form (độc lập với DB type để dễ kiểm soát) ====
type FormState = {
  title?: string;
  slug?: string;
  summary?: string;
  content: { text: string };
  cover_url?: string;
  mode?: string;
  duration_wk?: number | null;
  price?: number | null;
  sale_price?: number | null;
  sale_starts_at?: Date | null;
  sale_ends_at?: Date | null;
  status: 'DRAFT' | 'PUBLISHED';
  published_at?: Date | null;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
};

// Tối thiểu những gì ta cần từ editor (tránh dùng any trong callback)
type EditorLike = { getData: () => string };

// Hiển thị giá trị cho <input type="datetime-local">
function toLocalInputValue(d?: Date | null): string {
  return d ? new Date(d).toISOString().slice(0, 16) : '';
}

export default function CreateCourseForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    status: 'DRAFT',
    content: { text: '' },
    duration_wk: null,
    price: null,
    sale_price: null,
    sale_starts_at: null,
    sale_ends_at: null,
    published_at: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        sale_starts_at: formData.sale_starts_at ? formData.sale_starts_at.toISOString() : null,
        sale_ends_at: formData.sale_ends_at ? formData.sale_ends_at.toISOString() : null,
        published_at: formData.published_at ? formData.published_at.toISOString() : null,
      };

      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Lỗi khi tạo khóa học');

      toast.success('Tạo khóa học thành công');
      router.push('/admin/courses');
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : 'Lỗi khi tạo khóa học';

      if (msg.toLowerCase().includes('row-level security')) {
        toast.error('Lỗi quyền: Không thể tạo bản ghi do chính sách RLS. ' + msg);
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tạo khóa học</CardTitle>
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
            <Label>Nội dung</Label>
            <CKEditor
              // Ép kiểu duy nhất tại prop editor để vượt qua mismatch type (Watchdog)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              editor={ClassicEditor as unknown as any}
              data={formData.content?.text || ''}
              onChange={(_, editor) => {
                const html = (editor as unknown as EditorLike).getData();
                setFormData((prev) => ({ ...prev, content: { text: html } }));
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
              value={toLocalInputValue(formData.sale_starts_at)}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sale_starts_at: e.target.value ? new Date(e.target.value) : null }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sale_ends_at">Kết thúc khuyến mãi</Label>
            <Input
              id="sale_ends_at"
              name="sale_ends_at"
              type="datetime-local"
              value={toLocalInputValue(formData.sale_ends_at)}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sale_ends_at: e.target.value ? new Date(e.target.value) : null }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value as 'DRAFT' | 'PUBLISHED' }))
              }
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
              value={toLocalInputValue(formData.published_at)}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, published_at: e.target.value ? new Date(e.target.value) : null }))
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
            {loading ? 'Đang tạo...' : 'Tạo'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
