import * as z from "zod";

export const createTodoSchema = z.object({
   name: z.string().min(2, {
      message: "Le nom de votre liste doit contenir au moins 2 caractères",
   }),
});
export const createTaskSchema = z.object({
   name: z.string().min(2, {
      message: "Le nom de votre liste doit contenir au moins 2 caractères",
   }),
   description: z.optional(
      z.string().max(255, {
         message: "Le description doit contenir maximum 255 caractères",
      })
   ),
});
