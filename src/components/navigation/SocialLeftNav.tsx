import { SocialLeftNavTypes } from "@/types/user/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Image
import Friends from "../../../public/icon/friends.png";
import Message from "../../../public/icon/chat.png";
import Comments from "../../../public/icon/comments.png";
import Likes from "../../../public/icon/heart.png";
import Group from "../../../public/icon/group.png";
import Post from "../../../public/icon/post.png";
import Banner from "../../../public/img/banniere.jpg";

export const SocialLeftNav = ({ user }: SocialLeftNavTypes) => {
   return (
      <aside className="space-y-5 sticky top-20">
         {/* Top */}
         <Link href={`/${user.username}`} title="Visiter mon profil">
            <div className="bg-card rounded-lg shadow flex flex-col items-center pb-5">
               {/* Cover picture */}
               <div className="w-full h-28 bg-card rounded-t-lg relative">
                  <Image
                     src={user.coverPicture ? user.coverPicture : Banner}
                     alt={`Photo de profil de ${user.firstname} ${user.lastname}`}
                     fill
                     sizes="100%"
                     className="absolute top-0 left-0 rounded-t-lg object-cover"
                  />
                  {/* Avatar */}
                  <div className="relative top-[60%] left-[50%] translate-x-[-50%] h-20 w-20 rounded-full">
                     <Image
                        src={
                           user.profilePicture
                              ? user.profilePicture
                              : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
                        }
                        alt={`Photo de profil de ${user.firstname} ${user.lastname}`}
                        fill
                        className="absolute rounded-full object-cover border-2 border-card"
                     />
                  </div>
               </div>
               {/* Name */}
               <div className="text-center mt-10">
                  {user.firstname && user.lastname ? (
                     <p className="text-lg font-semibold capitalize">
                        {user.firstname} {user.lastname}
                     </p>
                  ) : (
                     <p className="text-lg font-medium">Utilisateur</p>
                  )}

                  <p className="text-sm">@{user.username}</p>
               </div>
            </div>
         </Link>
         {/* Middle */}
         <div className="bg-card rounded-lg shadow flex flex-col gap-2 p-5 font-medium">
            {/* Friends */}
            <Link
               className="flex items-center gap-2 hover:bg-foreground/5 p-1 rounded-lg"
               href={`/${user.username}/amis`}
            >
               <Image
                  src={Friends}
                  alt="Icône de la page amis de l'utilisateur"
                  width={20}
                  height={20}
               />
               <p>Mes amis</p>
            </Link>
            {/* Likes */}
            <Link
               className="flex items-center gap-2 hover:bg-foreground/5 p-1 rounded-lg"
               href=""
            >
               <Image
                  src={Likes}
                  alt="Icône de la page amis de l'utilisateur"
                  width={20}
                  height={20}
               />
               <p>Likes</p>
            </Link>
            {/* Comments */}
            <Link
               className="flex items-center gap-2 hover:bg-foreground/5 p-1 rounded-lg"
               href=""
            >
               <Image
                  src={Comments}
                  alt="Icône de la page amis de l'utilisateur"
                  width={20}
                  height={20}
               />
               <p>Commentaires</p>
            </Link>
            {/* Messagerie */}
            <Link
               className="flex items-center gap-2 hover:bg-foreground/5 p-1 rounded-lg"
               href={`/${user.username}/messages`}
            >
               <Image
                  src={Message}
                  alt="Icône de la page amis de l'utilisateur"
                  width={20}
                  height={20}
               />
               <p>Messagerie</p>
            </Link>
            {/* Group */}
            <Link
               className="flex items-center gap-2 hover:bg-foreground/5 p-1 rounded-lg"
               href={`/${user.username}/groupes`}
            >
               <Image
                  src={Group}
                  alt="Icône de la page amis de l'utilisateur"
                  width={20}
                  height={20}
               />
               <p>Groupes</p>
            </Link>
            {/* Posts */}
            <Link
               className="flex items-center gap-2 hover:bg-foreground/5 p-1 rounded-lg"
               href=""
            >
               <Image
                  src={Post}
                  alt="Icône de la page amis de l'utilisateur"
                  width={20}
                  height={20}
               />
               <p>Mes posts</p>
            </Link>
         </div>
      </aside>
   );
};
