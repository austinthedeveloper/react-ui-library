import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoHide(enabled = true, delay = 3000): boolean {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (!enabled) return;
    setIsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setIsVisible(false), delay);
  }, [enabled, delay]);

  useEffect(() => {
    if (!enabled) return;

    const handleUserActivity = () => resetTimer();
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [enabled, resetTimer]);

  return isVisible;
}
