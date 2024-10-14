/**
 * Route en POST permettant d'initialiser un paiement via Stripe.
 * @creation 04.06.2024 - Louis Mazzella
 */

import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
   apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
   const {userId} = auth();

   //! Pas d'utilisateur connecté
   if (!userId) return new NextResponse("Non autorisé", { status: 401 });

   const user = await getUserByClerkId(userId)

   // Récupération et destructuration des informations du body
   const body = await req.json();
   const { booking, payment_intent_id,  } = body;

   // Création des informations de réservation
   const bookingData = {
      ...booking,
      userName: user?.username,
      userEmail: user?.email,
      houseId: body.booking.houseId,
      userId: user?.id,
      currency: "usd",
      paymentIntentId: payment_intent_id,
   };

   /** Contient une réservation. */
   let foundBooking;

   //? Si paiement existant
   if (payment_intent_id) {
      foundBooking = await db.booking.findUnique({
         where: {
            paymentIntentId: payment_intent_id,
            userId: user?.id,
         },
      });
   }

   //? Si réservation & paiement déjà existant
   if (foundBooking && payment_intent_id) {
      // Récupération du paiement dans Stripe
      const current_intent = await stripe.paymentIntents.retrieve(
         payment_intent_id
      );

      //? Si paiement retrouvé, mise à jour du paiement
      if (current_intent) {
         const updated_intent = await stripe.paymentIntents.update(
            payment_intent_id,
            {
               amount: bookingData.totalPrice * 100,
            }
         );

         // Mise à jour de la réservation dans la base de données
         const res = await db.booking.update({
            where: {
               paymentIntentId: payment_intent_id,
               userId: user?.id,
            },
            data: bookingData,
         });

         //! Erreur
         if (!res) {
            return NextResponse.error();
         }

         return NextResponse.json({ paymentIntent: updated_intent });
      }

      //? Si nouvelle réservation
   } else {
      // Création d'un nouveau paiement dans la base de données
      const paymentIntent = await stripe.paymentIntents.create({
         amount: bookingData.totalPrice * 100,
         currency: bookingData.currency,
         automatic_payment_methods: { enabled: true },
      });

      // Mise à jour des informations de paiement
      bookingData.paymentIntentId = paymentIntent.id;

      // Création d'une réservation dans la base de données
      await db.booking.create({
         data: bookingData,
      });

      return NextResponse.json({ paymentIntent });
   }

   return new NextResponse("Internal server error", { status: 500 });
}
