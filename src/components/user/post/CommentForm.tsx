"use client";
import React, { useState, useTransition } from "react";
import House from "../../../../public/img/house.jpg";
import Image from "next/image";
import { CommentInteractionTypes, PostTypes } from "@/types/user/posts";
import { db } from "@/lib/prisma";
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
import EmojiPicker from "emoji-picker-react";
import { addCommentSchema } from "@/schema/socialSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Smiley from "../../../../public/logo/smile.png";
import { FormError } from "@/components/ui/formError";
import { Button } from "@/components/shadcn/button";
import { Check, LoaderCircleIcon } from "lucide-react";
import { commentCreate } from "@/actions/social/comment";
import { toast } from "@/components/shadcn/use-toast";
import { useRouter } from "next/navigation";

export const CommentForm = ({ user, post }: PostTypes) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const [isPickerVisible, setIsPickerVisible] = useState(false);
   const [error, setError] = useState<string | undefined>("");

   const router = useRouter()

   

   const form = useForm<z.infer<typeof addCommentSchema>>({
      resolver: zodResolver(addCommentSchema),
      defaultValues: {
         content: "",
      },
   });

   if (!user) return <p>Vous devez être connecté pour commenter</p>;


   const handleEmojiSelect = (emoji: any) => {
      form.setValue("content", form.getValues("content") + emoji.emoji);
   };

   function onSubmit(values: z.infer<typeof addCommentSchema>) {
      setError("");
      startTransition(() => {
         commentCreate(values, post.id)
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
      <div className="flex items-center w-full">
         <div className="relative h-10 w-10 mr-2 ">
            <Image
               src={
                  user.profilePicture
                     ? user.profilePicture
                     : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.username}`
               }
               fill
               sizes="100%"
               alt={`Photo de ${user.firstname} ${user.lastname}`}
               className="rounded-full object-cover"
            />
         </div>

         <Dialog>
            <DialogTrigger className="w-[94%]">
               <div className="rounded-full py-2 px-5 bg-foreground/5 ">
                  <div className="bg-transparent cursor-pointer">
                     <p className="font-light text-sm animate-pulse text-start">
                        Ecrivez votre commentaire
                     </p>
                  </div>
               </div>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Ajouter un commentaire</DialogTitle>
               </DialogHeader>
               <Separator />
               <div className="">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Contenu du commentaire */}
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
                                       rows={1}
                                       id="content"
                                       name="content"
                                       placeholder="Votre commentaire..."
                                       className="focus-visible:ring-0 focus-visible:ring-offset-0 py-0 text-lg"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

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
                                    <>Poster</>
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
