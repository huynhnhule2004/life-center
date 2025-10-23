"use client";
import React, { useRef, useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";
// import server action
import { deleteCourse } from "@/app/admin/(protected)/courses/actions";

type Props = {
  id: string;
  // cho phép nhận children (icon) từ parent
  children?: React.ReactNode;
};

export default function DeleteCourseForm({ id, children }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    setOpen(false);
    // requestSubmit nếu có, fallback submit
    if (formRef.current?.requestSubmit) {
      formRef.current.requestSubmit();
    } else {
      formRef.current?.submit();
    }
  };

  return (
    <>
      <form ref={formRef} action={deleteCourse} method="post" className="inline">
        <input type="hidden" name="id" value={id} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-red-500"
          title="Xóa"
          aria-label="Xóa"
        >
          {/* render children (icon) nếu có, nếu không thì hiển thị chữ "Xóa" */}
          {children ?? "Xóa"}
        </button>
      </form>

      <ConfirmDialog
        open={open}
        title="Xóa khóa học"
        description="Hành động này sẽ xóa khóa học vĩnh viễn. Bạn có chắc không?"
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
