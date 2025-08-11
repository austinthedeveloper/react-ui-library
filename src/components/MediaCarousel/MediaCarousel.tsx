import React, { useCallback } from "react";
import "./MediaCarousel.scss";
import MediaCard, { type MediaCardProps } from "../MediaCard/MediaCard";
import classNames from "classnames";
import {
  useMeasureElementWidth,
  useScrollIndicators,
  useRovingFocus,
} from "../../hooks";

type MediaCarouselProps = {
  title?: string;
  items: MediaCardProps[];
  cardsPerScroll?: number;
};

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  title,
  items,
  cardsPerScroll = 1,
}) => {
  // measure a card so we know how much to scroll per click
  const { measureRef, width: cardWidth } = useMeasureElementWidth([
    items.length,
  ]);
  const pxPerScroll = cardWidth * (cardsPerScroll ?? 1);

  // scroll indicators and behavior
  const { scrollRef, canScrollLeft, canScrollRight, scrollBy } =
    useScrollIndicators();

  // roving tabindex and keyboard nav (carousel style: Left/Right/Home/End + optional intra-Tab)
  const { activeIndex, getTabIndex, setItemRef, onKeyDown, focusIndex } =
    useRovingFocus({
      itemCount: items.length,
      allowTabWithin: true,
    });

  // keep focus moving when clicking arrows
  const focusAndScroll = useCallback(
    (delta: number) => {
      scrollBy(delta > 0 ? pxPerScroll : -pxPerScroll);
      const next = activeIndex + (delta > 0 ? 1 : -1);
      focusIndex(next);
    },
    [activeIndex, focusIndex, pxPerScroll, scrollBy]
  );

  const carouselClasses = classNames("media-carousel-container", {
    "hide-left": !canScrollLeft,
    "hide-right": !canScrollRight,
  });

  return (
    <div className="media-carousel">
      {title && <h3 className="media-carousel-title">{title}</h3>}
      <div className={carouselClasses}>
        {canScrollLeft && (
          <button
            className="media-carousel-arrow left"
            onClick={() => focusAndScroll(-1)}
            aria-label="Scroll left"
            title="Scroll left"
          >
            &lt;
          </button>
        )}

        <div
          className="media-carousel-track"
          ref={scrollRef}
          role="listbox"
          aria-roledescription="carousel"
          aria-label={title || "Media carousel"}
          onKeyDown={onKeyDown}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="media-carousel-item"
              ref={i === 0 ? measureRef : undefined} // only first is measured
              role="option"
              aria-selected={i === activeIndex}
            >
              <MediaCard
                {...item}
                tabIndex={getTabIndex(i)}
                ref={setItemRef(i)}
              />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className="media-carousel-arrow right"
            onClick={() => focusAndScroll(1)}
            aria-label="Scroll right"
            title="Scroll right"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;
