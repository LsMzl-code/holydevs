"use server";
import { db } from "@/lib/prisma";
import { opinionSchema } from "@/schema/houseSchema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export const opinion = async (
   values: z.infer<typeof opinionSchema>,
   houseId: string
) => {
   // Vérification des champs
   const validateFields = opinionSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
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
   await db.opinion.create({
      data: {
         ...values,
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

   return { success: "Votre avis à été publié" };
};
