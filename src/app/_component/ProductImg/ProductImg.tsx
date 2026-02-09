"use client";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function ProductImg({ images }: { images: string[] }) {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((src) => {
            return (
              <CarouselItem key={src}>
                <Image
                  className="w-full my-7 object-contain"
                  src={src}
                  alt={src}
                  width={200}
                  height={200}
                  style={{ height: "auto" }}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
