'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// CKEditor (tắt SSR để tránh lỗi hydrate)
const CKEditor = dynamic(async () => (await import("@ckeditor/ckeditor5-react")).CKEditor, { ssr: false });
// Build Classic
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface BlogPostContent {
  text: string;
}

interface BlogPostFormData {
  id?: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content: BlogPostContent;
  cover_url?: string;
  status: string;
  published_at?: string; // ISO string "YYYY-MM-DDTHH:mm"
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
}

// Kiểu tối thiểu cho editor trong callback (để không dùng any)
type EditorLike = { getData: () => string };

export default function EditBlogPostForm({ initialData }: { initialData: BlogPostFormData }) {
  const router = useRouter();

  const [formData, setFormData] = useState<BlogPostFormData>({
    ...initialData,
    content: initialData.content || { text: "" },
    published_at: initialData.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 16) // chuẩn cho input datetime-local
      : "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await fetch(`/api/admin/blog-posts/${initialData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              // Gửi Date hoặc null lên API (như ý tưởng cũ)
              published_at: formData.published_at ? new Date(formData.published_at) : null,
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data?.error || "Cập nhật thất bại");
          toast.success("Cập nhật thành công");
          router.push("/admin/blog-posts");
        } catch (err: unknown) {
          const error = err as Error;
          toast.error(error?.message || "Lỗi khi cập nhật bài viết");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="title">Tiêu đề</Label>
        <Input id="title" name="title" value={formData.title || ""} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" value={formData.slug || ""} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Mô tả ngắn</Label>
        <Textarea id="excerpt" name="excerpt" value={formData.excerpt || ""} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Nội dung</Label>
        <CKEditor
          // Cast này để vượt qua mismatch type giữa wrapper & build (Watchdog)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          editor={ClassicEditor as unknown as any}
          data={formData.content?.text || ""}
          onChange={(_, editor) => {
            const data = (editor as unknown as EditorLike).getData();
            setFormData((prev) => ({ ...prev, content: { text: data } }));
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover_url">URL ảnh bìa</Label>
        <Input id="cover_url" name="cover_url" value={formData.cover_url || ""} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value: string) => setFormData((prev) => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Nháp</SelectItem>
            <SelectItem value="PUBLISHED">Xuất bản</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="published_at">Ngày xuất bản</Label>
        <Input
          id="published_at"
          name="published_at"
          type="datetime-local"
          value={formData.published_at || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo_title">SEO Title</Label>
        <Input id="seo_title" name="seo_title" value={formData.seo_title || ""} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo_description">SEO Description</Label>
        <Textarea id="seo_description" name="seo_description" value={formData.seo_description || ""} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo_og_image">SEO OG Image</Label>
        <Input id="seo_og_image" name="seo_og_image" value={formData.seo_og_image || ""} onChange={handleChange} />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Đang cập nhật..." : "Cập nhật"}
      </Button>
    </form>
  );
}
