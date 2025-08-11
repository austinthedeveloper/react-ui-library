import React, { useEffect, useRef } from "react";
import MediaCard, { type MediaCardProps } from "../MediaCard/MediaCard";
import "./MediaGrid.scss";
import { useRovingFocus } from "../../hooks";

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

  // Roving tab index + keyboard nav (arrows/home/end + optional intra-Tab)
  const { getTabIndex, setItemRef, onKeyDown } = useRovingFocus({
    itemCount: items.length,
    columns, // enables Up/Down jumping by column count
    allowTabWithin: true, // Tab/Shift+Tab move within grid until edges
  });

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
        className="media-grid-container"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        role="grid"
        aria-label={title || "Media grid"}
        onKeyDown={onKeyDown}
      >
        {items.map((item, i) => (
          <MediaCard
            key={i}
            {...item}
            tabIndex={getTabIndex(i)}
            ref={setItemRef(i)}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="media-grid-sentinel" />
    </div>
  );
};

export default MediaGrid;
