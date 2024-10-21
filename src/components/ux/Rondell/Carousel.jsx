'use client'

import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, useRef } from "react";
import { config } from "react-spring";

export default function Carroussel(props) {
  
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [cards, setCards] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);

    // Generate the updated cards array based on props.cards
    const updatedCards = props.cards.map((element, index) => ({
      ...element,
      onClick: () => handleChange(index), 
    }));

    // Update the cards state
    setCards(updatedCards);
    // Cleanup function to clear the interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [props.cards, props.offset, props.showArrows]);

  // Handle autoplay logic
  useEffect(() => {
    if (autoplay && cards.length > 0) {
      startAutoplay();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, cards]);

  // Restart autoplay timer when slide changes
  useEffect(() => {
    if (autoplay) {
      restartAutoplay();
    }
  }, [goToSlide]);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setGoToSlide((prevIndex) => {
        const nextIndex = (prevIndex + 1) % cards.length;
        return nextIndex;
      });
    }, 7000); 
  };

  const restartAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAutoplay();
  };

  const handleChange = (index) => {
    setGoToSlide(index);
    restartAutoplay();
  }

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
