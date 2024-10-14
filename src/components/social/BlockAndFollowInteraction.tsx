"use client";
import React, { useOptimistic, useState } from "react";
import { Button } from "../shadcn/button";
import Image from "next/image";

// Images
import Block from "../../../public/icon/block.png";
import UnBlock from "../../../public/icon/accept.png";
import Follow from "../../../public/icon/follow.png";
import unFollow from "../../../public/icon/unFollow.png";
import hourglass from "../../../public/icon/hourglass.png";

// Types
import { BlockAndFollowTypes } from "@/types/social/SocialInteractions";

// Api
import { switchBlock, switchFollow } from "@/actions/social/blockAndFollow";

export const BlockAndFollowInteraction = ({
   userId,
   isUserBlocked,
   isFollowing,
   isFollowingRequestSent,
}: BlockAndFollowTypes) => {
   const [userState, setUserState] = useState({
      following: isFollowing,
      blocked: isUserBlocked,
      followingRequestSent: isFollowingRequestSent,
   });

   const follow = async () => {
      switchOptimisticState("follow");
      try {
         await switchFollow(userId);
         setUserState((prev) => ({
            ...prev,
            following: prev.following && false,
            followingRequestSent:
               !prev.following && !prev.followingRequestSent ? true : false,
         }));
      } catch (error) {
         console.log(error);
      }
   };
   const block = async () => {
      switchOptimisticState("block");
      try {
         await switchBlock(userId);
         setUserState((prev) => ({
            ...prev,
            blocked: !prev.blocked,
         }));
      } catch (error) {
         console.log(error);
      }
   };

   const [optimisticState, switchOptimisticState] = useOptimistic(
      userState,
      (state, value: "follow" | "block") =>
         value === "follow"
            ? {
                 ...state,
                 following: state.following && false,
                 followingRequestSent:
                    !state.following && !state.followingRequestSent
                       ? true
                       : false,
              }
            : { ...state, blocked: !state.blocked }
   );

   return (
      <>
         <form action={follow}>
            {optimisticState.following ? (
               // Ami
               <Button
                  variant="secondary"
                  className="flex items-center gap-1"
                  title="Ne plus suivre l'utilisateur"
               >
                  <Image
                     src={unFollow}
                     alt="Icône d'arret d'amitié"
                     width={20}
                     height={20}
                     className="w-6 h-6"
                  />
                  <p>Abonné</p>
               </Button>
            ) : optimisticState.followingRequestSent ? (
               // Demande en attente
               <Button
                  variant="secondary"
                  className="flex items-center gap-1"
                  title="Annuler la demande"
               >
                  <Image
                     src={hourglass}
                     alt="Icône d'attente de réponse"
                     width={20}
                     height={20}
                     className="w-6 h-6"
                  />
                  <p>En attente</p>
               </Button>
            ) : (
               // Pas ami
               <Button
                  variant="secondary"
                  className="flex items-center gap-1"
                  title="Suivre l'utilisateur"
               >
                  <Image
                     src={Follow}
                     alt="Icône de demande d'amis"
                     width={20}
                     height={20}
                     className="w-6 h-6"
                  />
                  <p className="max-md:hidden">Suivre</p>
               </Button>
            )}
         </form>

         {/* Blocage */}
         <form action={block}>
            {optimisticState.blocked ? (
               // Utilisateur bloqué
               <Button variant="secondary" title="Débloquer">
                  <Image
                     src={UnBlock}
                     alt="Icône de déblocage"
                     width={20}
                     height={20}
                     className="w-6 h-6"
                  />
               </Button>
            ) : (
               // Utilisateur non bloqué
               <Button variant="secondary" title="Bloquer">
                  <Image
                     src={Block}
                     alt="Icône de blocage"
                     width={20}
                     height={20}
                     className="w-6 h-6"
                  />
               </Button>
            )}
         </form>
      </>
   );
};
