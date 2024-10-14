"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";

import Emoji from "../../../.././../public/icon/smile.png";
import Picture from "../../../.././../public/logo/picture.png";
import Camera2 from "../../../.././../public/icon/camera2.png";
import Micro from "../../../.././../public/icon/microphone.png";
import Send from "../../../.././../public/icon/send.png";

import EmojiPicker from "emoji-picker-react";

import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { addMessageSchema } from "@/schema/messengerSchema";
import { Button } from "@/components/shadcn/button";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/actions/social/messenger";
import { toast } from "@/components/shadcn/use-toast";

interface AddMessageProps {
   discussionId: string;
   receiverId: string;
}

export const AddMessageForm: React.FC<AddMessageProps> = ({
   discussionId,
   receiverId,
}) => {
   // States
   const [isOpen, setIsOpen] = useState(false);
   const [isLoading, startTransition] = useTransition();
   const router = useRouter();

   // Form default values
   const form = useForm<z.infer<typeof addMessageSchema>>({
      resolver: zodResolver(addMessageSchema),
      defaultValues: {
         content: undefined,
      },
   });

   // Emoji on input
   const handleEmoji = (emoji: any) => {
      form.setValue("content", form.getValues("content") + emoji.emoji);
   };

   function onSubmit(values: z.infer<typeof addMessageSchema>) {
      startTransition(() => {
         console.log("values", values);
         sendMessage(values, discussionId, receiverId)
            .then((data) => {
               if (data?.error) {
                  toast({
                     title: "❌ Erreur",
                     variant: "destructive",
                     description: `${data.error}`,
                  });
               }
               if (data?.success) {
                  form.reset();
                  router.refresh();
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
   }

   return (
      <div className="flex items-center justify-between gap-2 py-2 px-2 md:px-5 border-t">
         {/* Icons */}
         <div className="flex items-center">
            <div className="cursor-pointer p-1 hover:bg-foreground/30 rounded-full">
               <Image
                  src={Picture}
                  alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                  width={20}
                  height={20}
                  className="h-4 w-4"
               />
            </div>
            <div className="cursor-pointer p-1 hover:bg-foreground/30 rounded-full">
               <Image
                  src={Camera2}
                  alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                  width={20}
                  height={20}
                  className="h-4 w-4"
               />
            </div>
            <div className="cursor-pointer p-1 hover:bg-foreground/30 rounded-full">
               <Image
                  src={Micro}
                  alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                  width={20}
                  height={20}
                  className="h-4 w-4"
               />
            </div>
         </div>

         {/* Form */}
         <Form {...form}>
            <form
               className="relative flex items-center"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               {/* Message */}
               <div className="relative">
                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => (
                        <FormItem className="min-w-[240px]">
                           <FormLabel className="hidden">Message</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Ecrire un message"
                                 className="bg-foreground/20 outline-none rounded-full px-3 text-sm"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div
                     className="absolute top-[50%] translate-y-[-50%] right-1 cursor-pointer p-1 hover:bg-foreground/30 rounded-full"
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     <Image
                        src={Emoji}
                        alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                        width={20}
                        height={20}
                        className="h-4 w-4"
                     />
                  </div>
               </div>

               <div className="absolute bottom-12 right-5">
                  <EmojiPicker
                     open={isOpen}
                     onEmojiClick={handleEmoji}
                     className=""
                     allowExpandReactions={false}
                     height={300}
                     searchDisabled={true}
                  />
               </div>
               <Button size="sm" variant="hollow">
                  <Image
                     src={Send}
                     alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                     width={20}
                     height={20}
                     className="h-4 w-4"
                  />
               </Button>
            </form>
         </Form>
      </div>
   );
};
