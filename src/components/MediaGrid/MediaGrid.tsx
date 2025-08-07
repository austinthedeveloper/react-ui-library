import React, { useEffect, useRef } from "react";
import MediaCard, { type MediaCardProps } from "../MediaCard/MediaCard";
import "./MediaGrid.scss";

type MediaGridProps = {
  title?: string;
  items: MediaCardProps[];
  columns?: 3 | 4 | 5;
  onLoadMore?: () => void; // trigger when bottom is near
};

const MediaGrid: React.FC<MediaGridProps> = ({
  title,
  items,
  columns = 4,
  onLoadMore,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: "100px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <div className="media-grid">
      {title && <h3 className="media-grid-title">{title}</h3>}
      <div
        className={`media-grid-container`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((item, i) => (
          <MediaCard key={i} {...item} />
        ))}
      </div>
      <div ref={sentinelRef} className="media-grid-sentinel" />
    </div>
  );
};

export default MediaGrid;
