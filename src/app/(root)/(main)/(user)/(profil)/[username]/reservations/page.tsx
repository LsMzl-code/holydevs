import MyBookingsClient from "@/components/booking/MyBookingsClient";
import { ReservationCard } from "@/components/house/booking/ReservationCard";
import ProfileSideBar from "@/components/navigation/components/ProfileSideBar";
import { Button, buttonVariants } from "@/components/shadcn/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/shadcn/tabs";
import { db } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
   title: "Mes réservations",
   description: "Page des réservations de l'utilisateur",
};

export default async function Reservations() {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         username: true,
         profilePicture: true,
         biography: true,
         languages: true,
         interests: true,
         houses: {
            select: {
               id: true,
               image: true,
               title: true,
               price: true,
            },
         },
         opinions: {
            select: {
               id: true,
            },
         },
         followers: {
            select: {
               id: true,
               follower: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
         followings: {
            select: {
               id: true,
               following: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
      },
   });
   if (!user) return <h1>Vous n'êtes pas connecté</h1>;

   // Reservations on user houses
   const bookingsFromUsers = await db.house.findMany({
      where: {
         bookings: {
            some: { houseOwnerId: userId },
         },
      },
      select: {
         city: true,
         country: true,
         image: true,
         title: true,
         bookings: {
            select: {
               bookedAt: true,
               userName: true,
               totalPrice: true,
               paymentStatus: true,
               startDate: true,
               endDate: true,
               houseId: true,
               userId: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });

   // Current user reservations
   const bookingsFromMe = await db.house.findMany({
      where: {
         bookings: {
            some: { userId: user.id },
         },
      },
      select: {
         city: true,
         country: true,
         image: true,
         title: true,
         bookings: {
            select: {
               bookedAt: true,
               userName: true,
               totalPrice: true,
               paymentStatus: true,
               startDate: true,
               endDate: true,
               houseId: true,
               userId: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });

   //! Pas de réservation trouvée
   if (!bookingsFromUsers && !bookingsFromMe)
      return <div>Aucune réservation trouvée</div>;

   return (
      <section className="flex items-start gap-5 w-full">
         {/* Left */}
         <ProfileSideBar user={user} />
         {/* Right */}
         <div className="flex flex-col gap-5 w-full">
            {/* Haut */}
            <Tabs defaultValue="myReservations">
               <div className="flex items-center justify-between bg-card rounded-lg pr-2">
                  {/* Tabs */}
                  <div className="p-2">
                     <TabsList>
                        <TabsTrigger value="myReservations">
                           Mes réservations
                        </TabsTrigger>
                        <TabsTrigger value="userReservations">
                           Maisons réservées
                        </TabsTrigger>
                     </TabsList>
                  </div>
                  {/* DropDown menu */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="outline">Outils</Button>
                     </DropdownMenuTrigger>

                     <DropdownMenuContent
                        className="w-56 bg-background px-3 py-2"
                        align="end"
                     >
                        <DropdownMenuLabel>
                           Gérer mes réservations
                        </DropdownMenuLabel>
                        <div className=" pl-2">
                           <DropdownMenuItem
                              className={cn(
                                 buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                 }),
                                 "flex items-center justify-start py-1 gap-1 text-sm font-normal focus:ring-none focus:outline-none"
                              )}
                           >
                              {/* <UserRound size={15} /> */}
                              <Link
                                 href={`/${user.username}/reservations/outils/suivi-du-budget`}
                                 title="Suivi du budget de vacances"
                                 // className={cn(buttonVariants())}
                              >
                                 Suivre mon budget
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              className={cn(
                                 buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                 }),
                                 "flex items-center justify-start py-1 gap-1 text-sm font-normal"
                              )}
                           >
                              {/* <UserRound size={15} /> */}
                              <Link
                                 href={`/${user.username}/reservations/outils/todo-list`}
                                 title="Suivi du budget de vacances"
                                 // className={cn(buttonVariants())}
                              >
                                 Mes Todo Lists
                              </Link>
                           </DropdownMenuItem>
                        </div>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
               <TabsContent value="myReservations">
                  {/* Bas */}
                  <div className="bg-card rounded-lg p-2">
                     <h2 className="text-xl md:text-2xl font-medium mb-4">
                        Mes réservations personnelles
                     </h2>
                     {bookingsFromMe.length === 0 ? (
                        <p>Aucune réservation pour le moment.</p>
                     ) : (
                        <>
                           <div className="flex flex-col gap-5">
                              {bookingsFromMe.map((booking) => (
                                 <ReservationCard
                                    house={booking}
                                    key={uuidv4()}
                                 />
                              ))}
                           </div>
                        </>
                     )}
                  </div>
               </TabsContent>
               <TabsContent value="userReservations">
                  <div className="bg-card rounded-lg p-2">
                     <h2 className="text-xl md:text-2xl font-medium mb-4">
                        Réservations sur mes maisons
                     </h2>
                     {bookingsFromUsers.length === 0 ? (
                        <p>Aucune réservation pour le moment</p>
                     ) : (
                        <>
                           <div className="flex flex-col gap-5">
                              {bookingsFromUsers.map((booking) => (
                                 <ReservationCard
                                    house={booking}
                                    key={uuidv4()}
                                 />
                              ))}
                           </div>
                        </>
                     )}
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </section>
   );
}
