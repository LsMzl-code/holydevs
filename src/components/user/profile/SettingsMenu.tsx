"use client";
import React, { useState, useTransition } from "react";
// Components
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/shadcn/sheet";

import { Button } from "@/components/shadcn/button";
import { Settings } from "lucide-react";

import { Label } from "@/components/shadcn/label";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import UpdateInfosForm from "./UpdateInfosForm";
import axios from "axios";
import { toast } from "@/components/shadcn/use-toast";
import { useRouter } from "next/navigation";
import { deleteProfile } from "@/actions/user/profile.";

interface SettingsMenuProps {
   lastname: string;
   firstname: string;
   country: string;
   state: string;
   city: string;
   address: string;
   email: string;
   phone: string;
}

const SettingsMenu = ({
   firstname,
   lastname,
   country,
   state,
   city,
   address,
   email,
   phone,
}: SettingsMenuProps) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const router = useRouter();

   // Delete Profile
   const handleDeleteProfile = () => {
      startTransition(() => {
         deleteProfile()
            .then((data) => {
               if (data?.error) {
                  toast({
                     title: "❌ Erreur",
                     variant: "destructive",
                     description: `${data.error}`,
                  });
               }
               if (data?.success) {
                  toast({
                     title: "✔️ Succès",
                     variant: "default",
                     description: `${data.success}`,
                  });
               }
            })
            .catch(() =>
               toast({
                  title: "❌ Erreur",
                  variant: "destructive",
                  description: `Une erreur est survenue...`,
               })
            );
      });
   };
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button
               variant="outline"
               className="uppercase text-foreground"
               title="Menu des paramètres utilisateurs"
            >
               <Settings />
            </Button>
         </SheetTrigger>
         <SheetContent>
            <SheetHeader>
               <SheetTitle>Paramètres</SheetTitle>
               <SheetDescription>
                  {" "}
                  Menu des paramètres de votre compte. Sauvegardez vos
                  changements une fois terminé.
               </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col mt-5 gap-5">
               {/* Language */}
               <div>
                  <p className="font-medium mb-2">Langue</p>
                  <RadioGroup
                     defaultValue="french"
                     className="flex items-center gap-10"
                  >
                     <div className="space-x-2">
                        <RadioGroupItem value="french" id="r1" />
                        <Label htmlFor="r1">Français</Label>
                     </div>
                     <div className="space-x-2">
                        <RadioGroupItem value="english" id="r2" />
                        <Label htmlFor="r2">Anglais</Label>
                     </div>
                  </RadioGroup>
               </div>
               {/* Modification infos utilisateur */}
               <div>
                  <p className="font-medium mb-2">Informations du compte</p>
                  <UpdateInfosForm
                     firstname={firstname}
                     lastname={lastname}
                     country={country}
                     state={state}
                     city={city}
                     address={address}
                     email={email}
                     phone={phone}
                  />
               </div>
               {/* Suppression du compte */}
               <AlertDialog>
                  <AlertDialogTrigger
                     asChild
                     className="flex justify-end absolute bottom-2 right-2"
                  >
                     <p className="text-xs text-red-500 font-semibold cursor-pointer hover:animate-pulse">
                        Supprimer mon compte
                     </p>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Êtes-vous sur de vouloir supprimer votre compte?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           Cette action est irréversible. Cela supprimera
                           définitivement votre compte, vos annonces ainsi que
                           toutes vos données.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                           className="bg-red-500 text-white hover:text-black hover:bg-secondary hover:shadow"
                           onClick={handleDeleteProfile}
                        >
                           Supprimer
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
            <SheetFooter>
               <SheetClose asChild>
                  <Button type="submit" size="sm">
                     Sauvegarder
                  </Button>
               </SheetClose>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   );
};

export default SettingsMenu;
