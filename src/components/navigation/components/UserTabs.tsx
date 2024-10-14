"use client";

import { buttonVariants } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps {
   user: User;
}

export const UserTabs = ({ user }: TabsProps) => {
   const pathname = usePathname();
   return (
      <div className="md:mx-10">
         <ul className="flex items-center gap-2">
            <li>
               <Link
                  href={`/${user.username}`}
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     pathname === `/${user.username}` && "bg-accent"
                  )}
                  title="Page des publications utilisateur"
               >
                  Publications
               </Link>
            </li>
            <li>
               <Link
                  href={`/${user.username}/amis`}
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     pathname.includes(`${user.username}/amis`) && "bg-accent"
                  )}
                  title="Page des amis utilisateur"
               >
                  Amis
               </Link>
            </li>
            <li>
               <Link
                  href={`/${user.username}/reservations`}
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     pathname.includes(`${user.username}/reservations`) && "bg-accent"
                  )}
                  title="Page des réservations utilisateur"
               >
                  Réservations
               </Link>
            </li>
         </ul>
      </div>
   );
};
