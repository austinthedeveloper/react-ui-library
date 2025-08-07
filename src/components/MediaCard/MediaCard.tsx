import React from "react";
import classNames from "classnames";
import "./MediaCard.scss";

export type MediaCardProps = {
  imageUrl: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  label?: string; // e.g., “New”, “HD”
  onClick?: () => void;
  progress?: number;
};

const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  size = "md",
  label,
  progress = 0,
  onClick,
}) => {
  const classes = classNames("media-card", {
    "media-card-sm": size === "sm",
    "media-card-md": size === "md",
    "media-card-lg": size === "lg",
  });

  const getActionLabel = () => {
    if (progress === 0) return "Watch Now";
    if (progress === 100) return "Watch Again";
    return "Resume";
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div
        className="media-card-image-wrapper"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      {label && <span className="media-card-label">{label}</span>}
      {/* Progress */}
      {typeof progress === "number" && progress > 0 && (
        <div className="media-card-progress">
          <div
            className="media-card-progress-bar"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
      {/* Watch Button */}
      {onClick && (
        <button className="media-card-action btn btn-primary">
          {getActionLabel()}
        </button>
      )}
    </div>
  );
};

export default MediaCard;
