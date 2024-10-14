import * as z from "zod";

export const firstStepSchema = z.object({
   firstname: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 2 caractères",
   }),
   lastname: z.string().min(2, {
      message: "Votre nom de famille doit contenir au moins 2 caractères",
   }),
   username: z.string().min(4, {
      message: "Votre pseudo doit contenir au moins 4 caractères",
   }),
   email: z
      .string({ required_error: "Votre email est obligatoire" })
      .min(1, "Votre email est obligatoire")
      .email("Ce format d'email n'est pas valide"),
   phone: z.string().min(10, {
      message: "Votre numéro de téléphone n'est pas valide",
   }),
   country: z.string().min(1, {
      message: "Vous devez sélectionner un pays",
   }),
   state: z.string().min(1, {
      message: "Vous devez sélectionner un état ou département",
   }),
   city: z.string().min(1, {
      message: "La ville est requise",
   }),
   address: z.string().min(1, {
      message: "L'adresse est requise",
   }),
});

export const secondStepSchema = z.object({
   profilePicture: z.string().url().nonempty(),
   biography: z.string().optional(),
   interests: z.string().optional(),
   languages: z.string().optional(),
});

export const coverPictureSchema = z.object({
   coverPicture: z.optional(z.string()),
});

export const updateInfoSchema = z.object({
   // Identité
   firstname: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),
   lastname: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 3 caractères",
   }),

   // Localisation
   country: z.optional(z.string()),
   state: z.optional(z.string()),
   city: z.optional(z.string()),
   address: z.optional(z.string()),

   // Informations de connexion
   email: z.optional(
      z
         .string({ required_error: "Email is required" })
         .min(1, "Email is required")
         .email("Invalid email")
   ),
   phone: z.optional(z.string()),
});
