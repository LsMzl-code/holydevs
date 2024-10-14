"use client";
import React, { useState } from "react";

import Image from "next/image";
// Images
import Avatar from "../../../../../../public/img/palmier.jpg";
import SearchSvg from "../../../../../../public/svg/search.svg";

export const ChatList = () => {
   const [open, setOpen] = useState(false);
   return (
      <div>
         <div>
            {/* SearchBar */}
            <div className="flex items-center bg-background rounded-xl px-2 mr-2 relative">
               <input
                  type="text"
                  placeholder="Rechercher"
                  className="bg-transparent rounded-lg py-1 px-2 text-sm outline-none w-[150px]"
                  onChange={() => setOpen(true)}
               />

               <Image
                  src={SearchSvg}
                  alt="Icone de loupe pour rechercher un utilisateur"
                  width={20}
                  height={20}
                  className="h-7 w-7"
               />
            </div>
            {/* Search results */}
            {open && (
               <div className="absolute w-[190px] mt-1 border rounded bg-background py-1 px-2 flex flex-col gap-2">
                  <div
                     className="flex items-center gap-2 hover:bg-foreground/10 p-1 rounded cursor-pointer"
                     onClick={() => setOpen(false)}
                  >
                     <Image
                        src={Avatar}
                        alt="Icone de loupe pour rechercher un utilisateur"
                        width={20}
                        height={20}
                        className="h-7 w-7 rounded-full"
                     />
                     <p className="text-xs">Louis Mazzella</p>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};
