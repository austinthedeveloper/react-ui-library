import React from "react";
import { ProgressBarMedia } from "../ProgressBarMedia/ProgressBarMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUndoAlt,
  faRedoAlt,
  faVolumeUp,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import "./PlayingFooter.scss";
import type { PlayerControl } from "../../models";

interface PlayingFooterProps {
  currentTime: string;
  duration: string;
  onSeek?: (seconds: string) => void;
  onControl: (action: PlayerControl) => void;
}

export const PlayingFooter: React.FC<PlayingFooterProps> = ({
  currentTime,
  duration,
  onSeek,
  onControl,
}) => {
  const handleControlClick = (type: PlayerControl) => {
    onControl(type);
  };
  return (
    <div className="playing-footer">
      <div className="playing-progress">
        <span>{currentTime}</span>
        <ProgressBarMedia
          currentTime={currentTime}
          duration={duration}
          onSeek={onSeek}
        />
        <span>{duration}</span>
      </div>

      <div className="playing-controls">
        <FontAwesomeIcon
          icon={faUndoAlt}
          onClick={() => handleControlClick("rewind")}
        />
        <FontAwesomeIcon
          icon={faPlay}
          onClick={() => handleControlClick("play")}
        />
        <FontAwesomeIcon
          icon={faRedoAlt}
          onClick={() => handleControlClick("forward")}
        />
        <FontAwesomeIcon
          icon={faVolumeUp}
          onClick={() => handleControlClick("volume")}
        />
        <FontAwesomeIcon
          icon={faExpand}
          onClick={() => handleControlClick("fullscreen")}
        />
      </div>
    </div>
  );
};
