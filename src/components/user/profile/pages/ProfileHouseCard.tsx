"use client";
import { Separator } from "@/components/shadcn/separator";
import { ProfileHouseCardTypes } from "@/types/user/profilePages";
import Image from "next/image";
import React, { useState } from "react";

import Star from "../../../../../public/icon/star.png";
import Wallet from "../../../../../public/icon/wallet.png";
import Tag from "../../../../../public/icon/tag.png";
import Comments from "../../../../../public/icon/comments.png";

import { Button } from "@/components/shadcn/button";
import { useRouter } from "next/navigation";
import useLocation from "@/app/hooks/useLocations";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import axios from "axios";
import { toast } from "@/components/shadcn/use-toast";

export const ProfileHouseCard = ({ house }: ProfileHouseCardTypes) => {
   const router = useRouter();

   const { getCountryByCode } = useLocation();

   const country = getCountryByCode(house.country);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleDeleteHouse = () => {
      axios
         .delete(`/api/house/${house.id}`)
         .then((res) => {
            setIsLoading(true);
            toast({
               variant: "success",
               description: "Annonce supprimée avec succès!",
            });
            setIsLoading(false);
            router.refresh();
         })
         .catch((error) => {
            console.log("error", error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue, veuillez ré-essayer plus tard.",
            });
            setIsLoading(false);
         });
   };
   return (
      <div className="rounded-lg border flex gap-2 h-[200px] hover:shadow-md bg-background">
         {/* Illustration */}
         <div className="h-full relative rounded-lg aspect-square hover:scale-100 w-[40%] cursor-pointer">
            <Image
               src={house.image ?? ""}
               alt="Photo de la maison"
               className=" object-cover rounded-l-lg h-full w-full"
               fill
               sizes="100%"
            />
         </div>
         {/* Details */}
         <div className="p-3 w-[60%]">
            <div className="flex items-center justify-between">
               <p className="text-lg font-semibold w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {house.title}
               </p>
               <div className="flex items-center gap-3">
                  <span
                     className="flex items-center gap-1"
                     title="Note utilisateur de votre annonce"
                  >
                     <Image
                        src={Star}
                        alt="Icône de notation de l'annonce"
                        width={15}
                        height={15}
                     />
                     <p className="text-sm">4.5</p>
                  </span>
                  <span
                     className="flex items-center gap-1"
                     title="Commentaires utilisateur de votre annonce"
                  >
                     <Image
                        src={Comments}
                        alt="Icône de notation de l'annonce"
                        width={15}
                        height={15}
                     />
                     <p className="text-sm">{house.Opinions.length}</p>
                  </span>
               </div>
            </div>

            <p className="text-xs font-medium text-gray-400">
               {house.city}, {country?.name}
            </p>

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
                     {house.types[0].type.name} -{" "}
                     {house.categories[0].category.name}
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
                  <p className="text-xs">{house.price}€ /nuit</p>
               </span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-end gap-2">
               <Button
                  size="sm"
                  onClick={() => router.push(`/annonce/${house.id}`)}
                  title="Lien vers la page contenant les détails de l'annonce"
               >
                  Voir
               </Button>
               <Button
                  size="sm"
                  onClick={() => router.push(`/annonce/${house.id}/modifier`)}
                  title="Lien vers la page de modifications de l'annonce"
                  variant="secondary"
               >
                  Modifier
               </Button>
               {/* Suppression */}
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button
                        size="sm"
                        //   onClick={() => router.push(`/annonce/${house.id}`)}
                        title="Lien vers la page de modification de l'annonce"
                        variant="destructive"
                     >
                        Supprimer
                     </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Êtes-vous sur de vouloir supprimer cette annonce?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           Cette action est irréversible. Cela supprimera
                           définitivement votre annonce.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                           className="bg-red-500 text-white hover:text-black hover:bg-secondary hover:shadow"
                           onClick={handleDeleteHouse}
                        >
                           Supprimer
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
         </div>
      </div>
   );
};
