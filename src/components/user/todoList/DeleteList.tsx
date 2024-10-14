"use client";
import { deleteTodo } from "@/actions/user/todos";
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
import { toast } from "@/components/shadcn/use-toast";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const DeleteList = ({ todoListId }: { todoListId: string }) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const router = useRouter();
   const deleteTodoWithId = () => {
      startTransition(() => {
         deleteTodo(todoListId)
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
            .catch(() => {
               toast({
                  title: "❌ Erreur",
                  variant: "destructive",
                  description: `Une erreur est survenue...`,
               });
            });
      });
   };
   return (
      <AlertDialog>
         <AlertDialogTrigger>
            <X className="cursor-pointer hover:animate-spin-fast hover:text-red-500 transition-all" />
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Etes-vous sur de vouloir supprimer cette liste?
               </AlertDialogTitle>
               <AlertDialogDescription>
                  Cette action est irréversible. Votre liste ainsi que toutes
                  ses tâches seront supprimées
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Annuler</AlertDialogCancel>
               <AlertDialogAction
                  title="Supprimer cette liste"
                  className="bg-red-500 text-white hover:text-black hover:bg-secondary hover:shadow"
                  onClick={deleteTodoWithId}
               >
                  Supprimer
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
