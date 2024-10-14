"use server";
import { db } from "@/lib/prisma";
import { coverPictureSchema } from "@/schema/userSchemas";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export const updateCoverPicture = async (
   values: z.infer<typeof coverPictureSchema>
) => {
   // Vérification des champs
   const validateFields = coverPictureSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }

   // Création de l'utilisateur
   await db.user.update({
      where: { clerkId: userId },
      data: {
         ...values,
      },
   });

   return { success: "Votre image de couverture à été mise à jour" };
};

export const deleteProfile = async () => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   // Suppression de l'utilisateur
   await db.user.delete({
      where: { clerkId: userId },
   });

   return {
      success:
         "Votre profil à bien été supprimé, nous espérons vous revoir bientôt",
   };
};
