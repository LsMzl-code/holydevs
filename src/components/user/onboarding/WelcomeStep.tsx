"use client";
import { buttonVariants } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect } from "react";

import JSConfetti from "js-confetti";

interface WelcomeStepProps {
   dbUser: {
      firstname: string | null;
   } | null;
}

export const WelcomeStep = ({ dbUser }: WelcomeStepProps) => {
   const jsConfetti = new JSConfetti();

   const handleConfettis = () => {
      jsConfetti.addConfetti({
         confettiNumber: 800,
      });
   };
   useEffect(() => {
      handleConfettis();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <section className="w-full h-screen flex items-center justify-center">
         <div className="flex flex-col justify-center items-center">
            <h1 className=" text-3xl md:text-5xl lg:text-6xl font-medium text-center">
               Bienvenue sur Holydevs
            </h1>
            <p className="mb-5 text-xs">Le réseau social entre propriétaires</p>
            <p className="text-xl">
               Félicitations {dbUser?.firstname} votre profil est à jour !
            </p>
            <p className="text-center">
               Vous pouvez à présent profiter de toutes les fonctionnalités du
               site
            </p>
            <div className="flex items-center justify-center gap-5 mt-5">
               <Link
                  href={"/annonce/ajouter"}
                  title="Page de formulaire d'ajout d'annonce"
                  className={cn(buttonVariants())}
               >
                  Ajouter une annonce
               </Link>
               <Link
                  href={"/"}
                  title="Retour à l'accueil"
                  className={cn(buttonVariants())}
               >
                  Terminer
               </Link>
            </div>
         </div>
      </section>
   );
};
