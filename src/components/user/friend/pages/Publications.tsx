import React from "react";
import { AddPost } from "../../post/AddPost";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import PostCard from "../../post/PostCard";


export const Publications = async ({username}: {username: string}) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         username: username,
      },
      select: {
         id: true,
         firstname: true,
         profilePicture: true,
      },
   });
   if (!user) return null;

   // User posts Datas
   const posts = await db.post.findMany({
      where: {
         authorId: user.id,
      },
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
      <div className="w-full">
         {/* <AddPost currentUser={user} /> */}
         {/* AllPosts */}
         <div className="">
            {posts.length === 0 ? (
               <p className="text-sm">{user.firstname} n'a pas encore publié de post</p>
            ) : (
               posts.map((post) => <PostCard post={post} key={post.id} />)
            )}
         </div>
      </div>
   );
};
