import React from "react";
import classNames from "classnames";
import "./MediaCard.scss";

type MediaCardProps = {
  imageUrl: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  label?: string; // e.g., “New”, “HD”
  onClick?: () => void;
};

const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  title,
  size = "md",
  label,
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
      <div className="media-card-image-wrapper">
        <img
          src={imageUrl}
          alt={title || "Media card image"}
          className="media-card-image"
        />
      </div>
      {label && <span className="media-card-label">{label}</span>}
      {title && <div className="media-card-title">{title}</div>}
    </div>
  );
};

export default MediaCard;
