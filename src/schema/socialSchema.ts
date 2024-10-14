import * as z from "zod";

export const postCreateSchema = z.object({
    content: z.string().min(5, {
       message: "Votre post doit contenir au moins 5 caractères",
    }),
    image: z.optional(z.string()),
 });

export const addCommentSchema = z.object({
    content: z.string().min(2, {
       message: "Votre post doit contenir au moins 5 caractères",
    }),
 });