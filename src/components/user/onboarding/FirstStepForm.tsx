"use client";

// React / Next
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// Libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ICity, IState } from "country-state-city";

// Types
import { UserOnboardingTypes } from "@/types/user/onboarding";

// Hooks
import useLocation from "@/app/hooks/useLocations";

// Icons
import { LoaderCircle } from "lucide-react";

// UI Components
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { toast } from "@/components/shadcn/use-toast";
import { Button } from "@/components/shadcn/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/shadcn/select";
import { firstStepSchema } from "@/schema/userSchemas";
import { FormError } from "@/components/ui/formError";
import { onboardingFirstStep } from "@/actions/user/userOnboarding";

export const FirstStepForm = ({ user }: UserOnboardingTypes) => {
   // States
   const [isLoading, startTransition] = useTransition();
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);

   const [error, setError] = useState<string | undefined>("");

   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
   const countries = getAllCountries();

   const router = useRouter();

   // Form values
   const form = useForm<z.infer<typeof firstStepSchema>>({
      resolver: zodResolver(firstStepSchema),
      defaultValues: {
         firstname: user.firstName || undefined,
         lastname: user.lastName || undefined,
         username: user.username || undefined,
         email: user.email || undefined,
         phone: user.phone || undefined,
         country: undefined,
         state: undefined,
         city: undefined,
         address: undefined,
      },
   });

   // Use Effects
   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country");
      // Récupération des états du pays selectionné
      const countryStates = getCountryStates(selectedCountry);
      if (countryStates) {
         setStates(countryStates);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.watch("country")]);

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country");
      const selectedState = form.watch("state");
      // Récupération des villes de l'état selectionné
      const stateCities = getStateCities(selectedCountry, selectedState);
      if (stateCities) {
         setCities(stateCities);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.watch("country"), form.watch("state")]);

   // Soumission du formulaire
   function onSubmit(values: z.infer<typeof firstStepSchema>) {
      setError("");
      startTransition(() => {
         onboardingFirstStep(values)
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
                  router.push(`/onboarding/${data.username}`);
               }
            })
            .catch(() => setError("Une erreur est survenue"));
      });
   }

   return (
      <Form {...form}>
         <form
            className="md:space-y-5 mb-5 md:mb-10 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            {/* Nom et prénom */}
            <div className="flex gap-5">

               <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="lastname">
                           Nom de famille{" "}
                           <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Nom"
                              {...field}
                              id="lastname"
                              name="lastname"
                              autoComplete="true"
                              required
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />


               {/* Nom de famille */}
               <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="firstname">
                           Prénom <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Prénom"
                              {...field}
                              id="firstname"
                              name="firstname"
                              autoComplete="true"
                              required
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            {/* Pseudo */}
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel htmlFor="username">
                        Pseudo <span className="text-red-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Pseudo"
                           {...field}
                           id="username"
                           name="username"
                           autoComplete="true"
                           required
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* Mail et phone */}
            <div className="grid grid-cols-2 gap-5">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="email">
                           Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Input
                              type="email"
                              placeholder="votre@email.fr"
                              {...field}
                              id="email"
                              name="email"
                              autoComplete="true"
                              required
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="phone">
                           Numéro de téléphone
                        </FormLabel>
                        <FormControl>
                           <Input
                              placeholder="0123456789"
                              {...field}
                              id="phone"
                              name="phone"
                              autoComplete="true"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            {/* Localisation */}
            <div className="grid grid-cols-3 gap-5">
               <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="country">
                           Pays <span className="text-red-500">*</span>
                        </FormLabel>

                        <FormControl>
                           <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              name="country"
                           >
                              <SelectTrigger
                                 className="bg-background"
                                 name="country"
                                 id="country"
                              >
                                 <SelectValue
                                    placeholder="Pays"
                                    defaultValue={field.value}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 {countries.map((country) => (
                                    <SelectItem
                                       key={country.isoCode}
                                       value={country.isoCode}
                                    >
                                       {country.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="state">
                           Région <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                           <Select
                              disabled={isLoading || states.length < 1}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              name="state"
                           >
                              <SelectTrigger
                                 className="bg-background"
                                 name="state"
                                 id="state"
                              >
                                 <SelectValue
                                    placeholder="Région"
                                    defaultValue={field.value}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 {states.map((state) => (
                                    <SelectItem
                                       key={state.isoCode}
                                       value={state.isoCode}
                                    >
                                       {state.isoCode} - {state.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor="city">
                           Ville <span className="text-red-500">*</span>
                        </FormLabel>

                        <FormControl>
                           <Select
                              disabled={isLoading || cities.length < 1}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                              name="city"
                           >
                              <SelectTrigger
                                 className="bg-background"
                                 name="city"
                                 id="city"
                              >
                                 <SelectValue
                                    placeholder="Ville"
                                    defaultValue={field.value}
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                 {cities.map((city) => (
                                    <SelectItem
                                       key={city.name}
                                       value={city.name}
                                    >
                                       {city.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            {/* Adresse */}
            <FormField
               control={form.control}
               name="address"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel htmlFor="address">
                        Adresse <span className="text-red-500">*</span>
                     </FormLabel>            
                     <FormControl>
                        <Input
                           type="text"
                           placeholder="15 rue ici"
                           {...field}
                           id="address"
                           name="address"
                           autoComplete="true"
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
               className="w-[150px] self-end"
               type="submit"
            >
               {isLoading ? (
                  // Pendant le chargement
                  <>
                     <LoaderCircle className="h-4 w-4 animate-spin" />
                  </>
               ) : (
                  // Sans chargement
                  <>Suivant</>
               )}
            </Button>
         </form>
      </Form>
   );
};
