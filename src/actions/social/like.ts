"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const switchLike = async (postId: string) => {
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
      const existingLike = await db.like.findFirst({
         where: {
            postId: postId,
            userId: currentUserId.id,
         },
      });

      if (existingLike) {
         await db.like.delete({
            where: {
               id: existingLike.id,
            },
         });
      } else {
         await db.like.create({
            data: {
               postId: postId,
               userId: currentUserId.id,
            },
         });
      }
   } catch (error) {
      console.error(error);
      throw new Error("Une erreur est survenue");
   }
};
