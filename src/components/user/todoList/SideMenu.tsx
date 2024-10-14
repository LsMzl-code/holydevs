"use client";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Todolist } from "@prisma/client";
import React, { useState } from "react";
import { CreateTodo } from "./CreateTodo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
   ClipboardListIcon,
   LayoutListIcon,
   ListChecksIcon,
   ListCollapseIcon,
   X,
} from "lucide-react";

interface SideMenuProps {
   allList: Todolist[];
}

export const SideMenu = ({ allList }: SideMenuProps) => {
   // States
   const [allChecked, setIsAllChecked] = useState(false);
   const [doneChecked, setIsDoneChecked] = useState(false);
   const [todoChecked, setIsTodoChecked] = useState(false);

   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   // Ajout de l'id de la liste dans l'url
   const handleSelectedList = (listId: string) => {
      const params = new URLSearchParams(searchParams);
      if (listId) {
         params.set("liste", listId);
      } else {
         params.delete("liste");
      }
      params.set("liste", listId);
      replace(`${pathname}?${params.toString()}`);
   };

   // Tri des tâche selon leur status
   const handleSelectedAllTasks = () => {
      setIsAllChecked(!allChecked);

      if (doneChecked || todoChecked) {
         setIsDoneChecked(false);
         setIsTodoChecked(false);
      }

      const params = new URLSearchParams(searchParams);

      params.delete("status");
      replace(`${pathname}?${params.toString()}`);
   };

   const handleSelectedDoneTasks = (taskStatus: string) => {
      setIsDoneChecked(!doneChecked);
      if (allChecked || todoChecked) {
         setIsAllChecked(false);
         setIsTodoChecked(false);
      }

      const params = new URLSearchParams(searchParams);

      if (!doneChecked) {
         params.set("status", taskStatus);
      } else {
         params.delete("status");
      }
      replace(`${pathname}?${params.toString()}`);
   };

   const handleSelectedTodoTasks = (taskStatus: string) => {
      setIsTodoChecked(!todoChecked);

      if (allChecked || doneChecked) {
         setIsAllChecked(false);
         setIsDoneChecked(false);
      }

      const params = new URLSearchParams(searchParams);

      if (!todoChecked) {
         params.set("status", taskStatus);
      } else {
         params.delete("status");
      }
      replace(`${pathname}?${params.toString()}`);
   };

   return (
      <div className="rounded bg-card w-[27%] py-5 px-3 space-y-5 min-h-[500px] relative">
         <p className="font-medium text-xl mb-3">Tâches</p>
         <div className="flex flex-col gap-2 ml-2">
            <span
               className="flex items-center justify-between text-sm cursor-pointer hover:font-semibold"
               onClick={() => handleSelectedAllTasks()}
            >
               <span className="flex items-center gap-2">
                  <LayoutListIcon size={20} />
                  <p>Toutes</p>
               </span>
               <Checkbox checked={allChecked} className="border-cyan-500" />
            </span>
            <span
               className="flex items-center justify-between text-sm cursor-pointer hover:font-semibold"
               onClick={() => handleSelectedDoneTasks("done")}
            >
               <span className="flex items-center gap-2">
                  <ListChecksIcon size={20} />
                  <p>Terminées</p>
               </span>
               <Checkbox checked={doneChecked} className="border-green-600" />
            </span>
            <span
               className="flex items-center justify-between text-sm cursor-pointer hover:font-semibold"
               onClick={() => handleSelectedTodoTasks("todo")}
            >
               <span className="flex items-center gap-2">
                  <ListCollapseIcon size={20} />
                  <p>A faire</p>
               </span>
               <Checkbox checked={todoChecked} className="border-orange-500" />
            </span>
         </div>

         {/* TodoLists */}
         <p className="font-medium text-xl mb-3">Mes listes</p>
         <div className="space-y-3 capitalize ml-2">
            {allList.length === 0 ? (
               <p className="text-sm">Aucune liste créé</p>
            ) : (
               allList.map((list) => (
                  <div
                     key={list.id}
                     onClick={() => handleSelectedList(list.id)}
                     className="flex items-center gap-2 cursor-pointer hover:font-semibold"
                  >
                     <ClipboardListIcon size={20} />
                     <p className="text-sm ">{list.name}</p>
                  </div>
               ))
            )}
         </div>

         <div className="absolute bottom-5 left-[50%] translate-x-[-50%] w-[200px]">
            <CreateTodo />
         </div>
      </div>
   );
};
