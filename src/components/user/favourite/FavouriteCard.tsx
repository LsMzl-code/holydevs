"use client";
import useLocation from "@/app/hooks/useLocations";
import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";
import { FavouriteCardTypes } from "@/types/MainSideNav";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

// Images
import User from "../../../../public/icon/profile.png";
import Tag from "../../../../public/icon/tag.png";
import Wallet from "../../../../public/icon/wallet.png";

export const FavouriteCard = ({ favourite }: FavouriteCardTypes) => {
   const router = useRouter();
   const { getCountryByCode } = useLocation();
   const country = getCountryByCode(favourite.house.country);
   return (
      <div className="shadow bg-card/20 rounded-lg border border-card/50 flex h-[150px] relative">
         {/* Illustration */}
         <div className="h-full relative rounded-lg aspect-square hover:scale-100 w-[40%]">
            <Image
               src={favourite.house.image ?? ""}
               fill
               sizes="100%"
               alt="Photo d'une maison"
               className=" object-cover rounded-l-lg h-full w-full border-r-4 border-cyan-500 "
            />
         </div>
         {/* Details */}
         <div className="p-3 w-[60%]">
            <div className="">
               <p className="text-lg font-semibold w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {favourite.house.title}
               </p>
               <p className="text-xs font-medium text-gray-400">
                  {favourite.house.city}, {country?.name}
               </p>
            </div>
            <Separator className="my-3" />
            <div className="flex flex-col gap-2 font-medium">
               {/* Liste des catégories */}
               <span className="flex items-center gap-1">
                  <Image
                     src={Tag}
                     alt="Icône de catégories"
                     width={15}
                     height={15}
                  />
                  <p className="text-xs capitalize">
                     {favourite.house.types[0].type.name} -{" "}
                     {favourite.house.categories[0].category.name}
                  </p>
               </span>
               {/* Tarif par nuit */}
               <span className="flex items-center gap-1">
                  <Image
                     src={Wallet}
                     alt="Icône de prix par nuit"
                     width={15}
                     height={15}
                  />
                  <p className="text-xs">{favourite.house.price}€ /nuit</p>
               </span>
            </div>
            <Button
               size="sm"
               onClick={() => router.push(`/annonce/${favourite.house.id}`)}
               title="Lien vers la page de détails de l'annonce"
               className="absolute bottom-2 right-2"
            >
               Voir
            </Button>
         </div>
         <div className="flex justify-between">
         </div>
      </div>
   );
};
