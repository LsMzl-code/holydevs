"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import Smiley from "../../../../public/logo/smile.png";
import Picture from "../../../../public/logo/picture.png";
import Video from "../../../../public/logo/play.png";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Separator } from "@/components/shadcn/separator";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { Textarea } from "@/components/shadcn/textarea";
import { Check, LoaderCircleIcon } from "lucide-react";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/shadcn/use-toast";
import EmojiPicker from "emoji-picker-react";
import { cn } from "@/lib/utils";
import { PublicationsPageType } from "@/types/user/profilePages";
import { postCreateSchema } from "@/schema/socialSchema";
import { FormError } from "@/components/ui/formError";
import { postCreate } from "@/actions/social/post";

export const AddPost = ({ currentUser }: PublicationsPageType) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const [isPickerVisible, setIsPickerVisible] = useState(false);
   const [error, setError] = useState<string | undefined>("");
   const [files, setFiles] = useState<File[]>([]);

   const router = useRouter();

   const form = useForm<z.infer<typeof postCreateSchema>>({
      resolver: zodResolver(postCreateSchema),
      defaultValues: {
         content: "",
         image: "",
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
            localStorage.setItem("image", imageDataUrl);
         };

         fileReader.readAsDataURL(file);

         setTimeout(() => {
            localStorage.clear();
            form.reset();
         }, 120000);
      }
   };

   const localImg = localStorage.getItem("image");

   const handleEmojiSelect = (emoji: any) => {
      form.setValue("content", form.getValues("content") + emoji.emoji);
   };

   function onSubmit(values: z.infer<typeof postCreateSchema>) {
      setError("");
      startTransition(() => {
         postCreate(values)
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
                  localStorage.clear();
                  form.reset();
                  router.refresh();
               }
            })
            .catch(() => setError("Une erreur est survenue"));
      });
   }

   return (
      <div className="p-4 rounded-lg flex flex-col gap-2 justify-between text-sm shadow bg-card">
         {/* Avatar */}
         <div className="flex items-center gap-2">
            <div className="relative h-12 w-12">
               <Image
                  src={currentUser?.profilePicture ?? ""}
                  fill
                  sizes="100%"
                  alt=""
                  className="rounded-full object-cover"
               />
            </div>
            <p className="font-medium capitalize text-lg">
               Bonjour {currentUser?.firstname ?? ""}
            </p>
         </div>
         <Dialog>
            <DialogTrigger>
               <div className="bg-foreground/10 rounded-xl w-full py-3 px-3 text-start hover:bg-foreground/20 group">
                  <p className="text-foreground/70 group-hover:text-foreground/80">
                     Que voulez-vous partager avec vos amis ?
                  </p>
               </div>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Créer un post</DialogTitle>
               </DialogHeader>
               <Separator className="my-2" />
               <div className="">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Contenu du post */}
                        <FormField
                           control={form.control}
                           name="content"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel
                                    className="hidden"
                                    htmlFor="content"
                                 >
                                    Contenu
                                 </FormLabel>
                                 <FormControl className="border-none bg-transparent">
                                    <Textarea
                                       {...field}
                                       rows={3}
                                       id="content"
                                       name="content"
                                       placeholder="Que voulez-vous partager avec vos amis ?"
                                       className="focus-visible:ring-0 focus-visible:ring-offset-0 py-0 text-lg"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        {/* Affichage de l'image si existante */}
                        {localImg != null && (
                           <div className="w-full h-60 mt-5 relative">
                              <Image
                                 src={localImg}
                                 alt=""
                                 fill
                                 sizes="100%"
                                 className="object-cover rounded-lg"
                              />
                              {/* // TODO: Ajouter icone pour supprimer image   */}
                           </div>
                        )}
                        {/* Emoji Menu */}
                        <EmojiPicker
                           open={isPickerVisible}
                           onEmojiClick={handleEmojiSelect}
                           style={{
                              position: "absolute",
                              bottom: "0",
                              left: "30%",
                           }}
                           allowExpandReactions={false}
                           height={300}
                           searchDisabled={true}
                           className="relative"
                        />

                        {/* Bas du formulaire */}
                        <div className="flex justify-between mt-5">
                           {/* Icones */}
                           <div className="flex items-center gap-2">
                              <div className="rounded-full p-1.5 cursor-pointer hover:bg-blue-400 transition-colors">
                                 <Image
                                    src={Smiley}
                                    alt="Image d'un emoji smiley"
                                    height={17}
                                    width={17}
                                    onClick={() =>
                                       setIsPickerVisible(!isPickerVisible)
                                    }
                                 />
                              </div>

                              {/* Ajout d'image */}
                              <FormField
                                 control={form.control}
                                 name="image"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <label
                                             className={cn(
                                                isLoading
                                                   ? "cursor-not-allowed"
                                                   : "cursor-pointer"
                                             )}
                                             htmlFor="image"
                                          >
                                             <div
                                                className="rounded-full p-1.5 hover:bg-blue-400 transition-colors"
                                                title="Ajouter une image"
                                             >
                                                <Image
                                                   src={Picture}
                                                   alt="Icone d'ajout d'image"
                                                   width={17}
                                                   height={17}
                                                />
                                             </div>

                                             <Input
                                                className="hidden"
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                   handleImageSelect(
                                                      e,
                                                      field.onChange
                                                   )
                                                }
                                             />
                                          </label>
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <div className="rounded-full p-1.5 cursor-pointer hover:bg-blue-400 transition-colors">
                                 <Image
                                    src={Video}
                                    alt="Image d'un emoji smiley"
                                    height={17}
                                    width={17}
                                 />
                              </div>
                           </div>

                           {/* Affichage des erreurs */}
                           {error && (
                              <div className="mt-2">
                                 <FormError message={error} />
                              </div>
                           )}

                           {/* Button */}
                           <DialogClose asChild>
                              <Button
                                 disabled={isLoading}
                                 className="w-[100px]"
                                 type="submit"
                              >
                                 {isLoading ? (
                                    // Pendant le chargement
                                    <>
                                       <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                                    </>
                                 ) : (
                                    // Sans chargement
                                    <>
                                       <Check className="mr-2 h-4 w-4" />
                                       Poster
                                    </>
                                 )}
                              </Button>
                           </DialogClose>
                        </div>
                     </form>
                  </Form>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
};
