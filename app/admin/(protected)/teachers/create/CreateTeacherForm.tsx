'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Teachers } from '@/lib/types/database';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CreateTeacherForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Teachers>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = {
        ...formData,
        socials: (() => { try { return formData.socials ? JSON.parse(String(formData.socials)) : null; } catch { return null; } })(),
      };
      const res = await fetch('/api/admin/teachers', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(()=>null);
      if (!res.ok) throw new Error(data?.message || 'Error creating teacher');
      router.push('/admin/teachers');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || 'Error creating teacher');
      } else {
        alert('Error creating teacher');
      }
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label>Name</Label><Input name="name" value={formData.name||''} onChange={handleChange} required/></div>
      <div><Label>Slug</Label><Input name="slug" value={formData.slug||''} onChange={handleChange} required/></div>
      <div><Label>Bio</Label><Textarea name="bio" value={formData.bio as string || ''} onChange={handleChange} required/></div>
      <div><Label>Avatar URL</Label><Input name="avatar_url" value={(formData.avatar_url as string)||''} onChange={handleChange}/></div>
      <div><Label>Socials (JSON)</Label>
        <Textarea name="socials" value={typeof formData.socials==='string'?formData.socials: (formData.socials?JSON.stringify(formData.socials):'')} onChange={handleChange} placeholder='{}'/></div>
      <Button type="submit" disabled={loading}>{loading?'Creating...':'Create'}</Button>
    </form>
  );
}
