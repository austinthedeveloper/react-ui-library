import "./Playing.scss";

import {
  faClosedCaptioning,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { PlayingFooter } from "../PlayingFooter/PlayingFooter";

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
      <div className={`playing-header ${!isVisible ? "invisible" : ""}`}>
        <span className="playing-label">{brand}</span>
        <span className="playing-title">{title}</span>
        <div className="playing-icons">
          <FontAwesomeIcon icon={faTowerBroadcast} />
          <FontAwesomeIcon icon={faClosedCaptioning} />
        </div>
      </div>
      <img src="/movies/movie-scene.png" />
      {isVisible && (
        <PlayingFooter
          currentTime={currentTime}
          duration={duration}
          onControl={(action) => console.log("Control clicked:", action)}
        />
      )}
    </div>
  );
};

export default Playing;
