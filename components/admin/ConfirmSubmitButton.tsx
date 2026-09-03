"use client";

import { useRef } from "react";

export default function ConfirmSubmitButton({
  action,
  confirmMessage,
  label,
  className,
}: {
  action: (formData: FormData) => void;
  confirmMessage: string;
  label: string;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (window.confirm(confirmMessage)) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form action={action} ref={formRef}>
      <button type="submit" onClick={handleClick} className={className}>
        {label}
      </button>
    </form>
  );
}
