"use client";
import { Bell, Home, LayoutGrid, Pen, Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { UserMenuProps } from "@/types/topNav";
import { UserMenu } from "./components/UserMenu";
import { GuestMenu } from "./components/GuestMenu";
import SearchInputMobile from "./SearchInputMobile";

export const BottomNav = ({
   userId,
   userMail,
   userAvatar,
   userClerkId,
   firstname,
   lastname,
   username,
}: UserMenuProps) => {
   return (
      <nav className="flex items-center justify-between py-1 fixed w-full bottom-0 left-0 z-50 bg-card px-2 lg:hidden border-t">
         <div className="flex items-center gap-2">
            {/* Search Bar */}
            <SearchInputMobile />

            {userId && (
               <Link
                  href="/annonce/ajouter"
                  className={cn(buttonVariants(), "px-3")}
                  title="Ajouter une annonce"
               >
                  <Plus size={20} />
               </Link>
            )}
         </div>

         {/* Onglets */}
         <div className="flex items-center">
            <Link
               href="/"
               className="hover:bg-secondary py-3 px-5 rounded"
               title="Accueil"
            >
               <Home />
            </Link>
            <Link
               href="/utilisateurs"
               className="hover:bg-secondary py-3 px-5 rounded"
               title="Utilisateurs"
            >
               <Users />
            </Link>
            <Link
               href="/posts"
               className="hover:bg-secondary py-3 px-5 rounded"
               title="Posts"
            >
               <LayoutGrid />
            </Link>
         </div>

         <div className="flex items-center gap-3">
            <div className="relative md:ml-5">
               <Bell size={20} />
               <span className="absolute h-4 w-4 rounded-full bg-red-500 -top-1 -right-1"></span>
            </div>

            {userId ? (
               <UserMenu
                  userMail={userMail}
                  userClerkId={userClerkId}
                  userAvatar={userAvatar}
                  firstname={firstname}
                  lastname={lastname}
                  username={username}
               />
            ) : (
               <GuestMenu />
            )}
         </div>
      </nav>
   );
};
