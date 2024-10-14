"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getUserByClerkId } from "../getUserByClerkId";
import { addMessageSchema } from "@/schema/messengerSchema";

export const sendMessage = async (
   values: z.infer<typeof addMessageSchema>,
   discussionId: string,
   receiverId: string
) => {
   // Vérification des champs
   const validateFields = addMessageSchema.safeParse(values);
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

   // Création du post
   await db.message.create({
      data: {
         content: values.content,
         discussion: {
            connect: {
               id: discussionId,
            },
         },
         sender: {
            connect: {
               id: user.id,
            },
         },
          receiver: {
             connect: {
                id: receiverId
             },
          },
      },
   });

   return { success: "Message envoyé" };
};
