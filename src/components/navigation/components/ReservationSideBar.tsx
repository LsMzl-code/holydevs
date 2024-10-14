"use client";
import { buttonVariants } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const ReservationSideBar = () => {
   const pathname = usePathname();
   return (
      <aside className="hidden md:block gap-5 bg-card rounded p-2">
         <p className="font-medium text-lg pb-3">Préparer mon voyage</p>
         <Separator />
         <div className="flex flex-col gap-1 mt-2 items-start">
            <Link
               href="#"
               className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  pathname.includes("suivi-du-budget")
                     ? "bg-accent"
                     : "py-1 font-normal"
               )}
            >
               Suivre mon budget
            </Link>
            <Link
               href="#"
               className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  pathname.includes("todo-list")
                  ? "bg-accent"
                  : "py-1 font-normal"
               )}
            >
               Créer une Todolist
            </Link>{" "}
         </div>
      </aside>
   );
};
