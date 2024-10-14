import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/shadcn/carousel";
import { PropositionHousesTypes } from "@/types/house/houseDetails";
import { PropositionHouseCard } from "./PropositionHouseCard";

export const PropositionCarousel = ({ houses }: PropositionHousesTypes) => {
   return (
      <div className="w-full">
         <Carousel
            opts={{
               align: "start",
            }}
            className="w-full relative"
         >
            <CarouselContent>
               {houses.map((house) => (
                  <CarouselItem
                     key={uuidv4()}
                     className="basis-1/1 md:basis-1/7"
                  >
                     <PropositionHouseCard key={uuidv4()} house={house} />
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[50%] transform:-translate-y-[50%] left-0 z-20" />
            <CarouselNext className="absolute top-[50%] transform:-translate-y-[50%] right-0 z-20" />
         </Carousel>
      </div>
   );
};
