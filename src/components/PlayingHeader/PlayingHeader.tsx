import {
  faTowerBroadcast,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PlayingHeader.scss";
import type { PlayerControl } from "../../models";
import "./PlayingHeader.scss";

export interface PlayingHeaderProps {
  brand: string;
  title: string;
  onControl?: (action: PlayerControl) => void;
}

export const PlayingHeader: React.FC<PlayingHeaderProps> = ({
  brand,
  title,
  onControl,
}) => {
  return (
    <div className="playing-header">
      <span className="playing-label">{brand}</span>
      <span className="playing-title">{title}</span>
      <div className="playing-icons">
        <button
          type="button"
          className="control-btn cast"
          aria-label="Cast"
          title="Cast"
          onClick={() => onControl?.("cast")}
        >
          <FontAwesomeIcon icon={faTowerBroadcast} />
        </button>
        <button
          type="button"
          className="control-btn captions"
          aria-label="Closed Captions"
          title="Closed Captions"
          onClick={() => onControl?.("cc")}
        >
          <FontAwesomeIcon icon={faClosedCaptioning} />
        </button>
      </div>
    </div>
  );
};
