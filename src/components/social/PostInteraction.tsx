"use client";

import { PostTypes, PostUserInteractionTypes } from "@/types/user/posts";
import Image from "next/image";

// Icons
import Heart from "../../../public/icon/heart.png";
import hollowHeart from "../../../public/icon/noLike.png";
import Reply from "../../../public/icon/reply-all.png";
import Share from "../../../public/icon/share.png";
import Send from "../../../public/icon/send.png";

import { useOptimistic, useState } from "react";
import { switchLike } from "@/actions/social/like";


export const PostInteraction = ({ post, user }: PostTypes) => {
   const likes = post.likes.map((like) => like.userId);
   const [likeState, setLikeState] = useState({
      likeCount: likes.length,
      isLiked: user?.id ? likes.includes(user.id) : false,
   });

   const [optimisticLike, switchOptimisticLike] = useOptimistic(
      likeState,
      (state, value) => {
         return {
            likeCount: state.isLiked
               ? state.likeCount - 1
               : state.likeCount + 1,
            isLiked: !state.isLiked,
         };
      }
   );

   const likeAction = async () => {
      switchOptimisticLike("");
      try {
         switchLike(post.id);
         setLikeState((state) => ({
            likeCount: state.isLiked
               ? state.likeCount - 1
               : state.likeCount + 1,
            isLiked: !state.isLiked,
         }));
      } catch (error) {}
   };

   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-5">
            {/* Like */}
            <div className="flex gap-2 items-center bg-foreground/5 py-1 px-2 rounded-xl cursor-pointer hover:bg-foreground/10">
               <div className="flex items-center" title="Likes">
                  <form action={likeAction}>
                     {optimisticLike.isLiked ? (
                        // Like
                        <button className="mt-1">
                           <Image
                              src={Heart}
                              alt="Icône d'un coeur"
                              className="w-4 h-4"
                              width={16}
                              height={16}
                           />
                        </button>
                     ) : (
                        // No Like
                        <button className="mt-1">
                           <Image
                              src={hollowHeart}
                              alt="Icône d'un coeur vide"
                              className="w-4 h-4"
                              width={16}
                              height={16}
                           />
                        </button>
                     )}
                  </form>
               </div>
               <span className="text-sm">{optimisticLike.likeCount}</span>
            </div>
            {/* Reply */}
            <div className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10">
               <div className="flex items-center" title="Commenter">
                  <Image
                     src={Reply}
                     alt="Icône de réponse"
                     className="w-4 h-4"
                     width={16}
                     height={16}
                  />
               </div>
               <span className="text-sm">{post.comments.length}</span>
            </div>
         </div>
         {/* Share */}
         <div className="flex items-center gap-2">
            <div
               className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10"
               title="Partager"
            >
               <Image
                  src={Share}
                  alt="Icône de partage"
                  className="w-4 h-4"
                  width={16}
                  height={16}
               />
            </div>
            <div
               className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10 transition-colors group"
               title="Envoyer"
            >
               <Image
                  src={Send}
                  alt="Icône d'envoi'"
                  className="w-4 h-4 group-hover:animate-bounce"
                  width={16}
                  height={16}
               />
            </div>
         </div>
      </div>
   );
};
