import { db } from "@/lib/prisma";
import { PostTypes } from "@/types/user/posts";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export const CommentCard = async ({ post }: PostTypes) => {


   return (
    <></>
      // <div className="flex items-start justify-between gap-2 mt-2 mb-4">
      //    <Image
      //       src={
      //          comment?.author.profilePicture
      //             ? comment?.author.profilePicture
      //             : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${comment?.author.username}`
      //       }
      //       width={40}
      //       height={40}
      //       alt={`Photo de ${comment?.author.firstname} ${comment?.author.lastname}`}
      //       className="rounded-full object-cover h-9 w-9"
      //    />

      //    <div className="space-y-1 bg-foreground/5 rounded-lg p-2 min-w-[85%]">
      //       <div className="flex items-center justify-between">
      //          <p>blabla</p>

      //          <EllipsisIcon />
      //       </div>
      //       <p className="text-xs">contenu</p>
      //    </div>
      // </div>
   );
};
