"use client";

import { EllipsisIcon } from "lucide-react";
import { useState } from "react";

import Delete from "../../../public/icon/delete.png";
import Image from "next/image";
import { postDelete } from "@/actions/social/post";

export const DeletePost = ({ postId }: { postId: string }) => {
   const [open, setOpen] = useState(false);

   const deletePostWithId = postDelete.bind(null, postId);
   return (
      <div className="rounded-full p-0.5 hover:bg-foreground/20 relative">
         <EllipsisIcon
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer"
         />
         {open && (
            <div className="absolute -top-1 right-9 bg-card p-2 rounded-lg gap-2 shadow z-50 border w-28">
               <form
                  className="group flex items-center justify-center gap-2 cursor-pointer"
                  action={deletePostWithId}
                  title="Supprimer ce post ?"
               >
                  <Image
                     src={Delete}
                     width={5}
                     height={5}
                     alt="Icone de suppression de post"
                     className="w-3 h-3 group-hover:animate-spin-fast"
                  />
                  <button className="text-red-500 text-sm font-medium group-hover:font-semibold">
                     Supprimer
                  </button>
               </form>
            </div>
         )}
      </div>
   );
};
