"use client";
import { Button } from "@/components/shadcn/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { PlusIcon } from "lucide-react";

import React from "react";
import { CreateTodoForm } from "./CreateTodoForm";
import { Separator } from "@/components/shadcn/separator";

export const CreateTodo = () => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               className="flex items-center gap-2 w-full"
            >
               <PlusIcon size={15} />
               Créer une liste
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Créer une nouvelle liste</DialogTitle>
            </DialogHeader>
            <Separator />
            <CreateTodoForm />
         </DialogContent>
      </Dialog>
   );
};
