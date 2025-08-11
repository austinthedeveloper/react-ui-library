import { useEffect, useMemo, useState } from "react";

type GetLabel<T> = (item: T) => string | undefined;

export function useAriaAnnouncement<T>(
  items: T[],
  activeIndex: number,
  getLabel: GetLabel<T>
) {
  const [message, setMessage] = useState("");

  const text = useMemo(() => {
    if (!items.length) return "";
    const label = getLabel(items[activeIndex]);
    const pos = activeIndex + 1;
    const total = items.length;
    return label
      ? `Item ${pos} of ${total}: ${label}`
      : `Item ${pos} of ${total}`;
  }, [items, activeIndex, getLabel]);

  useEffect(() => {
    // Debounced update avoids overly chatty SR output if focus moves quickly
    const id = window.setTimeout(() => setMessage(text), 40);
    return () => window.clearTimeout(id);
  }, [text]);

  return message;
}
