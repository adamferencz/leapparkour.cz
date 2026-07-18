"use client";

import { useRef } from "react";

export default function DeleteButton({
  action,
  label = "Smazat přihlášku",
}: {
  action: (formData: FormData) => void;
  label?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const confirmed = window.confirm(
      "Opravdu chcete tuto přihlášku trvale smazat? Akci nelze vrátit zpět."
    );
    if (confirmed) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form action={action} ref={formRef}>
      <button
        type="submit"
        onClick={handleClick}
        className="rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
      >
        {label}
      </button>
    </form>
  );
}
