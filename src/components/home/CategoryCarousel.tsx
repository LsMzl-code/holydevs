"use client";
import React from "react";

import { Button } from "@/components/shadcn/button";

import { v4 as uuidv4 } from "uuid";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/shadcn/carousel";
import { CategoryCarouselTypes } from "@/types/home/House";

const CategoriesCarousel = ({ categories, types }: CategoryCarouselTypes) => {
   return (
      <div className="">
         <Carousel
            opts={{
               align: "start",
               loop: true,
               dragFree: true,
            }}
            className="w-full relative pt-5"
         >
            <CarouselContent className="-ml-0">
               <Button size="sm" className="shadow hover:bg-secondary">
                  Tout
               </Button>

               {types.map((type) => (
                  <CarouselItem key={uuidv4()} className="basis-1/8">
                     <Button
                        size="sm"
                        className="shadow hover:bg-primary hover:text-black capitalize"
                        key={uuidv4()}
                        variant="secondary"
                        title={type.name}                 
                     >
                        {type.name}
                     </Button>
                  </CarouselItem>
               ))}
               {categories.map((category) => (
                  <CarouselItem key={uuidv4()} className="basis-1/8">
                     <Button
                        size="sm"
                        className="shadow hover:bg-primary hover:text-black capitalize"
                        key={uuidv4()}
                        variant="secondary"
                        title={category.name}
                     >
                        {category.name}
                     </Button>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <div className="absolute -top-4 right-12">
               <CarouselNext />
               <CarouselPrevious />
            </div>
         </Carousel>
      </div>
   );
};

export default CategoriesCarousel;
