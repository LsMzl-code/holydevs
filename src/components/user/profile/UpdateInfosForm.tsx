"use client";

import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { useToast } from "@/components/shadcn/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { Loader2, Pen, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Separator } from "@/components/shadcn/separator";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/shadcn/select";
import { ICity, IState } from "country-state-city";
import useLocation from "@/app/hooks/useLocations";
import { updateInfoSchema } from "@/schema/userSchemas";

interface UpdateUserProps {
   lastname: string;
   firstname: string;
   country: string;
   state: string;
   city: string;
   address: string;
   email: string;
   phone: string;
}

const UpdateInfosForm = ({
   firstname,
   lastname,
   country,
   state,
   city,
   address,
   email,
   phone,
}: UpdateUserProps) => {
   const { toast } = useToast();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);

   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
   const countries = getAllCountries();

   // const countries = getAllCountries();

   const form = useForm<z.infer<typeof updateInfoSchema>>({
      resolver: zodResolver(updateInfoSchema),
      defaultValues: {
         lastname: lastname ?? "",
         firstname: firstname ?? "",
         country: country ?? "",
         state: state ?? "",
         city: city ?? "",
         address: address ?? "",
         email: email ?? "",
         phone: phone ?? "",
      },
   });

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country") ?? "";
      // Récupération des états du pays selectionné
      const countryStates = getCountryStates(selectedCountry);
      if (countryStates) {
         setStates(countryStates);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.watch("country")]);

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country") ?? "";
      const selectedState = form.watch("state");
      // Récupération des villes de l'état selectionné
      const stateCities = getStateCities(selectedCountry, selectedState);
      if (stateCities) {
         setCities(stateCities);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.watch("country"), form.watch("state")]);

   const onSubmit = async (values: z.infer<typeof updateInfoSchema>) => {
      setIsLoading(true);
      axios
         .patch(`/api/user/profile`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Informations modifiées avec succès !",
            });
            setIsLoading(false);
            router.refresh();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue lors de la modification de vos informations",
            });
            setIsLoading(false);
         });
   };

   
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               className="font-semibold text-foreground flex gap-1"
            >
               <Pen size={15} />
               Modifier mes infos
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  Modification des informations utilisateur
               </DialogTitle>
               <DialogDescription className="pb-5">
                  Mettez à jour les données souhaitées et validez une fois
                  terminé
               </DialogDescription>
               <Separator />
            </DialogHeader>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
               >
                  {/* Identity */}
                  <div>
                     <p className="font-semibold">Identité</p>
                     {/* Firstname & lastname */}
                     <div className="flex items-center w-full justify-between gap-5">
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="lastname"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="text-xs"
                                       htmlFor="lastname"
                                    >
                                       Nom
                                    </FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Votre nom"
                                          {...field}
                                          name="lastname"
                                          id="lastname"
                                          autoComplete="lastname"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="firstname"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="text-xs"
                                       htmlFor="firstname"
                                    >
                                       Prénom{" "}
                                    </FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Votre prénom"
                                          {...field}
                                          name="firstname"
                                          id="firstname"
                                          autoComplete="firstname"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Localisation */}
                  <div>
                     <p className="font-semibold">Localisation</p>
                     <div className="space-y-1">
                        <div className="flex items-center gap-5">
                           {/* Pays */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="country"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="hidden"
                                          htmlFor="country"
                                       >
                                          Pays
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
                           </div>
                           {/* Région */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="state"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="hidden"
                                          htmlFor="state"
                                       >
                                          Etat/département{" "}
                                       </FormLabel>

                                       <FormControl>
                                          <Select
                                             disabled={
                                                isLoading || states.length < 1
                                             }
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
                                                      {state.name}
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
                           {/* Ville */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="city"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="hidden"
                                          htmlFor="city"
                                       >
                                          Ville
                                       </FormLabel>
                                       <FormControl>
                                          <Select
                                             disabled={
                                                isLoading || cities.length < 1
                                             }
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
                        </div>
                        <div>
                           <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="text-xs"
                                       htmlFor="address"
                                    >
                                       Adresse{" "}
                                    </FormLabel>

                                    <FormControl>
                                       <Input
                                          placeholder="5 rue de nulle part"
                                          {...field}
                                          name="address"
                                          id="address"
                                          autoComplete="address"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Email & phone */}
                  <div>
                     <p className="font-semibold">Informations de connexion</p>
                     <div className="flex flex-col gap-2">
                        {/* Email & mobile */}
                        <div className="flex items-center w-full justify-between gap-5">
                           {/* Email */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="email"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="text-xs"
                                          htmlFor="email"
                                       >
                                          Email
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="email"
                                             placeholder="votre@email.fr"
                                             {...field}
                                             name="email"
                                             id="email"
                                             autoComplete="email"
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           {/* Phone */}
                           <div className="flex-1">
                              <div>
                                 <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel
                                             className="text-xs"
                                             htmlFor="phone"
                                          >
                                             Téléphone{" "}
                                          </FormLabel>
                                          <FormControl>
                                             <Input
                                                type="tel"
                                                placeholder="Numéro de téléphone"
                                                {...field}
                                                name="phone"
                                                id="phone"
                                                autoComplete="phone"
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <DialogFooter>
                     <Button
                        disabled={isLoading}
                        className="max-w-[150px] self-end"
                     >
                        {isLoading ? (
                           // Pendant le chargement
                           <>
                              <Loader2 className="mr-2 h-4 w-4" /> Mise à jour
                           </>
                        ) : (
                           // Sans chargement
                           <>
                              <Pen className="mr-2 h-4 w-4" />
                              Mettre à jour
                           </>
                        )}
                     </Button>
                     <DialogClose asChild>
                        <Button
                           type="button"
                           variant="secondary"
                           className="group"
                        >
                           <X className="mr-2 h-4 w-4 group-hover:animate-spin-fast" />
                           Annuler
                        </Button>
                     </DialogClose>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default UpdateInfosForm;
