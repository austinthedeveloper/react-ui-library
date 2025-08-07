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
  title,
  size = "md",
  label,
  progress,
  onClick,
}) => {
  const classes = classNames("media-card", {
    "media-card-sm": size === "sm",
    "media-card-md": size === "md",
    "media-card-lg": size === "lg",
  });

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
      {title && <div className="media-card-title">{title}</div>}
      {typeof progress === "number" && (
        <div className="media-card-progress">
          <div
            className="media-card-progress-bar"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MediaCard;
