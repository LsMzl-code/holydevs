import { FriendProfileSideNav } from "@/components/navigation/components/FriendProfileSideNav";
import ProfileSideBar from "@/components/navigation/components/ProfileSideBar";
import { ProfileHouseCard } from "@/components/user/profile/pages/ProfileHouseCard";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
   title: "Annonces de $",
   description: "Page de messagerie utilisateur",
};

export default async function Annonces({
   params,
}: {
   params: { username: string };
}) {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         username: params.username,
      },
      select: {
         id: true,
         firstname: true,
         username: true,
         profilePicture: true,
         biography: true,
         languages: true,
         interests: true,
         houses: {
            select: {
               id: true,
               image: true,
               title: true,
               price: true,
            },
         },
         opinions: {
            select: {
               id: true,
            },
         },
         followers: {
            select: {
               id: true,
               follower: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
         followings: {
            select: {
               id: true,
               following: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
      },
   });
   if (!user) return <h1>Vous n'êtes pas connecté</h1>;

   const annonces = await db.house.findMany({
      where: {
         userId: user.id,
      },
      select: {
         id: true,
         image: true,
         title: true,
         price: true,
         description: true,
         country: true,
         city: true,
         types: {
            select: {
               type: {
                  select: {
                     name: true,
                  },
               },
            },
         },
         categories: {
            select: {
               category: {
                  select: {
                     name: true,
                  },
               },
            },
         },

         Opinions: {
            select: {
               id: true,
            },
         },
      },
   });

   return (
      <section className="flex items-start gap-5 w-full">
         {/* Left */}
         <FriendProfileSideNav user={user} />
         {/* Right */}
         <div className="flex flex-col gap-5 w-full">
            <div className="bg-card rounded-lg px-5 py-2 space-y-3">
               <h2 className="text-2xl font-semibold">Mes annonces</h2>
               {annonces.length === 0 ? (
                  <p>Vous n'avez pas encore ajouté d'annonces</p>
               ) : (
                  annonces.map((house) => (
                     <ProfileHouseCard house={house} key={uuidv4()} />
                  ))
               )}
            </div>
         </div>
      </section>
   );
}
