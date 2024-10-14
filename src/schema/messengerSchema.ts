import * as z from "zod";

export const addMessageSchema = z.object({
    content: z.string().min(1, {
       message: "Votre message ne peut pas être vide",
    }),
 });