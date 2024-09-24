"use client";
import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

type AnimateCarouselProps = {
  cards: CardType[];
  classNane?: string;
  width: string;
  height: string;
  margin: string;
  offset: number;
  showArrows: boolean;
};

type CardType = {
  key: any;
  content: React.ReactNode;
};

export default function AnimateCarousel(props: AnimateCarouselProps) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
