"use client";
import { Tabs, TabsContent, TabsList } from "@/components/shadcn/tabs";
import { FriendsPageType } from "@/types/user/profilePages";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const Friends = ({ followers, followings }: FriendsPageType) => {
   return (
      <div className="w-full space-y-3">
         {/* Friends List */}
         <div className="bg-card rounded-lg py-5 px-3">
            <h1 className="text-xl font-semibold mb-3">Amis</h1>

            <Tabs defaultValue="followings">
               <TabsList className="text-sm space-x-3 mb-3 bg-card text-primary font-medium">
                  <TabsTrigger value="followings">Je les suis</TabsTrigger>
                  <TabsTrigger value="followers">Ils me suivent</TabsTrigger>
               </TabsList>
               {/* Abonnements */}
               <TabsContent value="followings">
                  <div className="grid grid-cols-2 md:grid-cols-2">
                     {followings.length >= 1 ? (
                        followings.map((following) => (
                           <Link
                              key={uuidv4()}
                              className="flex gap-2"
                              href={`/utilisateur/${following.following.username}`}
                              title={`Profil utilisateur de ${following.following.firstname} ${following.following.lastname}`}
                           >
                              {/* Avatar */}
                              <div className="relative h-12 w-12">
                                 <Image
                                    src={
                                       following.following.profilePicture
                                          ? following.following.profilePicture
                                          : ""
                                    }
                                    fill
                                    sizes="100%"
                                    alt={`Photo de profil de ${following.following.firstname} ${following.following.lastname}`}
                                    className="rounded-full object-cover"
                                 />
                              </div>
                              <div>
                                 <p>
                                    {following.following.firstname}{" "}
                                    {following.following.lastname}
                                 </p>
                                 <p>{following.following.username}</p>
                              </div>
                           </Link>
                        ))
                     ) : (
                        <p className="text-sm">
                           Vous n'êtes abonné à personne pour le moment.
                        </p>
                     )}
                  </div>
               </TabsContent>
               {/* Abonnés */}
               <TabsContent value="followers">
                  <div className="grid grid-cols-2 md:grid-cols-2">
                     {followers.length >= 1 ? (
                        followers.map((follower) => (
                           <Link
                              key={uuidv4()}
                              className="flex gap-2"
                              href={`/utilisateur/${follower.follower.username}`}
                              title={`Profil utilisateur de ${follower.follower.firstname} ${follower.follower.lastname}`}
                           >
                              {/* Avatar */}
                              <div className="relative h-12 w-12">
                                 <Image
                                    src={
                                       follower.follower.profilePicture
                                          ? follower.follower.profilePicture
                                          : ""
                                    }
                                    fill
                                    sizes="100%"
                                    alt={`Photo de profil de ${follower.follower.firstname} ${follower.follower.lastname}`}
                                    className="rounded-full object-cover"
                                 />
                              </div>
                              <div>
                                 <p>
                                    {follower.follower.firstname}{" "}
                                    {follower.follower.lastname}
                                 </p>
                                 <p>{follower.follower.username}</p>
                              </div>
                           </Link>
                        ))
                     ) : (
                        <p className="text-sm">
                           Vous n'avez pas encore d'abonnés.
                        </p>
                     )}
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};
