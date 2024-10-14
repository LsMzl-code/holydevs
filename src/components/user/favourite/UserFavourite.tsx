"use client";
import React from "react";
import Image from "next/image";

// UI Components
import {
   Dialog,
   DialogHeader,
   DialogContent,
   DialogTitle,
   DialogTrigger,
   DialogDescription,
} from "@/components/shadcn/dialog";
import { buttonVariants } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";

// Image
import Fav from "../../../../public/icon/favourite.png";

import { cn } from "@/lib/utils";
import { MainSideNavFavouriteTypes } from "@/types/MainSideNav";

// Components
import { FavouriteCard } from "./FavouriteCard";

import { v4 as uuidv4 } from "uuid";
export const UserFavourite = ({ favourites }: MainSideNavFavouriteTypes) => {
   return (
      <Dialog>
         <DialogTrigger className="flex justify-end">
            <div
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex items-center gap-2 justify-start w-full"
               )}
            >
               <Image
                  src={Fav}
                  alt="Logo du lien"
                  width={16}
                  height={16}
                  className="w-4 h-4"
               />
               Mes favoris
            </div>
         </DialogTrigger>
         <DialogContent className="max-w-[800px]">
            <DialogHeader>
               <DialogTitle>
                  <h2 className="text-xl tracking-tight font-semibold">
                     Vos Favoris
                  </h2>
               </DialogTitle>
               <DialogDescription>
                  Retrouvez ici les annonces que vous avez ajouté à vos favoris.
               </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="flex flex-col rounded w-full gap-5">
               {favourites.length === 0 ? (
                  <p className="text-sm">
                     Vous n'avez ajouté aucune annonce dans vos favoris
                  </p>
               ) : (
                  favourites.map((favourite) => (
                     <FavouriteCard favourite={favourite} key={uuidv4()} />
                  ))
               )}
            </div>
         </DialogContent>
      </Dialog>
   );
};
