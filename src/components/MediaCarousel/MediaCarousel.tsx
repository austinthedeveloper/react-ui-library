import React, { useEffect, useState } from "react";
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
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [items]);
  const scrollAmount = cardWidth * (cardsPerScroll ?? 1);

  const scrollRef = React.useRef<HTMLDivElement>(null);

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
          >
            &lt;
          </button>
        )}

        <div className="media-carousel-track" ref={scrollRef}>
          {items.map((item, i) => (
            <div
              key={i}
              className="media-carousel-item"
              ref={i === 0 ? cardRef : undefined}
            >
              <MediaCard {...item} />
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            className="media-carousel-arrow right"
            onClick={() => scrollBy(scrollAmount)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;
