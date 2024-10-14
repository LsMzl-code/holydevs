'use client";';

import {
   Calendar,
   FilePen,
   LogOut,
   Menu,
   Notebook,
   SunMoon,
   UserRound,
} from "lucide-react";
import React from "react";

import Link from "next/link";

import { SignOutButton } from "@clerk/nextjs";
// import { ThemeToggle } from "../provider/theme/ThemeToggle";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import { UserMenuProps } from "@/types/topNav";
import { ThemeToggle } from "@/components/provider/ThemeToggle";

export function UserMenu({
   userMail,
   userAvatar,
   firstname,
   lastname,
   username,
}: UserMenuProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outline"
               className="py-5 px-1 rounded-full drop-shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
               size="lg"
               title="Ouverture du menu utilisateur"
            >
               <Menu className="cursor-pointer sm:mr-1 mx-1 sm:mx-0" />
               {/* Avatar */}
               <Avatar className="hidden sm:block ml-1 bg-gray-200">
                  <AvatarImage
                     className="object-cover"
                     src={
                        userAvatar
                           ? userAvatar
                           : `https://api.dicebear.com/8.x/thumbs/svg?seed=${userMail}`
                     }
                  />
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         {/* Contenu du menu */}
         <DropdownMenuContent className="px-3 py-4 rounded mr-5">
            <DropdownMenuLabel className="capitalize">
               {firstname} {lastname}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
               <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
                  <UserRound size={15} />
                  <Link href={`/${username}`} title="Profil utilisateur">
                     Mon profil
                  </Link>
               </DropdownMenuItem>

               {/* Réservations */}
               <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
                  <Calendar size={15} />
                  <Link
                     href={`/${username}/reservations`}
                     title="Réservations de l'utilisateur"
                  >
                     Mes réservations
                  </Link>
               </DropdownMenuItem>

               {/* Annonces */}
               <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
                  <Notebook size={15} />
                  <Link
                     href={`/${username}/annonces`}
                     title="Liste de mes annonces"
                  >
                     Mes annonces
                  </Link>
               </DropdownMenuItem>

               {/* Ajouter une annonce */}
               <DropdownMenuItem className="flex items-center gap-1 hover:text-gray-500 cursor-pointer">
                  <FilePen size={15} />
                  <Link
                     href="/annonce/ajouter"
                     title="Formulaire d'ajout d'annonce de location"
                  >
                     Ajouter une annonce
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               {/* Theme toggle */}
               <DropdownMenuItem
                  className=" flex items-center gap-1 cursor-pointer hover:text-gray-500"
                  title="Passage du thème clair à sombre"
               >
                  <SunMoon size={15} />
                  <ThemeToggle />
               </DropdownMenuItem>

               {/* Déconnexion */}
               <DropdownMenuItem
                  className="flex items-center gap-1 hover:text-gray-500 cursor-pointer"
                  title="Déconnexion utilisateur"
               >
                  <LogOut size={15} />
                  <SignOutButton redirectUrl="/connexion">
                     Déconnexion
                  </SignOutButton>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
