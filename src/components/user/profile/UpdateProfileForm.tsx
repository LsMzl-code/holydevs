"use client";
import React, { useContext } from "react";

import { Cake, Pen } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

import Image from "next/image";
import Banner from "../../../../public/img/banniere.jpg";
import Pencil from "../../../../public/icon/pencil.png";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { Avatar, AvatarImage } from "@/components/shadcn/avatar";

// Types

import { format, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import UpdateAvatar from "./UpdateAvatar";
import UpdateCoverPicture from "./UpdateCoverPicture";
import UpdateBiography from "./UpdateBiography";
import { UpdateLanguages } from "./UpdateLanguages";
import { UpdateInterest } from "./UpdateInterest";
import { UpdateProfileTypes } from "@/types/user/updateProfile";

const UpdateProfileForm = ({
   biography,
   avatar,
   email,
   coverPicture,
   createdAt,
   languages,
   interests,
}: UpdateProfileTypes) => {
   // Date fns locale
   setDefaultOptions({ locale: fr });
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               className="font-semibold text-foreground flex gap-1"
               title="Modification du profil utilisateur"
            >
               <Image
                  src={Pencil}
                  alt="Envoyer un message"
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-1"
               />
               <p className="max-md:hidden">Modifier le profil</p>
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Modifier le profil</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="space-y-5">
               {/* Photo de profil */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">Photo de profil</p>
                     {/* Form */}
                     <UpdateAvatar avatar={avatar} />
                  </div>
                  <Avatar className="bg-gray-400 w-24 h-24 md:w-32 md:h-32 drop-shadow-lg m-auto">
                     <AvatarImage
                        className="object-cover"
                        src={
                           avatar
                              ? avatar
                              : `https://api.dicebear.com/6.x/fun-emoji/svg?${email}`
                        }
                     />
                  </Avatar>
               </div>
               {/* Photo de couverture */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">
                        Photo de couverture
                     </p>
                     <UpdateCoverPicture coverPicture={coverPicture} />
                  </div>
                  <div className="h-[150px] relative">
                     <Image
                        src={coverPicture ? coverPicture : Banner}
                        fill
                        className="object-cover rounded"
                        alt=""
                        sizes="100%"
                     />
                  </div>
               </div>
               {/* Biography */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">Biographie</p>
                     {/* Condition Editer si existante, Ajouter si non existante */}
                     <UpdateBiography biography={biography} />
                  </div>
                  <p className="text-sm">
                     {biography
                        ? biography
                        : "Vous n'avez pas encore ajouté de biographie."}
                  </p>
               </div>
               {/* Centres d'interet */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">Centres d'intêrets</p>
                     {/* Condition Editer si existante, Ajouter si non existante */}
                     <UpdateInterest interests={interests} />
                  </div>
                  <p className="text-sm">
                     {interests
                        ? interests
                        : "Vous n'avez pas encore ajouté de centres d'intêrets."}
                  </p>
               </div>
               {/* Languages */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <p className="font-semibold text-md">Langues parlées</p>
                     <UpdateLanguages languages={languages} />
                  </div>
                  <p className="text-sm">
                     {languages
                        ? languages
                        : "Vous n'avez pas encore ajouté de langues parlées."}
                  </p>
               </div>
               {/* Membre depuis le */}
               <div className="flex items-end gap-2 text-sm">
                  <Cake size={20} />
                  <p>
                     Membre depuis le {format(createdAt ?? 0, "dd MMMM yyyy")}
                  </p>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default UpdateProfileForm;
