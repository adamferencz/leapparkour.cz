"use client";

import { useCallback, useEffect, useRef } from "react";

type DraftValues = Record<string, string[]>;

function readDraft(storageKey: string): DraftValues | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

    return parsed as DraftValues;
  } catch {
    return null;
  }
}

function writeDraft(storageKey: string, form: HTMLFormElement) {
  const values: DraftValues = {};

  for (const [name, value] of new FormData(form).entries()) {
    if (typeof value !== "string") continue;
    (values[name] ??= []).push(value);
  }

  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(values));
  } catch {
    // Odeslání musí fungovat i při zakázaném úložišti prohlížeče.
  }
}

function restoreDraft(form: HTMLFormElement, values: DraftValues) {
  const fields = Array.from(form.elements).filter(
    (element): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement,
  );

  for (const field of fields) {
    if (!field.name || field.type === "submit" || field.type === "hidden") continue;

    const saved = values[field.name] ?? [];
    if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) {
      field.checked = saved.includes(field.value || "on");
    } else if (saved[0] !== undefined) {
      field.value = saved[0];
    }

    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

export function useFormDraft(storageKey: string, restoreSignal: unknown) {
  const formRef = useRef<HTMLFormElement>(null);

  const restore = useCallback(() => {
    const form = formRef.current;
    const draft = readDraft(storageKey);
    if (form && draft) restoreDraft(form, draft);
  }, [storageKey]);

  useEffect(() => {
    restore();
  }, [restore]);

  useEffect(() => {
    if (restoreSignal === null || restoreSignal === undefined) return;

    const frame = window.requestAnimationFrame(restore);
    return () => window.cancelAnimationFrame(frame);
  }, [restore, restoreSignal]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const save = () => writeDraft(storageKey, form);
    form.addEventListener("input", save);
    form.addEventListener("change", save);

    return () => {
      form.removeEventListener("input", save);
      form.removeEventListener("change", save);
    };
  }, [storageKey]);

  return formRef;
}

export function ClearFormDraft({ storageKey }: { storageKey: string }) {
  useEffect(() => {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // Není co řešit, pokud prohlížeč úložiště blokuje.
    }
  }, [storageKey]);

  return null;
}
