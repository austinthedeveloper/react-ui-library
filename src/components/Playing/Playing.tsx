import "./Playing.scss";
import React from "react";
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

  const handleControl = (action: string) => {
    console.log("Control clicked:", action);
  };

  return (
    <div className="playing-container">
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
          />
        </>
      )}
    </div>
  );
};

export default Playing;
