import { db } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

// Image
import Follower from "../../../../../../public/icon/followers.png";
import House from "../../../../../../public/icon/home-button.png";

// Libraries
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Tous les membres",
   description: "Réseau social - liste de tous les membres d'Holydevs",
};

// TODO: Ajouter un layout avec une barre de navigation sur la gauche
export default async function AllUsers() {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) redirect("/");

   const allUsers = await db.user.findMany({
      include: {
         houses: {
            select: {
               id: true,
            },
         },
         followings: {
            select: {
               following: {
                  select: {
                     id: true,
                  },
               },
            },
         },
      },
   });
   if (!allUsers) return <h1>Aucun utilisateur trouvé.</h1>;

   return (
      <section>
         <h1 className="text-2xl font-semibold mb-5">Rechercher des membres</h1>
         <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {allUsers.length > 1 &&
               allUsers.map((user) => (
                  <Link
                     href={`/utilisateur/${user.username}`}
                     title={`Visiter le profil de ${user.firstname} ${user.lastname}`}
                     className="flex flex-col shadow rounded-lg bg-card"
                     key={uuidv4()}
                  >
                     {/* Avatar */}
                     <div className="relative w-full h-24 lg:h-44 rounded-lg ">
                        <Image
                           src={
                              user.profilePicture
                                 ? user.profilePicture
                                 : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
                           }
                           alt={`Photo de ${user.firstname} ${user.lastname}`}
                           fill
                           className="absolute top-0 left-0 object-cover rounded-lg rounded-b-none border-b-cyan-400 border-b-4"
                           sizes="100%"
                           priority
                        />
                     </div>
                     <div className="p-2">
                        {/* Infos */}
                        <div className="my-1">
                           {user.firstname && user.lastname ? (
                              <p className="font-semibold text-lg">
                                 {user.firstname} {user.lastname}
                              </p>
                           ) : (
                              <p className="font-semibold text-xl">
                                 {user.username}
                              </p>
                           )}

                           <div className="flex flex-col gap-1 p-2">
                              {/* Annonces */}
                              <div className="flex items-center gap-3">
                                 <Image
                                    // TODO mettre image par défaut
                                    src={House}
                                    height={20}
                                    width={20}
                                    alt=""
                                    className="h-5 w-5"
                                 />
                                 <p className="font-medium text-sm">
                                    {user.houses.length <= 1 ? (
                                       <>{user.houses.length} annonce</>
                                    ) : (
                                       <>{user.houses.length} annonces</>
                                    )}
                                 </p>
                              </div>
                              {/* Followers */}
                              <div className="flex items-center gap-3">
                                 <Image
                                    // TODO mettre image par défaut
                                    src={Follower}
                                    height={20}
                                    width={20}
                                    alt=""
                                    className="h-5 w-5"
                                 />
                                 <p className="font-medium text-sm">
                                    {user.followings.length <= 1 ? (
                                       <>{user.followings.length} abonné</>
                                    ) : (
                                       <>{user.followings.length} abonnés</>
                                    )}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
         </div>
      </section>
   );
}
