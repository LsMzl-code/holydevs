"use client";

import useLocation from "@/app/hooks/useLocations";
import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";
import { HouseCardTypes } from "@/types/home/House";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Images
import User from "../../../public/icon/profile.png";
import Tag from "../../../public/icon/tag.png";
import Wallet from "../../../public/icon/wallet.png";
import Star from "../../../public/icon/star.png";

const HouseCardGrid = ({ house, user }: HouseCardTypes) => {
   const router = useRouter();

   const pathName = usePathname();
   const isMyHouses = pathName.includes("mes-annonces");

   // Notation
   const totalRates = house.rates.reduce(
      (acc, currentValue) => acc + currentValue.rate,
      0
   );
   const averageRate = Number((totalRates / house.rates.length).toFixed(2));

   // Propriétaire de l'annonce ?
   const isMyHouse: boolean = house.user.id === user?.id;

   const { getCountryByCode } = useLocation();
   const country = getCountryByCode(house.country);

   return (
      <div className="flex flex-col bg-card/20 rounded-lg w-full md:max-w-[300px] overflow-hidden border border-card/50 shadow">
         {/* Illustration */}
         <div className=" h-[150px] relative rounded-lg aspect-square w-full hover:scale-100">
            <Image
               src={house.image ?? ""}
               fill
               sizes="100%"
               alt="Photo d'une maison"
               className=" object-cover rounded-t-lg h-full w-full border-b-4 border-cyan-500 "
            />
            {isMyHouses && (
               <Button
                  onClick={() => router.push(`/annonce/modifier/${house.id}`)}
                  //   variant="hollow"
                  className="absolute z-10 bottom-2 right-2"
               >
                  Editer
               </Button>
            )}
         </div>
         {/* Details */}
         <div className="p-5">
            <div className="">
               <p className="text-md font-semibold w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {house.title}
               </p>
               <p className="text-xs font-medium text-gray-400">
                  {house.city}, {country?.name}
               </p>
            </div>
            <Separator className="my-3" />
            <div className="flex flex-col gap-2 font-medium">
               {/* Nom du propriétaire */}
               <span className="flex items-center gap-1">
                  <Image
                     src={User}
                     alt="Icône de profil utilisateur"
                     width={15}
                     height={15}
                  />
                  {house.user?.firstname && house.user?.lastname ? (
                     <Link
                        href={`/utilisateur/${house.user?.username}`}
                        className="text-xs capitalize hover:underline"
                        title="Visiter le profil du propriétaire"
                     >
                        {house.user?.firstname} {house.user?.lastname}
                     </Link>
                  ) : (
                     <Link
                        href={`/utilisateur/${house.user?.username}`}
                        className="text-xs capitalize hover:underline"
                        title="Visiter le profil du propriétaire"
                     >
                        {house.user?.username}
                     </Link>
                  )}
               </span>
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
            <div className="flex justify-between">
               <div className="flex justify-start item-center gap-2">
                  <Button
                     size="sm"
                     onClick={() => router.push(`/annonce/${house.id}`)}
                     title="Lien vers la page contenant les détails de l'annonce"
                  >
                     Voir
                  </Button>
                  {isMyHouse && (
                     <Button
                        size="sm"
                        onClick={() =>
                           router.push(`/annonce/${house.id}/modifier`)
                        }
                        title="Lien vers la page de modification de l'annonce"
                        variant="secondary"
                     >
                        Modifier
                     </Button>
                  )}
               </div>
               <div className="flex items-center gap-1">
                  <Image
                     src={Star}
                     alt="Icône de notation de l'annonce"
                     width={15}
                     height={15}
                  />
                  {house.rates.length >= 1 ? (
                     <p className="text-sm">{averageRate}/5</p>
                  ) : (
                     <p className="text-sm">0</p>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HouseCardGrid;
