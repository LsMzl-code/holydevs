"use client";
import { useOptimistic, useState } from "react";

// Images
import NoFav from "../../../../public/icon/noFavourite.png";
import Fav from "../../../../public/icon/favourite.png";
import Image from "next/image";
import { FavouriteInteractionTypes } from "@/types/house/houseDetails";
import { switchFavourite } from "@/actions/interaction/favourite";
import { toast } from "@/components/shadcn/use-toast";

export const FavouriteInteraction = ({ house }: FavouriteInteractionTypes) => {
   const favourites = house.favourites.map((favourite) => favourite.userId);
   const [favState, setFavState] = useState({
      isFaved: house.user?.id ? favourites.includes(house.user.id) : false,
   });

   const [optimisticFav, switchOptimisticFav] = useOptimistic(
      favState,
      (state, value) => {
         return {
            isFaved: !state.isFaved,
         };
      }
   );

   const favAction = async () => {
      switchOptimisticFav("");
      try {
         switchFavourite(house.id);
         setFavState((state) => ({
            isFaved: !state.isFaved,
         }));
         if (!favState.isFaved) {
            toast({
               title: "Favori ajouté",
               description: "L'annonce a été ajoutée à vos favoris.",
            });
         } else {
            toast({
               title: "Favori retiré",
               description: "L'annonce a retirée de vos favoris.",
            });
         }
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <form action={favAction}>
         {optimisticFav.isFaved ? (
            //Faved
            <button>
               <Image
                  src={Fav}
                  alt="Icône de partage"
                  height={20}
                  width={20}
                  className="mt-2 h-5 w-5 hover:animate-bounce cursor-pointer"
               />
            </button>
         ) : (
            <button>
               <Image
                  src={NoFav}
                  alt="Icône de partage"
                  height={20}
                  width={20}
                  className="mt-2 h-5 w-5 hover:animate-bounce cursor-pointer"
               />
            </button>
         )}
      </form>
   );
};
