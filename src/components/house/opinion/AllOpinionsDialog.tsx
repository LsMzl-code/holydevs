"use client";
import { Button } from "@/components/shadcn/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Separator } from "@/components/shadcn/separator";
import { AllOpinionsTypes } from "@/types/house/houseDetails";
import { format } from "date-fns";

import Image from "next/image";

import Link from "next/link";
import {v4 as uuidv4} from 'uuid'


interface AllOpinionsDialog {
   
}

const AllOpinionsDialog = ({ allOpinions }: AllOpinionsTypes) => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full">
               Voir tout
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Tout les avis</DialogTitle>
            </DialogHeader>
            <Separator className="my-2" />
            <div className="space-y-3">
               {allOpinions.map((opinion) => (
                  <div className="bg-foreground/20 rounded-lg flex items-start gap-2 p-3 w-full" key={uuidv4()}>
                     <Link
                        href={`/user/${opinion.author.username}`}
                        title={`Profil de ${opinion.author.firstname} ${opinion.author.lastname}`}
                        className="w-[15%]"
                     >
                        <Image
                           src={opinion.author.profilePicture ?? ""}
                           alt={`Photo de ${opinion.author.firstname} ${opinion.author.lastname}`}
                           height={40}
                           width={40}
                           className="rounded-full h-14 w-14 object-cover"
                        />
                     </Link>
                     <div className="w-[85%]">
                        <p className="font-semibold">{opinion.title}</p>
                        <p className="text-sm">{opinion.content}</p>
                        <p className="text-xs mt-2">
                           Publié le{" "}
                           {format(opinion.createdAt, "dd.MMMM.yyyy")}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default AllOpinionsDialog;
