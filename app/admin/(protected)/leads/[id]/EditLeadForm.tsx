'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Leads } from "@/lib/types/database";

export default function EditLeadForm({ initialData, action, loading }: { initialData: Leads, action: (formData: FormData) => void, loading?: boolean }) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input name="name" defaultValue={initialData.name} required />
      </div>
      <div>
        <Label>Phone</Label>
        <Input name="phone" defaultValue={initialData.phone} required />
      </div>
      <div>
        <Label>Email</Label>
        <Input name="email" type="email" defaultValue={initialData.email || ""} />
      </div>
      <div>
        <Label>Student</Label>
        <Input name="student" defaultValue={initialData.student || ""} />
      </div>
      <div>
        <Label>Age</Label>
        <Input name="age" type="number" defaultValue={initialData.age || ""} />
      </div>
      <div>
        <Label>Interest</Label>
        <Input name="interest" defaultValue={initialData.interest || ""} />
      </div>
      <div>
        <Label>Course ID</Label>
        <Input name="course_id" defaultValue={initialData.course_id || ""} />
      </div>
      <div>
        <Label>Message</Label>
        <Textarea name="message" defaultValue={initialData.message || ""} />
      </div>
      <div>
        <Label>Source</Label>
        <Input name="source" defaultValue={initialData.source || ""} />
      </div>
      <div>
        <Label>Consent</Label>
        <Input name="consent" type="checkbox" defaultChecked={!!initialData.consent} />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</Button>
    </form>
  );
}