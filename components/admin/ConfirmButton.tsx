"use client";

export default function ConfirmButton({
  confirmMessage,
  label,
  className,
}: {
  confirmMessage: string;
  label: string;
  className?: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (window.confirm(confirmMessage)) {
      e.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <button type="submit" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
