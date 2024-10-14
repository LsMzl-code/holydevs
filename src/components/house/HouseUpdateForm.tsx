"use client";
import React, { useEffect, useState } from "react";

// Libraries
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ICity, IState } from "country-state-city";
import { v4 as uuidv4 } from "uuid";
import { HouseUpdateFormTypes } from "@/types/house/houseUpdate";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../shadcn/form";
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
import { Input } from "../shadcn/input";
import { Textarea } from "../shadcn/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../shadcn/select";
import { Checkbox } from "../shadcn/checkbox";
import { useRouter } from "next/navigation";
import useLocation from "@/app/hooks/useLocations";

import "./houseUpdateForm.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Camera, Check, Loader2, X } from "lucide-react";
import { Switch } from "../shadcn/switch";
import { Button } from "../shadcn/button";
import { toast } from "../shadcn/use-toast";

/** Schéma du formulaire. */
const formSchema = z.object({
   title: z.string().min(3, {
      message: "Le titre de l'annonce doit contenir au moins 3 caractères",
   }),
   description: z.string().min(10, {
      message: "La description doit contenir au moins 10 caractères",
   }),
   introduction: z.string().min(10, {
      message: "La description doit contenir au moins 10 caractères",
   }),
   address: z.string().min(1, {
      message: "L'adresse est requise",
   }),
   city: z.string().min(1, {
      message: "La ville est requise",
   }),
   country: z.string().min(1, {
      message: "Vous devez sélectionner un pays",
   }),
   state: z.string().min(1, {
      message: "Vous devez sélectionner un état ou département",
   }),
   image: z.string().min(1, {
      message: "Au moins 1 photo est requise",
   }),
   price: z.coerce.number().min(1, {
      message: "Le prix doit être supérieur à 0",
   }),
   bedroom: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 chambre",
   }),
   kitchen: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 cuisine",
   }),
   bathroom: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 salle de bain",
   }),
   types: z.string().min(1, {
      message: "Vous devez sélectionner au moins 1 type de logement",
   }),
   categories: z.string().min(1, {
      message: "Vous devez sélectionner au moins 1 catégorie",
   }),
   features: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "Vous devez sélectionner au moins 1 équipement",
   }),
   isAvailable: z.boolean(),
});

export const HouseUpdateForm: React.FC<HouseUpdateFormTypes> = ({
   house,
   categories,
   types,
   features,
}) => {
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [files, setFiles] = useState<File[]>([]);
   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
   const router = useRouter();
   const countries = getAllCountries();

   /** Default form values */
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: house?.title ?? "",
         description: house?.description ?? "",
         introduction: house.introduction ?? "",
         address: house?.address ?? "",
         country: house?.country,
         state: house?.state,
         city: house?.city,
         image: house?.image ?? "",
         price: house?.price ?? 0,
         bedroom: house?.bedroom ?? 0,
         kitchen: house?.kitchen ?? 0,
         bathroom: house?.bathroom ?? 0,
         categories: house.categories[0].category.id,
         types: house.types[0].type.id,
         features: house.features.map((feature) => feature.feature.id),
         isAvailable: house?.isAvailable ?? true,
      },
   });

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

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleImageSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
   ) => {
      e.preventDefault();
      // const file = e.target.files?.[0];
      // const fileTypes = ["jpg", "jpeg", "gif", "webp", "png", "svg"];

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files?.[0];
         setFiles(Array.from(e.target.files));

         if (!file.type.includes("image")) return;

         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
         };

         fileReader.readAsDataURL(file);
      }
   };
   /** Suppression de l'annonce */
   const handleDeleteHouse = () => {
      axios
         .delete(`/api/house/${house.id}`)
         .then((res) => {
            setIsLoading(true);
            toast({
               variant: "success",
               description: "Annonce supprimée avec succès!",
            });
            setIsLoading(false);
            router.refresh();
         })
         .catch((error) => {
            console.log("error", error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue, veuillez ré-essayer plus tard.",
            });
            setIsLoading(false);
         });
   };

   /** Soumission du formulaire */
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      axios
         .patch(`/api/house/update/${house.id}`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Annonce modifiée avec succès !",
            });
            setIsLoading(false);
            router.push(`/annonce/${house.id}`);
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue lors de la modification de votre annonce",
            });
            setIsLoading(false);
         });
   };

   return (
      <div className="mt-10 max-w-[1400px] mb-20 mx-auto max-lg:mx-2 max-md:mt-5">
         <Form {...form}>
            <h1 className="text-2xl font-semibold tracking-tight text-center mb-5">
               Modifier une annonce
            </h1>

            <form
               className="grid md:grid-cols-2 gap-10"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               {/* left */}
               <div className="flex flex-col gap-5">
                  <div className="border rounded-lg p-5 formCard hover:shadow">
                     <p className="font-medium text-sm mb-2">
                        Informations de base
                     </p>
                     {/* Title */}
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-xs">
                                 Titre de l'annonce
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Maison au bord de la mer..."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* Introduction */}
                     <FormField
                        control={form.control}
                        name="introduction"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-xs">
                                 Introduction
                              </FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="Maison au bord de la mer..."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* Description */}
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-xs">
                                 Description
                              </FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="Maison au bord de la mer..."
                                    {...field}
                                    rows={5}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  {/* Localisation */}
                  <div className="border rounded-lg p-5 formCard hover:shadow">
                     <p className="font-medium text-sm mb-2">
                        Localisation du logement
                     </p>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                        {/* Pays du logement */}
                        <FormField
                           control={form.control}
                           name="country"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel
                                    className="hidden"
                                    htmlFor="country"
                                 >
                                    Pays <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Select
                                       disabled={isLoading}
                                       onValueChange={field.onChange}
                                       value={field.value}
                                       defaultValue={field.value}
                                    >
                                       <SelectTrigger className="bg-background">
                                          <SelectValue
                                             placeholder="Pays"
                                             defaultValue={field.value}
                                             id="country"
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
                        {/* Région du logement */}
                        <FormField
                           control={form.control}
                           name="state"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="hidden" htmlFor="state">
                                    Région
                                 </FormLabel>
                                 <FormControl>
                                    <Select
                                       disabled={isLoading || states.length < 1}
                                       onValueChange={field.onChange}
                                       value={field.value}
                                       defaultValue={field.value}
                                    >
                                       <SelectTrigger className="bg-background">
                                          <SelectValue
                                             placeholder="Région"
                                             defaultValue={field.value}
                                             id="state"
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
                        {/* Ville du logement */}
                        <FormField
                           control={form.control}
                           name="city"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="hidden" htmlFor="city">
                                    Ville{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Select
                                       disabled={isLoading || cities.length < 1}
                                       onValueChange={field.onChange}
                                       value={field.value}
                                       defaultValue={field.value}
                                    >
                                       <SelectTrigger className="bg-background">
                                          <SelectValue
                                             placeholder="Ville"
                                             defaultValue={field.value}
                                             id="city"
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
                              <FormLabel htmlFor="address" className="text-xs">
                                 Adresse
                              </FormLabel>

                              <FormControl>
                                 <Input
                                    placeholder="5 rue de nulle part"
                                    autoComplete="false"
                                    id="address"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  {/* Pièces */}
                  <div className="border rounded-lg p-5 hover:shadow formCard">
                     <p className="font-medium text-sm mb-2">
                        Nombre de pièces
                     </p>
                     <div className="flex justify-between gap-5">
                        {/* Chambres */}
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="bedroom"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="text-xs"
                                       htmlFor="bedroom"
                                    >
                                       Chambre{" "}
                                    </FormLabel>
                                    <FormControl>
                                       <Input
                                          type="number"
                                          min="1"
                                          max="10"
                                          step="1"
                                          {...field}
                                          id="bedroom"
                                          name="bedroom"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        {/* Cuisine */}
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="kitchen"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="text-xs"
                                       htmlFor="kitchen"
                                    >
                                       Cuisine{" "}
                                    </FormLabel>
                                    <FormControl>
                                       <Input
                                          type="number"
                                          min="1"
                                          max="10"
                                          step="1"
                                          {...field}
                                          id="kitchen"
                                          name="kitchen"
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                        {/* Salle de bains */}
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="bathroom"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       className="text-xs"
                                       htmlFor="bathroom"
                                    >
                                       Salle de bain{" "}
                                    </FormLabel>
                                    <FormControl>
                                       <Input
                                          type="number"
                                          min="1"
                                          max="10"
                                          step="1"
                                          {...field}
                                          id="bathroom"
                                          name="bathroom"
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

               {/* Right */}
               <div className="flex flex-col gap-5">
                  {/* Photo */}
                  <div className="border rounded-lg p-5 hover:shadow formCard">
                     <p className="font-medium text-sm mb-2">Image</p>{" "}
                     <div className="relative group">
                        <FormField
                           control={form.control}
                           name="image"
                           render={({ field }) => (
                              <FormItem className=" w-full h-[150px] lg:h-[250px]">
                                 <FormLabel htmlFor="image">
                                    {field.value ? (
                                       <Image
                                          src={field.value}
                                          alt="Photo de l'annonce"
                                          fill
                                          sizes="100%"
                                          priority
                                          className="absolute top-0 left-0 rounded w-full object-cover"
                                       />
                                    ) : (
                                       <div className="bg-blue-200/80 h-48 border-dashed border-2 border-blue-500 rounded " />
                                    )}
                                 </FormLabel>
                                 <FormControl>
                                    <label
                                       className={cn(
                                          isLoading
                                             ? "cursor-not-allowed"
                                             : "cursor-pointer",
                                          " font-medium animate shadow"
                                       )}
                                       htmlFor="image"
                                    >
                                       <div className="hidden group-hover:flex items-center gap-2 text-sm absolute bottom-[35%]  left-[50%] -translate-x-[50%] bg-secondary hover:bg-primary rounded p-2">
                                          <Camera />
                                          <span className="hidden md:block">
                                             Sélectionner une photo
                                          </span>
                                       </div>
                                       <Input
                                          className="hidden"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) =>
                                             handleImageSelect(
                                                e,
                                                field.onChange
                                             )
                                          }
                                          id="image"
                                          name="image"
                                       />
                                    </label>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>

                  {/* Types de logement & Catégorie */}
                  <div className="border rounded-lg p-5 hover:shadow formCard">
                     <p className="font-medium text-sm mb-2">
                        Type, catégorie et accessoires du logement
                     </p>
                     <div className="flex gap-5 mb-2">
                        {/* Type de logement */}
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="types"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       htmlFor="houseType"
                                       className="text-xs"
                                    >
                                       Type de logement
                                    </FormLabel>
                                    <FormControl>
                                       <Select
                                          disabled={isLoading}
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          defaultValue={field.value}
                                       >
                                          <SelectTrigger
                                             className="bg-background"
                                             name="houseType"
                                             id="houseType"
                                          >
                                             <SelectValue
                                                placeholder="Types"
                                                defaultValue={field.value}
                                             />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {types?.map((type) => (
                                                <SelectItem
                                                   key={type.id}
                                                   value={type.id}
                                                >
                                                   {type.name}
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
                        {/* Catégories */}
                        <div className="flex-1">
                           <FormField
                              control={form.control}
                              name="categories"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel
                                       htmlFor="categories"
                                       className="text-xs"
                                    >
                                       Catégorie
                                    </FormLabel>
                                    <FormControl>
                                       <Select
                                          disabled={isLoading}
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          defaultValue={field.value}
                                       >
                                          <SelectTrigger
                                             className="bg-background"
                                             name="categories"
                                             id="categories"
                                          >
                                             <SelectValue
                                                placeholder="Catégories"
                                                defaultValue={field.value}
                                             />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {categories?.map((category) => (
                                                <SelectItem
                                                   key={category.id}
                                                   value={category.id}
                                                >
                                                   {category.name}
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
                     {/* Equipements */}
                     <div className="pt-3">
                        <p className="text-xs font-medium mb-2">Equipements</p>

                        <div className="mb-5 max-h-28 overflow-y-auto">
                           <FormField
                              control={form.control}
                              name="features"
                              render={() => (
                                 <FormItem>
                                    <div>
                                       <FormLabel
                                          htmlFor="features"
                                          className="hidden"
                                       >
                                          Equipements
                                       </FormLabel>
                                    </div>
                                    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 mt-2">
                                       {features?.map((feature) => (
                                          <FormField
                                             key={uuidv4()}
                                             control={form.control}
                                             name="features"
                                             render={({ field }) => (
                                                <FormItem
                                                   key={uuidv4()}
                                                   className="flex flex-row items-end gap-3"
                                                >
                                                   <FormControl>
                                                      <Checkbox
                                                         checked={field.value?.includes(
                                                            feature.id
                                                         )}
                                                         name="features"
                                                         id="features"
                                                         onCheckedChange={(
                                                            checked
                                                         ) => {
                                                            return checked
                                                               ? field.onChange(
                                                                    [
                                                                       ...field.value,
                                                                       feature.id,
                                                                    ]
                                                                 )
                                                               : field.onChange(
                                                                    field.value?.filter(
                                                                       (
                                                                          value
                                                                       ) =>
                                                                          value !==
                                                                          feature.id
                                                                    )
                                                                 );
                                                         }}
                                                      />
                                                   </FormControl>
                                                   <FormLabel className="text-xs">
                                                      {feature.name}
                                                   </FormLabel>
                                                </FormItem>
                                             )}
                                          />
                                       ))}
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                  </div>
                  {/* Prix, available */}
                  <div className="border rounded-lg py-3 px-5 hover:shadow formCard space-y-2 flex items-start gap-10">
                     <div className="flex-1">
                        <FormField
                           control={form.control}
                           name="price"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="price" className="text-xs">
                                    Prix par nuit{" "}
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       min="30"
                                       max="5000"
                                       step="5"
                                       placeholder="130"
                                       {...field}
                                       name="price"
                                       id="price"
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
                           name="isAvailable"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel
                                    htmlFor="isAvailable"
                                    className="text-xs"
                                 >
                                    Rendre votre logement disponible à la
                                    location ?{" "}
                                 </FormLabel>
                                 <FormControl>
                                    <div className="flex items-center gap-2">
                                       <p className="text-sm font-semibold">
                                          Non
                                       </p>
                                       <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          name="isAvailable"
                                          id="isAvailable"
                                       />
                                       <p className="text-sm font-semibold">
                                          Oui
                                       </p>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
                  {/* Button */}
                  <div className="flex items-center gap-2 justify-end">
                     <Button
                        disabled={isLoading}
                        title="Valider les modifications"
                     >
                        {isLoading ? (
                           // Pendant le chargement
                           <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                           </>
                        ) : (
                           // Sans chargement
                           <>
                              <Check className="mr-2 h-4 w-4" />
                              Valider
                           </>
                        )}
                     </Button>
                     <Button
                        type="button"
                        variant="secondary"
                        className="group"
                        onClick={() => router.push(`/annonce/${house.id}`)}
                        title="Retour sur la page de détails de l'annonce"
                     >
                        <X className="mr-2 h-4 w-4 group-hover:animate-spin-fast" />
                        Annuler
                     </Button>
                     {/* Suppression */}
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button
                              title="Suppression de l'annonce"
                              variant="destructive"
                           >
                              Supprimer
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                           <AlertDialogHeader>
                              <AlertDialogTitle>
                                 Êtes-vous sur de vouloir supprimer cette
                                 annonce?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                 Cette action est irréversible. Cela supprimera
                                 définitivement votre annonce.
                              </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                 className="bg-red-500 text-white hover:text-black hover:bg-secondary hover:shadow"
                                 onClick={handleDeleteHouse}
                              >
                                 Supprimer
                              </AlertDialogAction>
                           </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                  </div>
               </div>
            </form>
         </Form>
      </div>
   );
};
