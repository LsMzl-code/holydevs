import Image from "next/image";
import React from "react";

import Avatar from "../../../.././../../public/img/palmier.jpg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface UserInfosProps {
   allDiscussions: {
      id: string;
      createdAt: Date;
      ownerId: string;
      friendId: string;
      owner: {
         id: string;
         username: string | null;
         firstname: string | null;
         lastname: string | null;
         profilePicture: string | null;
      };
      friend: {
         id: string;
         username: string | null;
         firstname: string | null;
         lastname: string | null;
         profilePicture: string | null;
      };
   }[];
   user: {
      id: string;
   };
}

export const UserInfo: React.FC<UserInfosProps> = ({
   allDiscussions,
   user,
}) => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();
   const activeChatId = searchParams.get("chat");


   // Ajout de l'id de la discussion dans l'url
   const handleSelectedDiscussion = (discussionId: string) => {
      const params = new URLSearchParams(searchParams);
      if (discussionId) {
         params.set("chat", discussionId);
      } else {
         params.delete("chat");
      }
      params.set("chat", discussionId);
      replace(`${pathname}?${params.toString()}`);
   };

   return (
      <div>
         {/* User */}
         <div className="p-2 flex flex-col items-start gap-2">
            {/* Title */}
            <p className="font-medium text-sm">Discussions récentes</p>
            {/* Discussions */}
            <div className="flex items-center gap-5">
               {allDiscussions.map(
                  (discussion) =>
                     discussion.ownerId === user.id ||
                     (discussion.friendId === user.id ? (
                        <div
                           key={discussion.id}
                           className="relative cursor-pointer hover:drop-shadow-xl hover:scale-110"
                           onClick={() => handleSelectedDiscussion(discussion.id)}
                        >
                           {discussion.ownerId === user.id && (
                              <Image
                                 src={
                                    discussion.friend.profilePicture ?? Avatar
                                 }
                                 alt="Photo de profil"
                                 width={40}
                                 height={40}
                                 className={cn(activeChatId == discussion.id ? "scale-125 border-2 border-primary" : "", "rounded-full object-cover h-12 w-12")}
                              />
                           )}
                           {discussion.friendId === user.id && (
                              <Image
                                 src={discussion.owner.profilePicture ?? Avatar}
                                 alt="Photo de profil"
                                 width={40}
                                 height={40}
                                 className={cn(activeChatId == discussion.id ? "scale-125 border-2 border-primary" : "", "rounded-full object-cover h-12 w-12")}
                              />
                           )}
                           <span className="absolute bg-red-600 rounded-full h-5 w-5 top-0 -right-2 text-white text-center font-semibold text-sm mb-1">
                              1
                           </span>
                        </div>
                     ) : (
                        "Pas de discussion"
                     ))
               )}
            </div>
         </div>
         {/* Icons */}
         <div></div>
      </div>
   );
};
