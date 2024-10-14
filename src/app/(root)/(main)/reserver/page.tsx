/**
 * Formulaire de paiement via Stripe suite à une réservation
 * @creation 04.06.2024 - Louis Mazzella
 */

import HouseBooking from "@/components/house/booking/HouseBooking";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Réservation",
   description: "Page de messagerie utilisateur",
};

const BookHouse = async () => {
   // User Datas
   const { userId } = auth();
   if (!userId) return <p>Vous n'êtes pas connecté</p>;
   const currentUser = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         username: true,
      },
   });
   if (!currentUser) return <p>Vous n'êtes pas connecté</p>;
   return (
      <div className="">
         <HouseBooking user={currentUser} />;
      </div>
   );
};

export default BookHouse;
