import React from "react";
import { ProgressBarMedia } from "../ProgressBarMedia/ProgressBarMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUndoAlt,
  faRedoAlt,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import "./PlayingFooter.scss";
import type { PlayerControl } from "../../models";
import { VolumeControl } from "../VolumeControl/VolumeControl";

interface PlayingFooterProps {
  currentTime: string;
  duration: string;
  onSeek?: (seconds: string) => void;
  onControl: (action: PlayerControl) => void;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number) => void;
  onMuteToggle: () => void;
}

export const PlayingFooter: React.FC<PlayingFooterProps> = ({
  currentTime,
  duration,
  onSeek,
  onControl,
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
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
        <button
          type="button"
          className="control-btn rewind"
          aria-label="Rewind"
          title="Rewind"
          onClick={() => onControl?.("rewind")}
        >
          <FontAwesomeIcon icon={faUndoAlt} />
        </button>

        <button
          type="button"
          className="control-btn play"
          aria-label="Play"
          title="Play"
          onClick={() => onControl?.("play")}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>

        <button
          type="button"
          className="control-btn forward"
          aria-label="Forward"
          title="Forward"
          onClick={() => onControl?.("forward")}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>

        <VolumeControl
          value={volume}
          isMuted={isMuted}
          onChange={onVolumeChange}
          onToggleMute={onMuteToggle}
        />

        <button
          type="button"
          className="control-btn fullscreen"
          aria-label="Fullscreen"
          title="Fullscreen"
          onClick={() => onControl?.("fullscreen")}
        >
          <FontAwesomeIcon icon={faExpand} />
        </button>
      </div>
    </div>
  );
};
