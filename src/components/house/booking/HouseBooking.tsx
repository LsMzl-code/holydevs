"use client";

// Components


// Stripe
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Hooks


// React/Next
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useBookHouse from "@/app/hooks/useBookHouse";
import { Button } from "@/components/shadcn/button";
import HousePaymentForm from "./HousePaymentForm";
import { useTheme } from "next-themes";
import { HouseBookingTypes } from "@/types/house/Booking";

// Initialisation de Stripe
const stripePromise = loadStripe(
   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

/** Gestion des réservations. */
const HouseBooking = ({user}: HouseBookingTypes) => {
   // Hooks
   const { bookingHouseData, clientSecret } = useBookHouse();

   // States
   const [paymentSuccess, setPaymentSuccess] = useState(false);
   const [pageLoaded, setPageLoaded] = useState(false);

   // Components
   const { theme } = useTheme();

   // Next
   const router = useRouter();

   // Défini l'état de chargement de la page à true.
   useEffect(() => {
      setPageLoaded(true);
   }, []);

   // Options du formulaire
   const options: StripeElementsOptions = {
      clientSecret,
      appearance: {
         theme: theme === "dark" ? "night" : "stripe",
         labels: "floating",
      },
   };

   // Défini le status de paiement à true.
   const handleSetPaymentSuccess = (value: boolean) => {
      setPaymentSuccess(value);
   };

   //! Pas de paiement et pas de données de réservation ou identifiant de paiement utilisateur
   if (pageLoaded && !paymentSuccess && (!bookingHouseData || !clientSecret)) {
      return (
         <div className="flex flex-col items-center gap-4">
            <p className="text-red-500 text-center text-xl">
               Cette page ne peut pas s'afficher correctement..
            </p>
            <Button variant="outline" onClick={() => router.push("/")}>
               Accueil
            </Button>
            <Button onClick={() => router.push(`/${user.username}/reservations`)}>
               Voir mes réservations
            </Button>
         </div>
      );
   }

   //* Paiement validé
   if (paymentSuccess) {
      return (
         <div className="flex flex-col items-center gap-4">
            <p className="text-emerald-600 text-center text-xl">
               Paiement effectué avec succès
            </p>
            <Button onClick={() => router.push("/mes-reservations")}>
               Voir mes réservations
            </Button>
         </div>
      );
   }

   return (
      <p className="max-w-5xl mb-10 mx-auto">
         {clientSecret && bookingHouseData && (
            <>
               <h3 className="text-2xl font-medium pb-5 sm:mb-0">
                  Complétez votre paiement pour finaliser la réservation
               </h3>

               <div className="flex border rounded-lg">
                  {/* Illustration */}
                  <div className="h-[723px] relative w-[50%] bg-background rounded-lg">
                     <Image
                        src={bookingHouseData.house.image ?? ""}
                        fill
                        alt={bookingHouseData.house.title ?? ""}
                        className="rounded-l-lg object-cover border-r"
                     />
                  </div>

                  {/* Formulaire */}
                  <div className="w-[50%] rounded-r-lg">
                     <Elements stripe={stripePromise} options={options}>
                        <HousePaymentForm
                           clientSecret={clientSecret}
                           handleSetPaymentSuccess={handleSetPaymentSuccess}
                        />
                     </Elements>
                  </div>
               </div>
            </>
         )}
      </p>
   );
};

export default HouseBooking;