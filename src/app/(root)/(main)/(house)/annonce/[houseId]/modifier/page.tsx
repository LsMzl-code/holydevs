import { HouseUpdateForm } from "@/components/house/HouseUpdateForm";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect, useRouter } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
   title: "Modification d'annonce",
   description: "Page de modification d'annonce",
};

interface HouseDetailsProps {
   params: {
      houseId: string;
   };
}

export default async function UpdateHouse({ params }: HouseDetailsProps) {
   // Utilisateur connecté
   const { userId } = auth();

   const house = await db.house.findFirst({
      where: {
         id: params.houseId,
      },
      select: {
         id: true, country: true, state: true, city: true,
         ownerId: true, address: true, title: true, image: true, introduction: true,
         description: true, price: true, bedroom: true, kitchen: true,
         bathroom: true,isAvailable: true,
         categories: {
            select: {
               category: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
            },
         },
         types: {
            select: {
               type: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
            },
         },
         features: {
            select: {
               feature: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
            },
         },
      },
   });

   // Utilisateur connecté non propriétaire de l'annonce
   if (house?.ownerId != userId) {
      redirect("/");
   }
   
   // Pas d'annonce trouvée
   if (!house)
      return <p className="text-center mt-2 text-lg">Annonce non trouvée...</p>;
   const categories = await db.category.findMany();
   const types = await db.type.findMany();
   const features = await db.feature.findMany();
   return (
      <div>
         <HouseUpdateForm
            house={house}
            categories={categories}
            types={types}
            features={features.map((feature) => feature)}
         />
      </div>
   );
}
