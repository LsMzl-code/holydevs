"use client";
import React from "react";
import {
   Dialog,
   DialogClose,
   DialogHeader,
   DialogContent,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";

import { Separator } from "@/components/shadcn/separator";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PostTypes } from "@/types/user/posts";
import { format } from "date-fns";
import { PostInteraction } from "@/components/social/PostInteraction";
import { CommentForm } from "./CommentForm";

// Images
import HeartSvg from "../../../../public/icon/heartSvg.svg";
import ReplySvg from "../../../../public/icon/replySvg.svg";
import { DeletePost } from "@/components/social/DeletePost";
import { DeleteComment } from "@/components/social/DeleteComment";

export const CommentsList = ({ post, user }: PostTypes) => {
   return (
      <Dialog>
         <DialogTrigger className="flex justify-end">
            <p className="text-xs font-semibold mt-2 mb-1 hover:text-foreground/70 transition-colors">
               Voir plus de commentaires
            </p>
         </DialogTrigger>
         <DialogContent className="max-w-[1000px]">
            <DialogHeader>
               <DialogTitle>
                  <p className="text-center text-xl font-medium mb-1">
                     Publication de {post.author.firstname}{" "}
                     {post.author.lastname}
                  </p>
               </DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="flex flex-col rounded w-full">
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
                     {user?.id === post.author.id && (
                        <DeletePost postId={post.id} />
                     )}
                  </div>

                  {/* Content */}
                  <div className=" flex flex-col gap-4 mb-5">
                     {post.image && (
                        <div className="w-full max-sm:h-44 h-96 relative">
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
               <div className="bg-card rounded-b-lg px-5 pt-2 pb-0 flex flex-col gap-2">
                  {/* Interaction */}
                  <PostInteraction user={user} post={post} />

                  <Separator className="my-0" />

                  {/* Add comment */}
                  <div>
                     <CommentForm user={user} post={post} />
                  </div>
                  {/* Comments List */}
                  <Separator />
                  <div className="flex flex-col">
                     {post.comments.map((comment) => (
                        <div
                           className="flex items-start justify-between gap-2 mt-2 mb-4"
                           key={comment.id}
                        >
                           <div className=" min-w-[5%]">
                              <Image
                                 src={
                                    comment.author.profilePicture
                                       ? comment.author.profilePicture
                                       : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${comment.author.username}`
                                 }
                                 width={40}
                                 height={40}
                                 alt={`Photo de ${comment?.author.firstname} ${comment?.author.lastname}`}
                                 className="rounded-full object-cover h-9 w-9"
                              />
                           </div>

                           <div className="space-y-1 min-w-[95%] flex flex-col ">
                              <div className="bg-foreground/5 rounded-lg p-2">
                                 <div className="flex items-center justify-between">
                                    {comment?.author.firstname &&
                                    comment?.author.lastname ? (
                                       <span>
                                          <p className="font-semibold text-sm">
                                             {comment?.author.firstname}{" "}
                                             {comment?.author.lastname}
                                          </p>
                                       </span>
                                    ) : (
                                       <p className="font-semibold text-sm">
                                          {comment?.author.username}
                                       </p>
                                    )}

                                    {user?.id === comment.author.id && (
                                       <DeleteComment commentId={comment.id} />
                                    )}
                                 </div>
                                 <p className="text-xs">{comment.content}</p>
                                 {/* Interaction */}
                              </div>
                              <div className="flex items-center gap-2 mt-1 ml-5">
                                 <div className="bg-red-200 p-0.5 rounded flex items-center gap-1">
                                    <Image
                                       src={HeartSvg}
                                       alt="Icone de like"
                                       className="w-4 h-4 cursor-pointer"
                                    />
                                    <p className="text-xs">15</p>
                                 </div>
                                 <div className="bg-red-200 p-0.5 rounded flex items-center gap-1">
                                    <Image
                                       src={ReplySvg}
                                       alt="Icone de like"
                                       className="w-4 h-4  cursor-pointer"
                                    />
                                    <p className="text-xs">15</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>

      //  <CommentCard />
   );
};
