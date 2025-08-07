import React, { useEffect, useState } from "react";
import "./MediaCarousel.scss";
import MediaCard, { type MediaCardProps } from "../MediaCard/MediaCard";
import classNames from "classnames";

type MediaCarouselProps = {
  title?: string;
  items: MediaCardProps[];
};

const MediaCarousel: React.FC<MediaCarouselProps> = ({ title, items }) => {
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
            onClick={() => scrollBy(-300)}
          >
            &lt;
          </button>
        )}

        <div className="media-carousel-track" ref={scrollRef}>
          {items.map((item, i) => (
            <div key={i} className="media-carousel-item">
              <MediaCard {...item} />
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            className="media-carousel-arrow right"
            onClick={() => scrollBy(300)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;
