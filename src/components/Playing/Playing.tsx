import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Playing.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUndoAlt,
  faRedoAlt,
  faVolumeUp,
  faExpand,
  faClosedCaptioning,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className={`playing-footer ${!isVisible ? "invisible" : ""}`}>
        <div className="playing-progress">
          <span>{currentTime}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "45%" }} />
          </div>
          <span>{duration}</span>
        </div>

        <div className="playing-controls">
          <FontAwesomeIcon icon={faUndoAlt} />
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faRedoAlt} />
          <FontAwesomeIcon icon={faVolumeUp} />
          <FontAwesomeIcon icon={faExpand} />
        </div>
      </div>
    </div>
  );
};

export default Playing;
