import React from "react";
import "./MediaCarousel.scss";
import MediaCard, { type MediaCardProps } from "../MediaCard/MediaCard";

type MediaCarouselProps = {
  title?: string;
  items: MediaCardProps[];
};

const MediaCarousel: React.FC<MediaCarouselProps> = ({ title, items }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="media-carousel">
      {title && <h3 className="media-carousel-title">{title}</h3>}
      <div className="media-carousel-container">
        <button
          className="media-carousel-arrow left"
          onClick={() => scrollBy(-300)}
        >
          &lt;
        </button>
        <div className="media-carousel-track" ref={scrollRef}>
          {items.map((item, i) => (
            <div key={i} className="media-carousel-item">
              <MediaCard {...item} />
            </div>
          ))}
        </div>
        <button
          className="media-carousel-arrow right"
          onClick={() => scrollBy(300)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MediaCarousel;
