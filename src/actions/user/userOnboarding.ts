"use server";
import { z } from "zod";

import { firstStepSchema, secondStepSchema } from "@/schema/userSchemas";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Étape 1 du processus d'onboarding
export const onboardingFirstStep = async (
   values: z.infer<typeof firstStepSchema>
) => {
   // Vérification des champs
   const validateFields = firstStepSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   // Destructuration des valeurs
   const { username } = validateFields.data;

   // Utilisateur connecté
   const { userId } = auth();
   // Non connecté
   if (!userId) {
      return { error: "Non autorisé" };
   }
   // Vérification que le pseudo n'est pas déjà prit
   const existingUsername = await db.user.findFirst({
      where: { username: username },
   });
   // Pseudo déjà utilisé
   if (existingUsername) {
      return { error: "Ce pseudo est déjà utilisé" };
   }

   // Création de l'utilisateur
   await db.user.create({
      data: {
         clerkId: userId,
         ...values,
      },
   });

   return { success: "Super, plus qu'une étape !", username: values.username };
};


// Étape 2 du processus d'onboarding
export const onboardingSecondStep = async (
   values: z.infer<typeof secondStepSchema>,
   idUser: string
) => {
   // Vérification des champs
   const validateFields = secondStepSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   // Connexion utilisateur
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   // Mise à jour
   await db.user.update({
      where: {
         clerkId: idUser,
      },
      data: {
         ...values,
         isOnboardingCompleted: true
      },
   });

   return { success: "Yeah, vos informations ont bien été enregistrées!" };
};
