'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateLeadForm({ action, loading }: { action: (formData: FormData) => void, loading?: boolean }) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input name="name" required />
      </div>
      <div>
        <Label>Phone</Label>
        <Input name="phone" required />
      </div>
      <div>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </div>
      <div>
        <Label>Student</Label>
        <Input name="student" />
      </div>
      <div>
        <Label>Age</Label>
        <Input name="age" type="number" />
      </div>
      <div>
        <Label>Interest</Label>
        <Input name="interest" />
      </div>
      <div>
        <Label>Course ID</Label>
        <Input name="course_id" />
      </div>
      <div>
        <Label>Message</Label>
        <Textarea name="message" />
      </div>
      <div>
        <Label>Source</Label>
        <Input name="source" />
      </div>
      <div>
        <Label>Consent</Label>
        <Input name="consent" type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
      </div>
    </form>
  );
}