import "./Playing.scss";
import React, { useState, useEffect } from "react";
import { useAutoHide } from "./useAutoHide"; // <-- custom hook
import { PlayingFooter } from "../PlayingFooter/PlayingFooter";
import { PlayingHeader } from "../PlayingHeader/PlayingHeader";

export type PlayingProps = {
  title: string;
  currentTime: string;
  duration: string;
  brand: string;
  autoHide?: boolean;
  autoHideDelay?: number;
};

const Playing: React.FC<PlayingProps> = ({
  title,
  currentTime,
  duration,
  brand = "Flicksy",
  autoHide = true,
  autoHideDelay = 2000,
}) => {
  const isVisible = useAutoHide(autoHide, autoHideDelay);
  const [volume, setVolume] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handleControl = (action: string) => {
    console.log("Control clicked:", action);
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (!prev) setPreviousVolume(volume);
      else setVolume(previousVolume);
      return !prev;
    });
  };

  // Global keyboard shortcuts for media control
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Avoid hijacking keys while typing in inputs, textareas, selects, buttons, or editable regions
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName?.toLowerCase();
        const isTypingElement =
          target.isContentEditable ||
          tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          tag === "button";
        if (isTypingElement) return;
      }
      console.log("hit", e.key);

      switch (e.key) {
        case " ": // Space: toggle play/pause
          e.preventDefault();
          handleControl("togglePlay");
          break;
        case "m": // M: mute/unmute
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        case "ArrowUp": // Volume up
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.05));
          break;
        case "ArrowDown": // Volume down
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.05));
          break;
        case "ArrowRight": // Seek forward (delegate to footer control logic)
          e.preventDefault();
          handleControl("seekForward");
          break;
        case "ArrowLeft": // Seek backward
          e.preventDefault();
          handleControl("seekBackward");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleMute]);

  return (
    <div
      className="playing-container"
      tabIndex={0}
      aria-label="Now playing"
      role="region"
    >
      <img src="/movies/movie-scene.png" />

      {isVisible && (
        <>
          <PlayingHeader
            brand={brand}
            title={title}
            onControl={handleControl}
          />
          <PlayingFooter
            currentTime={currentTime}
            duration={duration}
            onControl={handleControl}
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onMuteToggle={toggleMute}
          />
        </>
      )}
    </div>
  );
};

export default Playing;
