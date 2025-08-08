import React, { useRef, useState } from "react";
import {
  calculateTimePercent,
  secondsToTimeString,
  timeStringToSeconds,
} from "../../helpers";
import "./ProgressBarMedia.scss";

interface ProgressBarProps {
  currentTime: string; // "52:31"
  duration: string; // "01:55:15"
  onSeek?: (time: string) => void;
}

export const ProgressBarMedia: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [tooltipX, setTooltipX] = useState<number>(0);

  const durationSeconds = timeStringToSeconds(duration);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!barRef.current || durationSeconds === 0) return;

    const rect = barRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const ratio = offsetX / rect.width;
    const timeAtCursor = Math.min(
      durationSeconds,
      Math.max(0, ratio * durationSeconds)
    );

    setHoverTime(secondsToTimeString(timeAtCursor));
    setTooltipX(offsetX);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1); // Clamp 0–1

    const durationSeconds = timeStringToSeconds(duration);
    const seekSeconds = Math.round(durationSeconds * percent);

    if (onSeek) {
      const formatted = secondsToTimeString(seekSeconds);
      onSeek(formatted); // Emit as formatted time (hh:mm:ss or mm:ss)
    }
  };

  const progressPercent = calculateTimePercent(currentTime, duration); // already built

  return (
    <div
      className="progress-bar-media-wrapper"
      ref={barRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {hoverTime && (
        <div className="progress-tooltip" style={{ left: tooltipX }}>
          {hoverTime}
        </div>
      )}
      <div className="progress-track" onClick={handleClick}>
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
