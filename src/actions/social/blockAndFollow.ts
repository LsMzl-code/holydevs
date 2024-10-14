"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const switchFollow = async (profileUserId: string) => {
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
      //* Amitié existante ?
      const existingFollow = await db.friend.findFirst({
         where: {
            followerId: currentUserId.id,
            followingId: profileUserId,
         },
      });

      //? Oui => suppression
      if (existingFollow) {
         await db.friend.delete({
            where: {
               id: existingFollow.id,
            },
         });
         console.log("plus amis");
         //? Non
      } else {
         //? Demande d'ami
         const existingFollowRequest = await db.friendRequest.findFirst({
            where: {
               senderId: currentUserId.id,
               receiverId: profileUserId,
            },
         });
         //? Oui => suppression
         if (existingFollowRequest) {
            await db.friendRequest.delete({
               where: {
                  id: existingFollowRequest.id,
               },
            });
            console.log("demande annulée");
            //? Non => demande d'ami
         } else {
            await db.friendRequest.create({
               data: {
                  senderId: currentUserId.id,
                  receiverId: profileUserId,
               },
            });
            console.log("demande d'ami");
         }
      }
   } catch (error) {
      console.log(error);
      throw new Error("Une erreur est survenue");
   }
};

export const switchBlock = async (profileUserId: string) => {
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
      //* Blocage existant
      const existingBlock = await db.block.findFirst({
         where: {
            blockerId: currentUserId.id,
            blockedId: profileUserId,
         },
      });
      //? Oui => suppression
      if (existingBlock) {
         await db.block.delete({
            where: {
               id: existingBlock.id,
            },
         });
         console.log("blocage annulé");
         //? Non => blocage
      } else {
         await db.block.create({
            data: {
               blockerId: currentUserId.id,
               blockedId: profileUserId,
            },
         });
         console.log("blocage");
      }
   } catch (error) {
      console.log(error);
      throw new Error("Une erreur est survenue");
   }
};

export const acceptFollowRequest = async (requestSenderId: string) => {
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
      //* Demande d'ami
      const existingFollowRequest = await db.friendRequest.findFirst({
         where: {
            senderId: requestSenderId,
            receiverId: currentUserId.id,
         },
      });
      //? Suppression de la demande
      if (existingFollowRequest) {
         await db.friendRequest.delete({
            where: {
               id: existingFollowRequest.id,
            },
         });
      }
      //? Création d'amitié
      await db.friend.create({
         data: {
            followerId: requestSenderId,
            followingId: currentUserId.id,
         },
      });
   } catch (error) {
      console.log(error);
      throw new Error("Une erreur est survenue");
   }
};

export const declineFollowRequest = async (requestSenderId: string) => {
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
      //* Demande d'ami
      const existingFollowRequest = await db.friendRequest.findFirst({
         where: {
            senderId: requestSenderId,
            receiverId: currentUserId.id,
         },
      });
      //? Suppression de la demande
      if (existingFollowRequest) {
         await db.friendRequest.delete({
            where: {
               id: existingFollowRequest.id,
            },
         });
      }
   } catch (error) {
      console.log(error);
      throw new Error("Une erreur est survenue");
   }
};
