"use client";
import React, { useState, useTransition } from "react";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Separator } from "@/components/shadcn/separator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "@/components/shadcn/use-toast";
import { AddOpinionFormTypes } from "@/types/house/houseDetails";
import { opinionSchema } from "@/schema/houseSchema";
import { opinion } from "@/actions/interaction/avis";

const AddOpinionForm = ({ house }: AddOpinionFormTypes) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const router = useRouter();

   const form = useForm<z.infer<typeof opinionSchema>>({
      resolver: zodResolver(opinionSchema),
      defaultValues: {
         title: "",
         content: "",
      },
   });

   function onSubmit(values: z.infer<typeof opinionSchema>) {
      startTransition(() => {
         opinion(values, house.id)
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
      <Dialog>
         <DialogTrigger asChild>
            <div>
               {/* Mobile */}
               <Button size="sm" className="md:hidden">
                  + Avis
               </Button>
               {/* Screen */}
               <Button className="hidden md:block">Mettre un avis</Button>
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Mettre un avis</DialogTitle>
               <DialogDescription>
                  Partagez avec les autres utilisateurs votre avis sur cette
                  annonce
               </DialogDescription>
            </DialogHeader>
            <Separator className="my-3" />
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor="title">Titre</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Titre de votre avis"
                                    {...field}
                                    id="title"
                                    name="title"
                                    autoComplete="title"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor="content">Contenu</FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="Contenu de votre avis"
                                    {...field}
                                    id="content"
                                    name="content"
                                    autoComplete="content"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DialogFooter className="mt-3">
                     <DialogClose className="space-x-2">
                        <Button
                           disabled={isLoading}
                           className="max-w-[150px] self-end"
                           type="submit"
                        >
                           {isLoading ? (
                              // Pendant le chargement
                              <>
                                 <Loader2 className="h-4 w-4" />
                              </>
                           ) : (
                              // Sans chargement
                              <>Publier</>
                           )}
                        </Button>
                        <Button variant="secondary" type="button">
                           Annuler
                        </Button>
                     </DialogClose>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default AddOpinionForm;
