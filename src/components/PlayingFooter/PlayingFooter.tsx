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
          onClick={() => onControl?.("rewind")}
        />
        <FontAwesomeIcon icon={faPlay} onClick={() => onControl?.("play")} />
        <FontAwesomeIcon
          icon={faRedoAlt}
          onClick={() => onControl?.("forward")}
        />
        <FontAwesomeIcon
          icon={faVolumeUp}
          onClick={() => onControl?.("volume")}
        />
        <FontAwesomeIcon
          icon={faExpand}
          onClick={() => onControl?.("fullscreen")}
        />
      </div>
    </div>
  );
};
