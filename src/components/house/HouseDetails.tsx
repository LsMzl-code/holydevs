"use client";
import dynamic from "next/dynamic";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

// Icons
import { Dot, Loader, MessageCircle, Wand2 } from "lucide-react";

// React / Next
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Libraries
import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { v4 as uuidv4 } from "uuid";

// UI Components
import { toast } from "../shadcn/use-toast";
import { Badge } from "../shadcn/badge";
import { Button, buttonVariants } from "../shadcn/button";
import { Separator } from "../shadcn/separator";
import { cn } from "@/lib/utils";

// Types
import { HouseDetailsTypes } from "@/types/house/houseDetails";

// Images
import Share from "../../../public/icon/share.png";
import Star from "../../../public/icon/star.png";
import Comments from "../../../public/icon/comments.png";
import Pin from "../../../public/icon/location.png";

// Components
import AllOpinionsDialog from "./opinion/AllOpinionsDialog";
import AddOpinionForm from "./opinion/AddOpinionForm";
import OpinionsCarousel from "./opinion/OpinionsCarousel";
import { PropositionCarousel } from "./PropositionCarousel";
import { HouseDescriptionDialog } from "./details/HouseDescriptionDialog";
import { NotationSystem } from "./notation/NotationSystem";
import { FavouriteInteraction } from "./details/FavouriteInteraction";
import { DateRangePicker } from "./booking/DateRangePicker";
const LeafletMap = dynamic(() => import("./LeafletMap"), {
   ssr: false,
});

// Hooks
import useBookHouse from "@/app/hooks/useBookHouse";
import useLocation from "@/app/hooks/useLocations";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Libraries
import { fr } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { hasOverlap } from "./booking/HousePaymentForm";
import { Booking } from "@prisma/client";

const HouseDetails = ({
   house,
   allOpinions,
   lastOpinions,
   propositionHouse,
   bookings,
   user,
}: HouseDetailsTypes) => {
   // States
   const [date, setDate] = useState<DateRange | undefined>();
   const [totalPrice, setTotalPrice] = useState<number>(0);
   const [days, setDays] = useState(house.price);
   const [bookingIsLoading, setBookingIsLoading] = useState(false);

   // Hooks
   const {
      setHouseData,
      paymentIntentId,
      setClientSecret,
      setPaymentIntentId,
   } = useBookHouse();
   const { userId } = useAuth();
   const router = useRouter();

   setDefaultOptions({ locale: fr });
   

   // Notation
   const totalRates = house.rates.reduce(
      (acc, currentValue) => acc + currentValue.rate,
      0
   );
   const averageRate = Number((totalRates / house.rates.length).toFixed(2));

   // Propriétaire de l'annonce ?
   const isMyHouse: boolean = house.userId === user?.id;

   // localisation
   const { getCountryByCode, getStateByCode, getStateCities } = useLocation();
   const country = getCountryByCode(house?.country ?? "");
   const state = getStateByCode(house?.country ?? "", house?.state ?? "");
   const cities = getStateCities(house.country ?? "", house?.state ?? "");
   const city = cities?.filter((city) => city.name === house.city);

   // Calcul du nombre de jours et du prix
   useEffect(() => {
      // Si les date provenant de <DateRange> existent
      if (date && date.from && date.to) {
         // Calcul du nombre de jours
         const dayCount = differenceInCalendarDays(date.to, date.from);
         // Update du nombre de jours
         setDays(dayCount);

         // Calcul du prix selon le nombre de jours
         if (dayCount) {
            setTotalPrice(dayCount * (house?.price ?? 0));
         }
      }
   }, [date, house?.price]);

   /** Dates indisponibles car déjà réservées. */
   const disabledDates = useMemo(() => {
      let dates: Date[] = [];

      const houseBookings = bookings?.filter(
         (booking) => booking.houseId === house?.id && booking.paymentStatus
      );

      // Attribution d'une date de départ et de fin pour chaque réservation
      houseBookings?.forEach((booking) => {
         const range = eachDayOfInterval({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
         });
         // Nouvelles dates non disponibles
         dates = [...dates, ...range];
      });
      return dates;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [bookings, totalPrice]);

   const handleBookHouse = () => {
      //! Pas d'utilisateur connecté
      if (!userId) {
         return toast({
            variant: "destructive",
            title: "Vous devez être connecté pour réserver",
            description: <Link href={"/sign-in"}>Connexion</Link>,
         });
      }

      //? Si l'utilisateur à bien selectionné des dates de réservation
      if (date?.from && date?.to) {
         setBookingIsLoading(true);

         // Chevauchement de dates
         const houseBookings = bookings?.filter(
            (booking) => booking.houseId === house?.id && booking.paymentStatus
         );

         const houseBookingsDates = houseBookings?.map((booking: Booking) => {
            return {
               startDate: booking.startDate,
               endDate: booking.endDate,
            };
         });
         if (!houseBookingsDates) {
            return;
         }

         const overlapFound = hasOverlap(
            date.from,
            date.to,
            houseBookingsDates
         );
         if (overlapFound) {
            toast({
               variant: "destructive",
               title: "❌ Erreur",
               description:
                  "Il y a déjà une réservation en cours pour ces dates.",
            });
            setBookingIsLoading(false);
            return;
         }

         // Création des données de réservation selon useBookHouse()
         const bookingHouseData = {
            house,
            totalPrice,
            startDate: date.from,
            endDate: date.to,
         };
         // Mise à jour des données de réservation
         setHouseData(bookingHouseData);

         // Envoie des données de réservation à l'API
         fetch("/api/booking/create-payment-intent", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               // Informations de réservation
               booking: {
                  houseOwnerId: house.ownerId,
                  houseId: house.id,
                  startDate: date.from,
                  endDate: date.to,
                  totalPrice: totalPrice,
               },
               // Identifiant de la transaction
               paiement_intent_id: paymentIntentId,
            }),
         })
            .then((res) => {
               setBookingIsLoading(false);
               if (res.status === 401) {
                  return toast({
                     variant: "destructive",
                     title: "Vous devez être connecté pour réserver",
                     description: <Link href={"/sign-in"}>Connexion</Link>,
                  });
               }
               return res.json();
            })
            .then((data) => {
               // Mise à jour des informations de paiement et redirection vers //! ...
               setClientSecret(data.paymentIntent.client_secret);
               setPaymentIntentId(data.paymentIntent.id);
               router.push("/reserver");
            })
            .catch((error: any) => {
               console.log("error", error);
               toast({
                  variant: "destructive",
                  description: `Une erreur est survenue, ${error.message}`,
               });
            });
      } else {
         return toast({
            variant: "destructive",
            description:
               "Vous devez sélectionner des dates pour votre réservation",
         });
      }
   };

   if (!house) return;
   return (
      <div className="mt-5 max-w-[1400px] mx-auto px-2">
         {/* Top */}
         <div className="flex flex-col ">
            {/* Mobile */}
            <div className="md:hidden">
               <div className="flex justify-between items-center">
                  {/* Titre de l'annonce */}
                  <h1 className="font-medium text-lg w-[310px] overflow-hidden text-ellipsis whitespace-nowrap">
                     {house?.title}
                  </h1>
                  {/* Right */}
                  <div className="flex items-center gap-5">
                     <Image
                        src={Share}
                        alt="Icône de partage"
                        height={20}
                        width={20}
                        className="h-5 w-5 hover:animate-bounce cursor-pointer"
                     />
                     {!isMyHouse && <FavouriteInteraction house={house} />}
                  </div>
               </div>

               <div className="space-x-2 mb-2">
                  {/* Types */}
                  {house.types.map((item) => (
                     <Badge
                        variant="secondary"
                        key={uuidv4()}
                        className="capitalize"
                     >
                        {item.type.name}
                     </Badge>
                  ))}
                  {/* Categories */}
                  {house.categories.map((item) => (
                     <Badge key={uuidv4()} className="capitalize">
                        {item.category.name}
                     </Badge>
                  ))}
               </div>
            </div>
            {/* Screen */}
            <div className="hidden md:block">
               {/* Top */}
               <div className="flex items-center justify-between">
                  {/* Titre de l'annonce */}
                  <h1 className="font-medium text-2xl lg:text-3xl lg:w-[850px] w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
                     {house?.title}
                  </h1>
                  {/* Interaction */}
                  <div className="flex items-center gap-5">
                     {/* Share */}
                     <form>
                        <Image
                           src={Share}
                           alt="Icône de partage"
                           height={20}
                           width={20}
                           className="h-5 w-5 hover:animate-bounce cursor-pointer"
                        />
                     </form>
                     {/* Ajout aux favoris si pas propriétaire */}
                     {!isMyHouse && <FavouriteInteraction house={house} />}
                  </div>
               </div>
               {/* Types */}
               <div className="space-x-2">
                  {house.types.map((item) => (
                     <Badge
                        variant="secondary"
                        key={uuidv4()}
                        className="capitalize"
                     >
                        {item.type.name}
                     </Badge>
                  ))}
                  {/* Categories */}
                  {house.categories.map((item) => (
                     <Badge key={uuidv4()} className="capitalize">
                        {item.category.name}
                     </Badge>
                  ))}
               </div>
               <p className="my-3 text-sm lg:w-[850px]">
                  {house?.introduction}
               </p>
            </div>
         </div>

         {/* //TODO: Mettre un carousel de photos*/}
         {/* Illustration */}
         <div className="relative w-full h-[200px] md:h-[450px] bg-background mb-3 md:mb-5">
            <Image
               src={house?.image ?? ""}
               fill
               alt={house?.title}
               sizes="100%"
               className="object-cover rounded-xl"
            />
         </div>
         {/* Bas */}
         <div className="max-w-[1250px] mx-auto">
            <div className="flex flex-col md:flex-row w-full md:gap-10 ">
               {/* Left section */}
               <div className="flex flex-col md:w-[70%]">
                  {/* Localisation */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center text-sm md:text-xl gap-1">
                        <Image
                           src={Pin}
                           alt="Icône de localisation"
                           height={20}
                           width={20}
                           className="h-6 w-6"
                        />
                        <p className="max-md:text-lg">
                           {country?.name}, {state?.name}, {house?.city}
                        </p>
                     </div>
                     {house.rates.length >= 1 && (
                        <div className="flex items-center gap-1">
                           <Image
                              src={Star}
                              alt="Icône de note du logement"
                              height={20}
                              width={20}
                              className="h-5 w-5"
                           />
                           <p>{averageRate}/5</p>
                        </div>
                     )}
                  </div>

                  {/* Nombre de chambre etc */}
                  <ul className="flex items-center max-md:text-sm text-md font-light">
                     <li>
                        {house?.bedroom === 1
                           ? house?.bedroom + " chambre"
                           : house?.bedroom + " chambres"}
                     </li>
                     <span>
                        <Dot size={15} />
                     </span>
                     <li>
                        {house?.kitchen === 1
                           ? house?.kitchen + " cuisine"
                           : house?.kitchen + " cuisines"}
                     </li>
                     <span>
                        <Dot size={15} />
                     </span>
                     <li>
                        {house?.kitchen === 1
                           ? house?.kitchen + " salle de bain"
                           : house?.kitchen + " salles de bain"}
                     </li>
                  </ul>

                  {/* Pricing */}
                  <div className="border-b pb-5 md:pb-8 flex items-center gap-1">
                     <p className="max-md:text-sm text-lg font-medium">
                        {house?.price} €
                     </p>
                     <p className="text-lg">
                        /<span className="text-sm">nuit</span>{" "}
                     </p>
                  </div>

                  {/* Description */}
                  <p className="mt-5 md:mt-8 mb-2 text-md md:text-xl font-medium">
                     En savoir plus sur le logement
                  </p>
                  <p className="text-sm md:text-base h-[68px] font-light overflow-hidden text-ellipsis">
                     {house?.description}
                  </p>
                  <HouseDescriptionDialog house={house} />
                  {/* Date de mise en ligne */}
                  <p className=" md:pb-5 mt-2 text-xs">
                     Mis en ligne le{" "}
                     <span className="font-medium">
                        {format(house?.createdAt ?? 0, "dd MMMM yyyy")}
                     </span>{" "}
                  </p>

                  <p className="mt-5 md:mt-8 text-md md:text-xl font-medium">
                     Rencontrez le propriétaire
                  </p>
                  {/* Owner Informations & Contact */}
                  <div className="flex items-center justify-between gap-2 mt-3 border rounded-lg shadow px-2 py-2 md:p-3 hover:shadow-none hover:bg-background/80">
                     {/* Lien vers le profil de l'utilisateur */}
                     <Link
                        href={`/utilisateur/${house.user?.username}`}
                        title="Profil de l'utilisateur"
                        className="flex items-center gap-3"
                     >
                        <Avatar>
                           {/* // TODO Mettre avatar par défaut */}
                           <AvatarImage
                              src={
                                 house.user?.profilePicture
                                    ? house.user.profilePicture
                                    : ""
                              }
                              className="rounded-full h-14 w-14 object-cover"
                           />
                        </Avatar>

                        <div className="flex gap-10">
                           <div className="flex flex-col w-[220px] md:w-full ">
                              {house.user?.firstname && house.user.lastname ? (
                                 <>
                                    <p className="font-medium capitalize">
                                       {house.user.firstname}{" "}
                                       {house.user.lastname}
                                    </p>
                                    <p className="text-xs">
                                       @{house.user.username}
                                    </p>
                                 </>
                              ) : (
                                 <p className="font-medium">
                                    @{house.user?.username}
                                 </p>
                              )}
                           </div>
                        </div>
                     </Link>

                     {/* //TODO: Si connecté, lien vers le tchat, sinon lien vers page de connexion et toast pour indiquer qu'il doit être connecté pour contacter le membre*/}
                     {/* Mobile */}
                     <Link
                        href=""
                        className={cn(
                           buttonVariants({ size: "sm" }),
                           "shadow md:hidden"
                        )}
                        title="Contacter l'utilisateur"
                     >
                        <MessageCircle size={20} />
                     </Link>

                     {/* Screen */}
                     <Link
                        href=""
                        className={cn(
                           buttonVariants(),
                           "shadow hidden md:block"
                        )}
                        title="Contacter l'utilisateur"
                     >
                        Contacter
                     </Link>
                  </div>

                  {/* Equipements */}
                  <p className="mt-5 md:mt-8 mb-2 text-md md:text-xl font-medium">
                     Ce que propose ce logement
                  </p>
                  <div className="w-full max-h-40 overflow-y-auto">
                     <ul className="grid grid-cols-3 space-y-1">
                        {house.features.map((feature) => (
                           <li key={uuidv4()}>
                              <span>
                                 {feature.feature.image && (
                                    <Image
                                       src={feature.feature.image}
                                       alt="logo de l'équipement"
                                       height={20}
                                       width={20}
                                    />
                                 )}
                                 <p>{feature.feature.name}</p>
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* Right section */}
               {/* Affichage du calendrier seulement si utilisateur pas propriétaire de la maison */}
               {!isMyHouse && (
                  <div className="md:w-[30%] overflow-hidden">
                     <div className=" md:rounded-xl md:border md:shadow-md md:p-5">
                        <h4 className="font-medium text-xl mb-3">
                           Réservation
                        </h4>

                        {/* Calendrier */}
                        <div className="mb-5">
                           <p className="text-sm mb-2">
                              Choisissez les dates de votre séjour
                           </p>
                           <DateRangePicker
                              date={date}
                              setDate={setDate}
                              disabledDates={disabledDates}
                           />
                        </div>

                        {/* Reservation Button */}
                        {/* //TODO: Si connecté, lien vers page de réservation, sinon lien vers page de connexion et toast pour indiqué qu'il doit être connecté pour réserver*/}
                        <Button
                           onClick={() => handleBookHouse()}
                           disabled={bookingIsLoading}
                           type="button"
                           className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500"
                        >
                           {bookingIsLoading ? (
                              <Loader className="mr-2 h-4 w-4" />
                           ) : (
                              <Wand2 className="mr-2 h-4 w-4" />
                           )}
                           {bookingIsLoading ? "Chargement" : "Réserver"}
                        </Button>

                        <p className="text-center my-3 md:text-sm">
                           Lorem ipsum dolor sit amet consectetur adipisicing
                           elit.
                        </p>

                        {/* Reservation Details */}
                        <div className="text-lg flex flex-col gap-1 ">
                           <div className="flex items-center justify-between">
                              <p>
                                 {house?.price} € x {days} nuits
                              </p>
                              <p>{totalPrice} €</p>
                           </div>
                           <div className="flex items-center justify-between">
                              <p>
                                 {house?.price} € x {days} nuits
                              </p>
                              <p>{totalPrice} €</p>
                           </div>
                           <div className="flex items-center justify-between pb-5 border-b">
                              <p>
                                 {house?.price} € x {days} nuits
                              </p>
                              <p>{totalPrice} €</p>
                           </div>
                           <div className="pt-3 font-semibold flex items-center justify-between">
                              <p>Total</p>
                              <p>{totalPrice} €</p>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* <section> */}
            <Separator className="mt-10" />
            {/* Avis */}
            <p className="text-md md:text-xl font-medium mt-5 mb-3">
               Avis utilisateurs
            </p>
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  {/* Système de notation si pas propriétaire */}
                  {!isMyHouse ? (
                     <div>
                        <NotationSystem
                           house={house}
                           averageRate={averageRate}
                        />
                     </div>
                  ) : (
                     <div className="flex items-center justify-center gap-2 border rounded-full p-2 w-[170px] bg-foreground/5 group hover:shadow">
                        <Image
                           src={Star}
                           alt="Icône de note du logement"
                           height={20}
                           width={20}
                           className="h-5 w-5 group-hover:animate-spin-fast"
                        />
                        {house.rates.length === 0 ? (
                           <p>Aucune note</p>
                        ) : (
                           <p>
                              {averageRate}/5 | {house.rates.length} note
                           </p>
                        )}
                     </div>
                  )}

                  <div>
                     {allOpinions.length < 1 ? (
                        <p className="max-md:text-sm">
                           Aucun avis n'a été écrit pour le moment
                        </p>
                     ) : (
                        <div className="flex items-center gap-2 border rounded-full py-0.5 pr-0.5 pl-2 bg-foreground/5">
                           <Image
                              src={Comments}
                              alt="Icône de note du logement"
                              height={20}
                              width={20}
                              className="h-5 w-5"
                           />
                           <p>{allOpinions.length} avis</p>
                           <AllOpinionsDialog allOpinions={allOpinions} />
                        </div>
                     )}
                  </div>
               </div>

               {/* Affichage du formulaire d'avis si pas propriétaire */}
               {!isMyHouse && (
                  <div>
                     <AddOpinionForm house={house} />
                  </div>
               )}
            </div>

            {/* Carousel avis */}
            <div>
               {lastOpinions.length > 0 && (
                  <OpinionsCarousel lastOpinions={lastOpinions} />
               )}
            </div>

            {/* Localisation */}
            <section>
               <h4 className="mt-5 md:mt-8 md:mb-5 text-md md:text-xl font-medium">
                  Où se situe le logement
               </h4>

               {/* Map */}
               <LeafletMap
                  cityLatitude={Number(city[0].latitude)}
                  cityLongitude={Number(city[0].longitude)}
               />
            </section>
            {/* Annonces similaires */}
            <section>
               <h4 className="mt-5 md:mt-8 md:mb-5 text-md md:text-xl font-medium">
                  Autres logements autour de {city[0].name}
               </h4>

               {/* Map des logements de la même ville */}
               {/* //TODO: Carousel proposition de logements */}
               {propositionHouse.length === 0 ? (
                  <p>Aucunes annonces similaires pour le moments</p>
               ) : (
                  <PropositionCarousel houses={propositionHouse} />
               )}
            </section>
         </div>
      </div>
   );
};

export default HouseDetails;
