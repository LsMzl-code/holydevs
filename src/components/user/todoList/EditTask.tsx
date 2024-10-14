"use client";
import { Button } from "@/components/shadcn/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { LoaderCircle, PenIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";

import { FormError } from "@/components/ui/formError";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/schema/todoSchema";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { createTask, editTask } from "@/actions/user/todos";
import { toast } from "@/components/shadcn/use-toast";
import { Task } from "@prisma/client";

interface EditTaskProps {
   task: Task;
}

export const EditTask = ({ task }: EditTaskProps) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const router = useRouter();

   // Form values
   const form = useForm<z.infer<typeof createTaskSchema>>({
      resolver: zodResolver(createTaskSchema),
      defaultValues: {
         name: task.name,
         description: task.description || undefined,
      },
   });

   // Soumission du formulaire
   function onSubmit(values: z.infer<typeof createTaskSchema>) {
      setError("");
      startTransition(() => {
         editTask(values, task.id)
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
                  router.refresh();
               }
            })
            .catch(() => setError("Une erreur est survenue"));
      });
   }

   return (
      <Dialog>
         <DialogTrigger>
            <span className="flex items-center gap-1 text-blue-600 cursor-pointer hover:font-semibold -ml-0.5">
               <PenIcon className="h-3 w-3" />
               <p className="text-xs">Modifier</p>
            </span>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Modifier une tâche</DialogTitle>
            </DialogHeader>
            <Form {...form}>
               <form
                  className="flex flex-col gap-2"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  {/* Name */}
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel htmlFor="name">Nom de la tâche</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Nom de la liste"
                                 {...field}
                                 id="name"
                                 name="name"
                                 autoComplete="true"
                                 required
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Description */}
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel htmlFor="description">
                              Description
                           </FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Description optionnelle de votre tâche à réaliser"
                                 {...field}
                                 id="description"
                                 name="description"
                                 autoComplete="true"
                                 rows={2}
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
                     className="w-[100px] self-end"
                     type="submit"
                  >
                     {isLoading ? (
                        // Pendant le chargement
                        <>
                           <LoaderCircle className="h-4 w-4 animate-spin" />
                        </>
                     ) : (
                        // Sans chargement
                        <>Valider</>
                     )}
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};
