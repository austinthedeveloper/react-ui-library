import "./Playing.scss";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { PlayingFooter } from "../PlayingFooter/PlayingFooter";
import { PlayingHeader } from "../PlayingHeader/PlayingHeader";

type PlayingProps = {
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
  const [isVisible, setIsVisible] = useState(true);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const resetHideTimer = useCallback(() => {
    if (!autoHide) return;

    setIsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);

    hideTimer.current = setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay || 3000);
  }, [autoHide, autoHideDelay]);
  useEffect(() => {
    if (!autoHide) return;

    const handleUserActivity = () => resetHideTimer();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetHideTimer(); // Start the initial timer

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [autoHide, resetHideTimer]);

  return (
    <div className="playing-container">
      <img src="/movies/movie-scene.png" />
      {isVisible && (
        <>
          <PlayingHeader
            brand={brand}
            title={title}
            onControl={(action) => console.log("Control clicked:", action)}
          />
          <PlayingFooter
            currentTime={currentTime}
            duration={duration}
            onControl={(action) => console.log("Control clicked:", action)}
          />
        </>
      )}
    </div>
  );
};

export default Playing;
