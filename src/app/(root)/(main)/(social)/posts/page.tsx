import { AddPost } from "@/components/user/post/AddPost";
import PostCard from "@/components/user/post/PostCard";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
   title: "Tous les posts",
   description:
      "Page du réseau social de Holydevs. Contient les posts de tous les membres du site",
};

export default async function Post() {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) redirect('/');
   
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         profilePicture: true,
      },
   });
   if (!user) return null;

   // Posts Datas
   const allPosts = await db.post.findMany({
      orderBy: {
         createdAt: "desc",
      },
      select: {
         id: true,
         content: true,
         image: true,
         createdAt: true,
         author: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
         likes: {
            select: {
               userId: true,
            },
         },
         comments: {
            select: {
               id: true,
               content: true,
               author: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  }
               }
            },
            
         },
      },
   });

   return (
      <>
         {/* Add post form */}
         <AddPost currentUser={user} />
         <p></p>
         {/* All Posts */}
         <section>
            {allPosts.map((post) => (
               <PostCard post={post} key={uuidv4()} />
            ))}
         </section>
      </>
   );
}
