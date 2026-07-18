import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

interface FieldProps {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
}

export function TextField({
  label,
  name,
  required,
  hint,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-xs text-steel/80">{hint}</p>}
      <input id={name} name={name} required={required} className={inputClass} {...rest} />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  required,
  hint,
  ...rest
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-xs text-steel/80">{hint}</p>}
      <textarea id={name} name={name} required={required} rows={3} className={inputClass} {...rest} />
    </div>
  );
}

interface OptionProps {
  name: string;
  value: string;
  label: string;
  sublabel?: string;
  type: "checkbox" | "radio";
  required?: boolean;
  defaultChecked?: boolean;
}

export function OptionRow({ name, value, label, sublabel, type, required, defaultChecked }: OptionProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors has-checked:border-brand has-checked:bg-brand/5">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
      />
      <span className="text-sm">
        <span className="font-medium text-navy">{label}</span>
        {sublabel && <span className="mt-0.5 block text-xs text-steel/80">{sublabel}</span>}
      </span>
    </label>
  );
}

export function SubmitButton({ label, pending }: { label: string; pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-brand px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Odesílám…" : label}
    </button>
  );
}
