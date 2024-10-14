"use server";
import { db } from "@/lib/prisma";
import { postCreateSchema } from "@/schema/socialSchema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getUserByClerkId } from "../getUserByClerkId";


export const postCreate = async (values: z.infer<typeof postCreateSchema>) => {
   // Vérification des champs
   const validateFields = postCreateSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }
   const dbUser = {
      id: user.id,
   };

   // Création du post
   await db.post.create({
      data: {
         ...values,
         author: {
            connect: {
               id: dbUser.id,
            },
         },
      },
   });

   return { success: "Votre post à bien été publié" };
};

export const postUpdate = async (values: z.infer<typeof postCreateSchema>) => {
   // Vérification des champs
   const validateFields = postCreateSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }
   const dbUser = {
      id: user.id,
   };

   // Création du post
   await db.post.create({
      data: {
         ...values,
         author: {
            connect: {
               id: dbUser.id,
            },
         },
      },
   });

   return { success: "Votre post à bien été publié" };
};

export const postDelete = async (postId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }
   const dbUser = {
      id: user.id,
   };

   // Création du post
   await db.post.delete({
      where: {
         id: postId,
      },
   });
};
