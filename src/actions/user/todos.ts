"use server";
import { db } from "@/lib/prisma";
import { createTaskSchema, createTodoSchema } from "@/schema/todoSchema";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getUserByClerkId } from "../getUserByClerkId";

export const createTodo = async (values: z.infer<typeof createTodoSchema>) => {
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.todolist.create({
      data: {
         user: {
            connect: { id: user.id },
         },
         name: values.name,
      },
   });

   return { success: "Liste créée" };
};

export const editTodo = async (
   values: z.infer<typeof createTaskSchema>,
   todolistId: string
) => {
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Modification de la liste

   await db.todolist.update({
      where: {
         id: todolistId,
      },
      data: {
         ...values
      },
   });

   return { success: "Liste modifiée" };
};

export const deleteTodo = async (todolistId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Suppression du post
   await db.todolist.delete({
      where: {
         id: todolistId,
      },
   });

   

   return { success: "Liste supprimée" };
};

export const createTask = async (
   values: z.infer<typeof createTaskSchema>,
   todoListId: string
) => {
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.task.create({
      data: {
         todoList: {
            connect: { id: todoListId },
         },
         ...values,
         isDone: false,
      },
   });

   return { success: "Tâche ajoutée à votre liste" };
};

export const editTask = async (
   values: z.infer<typeof createTaskSchema>,
   taskId: string
) => {
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.task.update({
      where: {
         id: taskId,
      },
      data: {
         ...values,
      },
   });

   return { success: "Tâche modifiée" };
};

export const setTaskToDone = async (taskId: string) => {
   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.task.update({
      where: {
         id: taskId,
      },
      data: {
         isDone: true,
      },
   });

   return { success: "Tâche terminée" };
};

export const setTaskToFinish = async (taskId: string) => {
   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.task.update({
      where: {
         id: taskId,
      },
      data: {
         isDone: false,
      },
   });

   return { success: "Tâche terminée" };
};

export const deleteTask = async (taskId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Suppression de la tâche
   await db.task.delete({
      where: {
         id: taskId,
      },
   });

   return { success: "Tâche supprimée" };
};
