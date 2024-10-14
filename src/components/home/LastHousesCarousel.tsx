import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/shadcn/carousel";

import { LastHousesTypes } from "@/types/home/House";
import { LastHouseCard } from "./LastHouseCard";

const LastHousesCarousel = ({ houses }: LastHousesTypes) => {
   return (
      <div className="w-full">
         <h2 className="mb-3 text-xl md:text-2xl font-semibold">
            Dernières annonces ajoutées
         </h2>

         <Carousel
            opts={{
               align: "start",
               loop: true,
            }}
            className="w-full relative"
         >
            <CarouselContent>
               {houses.map((house) => (
                  <CarouselItem
                     key={uuidv4()}
                     className="basis-1/1 md:basis-1/7"
                  >
                     <LastHouseCard key={uuidv4()} house={house} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[50%] transform:-translate-y-[50%] left-0 z-20" />
            <CarouselNext className="absolute top-[50%] transform:-translate-y-[50%] right-0 z-20" />
         </Carousel>
      </div>
   );
};

export default LastHousesCarousel;
