import React from "react";
import "./MediaDetails.scss";
import type { MediaItemDetails } from "../../models";

export type MediaDetailsProps = {
  media: MediaItemDetails;
  onPlay?: () => void;
  onAddToList?: () => void;
};

const MediaDetails: React.FC<MediaDetailsProps> = ({
  media,
  onPlay,
  onAddToList,
}) => {
  const {
    title,
    imageUrl,
    description,
    year,
    runtime,
    genres,
    rating,
    director,
    stars,
    progress,
  } = media;

  return (
    <div className="media-details">
      <div className="media-details-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="media-details-content">
        <h2 className="media-details-title">{title}</h2>
        <div className="media-details-meta">
          {year && <span>{year}</span>}
          {runtime && <span>{runtime}</span>}
          {genres && genres.length > 0 && <span>{genres.join(", ")}</span>}
          {rating && <span>{rating}</span>}
        </div>
        {description && (
          <p className="media-details-description">{description}</p>
        )}
        {director && (
          <p>
            <strong>Director:</strong> {director}
          </p>
        )}
        {stars && stars.length > 0 && (
          <p>
            <strong>Starring:</strong> {stars.join(", ")}
          </p>
        )}

        {typeof progress === "number" && (
          <div className="media-details-progress">
            <div
              className="media-details-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="media-details-actions">
          {onPlay && <button onClick={onPlay}>Watch</button>}
          {onAddToList && (
            <button onClick={onAddToList}>Add to Watchlist</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
