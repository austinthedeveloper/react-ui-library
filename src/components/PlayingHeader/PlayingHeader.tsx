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
        <FontAwesomeIcon
          icon={faTowerBroadcast}
          onClick={() => onControl?.("cast")}
          className="clickable-icon"
        />
        <FontAwesomeIcon
          icon={faClosedCaptioning}
          onClick={() => onControl?.("cc")}
          className="clickable-icon"
        />
      </div>
    </div>
  );
};
