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

interface PlayingFooterProps {
  currentTime: string;
  duration: string;
  onSeek?: (seconds: string) => void;
}

export const PlayingFooter: React.FC<PlayingFooterProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
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
        <FontAwesomeIcon icon={faUndoAlt} />
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faRedoAlt} />
        <FontAwesomeIcon icon={faVolumeUp} />
        <FontAwesomeIcon icon={faExpand} />
      </div>
    </div>
  );
};
