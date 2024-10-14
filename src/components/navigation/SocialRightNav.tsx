"use client";
// React / Next
import Image from "next/image";
import Link from "next/link";
import React, { useOptimistic, useState } from "react";

// Types
import { SocialRightNavTypes } from "@/types/user/navigation";

// UI Components
import { Button } from "../shadcn/button";

// Images
import Accept from "../../../public/icon/check.png";
import Refuse from "../../../public/icon/cancel.png";

// Libraries
import { v4 as uuidv4 } from "uuid";

// API
import {
   acceptFollowRequest,
   declineFollowRequest,
} from "@/actions/social/blockAndFollow";

export const SocialRightNav = ({
   lastUsers,
   requests,
}: SocialRightNavTypes) => {
   const [requestState, setRequestState] = useState(requests);

   const accept = async (requestId: string, userId: string) => {
      removeOptimisticRequest(requestId);
      try {
         await acceptFollowRequest(userId);
         setRequestState((prev) => prev.filter((req) => req.id !== requestId));
      } catch (error) {
         console.error(error);
      }
   };

   const decline = async (requestId: string, userId: string) => {
      removeOptimisticRequest(requestId);
      try {
         await declineFollowRequest(userId);
         setRequestState((prev) => prev.filter((req) => req.id !== requestId));
      } catch (error) {
         console.error(error);
      }
   };

   const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
      requestState,
      (state, value: string) => state.filter((req) => req.id !== value)
   );

   return (
      <aside className="space-y-5 fixed top-20">
         {/* Friend Requests */}
         <div className="bg-card rounded-lg shadow flex flex-col gap-3 p-5">
            {/* Title */}
            <div className="flex items-center justify-between">
               <h3 className="font-semibold text-foreground/70">
                  Demandes d'amis
               </h3>
               {requests.length > 0 && (
                  <Link
                     href=""
                     title="Voir les demandes d'amis en attente"
                     className="font-medium text-sm text-cyan-500"
                  >
                     Voir tout
                  </Link>
               )}
            </div>
            {/* Content */}
            <div className="flex flex-col items-start">
               {requests.length > 0 ? (
                  optimisticRequest.map((request) => (
                     <span
                        className="flex justify-between items-center gap-2 w-full"
                        key={uuidv4()}
                     >
                        {/* User Infos */}
                        <Link
                           href={`/utilisateur/${request.sender.username}`}
                           title={`Visiter le profil de ${request.sender.firstname} ${request.sender.lastname}`}
                        >
                           <div className="flex items-center gap-2">
                              {/* Avatar */}
                              <div className="relative h-10 w-10 rounded-full shadow">
                                 <Image
                                    src={
                                       request.sender.profilePicture
                                          ? request.sender.profilePicture
                                          : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${request.sender.username}`
                                    }
                                    alt={`Photo de profil de ${request.sender.firstname} ${request.sender.lastname}`}
                                    fill
                                    sizes="100%"
                                    className="absolute top-0 left-0 rounded-full object-cover"
                                 />
                              </div>
                              {/* Name */}
                              <p className="font-medium text-sm">
                                 {request.sender.firstname}{" "}
                                 {request.sender.lastname}
                              </p>
                           </div>
                        </Link>
                        {/* Accept & Decline */}
                        <div className="flex items-center mt-1">
                           <form
                              action={() =>
                                 accept(request.id, request.sender.id)
                              }
                           >
                              <button
                                 title="Accepter l'invitation"
                                 className="p-1 hover:bg-blue-500 rounded-full"
                              >
                                 <Image
                                    src={Accept}
                                    alt="Icône de validation de demande d'amis"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 cursor-pointer"
                                 />
                              </button>
                           </form>

                           <form
                              action={() =>
                                 decline(request.id, request.sender.id)
                              }
                           >
                              <button
                                 title="Refuser l'invitation"
                                 className="p-1 hover:bg-blue-500 rounded-full"
                              >
                                 <Image
                                    src={Refuse}
                                    alt="Icône de refus de demande d'amis"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 cursor-pointer"
                                 />
                              </button>
                           </form>
                        </div>
                     </span>
                  ))
               ) : (
                  <p className="text-xs">Aucun demande d'amis pour le moment</p>
               )}
            </div>
         </div>
         {/* Middle */}
         <div className="bg-card rounded-lg shadow flex flex-col gap-3 p-5">
            {/* Title */}
            <h3 className="font-semibold text-foreground/70">
               Nouveaux membres
            </h3>
            {/* Last members */}
            <div className="flex flex-col gap-2">
               {lastUsers.length >= 1 ? (
                  lastUsers.map((user) => (
                     <span
                        className="flex items-center justify-between hover:bg-foreground/5 p-1 rounded-lg"
                        key={uuidv4()}
                     >
                        <Link
                           href={`/utilisateur/${user.username}`}
                           title={`Visiter le profil de ${user.firstname} ${user.lastname}`}
                        >
                           <div className="flex items-center gap-2">
                              {/* Avatar */}
                              <div className="relative h-11 w-11 rounded-full shadow">
                                 <Image
                                    src={
                                       user.profilePicture
                                          ? user.profilePicture
                                          : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
                                    }
                                    alt={`Photo de profil de ${user.firstname} ${user.lastname}`}
                                    fill
                                    sizes="100%"
                                    className="absolute top-0 left-0 rounded-full object-cover"
                                 />
                              </div>
                              {/* Name */}
                              <p className="font-medium text-md">
                                 {user.firstname} {user.lastname}
                              </p>
                           </div>
                        </Link>
                     </span>
                  ))
               ) : (
                  <p>Pas de nouveau membres pour le moment</p>
               )}
            </div>
         </div>

         {/* Bottom */}
      </aside>
   );
};
