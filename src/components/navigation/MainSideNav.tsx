"use client";
// React / Next
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

// Type
import { MainSideNavUser } from "@/types/MainSideNav";

// Data

// Images
import House from "../../../public/icon/house.png";
import Booking from "../../../public/icon/booking.png";
import Message from '../../../public/icon/comments.png'
import { UserFavourite } from "../user/favourite/UserFavourite";

import { buttonVariants } from "../shadcn/button";
import Image from "next/image";

import Banner from "../../../public/img/banniere.jpg";
import useLocation from "@/app/hooks/useLocations";

const MiniMap = dynamic(() => import("../home/MiniMap"), {
   ssr: false,
});

const MainSideNav = ({ user, favourites }: MainSideNavUser) => {
   // States
   // User position
   const [latitude, setLatitude] = useState(0);
   const [longitude, setLongitude] = useState(0);
   const [isLoading, setIsLoading] = useState(false);

   //Hooks
   useEffect(() => {
      setIsLoading(true);
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               setLatitude(position.coords.latitude);
               setLongitude(position.coords.longitude);

               setIsLoading(false);
            },

            (error) => {
               console.error(error);
            }
         );
      } else {
         console.error("Geolocation is not supported by this browser.");
      }
   }, []);

   const { getStateCities } = useLocation();
   const cities = getStateCities(user?.country ?? "", user?.state ?? "");
   const city = cities?.filter((city) => city.name === user?.city);
   if (!city) return <p>Position non trouvée</p>;

   return (
      <aside
         className={cn(
            "hidden lg:block fixed top-20 w-[15%] ml-2 space-y-5 mb-10"
         )}
      >
         {/* User infos */}
         <Link href={`/${user?.username}`} title="Visiter mon profil">
            <div className="bg-card rounded-lg shadow flex flex-col items-center pb-5">
               {/* Cover picture */}
               <div className="w-full h-28 bg-card rounded-t-lg relative">
                  <Image
                     src={user?.coverPicture ? user?.coverPicture : Banner}
                     alt={`Photo de profil de ${user?.firstname} ${user?.lastname}`}
                     fill
                     sizes="100%"
                     className="absolute top-0 left-0 rounded-t-lg object-cover"
                  />
                  {/* Avatar */}
                  <div className="relative top-[60%] left-[50%] translate-x-[-50%] h-20 w-20 rounded-full">
                     <Image
                        src={
                           user?.profilePicture
                              ? user?.profilePicture
                              : `https://api.dicebear.com/8.x/thumbs/svg?seed=${user?.username}`
                        }
                        alt={`Photo de profil de ${user?.firstname} ${user?.lastname}`}
                        fill
                        className="absolute rounded-full object-cover border-2 border-card"
                     />
                  </div>
               </div>
               {/* Name */}
               <div className="text-center mt-10">
                  {user?.firstname && user?.lastname ? (
                     <p className="text-lg font-semibold capitalize">
                        {user?.firstname} {user?.lastname}
                     </p>
                  ) : (
                     <p className="text-lg font-medium">Utilisateur</p>
                  )}

                  <p className="text-sm">@{user?.username}</p>
               </div>
            </div>
         </Link>
         {/* MiniMap */}
         <div>
            {isLoading ? (
               <div className="h-[200px] rounded-md shadow flex flex-col items-center justify-center gap-5 bg-secondary/20">
                  <div role="status">
                     <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                           fill="currentColor"
                        />
                        <path
                           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                           fill="currentFill"
                        />
                     </svg>
                  </div>
                  <p className="text-sm animate-bounce">
                     Récupération de votre position
                  </p>
               </div>
            ) : (
               <MiniMap latitude={latitude} longitude={longitude} />
            )}
         </div>

         {/* Links */}
         <div className="flex flex-col gap-1 rounded py-3 px-2 bg-card/30 shadow">
            <Link
               href={`/${user?.username}/annonces`}
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex items-center gap-2 justify-start w-full"
               )}
            >
               <Image
                  src={House}
                  alt="Logo du lien"
                  width={16}
                  height={16}
                  className="w-4 h-4"
               />
               Mes annonces
            </Link>
            <Link
               href={`/${user?.username}/reservations`}
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex items-center gap-2 justify-start w-full"
               )}
            >
               <Image
                  src={Booking}
                  alt="Logo du lien"
                  width={16}
                  height={16}
                  className="w-4 h-4"
               />
               Mes réservations
            </Link>
            <UserFavourite favourites={favourites} />
            <Link
               href={`/${user?.username}/messages`}
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex items-center gap-2 justify-start w-full"
               )}
            >
               <Image
                  src={Message}
                  alt="Logo du lien"
                  width={16}
                  height={16}
                  className="w-4 h-4"
               />
               Messagerie
            </Link>
         </div>

         {/* Friends */}
         {/* <div className="flex flex-col gap-1 px-3 font-medium rounded py-3 bg-card/30 shadow">
            <p className="text-sm font-medium mb-3">Discussions récentes</p>
            <div className="flex items-center gap-2">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmail`}
                  />
               </Avatar>
               <p className="text-xs">Harry Cover</p>
            </div>
            <div className="flex items-center gap-2">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=usgfderEmagfdgfdgfil`}
                  />
               </Avatar>
               <p className="text-xs">Nom de l'utilisateur</p>
            </div>
            <div className="flex items-center gap-2">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=usejrtyhsdhfrEmail`}
                  />
               </Avatar>
               <p className="text-xs">Nom de l'utilisateur</p>
            </div>
            <div className="flex items-center gap-2">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmajnfgdhtrhrtil`}
                  />
               </Avatar>
               <p className="text-xs">Nom de l'utilisateur</p>
            </div>
            <div className="flex items-center gap-2">
               <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmjgfdjrtjyail`}
                  />
               </Avatar>
               <p className="text-xs">Nom de l'utilisateur</p>
            </div>
         </div> */}
      </aside>
   );
};

export default MainSideNav;
