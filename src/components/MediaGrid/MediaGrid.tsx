import React, { useEffect, useRef, useState, useCallback } from "react";
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

  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const focusIndex = useCallback((idx: number) => {
    setActiveIndex(idx);
    // focus after state update in next tick
    requestAnimationFrame(() => {
      cardRefs.current[idx]?.focus();
    });
  }, []);

  const onGridKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const cols = columns || 4;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(items.length - 1, activeIndex + 1);
      focusIndex(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.max(0, activeIndex - 1);
      focusIndex(prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(items.length - 1, activeIndex + cols);
      focusIndex(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, activeIndex - cols);
      focusIndex(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusIndex(items.length - 1);
    } else if (e.key === "Tab") {
      // Optional: Tab moves within grid; allow natural tabbing out at ends
      if (!e.shiftKey && activeIndex < items.length - 1) {
        e.preventDefault();
        focusIndex(activeIndex + 1);
      } else if (e.shiftKey && activeIndex > 0) {
        e.preventDefault();
        focusIndex(activeIndex - 1);
      }
    }
  };

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

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  return (
    <div className="media-grid">
      {title && <h3 className="media-grid-title">{title}</h3>}
      <div
        className={`media-grid-container`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        role="grid"
        aria-label={title || "Media grid"}
        onKeyDown={onGridKeyDown}
      >
        {items.map((item, i) => (
          <MediaCard
            key={i}
            {...item}
            tabIndex={i === activeIndex ? 0 : -1}
            ref={setCardRef(i)}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="media-grid-sentinel" />
    </div>
  );
};

export default MediaGrid;
