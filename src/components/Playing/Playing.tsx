import "./Playing.scss";
import React, { useState } from "react";
import { useAutoHide } from "./useAutoHide"; // <-- custom hook
import { PlayingFooter } from "../PlayingFooter/PlayingFooter";
import { PlayingHeader } from "../PlayingHeader/PlayingHeader";
import { useMediaKeyboardShortcuts } from "../../hooks";

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
  useMediaKeyboardShortcuts(handleControl, toggleMute, setVolume);

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
