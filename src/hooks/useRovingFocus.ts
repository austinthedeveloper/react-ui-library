import { useCallback, useRef, useState } from "react";

export type RovingOptions = {
  itemCount: number;
  columns?: number; // optional (for grid-like Up/Down). Omit for carousel.
  allowTabWithin?: boolean; // Tab/Shift+Tab move inside the list until edges
};

export function useRovingFocus({
  itemCount,
  columns,
  allowTabWithin = true,
}: RovingOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const focusIndex = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(itemCount - 1, idx));
      setActiveIndex(next);
      requestAnimationFrame(() => itemRefs.current[next]?.focus());
    },
    [itemCount]
  );

  const setItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    []
  );

  const getTabIndex = useCallback(
    (index: number) => (index === activeIndex ? 0 : -1),
    [activeIndex]
  );

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (itemCount === 0) return;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusIndex(activeIndex + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusIndex(activeIndex - 1);
        break;
      case "ArrowDown":
        if (columns) {
          e.preventDefault();
          focusIndex(activeIndex + columns);
        }
        break;
      case "ArrowUp":
        if (columns) {
          e.preventDefault();
          focusIndex(activeIndex - columns);
        }
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(itemCount - 1);
        break;
      case "Tab":
        if (!allowTabWithin) return;
        if (!e.shiftKey && activeIndex < itemCount - 1) {
          e.preventDefault();
          focusIndex(activeIndex + 1);
        } else if (e.shiftKey && activeIndex > 0) {
          e.preventDefault();
          focusIndex(activeIndex - 1);
        }
        break;
    }
  };

  return {
    activeIndex,
    focusIndex,
    getTabIndex,
    setItemRef,
    onKeyDown,
  };
}
