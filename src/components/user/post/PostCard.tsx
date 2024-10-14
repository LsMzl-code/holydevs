// React / Next
import Image from "next/image";
import React from "react";
import Link from "next/link";

// Components
import { CommentForm } from "./CommentForm";

// UI Components
import { Separator } from "@/components/shadcn/separator";

// Icons
import { EllipsisIcon } from "lucide-react";

// Types
import { PostTypes } from "@/types/user/posts";

// Libraries
import { format } from "date-fns";
import { PostInteraction } from "@/components/social/PostInteraction";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { LastComment } from "./LastComment";
import { CommentsList } from "./CommentsList";
import { DeletePost } from "@/components/social/DeletePost";

export default async function PostCard({ post }: PostTypes) {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         lastname: true,
         username: true,
         profilePicture: true,
      },
   });
   if (!user) return <p>Vous n'êtes pas connecté</p>;

   // All comments datas
   const allComments = await db.comment.findMany({
      where: {
         postId: post.id,
      },
      orderBy: {
         createdAt: "desc",
      },
      include: {
         author: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
      },
   });

   return (
      <div className="flex flex-col rounded-lg mx-auto mt-5 shadow">
         {/* Haut */}
         <div className="bg-gradient-to-br from-foreground/10 via-card/50 to-card/20 flex flex-col rounded-t-lg">
            <div className="flex items-center justify-between py-2 px-5 border-b mb-5">
               <div className="flex items-center gap-4">
                  <Link
                     href={`/utilisateur/${post.author.username}`}
                     title={`Visiter le profil de ${post.author.firstname} ${post.author.lastname}`}
                  >
                     <div className="relative h-12 w-12">
                        <Image
                           src={
                              post.author.profilePicture
                                 ? post.author.profilePicture
                                 : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${post.author.username}`
                           }
                           fill
                           sizes="100%"
                           alt=""
                           className="rounded-full object-cover"
                        />
                     </div>
                  </Link>
                  <div>
                     <span className="font-medium">
                        {post.author.firstname} {post.author.lastname}
                     </span>
                     <p className="text-xs text-gray-400">
                        Publié le {format(post.createdAt, "dd MMMM yyyy")}
                     </p>
                  </div>
               </div>
               {user.id === post.author.id && <DeletePost postId={post.id} />}
            </div>

            {/* Content */}
            <div className=" flex flex-col gap-4 mb-5">
               {post.image && (
                  <div className="w-full max-sm:h-44 h-60 relative">
                     <Image
                        src={post.image}
                        alt=""
                        className="rounded-md object-cover"
                        fill
                        sizes="100%"
                        priority
                     />
                  </div>
               )}
               <p className="text-sm px-5">{post.content}</p>
            </div>
         </div>
         {/* Bas */}
         <div className="bg-card rounded-b-lg px-5 pt-2 pb-0 flex flex-col">
            {/* User */}
            {/* Interaction */}
            <PostInteraction user={user} post={post} />

            <Separator className="my-2" />

            {/* Add comment */}
            <div>
               <CommentForm user={user} post={post} />
               <Separator className="my-2" />
            </div>

            {}
            {allComments.length >= 2 && (
               <>
                  {/* <Separator className="my-2" /> */}
                  <CommentsList post={post} user={user} />
               </>
            )}
            {allComments.length >= 1 && (
               <div>
                  <LastComment post={post} user={user} />
               </div>
            )}
         </div>
      </div>
   );
}
