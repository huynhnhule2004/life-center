'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { CourseInstances } from '@/lib/types/database';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// --- Helpers ---
const toDateTimeLocal = (v: unknown): string =>
  v ? new Date(v as string | number | Date).toISOString().slice(0, 16) : '';

const toDateLocal = (v: unknown): string => {
  if (!v) return '';
  // Hỗ trợ cả Date và string ISO
  const d = typeof v === 'string' ? new Date(v) : (v as Date);
  if (isNaN(d?.getTime?.() ?? NaN)) return '';
  // Lấy phần "YYYY-MM-DD" theo UTC (tránh lệch múi giờ khi input type="date")
  return d.toISOString().slice(0, 10);
};

// Trả về string "YYYY-MM-DD" hoặc null
const asDateString = (v: string) => (v ? v : null);

// Trả về ISO cho datetime-local hoặc null
const asDateTimeISO = (v: string) => (v ? new Date(v).toISOString() : null);

// Parse JSON an toàn
type InvalidJSON = { __INVALID__: true };
const safeParseJSON = (s: string): unknown | InvalidJSON => {
  if (s.trim() === '') return null;
  try {
    return JSON.parse(s);
  } catch {
    return { __INVALID__: true };
  }
};

// Ép số: '' -> null, số -> Number(n)
const toNullableNumber = (v: string) => (v === '' ? null : Number(v));

type StatusValue = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

export default function EditCourseInstanceForm({
  initialData,
}: {
  initialData: CourseInstances;
}) {
  const router = useRouter();

  // Chuẩn hoá state hiển thị cho input
  const [form, setForm] = useState({
    course_id: String(initialData.course_id ?? ''),
    code: String(initialData.code ?? ''),
    // date-only (YYYY-MM-DD)
    start_date: toDateLocal(initialData.start_date),
    end_date: toDateLocal(initialData.end_date),
    // JSONB → textarea string
    scheduleText:
      typeof initialData.schedule === 'string'
        ? initialData.schedule
        : initialData.schedule
        ? JSON.stringify(initialData.schedule, null, 2)
        : '',
    timezone: String(initialData.timezone ?? ''),
    seats:
      initialData.seats === null || initialData.seats === undefined
        ? ''
        : String(initialData.seats),
    enrolled:
      initialData.enrolled === null || initialData.enrolled === undefined
        ? ''
        : String(initialData.enrolled),
    price_override:
      initialData.price_override === null || initialData.price_override === undefined
        ? ''
        : String(initialData.price_override),
    sale_price_override:
      initialData.sale_price_override === null ||
      initialData.sale_price_override === undefined
        ? ''
        : String(initialData.sale_price_override),
    // datetime-local
    sale_starts_at: toDateTimeLocal(initialData.sale_starts_at),
    sale_ends_at: toDateTimeLocal(initialData.sale_ends_at),
    // status enum
    status: String(initialData.status ?? 'PLANNED') as StatusValue | (string & {}),
    note: String(initialData.note ?? ''),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const original = useMemo(
    () => ({
      course_id: String(initialData.course_id ?? ''),
      code: String(initialData.code ?? ''),
      start_date: toDateLocal(initialData.start_date),
      end_date: toDateLocal(initialData.end_date),
      scheduleText:
        typeof initialData.schedule === 'string'
          ? initialData.schedule
          : initialData.schedule
          ? JSON.stringify(initialData.schedule, null, 2)
          : '',
      timezone: String(initialData.timezone ?? ''),
      seats:
        initialData.seats === null || initialData.seats === undefined
          ? ''
          : String(initialData.seats),
      enrolled:
        initialData.enrolled === null || initialData.enrolled === undefined
          ? ''
          : String(initialData.enrolled),
      price_override:
        initialData.price_override === null ||
        initialData.price_override === undefined
          ? ''
          : String(initialData.price_override),
      sale_price_override:
        initialData.sale_price_override === null ||
        initialData.sale_price_override === undefined
          ? ''
          : String(initialData.sale_price_override),
      sale_starts_at: toDateTimeLocal(initialData.sale_starts_at),
      sale_ends_at: toDateTimeLocal(initialData.sale_ends_at),
      status: String(initialData.status ?? 'PLANNED') as StatusValue,
      note: String(initialData.note ?? ''),
    }),
    [initialData]
  );

  const dirty = JSON.stringify(form) !== JSON.stringify(original);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { type, value } = e.target as HTMLInputElement;
      setForm((p) => ({
        ...p,
        [key]: type === 'number' ? (value === '' ? '' : value) : value,
      }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      // Validate schedule JSON
      const scheduleParsed = safeParseJSON(form.scheduleText);
      if ((scheduleParsed as InvalidJSON)?.__INVALID__) {
        throw new Error('Schedule không phải JSON hợp lệ.');
      }

      // Chuẩn payload gửi API
      const payload = {
        course_id: form.course_id || null,
        code: form.code || null,
        // date-only: gửi dạng YYYY-MM-DD (DB type DATE)
        start_date: asDateString(form.start_date),
        end_date: asDateString(form.end_date),
        schedule: scheduleParsed, // null hoặc object hợp lệ
        timezone: form.timezone || null,
        seats: toNullableNumber(form.seats),
        enrolled: toNullableNumber(form.enrolled),
        price_override: toNullableNumber(form.price_override),
        sale_price_override: toNullableNumber(form.sale_price_override),
        // datetime-local -> ISO (DB type timestamptz)
        sale_starts_at: asDateTimeISO(form.sale_starts_at),
        sale_ends_at: asDateTimeISO(form.sale_ends_at),
        status: (form.status as StatusValue) || 'PLANNED',
        note: form.note || null,
      };

      const res = await fetch(
        `/api/admin/course-instances/${encodeURIComponent(String(initialData.id))}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      let data: unknown = null;
      try {
        data = await res.clone().json();
      } catch {}

      if (!res.ok) {
        const text =
          typeof data === 'object' && data !== null && 'message' in data
            ? (data as { message?: string }).message || `HTTP ${res.status} cập nhật thất bại`
            : `HTTP ${res.status} cập nhật thất bại`;
        throw new Error(text);
      }

      router.push('/admin/course-instances');
      router.refresh();
    } catch (err: unknown) {
      console.error('[Edit CourseInstance] error:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Error updating course instance'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Course ID</Label>
          <Input
            name="course_id"
            value={form.course_id}
            onChange={onChange('course_id')}
            required
          />
        </div>

        <div>
          <Label>Code</Label>
          <Input name="code" value={form.code} onChange={onChange('code')} />
        </div>

        <div>
          <Label>Start Date</Label>
          <Input
            name="start_date"
            type="date"
            value={form.start_date}
            onChange={onChange('start_date')}
          />
        </div>

        <div>
          <Label>End Date</Label>
          <Input
            name="end_date"
            type="date"
            value={form.end_date}
            onChange={onChange('end_date')}
          />
        </div>
      </div>

      <div>
        <Label>Schedule (JSON)</Label>
        <Textarea
          name="schedule"
          value={form.scheduleText}
          onChange={onChange('scheduleText')}
          placeholder='{"mon":[{"start":"09:00","end":"11:00"}]}'
          className="min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Timezone</Label>
          <Input
            name="timezone"
            value={form.timezone}
            onChange={onChange('timezone')}
            placeholder="Asia/Ho_Chi_Minh"
          />
        </div>

        <div>
          <Label>Seats</Label>
          <Input
            name="seats"
            type="number"
            value={form.seats}
            onChange={onChange('seats')}
            min={0}
          />
        </div>

        <div>
          <Label>Enrolled</Label>
          <Input
            name="enrolled"
            type="number"
            value={form.enrolled}
            onChange={onChange('enrolled')}
            min={0}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label>Price Override</Label>
          <Input
            name="price_override"
            type="number"
            value={form.price_override}
            onChange={onChange('price_override')}
            min={0}
            step="0.01"
          />
        </div>

        <div>
          <Label>Sale Price Override</Label>
          <Input
            name="sale_price_override"
            type="number"
            value={form.sale_price_override}
            onChange={onChange('sale_price_override')}
            min={0}
            step="0.01"
          />
        </div>

        <div>
          <Label>Sale Starts At</Label>
          <Input
            name="sale_starts_at"
            type="datetime-local"
            value={form.sale_starts_at}
            onChange={onChange('sale_starts_at')}
          />
        </div>

        <div>
          <Label>Sale Ends At</Label>
          <Input
            name="sale_ends_at"
            type="datetime-local"
            value={form.sale_ends_at}
            onChange={onChange('sale_ends_at')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Status</Label>
          <Select
            value={form.status}
            onValueChange={(v) => setForm((p) => ({ ...p, status: v as StatusValue }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PLANNED">Planned</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label>Note</Label>
          <Textarea name="note" value={form.note} onChange={onChange('note')} />
        </div>
      </div>

      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

      <Button type="submit" disabled={loading || !dirty}>
        {loading ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
}
