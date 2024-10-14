"use client";
import React from "react";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { DescriptionDialogTypes, HouseDetailsTypes } from "@/types/house/houseDetails";
import { Separator } from "@/components/shadcn/separator";

export const HouseDescriptionDialog = ({ house }: DescriptionDialogTypes) => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <div>
               {/* Mobile */}
               <p className="font-semibold mt-2 text-sm cursor-pointer hover:text-foreground/50 transition-colors w-[75px]">
                  Voir plus
               </p>
            </div>
         </DialogTrigger>
         <DialogContent className="max-w-[1000px]">
            <DialogHeader>
               <DialogTitle>En savoir plus sur le logement</DialogTitle>
            </DialogHeader>
            <Separator />
            <div>
               <p className="text-sm">{house.description}</p>
            </div>
         </DialogContent>
      </Dialog>
   );
};
