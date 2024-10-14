"use client";

import { useAuth } from "@clerk/nextjs";
import { Booking, House } from "@prisma/client";
import { differenceInCalendarDays, format } from "date-fns";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

import { fr } from "date-fns/locale";
import useBookHouse from "@/app/hooks/useBookHouse";
import { useToast } from "../shadcn/use-toast";
import useLocation from "@/app/hooks/useLocations";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../shadcn/card";
import { Badge } from "../shadcn/badge";
import { Separator } from "../shadcn/separator";
import { Button } from "../shadcn/button";
import moment from "moment";

interface MyBookingsClientProps {
   booking: Booking & { House: House | null };
}

const MyBookingsClient: React.FC<MyBookingsClientProps> = ({ booking }) => {
   // States
   // Paiement
   const [bookingIsLoading, setBookingIsLoading] = useState(false);

   //Hooks
   const {
      setHouseData,
      paymentIntentId,
      setClientSecret,
      setPaymentIntentId,
   } = useBookHouse();
   const router = useRouter();
   const pathName = usePathname();
   const { getCountryByCode, getStateByCode } = useLocation();

   // Clerk
   const { userId } = useAuth();

   const { House } = booking;

   // Libraries
   const { toast } = useToast();

   if (!House) {
      return <div>Données non trouvées</div>;
   }

   // Localisation
   const country = getCountryByCode(House.country);
   const state = getStateByCode(House.country, House.state);

   // Réservation dates
   moment.locale("fr");
   const startDate = moment(booking.startDate).format("dd.MMMM.YYYY");
   const endDate = moment(booking.endDate).format("dd.MMMM.YYYY");
   const dayCount = differenceInCalendarDays(
      booking.endDate,
      booking.startDate
   );

   const handleBookHouse = () => {
      //! Pas d'utilisateur connecté
      if (!userId) {
         return toast({
            variant: "destructive",
            title: "Vous devez être connecté pour réserver",
            description: <Link href={"/connexion"}>Connexion</Link>,
         });
      }

      const bookingHouseData = {
         house: House,
         totalPrice: booking.totalPrice,
         startDate: booking.startDate,
         endDate: booking.endDate,
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
               House: House,
               houseOwnerId: House.ownerId,
               houseId: House.id,
               startDate: booking.startDate,
               endDate: booking.endDate,
               totalPrice: booking.totalPrice,
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
            // Mise à jour des informations de paiement et redirection vers
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
   };

   return (
      <Card>
         <CardContent className="flex flex-col sm:flex-row p-0">
            {/* Illustration */}
            <div className="relative w-full sm:w-[40%] min-h-[200px] bg-background">
               <Image
                  src={House.image ?? ""}
                  fill
                  alt={House.title ?? ""}
                  className="object-cover rounded-l"
               />
            </div>
            {/* Details */}
            <div className="w-full sm:w-[60%] flex flex-col">
               <CardHeader>
                  <div className="space-y-2">
                     {booking.paymentStatus ? (
                        <Badge
                           variant="outline"
                           className="text-emerald-500 font-medium inline-block"
                        >
                           Payé
                        </Badge>
                     ) : (
                        <Badge
                           variant="outline"
                           className="text-red-500 font-medium"
                        >
                           Non payé
                        </Badge>
                     )}
                     <CardTitle>{House.title}</CardTitle>
                  </div>
                  <CardDescription>
                     {House.city}, {country?.name}
                  </CardDescription>
               </CardHeader>
               <CardContent className="text-sm">
                  <p>
                     Réservation effectuée le{" "}
                     {moment(booking.bookedAt).format("dd.MMMM.YYYY")} par{" "}
                     <Link
                        href="/user"
                        className="hover:text-gray-500 underline"
                     >
                        {booking.userName}
                     </Link>
                     .
                  </p>
                  {booking.paymentStatus ? (
                     <p className="text-xs text-gray-500">
                        Payé {booking.totalPrice} € -{" "}
                        <span className="text-emerald-500">
                           Logement réservé
                        </span>
                     </p>
                  ) : (
                     <div className="text-xs text-gray-500">
                        <p>
                           Paiement en attente{" "}
                           <span className="text-red-500">
                              Logement non-réservé
                           </span>
                        </p>
                        <p>Restant dû: {booking.totalPrice} €</p>
                     </div>
                  )}
                  <Separator className="my-2" />
                  <p className="text-xs">Arrivée le {startDate}</p>
                  <p className="text-xs">Départ le {endDate}</p>
               </CardContent>
               <CardFooter className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Button
                     disabled={bookingIsLoading}
                     variant="outline"
                     onClick={() =>
                        router.push(`/annonce-details/${booking.houseId}`)
                     }
                  >
                     Voir l'annonce
                  </Button>
                  {booking.paymentStatus === false &&
                     booking.userId === userId && (
                        <Button
                           disabled={bookingIsLoading}
                           onClick={() => handleBookHouse()}
                        >
                           {bookingIsLoading ? "Chargement..." : "Payer"}
                        </Button>
                     )}
               </CardFooter>
            </div>
         </CardContent>
      </Card>
   );
};
export default MyBookingsClient;
