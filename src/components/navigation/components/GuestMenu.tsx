import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/shadcn/popover";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export const GuestMenu = () => {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className="py-5 px-1 rounded-full drop-shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
               size="lg"
            >
               <Menu className="cursor-pointer sm:mr-1 mx-1 sm:mx-0" />

               <Avatar className="hidden sm:block ml-1">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${
                        Math.floor(Math.random() * 100) + 1
                     }`}
                  />
               </Avatar>
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-56 px-3 py-4 rounded">
            <p className="text-lg font-medium mb-2">Mon compte</p>
            <div className="flex flex-col gap-1.5">
               <Link href="/inscription" className="text-foreground/80 hover:text-foreground transition-color">Inscription</Link>
               <Link href="/connexion" className="text-foreground/80 hover:text-foreground transition-color">Connexion</Link>
            </div>
         </PopoverContent>
      </Popover>
   );
};
