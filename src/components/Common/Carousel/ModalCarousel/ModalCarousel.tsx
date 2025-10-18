import { CloseButton, Image, Modal } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ModalCarouselProps {
  opened: boolean;
  images: string[];
  indexInitialSlide: number;
  onClose: () => void;
}

export default function ModalCarousel({ opened, images, indexInitialSlide, onClose }: ModalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(indexInitialSlide);
  const TRANSITION_DURATION = 200;

  function handleNextSlide() {
    setCurrentIndex((currentIndex + 1) % images.length);
  }

  function handlePreviousSlide() {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }

  useEffect(() => {
    setCurrentIndex(indexInitialSlide);
  }, [indexInitialSlide]);

  return (
    <Modal
      opened={opened}
      padding={0}
      size="xl"
      className="overflow-hidden"
      transitionProps={{ duration: TRANSITION_DURATION }}
      withCloseButton={false}
      onClose={onClose}
    >
      <div className="relative flex items-center lg:gap-5 bg-black">
        <CloseButton size="lg" className="absolute bg-zinc-200 top-10 right-4" onClick={onClose} />
        {images.length > 1 && (
          <button type="button" onClick={() => handlePreviousSlide()} className="absolute lg:static left-0 mx-1.5">
            <IconChevronLeft
              stroke={3}
              size={50}
              className="text-white border border-zinc-500 hover:bg-zinc-500 rounded-full transition duration-200"
            />
          </button>
        )}
        <div className="w-full">
          <Image
            src={images[currentIndex]}
            alt="Imagem do animal"
            className={`mx-auto w-full h-[500px] md:h-[660px] object-contain ${images.length === 1 ? "px-4" : ""}`}
          />
        </div>
        {images.length > 1 && (
          <button type="button" onClick={() => handleNextSlide()} className="absolute right-0 lg:static mx-1.5">
            <IconChevronRight
              stroke={3}
              size={50}
              className="text-white border border-zinc-500 hover:bg-zinc-500 rounded-full transition duration-200"
            />
          </button>
        )}
      </div>
    </Modal>
  );
}
