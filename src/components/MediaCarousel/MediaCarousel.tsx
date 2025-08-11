import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MediaCarousel.scss";
import MediaCard, { type MediaCardProps } from "../MediaCard/MediaCard";
import classNames from "classnames";

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
  const cardRef = useRef<HTMLDivElement>(null); // used only to measure a card's width
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [items]);
  const scrollAmount = cardWidth * (cardsPerScroll ?? 1);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // --- Keyboard focus management (roving tabindex) ---
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const focusIndex = useCallback(
    (idx: number) => {
      // clamp to bounds
      const next = Math.max(0, Math.min(items.length - 1, idx));
      setActiveIndex(next);
      requestAnimationFrame(() => {
        const el = cardRefs.current[next];
        el?.focus();
        // ensure it’s visible inside the scrolling track
        el?.scrollIntoView({
          behavior: "smooth",
          inline: "nearest",
          block: "nearest",
        });
      });
    },
    [items.length]
  );

  const onTrackKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (items.length === 0) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusIndex(activeIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusIndex(items.length - 1);
    } else if (e.key === "Tab") {
      // Optional: Tab steps within the carousel; at ends, let focus leave naturally
      if (!e.shiftKey && activeIndex < items.length - 1) {
        e.preventDefault();
        focusIndex(activeIndex + 1);
      } else if (e.shiftKey && activeIndex > 0) {
        e.preventDefault();
        focusIndex(activeIndex - 1);
      }
    }
  };

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
            onClick={() => scrollBy(-scrollAmount)}
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
          onKeyDown={onTrackKeyDown}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="media-carousel-item"
              ref={i === 0 ? cardRef : undefined} // keep width measurement
              role="option"
              aria-selected={i === activeIndex}
            >
              <MediaCard
                {...item}
                tabIndex={i === activeIndex ? 0 : -1}
                ref={(el: HTMLDivElement | null) => {
                  // IMPORTANT: do not return a value from a ref callback
                  cardRefs.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className="media-carousel-arrow right"
            onClick={() => scrollBy(scrollAmount)}
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
