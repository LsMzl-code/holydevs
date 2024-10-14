"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const notation = async (value: number, houseId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Vous devez être connecté pour noter une annonce " };
   }

   const user = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
   });
   const dbUser = {
      id: user?.id,
   };

   // Création de l'utilisateur
   await db.rates.create({
      data: {
         rate: value,
         author: {
            connect: {
               id: dbUser.id,
            },
         },
         house: {
            connect: {
               id: houseId,
            },
         },
      },
   });

   return { success: "Merci pour votre note !" };
};
