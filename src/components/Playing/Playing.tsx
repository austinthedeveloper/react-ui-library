import React from "react";
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
};

const Playing: React.FC<PlayingProps> = ({ title, currentTime, duration }) => {
  return (
    <div className="playing-container">
      <div className="playing-header">
        <span className="playing-label">Flicksy</span>
        <span className="playing-title">{title}</span>
        <div className="playing-icons">
          {/* TODO: Fix Chromecast icon */}
          <FontAwesomeIcon icon={faTowerBroadcast} />
          <FontAwesomeIcon icon={faClosedCaptioning} />
        </div>
      </div>
      <img src="/movies/movie-scene.png" />
      <div className="playing-footer">
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
