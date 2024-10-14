"use client";
import { Button } from "@/components/shadcn/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { cn } from "@/lib/utils";
import { UserOnboardingTypes } from "@/types/user/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Libraries
import * as z from "zod";
import { toast } from "@/components/shadcn/use-toast";
import { useRouter } from "next/navigation";
import { secondStepSchema } from "@/schema/userSchemas";
import { FormError } from "@/components/ui/formError";
import { onboardingSecondStep } from "@/actions/user/userOnboarding";

export const SecondStepForm = ({ user }: UserOnboardingTypes) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const [files, setFiles] = useState<File[]>([]);

   // React / Next
   const router = useRouter();

   const form = useForm<z.infer<typeof secondStepSchema>>({
      resolver: zodResolver(secondStepSchema),
      defaultValues: {
         profilePicture: user.image
            ? user.image
            : `https://api.dicebear.com/8.x/thumbs/svg?seed=${
                 Math.floor(Math.random() * 100) + 1
              }`,
         biography: undefined,
         interests: undefined,
         languages: undefined,
      },
   });

   /** Affichage de l'image selectionnée par l'utilisateur.*/

   
   const handleImageSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
   ) => {
      e.preventDefault();

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files?.[0];
         setFiles(Array.from(e.target.files));

         if (!file.type.includes("image")) return;

         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
         };

         fileReader.readAsDataURL(file);
      }
   };

   function onSubmit(values: z.infer<typeof secondStepSchema>) {
      setError("");
      startTransition(() => {
         onboardingSecondStep(values, user.id)
            .then((data) => {
               if (data?.error) {
                  setError(data.error);
               }
               if (data?.success) {
                  toast({
                     title: "✔️ Succès",
                     variant: "default",
                     description: `${data.success}`,
                  });
                  form.reset();
                  router.push(`/onboarding/bienvenue`);
               }
            })
            .catch(() => setError("Une erreur est survenue"));
      });
   }

   return (
      <Form {...form}>
         <form
            className="md:space-y-5 mb-5 md:mb-10 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            {/* Avatar */}

            <FormField
               control={form.control}
               name="profilePicture"
               render={({ field }) => (
                  <FormItem className="flex items-center justify-center md:justify-start gap-5">
                     <FormLabel htmlFor="profilePicture">
                        {field.value ? (
                           <>
                              Photo de profil
                              <Image
                                 src={field.value}
                                 alt="profile_icon"
                                 width={128}
                                 height={128}
                                 priority
                                 className="rounded-full object-cover h-32 w-32 mt-3"
                              />
                           </>
                        ) : (
                           <Image
                              src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${user.email}`}
                              alt="profile_icon"
                              width={128}
                              height={128}
                              className="rounded-full object-cover h-32 w-32 mt-3"
                           />
                        )}
                     </FormLabel>
                     <FormControl>
                        <label
                           className={cn(
                              isLoading
                                 ? "cursor-not-allowed"
                                 : "cursor-pointer",
                              "bg-secondary hover:bg-primary rounded px-2 py-2 font-medium animate shadow"
                           )}
                        >
                           <div className="flex items-center gap-2 text-sm">
                              <Camera />
                              <span>Sélectionner une photo</span>
                           </div>
                           <Input
                              className="hidden"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                 handleImageSelect(e, field.onChange)
                              }
                              id="profilePicture"
                              name="ProfilePicture"
                           />
                        </label>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Biography */}
            <FormField
               control={form.control}
               name="biography"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel htmlFor="biography">Biographie</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Donnez envie aux membres d'entrer en contact avec vous"
                           {...field}
                           id="biography"
                           name="biography"
                           autoComplete="false"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* Interests */}
            <FormField
               control={form.control}
               name="interests"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel htmlFor="interests">
                        Centres d'interêts
                     </FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Voyages, lectures..."
                           {...field}
                           id="interests"
                           name="interests"
                           autoComplete="false"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* Languages */}
            <FormField
               control={form.control}
               name="languages"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel htmlFor="languages">Langues parlées</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Français, Anglais..."
                           {...field}
                           id="languages"
                           name="languages"
                           autoComplete="true"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Affichage des erreurs */}
            {error && (
               <div className="mt-2">
                  <FormError message={error} />
               </div>
            )}

            <Button
               disabled={isLoading}
               className="w-[150px] self-end"
               type="submit"
            >
               {isLoading ? (
                  // Pendant le chargement
                  <>
                     <LoaderCircle className="h-4 w-4 animate-spin" />
                  </>
               ) : (
                  // Sans chargement
                  <>Suivant</>
               )}
            </Button>
         </form>
      </Form>
   );
};
