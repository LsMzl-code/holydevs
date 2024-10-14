"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const switchFavourite = async (houseId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      throw new Error("Utilisateur non connecté");
   }
   const currentUserId = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
      },
   });
   if (!currentUserId) {
      throw new Error("Utilisateur non trouvé");
   }

   try {
      const existingFav = await db.favourite.findFirst({
         where: {
            houseId: houseId,
            userId: currentUserId.id,
         },
      });

      if (existingFav) {
         await db.favourite.delete({
            where: {
               id: existingFav.id,
            },
         });
      } else {
         await db.favourite.create({
            data: {
               houseId: houseId,
               userId: currentUserId.id,
            },
         });
      }
   } catch (error) {
      console.error(error);
      throw new Error("Une erreur est survenue");
   }
};
