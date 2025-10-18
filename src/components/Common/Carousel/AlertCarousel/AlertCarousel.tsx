import { useCallback, useEffect, useState } from "react";
import { Image } from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import "@mantine/carousel/styles.css";

import classes from "./AlertCarousel.module.css";

interface AlertCarouselProps {
  images: string[];
  onClickImage: (imageIndex: number) => void;
}

export default function AlertCarousel({ images, onClickImage }: AlertCarouselProps) {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    setCurrentSlideIndex(embla.selectedScrollSnap());
  }, [embla, setCurrentSlideIndex]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  return (
    <div className="bg-black">
      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "33.333333333333%" }}
        loop
        withIndicators
        draggable
        align="center"
        className="w-full mx-auto max-w-[1366px]"
        height="500px"
        withKeyboardEvents
        getEmblaApi={setEmbla}
        controlsOffset="lg"
        classNames={classes}
        nextControlIcon={
          <IconChevronRight
            stroke={3}
            size={38}
            className="text-white bg-transparent hover:bg-zinc-500 rounded-full transition duration-200"
          />
        }
        previousControlIcon={
          <IconChevronLeft
            stroke={3}
            size={38}
            className="text-white bg-transparent hover:bg-zinc-500 rounded-full transition duration-200"
          />
        }
      >
        {images.map((image, index) => (
          <Carousel.Slide key={image}>
            <div className="h-full w-full relative">
              <div className="h-full">
                <button type="button" onClick={() => onClickImage(index)} className="w-full">
                  <Image
                    src={image}
                    alt="Imagem do animal"
                    draggable={false}
                    className={`bg-cover w-full h-[500px] transition duration-200 ${index !== currentSlideIndex ? "brightness-[0.25] hover:brightness-[0.5]" : ""}`}
                  />
                </button>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
