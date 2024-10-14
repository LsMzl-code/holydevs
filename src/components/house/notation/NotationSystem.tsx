"use client";
import React, { useState, useTransition } from "react";
import Rating from "@mui/material/Rating";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Separator } from "@/components/shadcn/separator";

import Star from "../../../../public/icon/star.png";
import Image from "next/image";
import { NotationSystemTypes } from "@/types/house/houseDetails";
import { Button } from "@/components/shadcn/button";
import { toast } from "@/components/shadcn/use-toast";
import { useRouter } from "next/navigation";
import { notation } from "@/actions/interaction/notation";

export const NotationSystem = ({ house, averageRate }: NotationSystemTypes) => {
   // States
   const [value, setValue] = useState<number>(0);
   const [isLoading, startTransition] = useTransition();
   const router = useRouter();

   const handleNotation = () => {
      startTransition(() => {
         notation(value, house.id)
            .then((data) => {
               if (data?.error) {
                  toast({
                     title: "❌ Erreur",
                     variant: "destructive",
                     description: `${data.error}`,
                  });
               }
               if (data?.success) {
                  toast({
                     title: "✔️ Succès",
                     variant: "default",
                     description: `${data.success}`,
                  });
                  router.push(`/annonce/${house.id}`);
               }
            })
            .catch(() =>
               toast({
                  title: "❌ Erreur",
                  variant: "destructive",
                  description: `Une erreur est survenue...`,
               })
            );
      });
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <div className="flex items-center justify-center gap-2 border rounded-full p-2 w-[170px] bg-foreground/5 group cursor-pointer hover:shadow">
               <Image
                  src={Star}
                  alt="Icône de note du logement"
                  height={20}
                  width={20}
                  className="h-5 w-5 group-hover:animate-spin-fast"
               />
               {house.rates.length === 0 ? (
                  <p>Aucune note</p>
               ) : (
                  <p>
                     {averageRate}/5 | {house.rates.length} notes
                  </p>
               )}
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Donner une note</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="flex flex-col items-center gap-3">
               <Rating
                  name="simple-controlled"
                  size="large"
                  value={value}
                  onChange={(event, newValue) => {
                     setValue(Number(newValue));
                  }}
               />
               <Button size="sm" onClick={handleNotation}>
                  Valider
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};
