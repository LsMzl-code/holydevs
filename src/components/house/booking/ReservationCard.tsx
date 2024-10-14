"use client";
import useLocation from "@/app/hooks/useLocations";
import { Badge } from "@/components/shadcn/badge";
import { Button, buttonVariants } from "@/components/shadcn/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { ReservationCardTypes } from "@/types/house/Booking";

import { differenceInCalendarDays, format } from "date-fns";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { fr } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { cn } from "@/lib/utils";

export const ReservationCard = ({ house }: ReservationCardTypes) => {
   // React, Next
   const router = useRouter();

   // Paiement
   const [bookingIsLoading, setBookingIsLoading] = useState(false);

   setDefaultOptions({ locale: fr });

   // Localisation
   const { getCountryByCode, getStateByCode } = useLocation();
   const country = getCountryByCode(house.country);

   // Réservation dates
   moment.locale("fr");
   const startDate = format(house.bookings[0].startDate,"dd MMMM yyyy");
   const endDate = format(house.bookings[0].endDate,"dd MMMM yyyy");
   const dayCount = differenceInCalendarDays(
      house.bookings[0].endDate,
      house.bookings[0].startDate
   );
   return (
      <Card>
         <CardContent className="flex flex-col sm:flex-row p-0">
            {/* Illustration */}
            <div className="relative w-full sm:w-[40%] min-h-[200px] bg-background">
               <Image
                  src={house.image ?? ""}
                  fill
                  sizes="100%"
                  alt={house.title ?? ""}
                  className="object-cover rounded-l"
               />
            </div>
            {/* Details */}
            <div className="w-full sm:w-[60%] flex flex-col">
               <CardHeader>
                  <div className="space-y-2">
                     {house.bookings[0].paymentStatus ? (
                        <Badge
                           variant="outline"
                           className="text-emerald-500 font-medium inline-block bg-foreground/10"
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
                     <CardTitle>{house.title}</CardTitle>
                  </div>
                  <CardDescription>
                     {house.city}, {country?.name}
                  </CardDescription>
               </CardHeader>
               <CardContent className="text-sm">
                  <p>
                     Réservation effectuée le{" "}
                     {format(house.bookings[0].bookedAt, "dd.MM.yyyy")} par{" "}
                     <Link
                        href={`/utilisateur/${house.bookings[0].userName}`}
                        className="hover:text-gray-500 underline"
                     >
                        {house.bookings[0].userName}
                     </Link>
                     .
                  </p>
                  {house.bookings[0].paymentStatus ? (
                     <p className="text-xs text-gray-500">
                        Payé {house.bookings[0].totalPrice} € -{" "}
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
                        <p>Restant dû: {house.bookings[0].totalPrice} €</p>
                     </div>
                  )}
                  <Separator className="my-2" />
                  <p className="text-xs">Arrivée le {startDate}</p>
                  <p className="text-xs">Départ le {endDate}</p>
               </CardContent>
               <CardFooter className="flex items-center justify-start  gap-2 mb-2">
                  <Link
                     href={`/annonce/${house.bookings[0].houseId}`}
                     className={cn(buttonVariants({ variant: "outline" }))}
                     title="Page de l'annonce"
                  >
                     Voir l'annonce
                  </Link>
                  <Link
                     href={`/annonce/${house.bookings[0].houseId}`}
                     className={cn(buttonVariants({ variant: "outline" }))}
                     title="Page de l'annonce"
                  >
                     Facture
                  </Link>
                  {/* {house.bookings[0].paymentStatus === false &&
                     house.bookings[0].userId === userId && (
                        <Button
                           disabled={bookingIsLoading}
                           onClick={() => handleBookHouse()}
                        >
                           {bookingIsLoading ? "Chargement..." : "Payer"}
                        </Button>
                     )} */}
               </CardFooter>
            </div>
         </CardContent>
      </Card>
   );
};
