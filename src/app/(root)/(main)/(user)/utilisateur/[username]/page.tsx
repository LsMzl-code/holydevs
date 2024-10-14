import { FriendProfileSideNav } from "@/components/navigation/components/FriendProfileSideNav";
import { Badge } from "@/components/shadcn/badge";
import { Publications } from "@/components/user/friend/pages/Publications";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
   title: `Profil de $`,
   description: "Profil utilisateur de ...",
};

export default async function UserProfile({
   params,
}: {
   params: { username: string };
}) {
   console.log('params.username', params.username)
   const user = await db.user.findFirst({
      where: {
         username: params.username,
      },
      select: {
         id: true,
         firstname: true,
         lastname: true,
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

   if (!user) redirect("/");
   return (
      <section className="flex items-start gap-5 max-w-[1200px] mx-auto">
         {/* Left */}
         <FriendProfileSideNav user={user} />
         {/* Right */}
         <Publications username={params.username} />
      </section>
   );
}
