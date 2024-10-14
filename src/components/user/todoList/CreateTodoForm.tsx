"use client";

import { useState, useTransition } from "react";
// UI Components
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";

import { FormError } from "@/components/ui/formError";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema } from "@/schema/todoSchema";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createTodo } from "@/actions/user/todos";
import { toast } from "@/components/shadcn/use-toast";

export const CreateTodoForm = () => {
   // States
   const [isLoading, startTransition] = useTransition();
   const [error, setError] = useState<string | undefined>("");
   const router = useRouter();

   // Form values
   const form = useForm<z.infer<typeof createTodoSchema>>({
      resolver: zodResolver(createTodoSchema),
      defaultValues: {
         name: undefined,
      },
   });

   // Soumission du formulaire
   function onSubmit(values: z.infer<typeof createTodoSchema>) {
      setError("");
      startTransition(() => {
         createTodo(values)
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
      <Form {...form}>
         <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel htmlFor="name">
                        Nom de la liste <span className="text-red-500">*</span>
                     </FormLabel>
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
   );
};
