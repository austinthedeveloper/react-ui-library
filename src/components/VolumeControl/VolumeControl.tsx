import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import "./VolumeControl.scss";

interface VolumeControlProps {
  value: number; // 0 to 1
  isMuted: boolean;
  onChange: (volume: number) => void;
  onToggleMute: () => void;
}
export const VolumeControl: React.FC<VolumeControlProps> = ({
  value,
  isMuted,
  onChange,
  onToggleMute,
}) => {
  const [showSlider, setShowSlider] = useState(false);

  const icon =
    isMuted || value === 0
      ? faVolumeXmark
      : value < 0.5
      ? faVolumeLow
      : faVolumeHigh;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    onChange(newVolume);
  };

  return (
    <div
      className="volume-control"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <FontAwesomeIcon icon={icon} onClick={onToggleMute} />

      {showSlider && (
        <div className="volume-slider-wrapper">
          <input
            className="volume-slider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : value}
            onChange={handleSliderChange}
          />
        </div>
      )}
    </div>
  );
};
