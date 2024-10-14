import HousesList from "@/components/home/HousesList";
import LastHousesCarousel from "@/components/home/LastHousesCarousel";
import MainSideNav from "@/components/navigation/MainSideNav";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import { v4 as uuidv4 } from "uuid";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/shadcn/carousel";
import { LastHouseCard } from "@/components/home/LastHouseCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
   title: "Accueil",
   description: "Page d'accueil d'Holydevs",
};

export default async function Home() {
   // User Datas
   const { userId } = auth();

   const currentUser = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         firstname: true,
         lastname: true,
         username: true,
         id: true,
         email: true,
         profilePicture: true,
         coverPicture: true,
         city: true,
         country: true,
         state: true,
      },
   });

   const owner = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
      },
   });

   const userFav = await db.favourite.findMany({
      where: {
         userId: currentUser?.id,
      },
      include: {
         house: {
            select: {
               id: true,
               title: true,
               country: true,
               state: true,
               city: true,
               price: true,
               image: true,
               types: {
                  select: {
                     type: {
                        select: {
                           name: true,
                        },
                     },
                  },
               },
               categories: {
                  select: {
                     category: {
                        select: {
                           name: true,
                        },
                     },
                  },
               },
            },
         },
      },
   });

   // Lasts Houses data
   
   const lastHouses = await db.house.findMany({
      orderBy: {
         createdAt: "desc",
      },
      take: 10,
      select: {
         id: true,
         country: true,
         image: true,
         title: true,
         city: true,
         price: true,
      },
   });

   const categories = await db.category.findMany({
      select: {
         name: true,
         id: true,
      },
   });

   const types = await db.type.findMany({
      select: {
         name: true,
         id: true,
      },
   });

   const houses = await db.house.findMany({
      select: {
         id: true,
         image: true,
         title: true,
         city: true,
         state: true,
         country: true,
         price: true,
         userId: true,
         ownerId: true,
         user: {
            select: {
               firstname: true,
               lastname: true,
               username: true,
               id: true,
            },
         },
         categories: {
            select: {
               category: {
                  select: {
                     name: true,
                     id: true,
                  },
               },
            },
         },
         types: {
            select: {
               type: {
                  select: {
                     name: true,
                     id: true,
                  },
               },
            },
         },
         rates: {
            select: {
               rate: true,
            },
         },
      },
   });

   return (
      <div className="flex items-start lg:gap-5 mt-2 lg:mt-5 max-w-[1700px] mx-auto">
         {/* Nav */}
         <div className={cn(userId ? "" : "hidden" ,"max-xl:hidden w-[20%] h-screen")}>
            <MainSideNav user={currentUser} favourites={userFav} />
         </div>
         {/* Content */}
         <div className={cn(!userId ? " w-full" : "max-xl:w-full w-[80%]", " lg:mx-2  px-2")}>
            {/* Last Houses carousel */}
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
                     {lastHouses.map((house) => (
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

            {/* Houses List */}
            <HousesList
               categories={categories}
               types={types}
               houses={houses}
               user={owner}
            />
         </div>
      </div>
   );
}
