// useMediaKeyboardShortcuts.ts
import { useEffect } from "react";

export function useMediaKeyboardShortcuts(
  handleControl: (action: string) => void,
  toggleMute: () => void,
  setVolume: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName?.toLowerCase();
        if (
          target.isContentEditable ||
          ["input", "textarea", "select", "button"].includes(tag)
        ) {
          return;
        }
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          handleControl("togglePlay");
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.05));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.05));
          break;
        case "ArrowRight":
          e.preventDefault();
          handleControl("seekForward");
          break;
        case "ArrowLeft":
          e.preventDefault();
          handleControl("seekBackward");
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleControl, toggleMute, setVolume]);
}
