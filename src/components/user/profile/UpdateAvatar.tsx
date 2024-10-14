"use client";
import React, { useState } from "react";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { toast } from "@/components/shadcn/use-toast";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/shadcn/button";
import { Check, Loader2, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AvatarInput } from "@/components/shadcn/avatarInput";
import { UpdateAvatarTypes } from "@/types/user/updateProfile";


interface UpdateAvatarProps {
   avatar: string;
}

const formSchema = z.object({
   profilePicture: z.string().optional(),
});

const UpdateAvatar = ({ avatar }: UpdateAvatarTypes) => {
   const router = useRouter();
   const { user } = useUser();
   const userEmail = user?.emailAddresses[0].emailAddress;
   // States
   const [isLoading, setIsLoading] = useState<boolean>(false);
   /**- Etat de sélection de l'image, null par défaut */
   const [selectedImage, setSelectedImage] = useState<File | null>(null);
   const [uploadProgress, setUploadProgress] = useState<number>(0);

   /**- Stockage de l'image, null par défaut */
   const [imagePreview, setImagePreview] = useState<
      string | ArrayBuffer | null
   >(null);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         profilePicture: "",
      },
   });

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      
      const file = event.target.files?.[0];
      const fileTypes = ["jpg", "jpeg", "gif", "webp", "png", "svg"];

      //? Fichier existant
      if (file) {
         setSelectedImage(file);
         // Vérification de l'extension du fichier
         let fileExtension = file?.name.split(".").pop()?.toLocaleLowerCase();
         const isSuccess = fileTypes.indexOf(fileExtension || "") > -1;

         //! Extension non valide
         if (!isSuccess) {
            toast({
               variant: "destructive",
               title: "Extension de fichier non valide",
               description: "Veuillez sélectionner un fichier valide",
            });
            return null;
         }

         //* Extension valide
         // Lecture du fichier
         const reader = new FileReader();
         reader.onload = (event) => {
            let imageDataUrl: string | ArrayBuffer | null = null;
            //? Fichier existant
            if (event.target) {
               imageDataUrl = event.target.result;
            }
            setImagePreview(imageDataUrl);
         };
         reader.readAsDataURL(file);
      }
   };

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Récupération de l'image uploadée
      values.profilePicture = imagePreview?.toString();
      setIsLoading(true);

      if (values.profilePicture !== avatar) {
         axios
            .patch(`/api/user/profile`, values)
            .then((res) => {
               toast({
                  variant: "success",
                  description: "Photo de profil mise à jour avec succès",
               });
               router.refresh();
               setIsLoading(false);
            })
            .catch((error) => {
               console.log(error);
               toast({
                  variant: "destructive",
                  description: "Oups, une erreur est survenue...",
               });
               setIsLoading(false);
            });
      }
   }

   return (
      <Dialog>
         <DialogTrigger className="text-sm hover:font-semibold">
            Modifier
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Sélectionnez une photo de profil</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form
                  className="flex flex-col items-center gap-5 px-20"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <div className="">
                     <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="hidden">
                                 Photo de profil{" "}
                              </FormLabel>
                              <FormControl>
                                 <AvatarInput
                                    {...field}
                                    handleAvatarSelect={handleAvatarSelect}
                                    imagePreview={imagePreview}
                                    uploadProgress={uploadProgress}
                                    disabled={isLoading}
                                    userMail={userEmail}
                                    avatar={avatar}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DialogFooter>
                     <DialogClose asChild>
                        <div className="flex items-center gap-2">
                           <Button disabled={isLoading} className="w-full">
                              {isLoading ? (
                                 // Pendant le chargement
                                 <>
                                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                                    En cours
                                 </>
                              ) : (
                                 // Sans chargement
                                 <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Valider
                                 </>
                              )}
                           </Button>
                           <Button
                              type="button"
                              variant="secondary"
                              className="group"
                           >
                              <X className="mr-2 h-4 w-4 group-hover:animate-spin-fast" />
                              Annuler
                           </Button>
                        </div>
                     </DialogClose>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default UpdateAvatar;
