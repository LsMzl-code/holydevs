"use server";
import { db } from "@/lib/prisma";
import { postCreateSchema } from "@/schema/socialSchema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getUserByClerkId } from "../getUserByClerkId";

export const commentCreate = async (
   values: z.infer<typeof postCreateSchema>,
   postId: string
) => {
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
   await db.comment.create({
      data: {
         content: values.content,
         post: {
            connect: {
               id: postId,
            },
         },
         author: {
            connect: {
               id: dbUser.id,
            },
         },
      },
   });

   return { success: "Votre commentaire à bien été publié" };
};

export const commentDelete = async (commentId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création du post
   await db.comment.delete({
      where: {
         id: commentId,
         authorId: user.id,
      },
   });
};
