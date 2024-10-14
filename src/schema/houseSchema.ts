import * as z from "zod";


export const opinionSchema = z.object({
    title: z
       .string()
       .min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
    content: z.string().min(5, {
       message: "Votre avis doit contenir au moins 5 caractères",
    }),
 });