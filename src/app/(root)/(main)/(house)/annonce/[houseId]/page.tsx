import { toast } from "@/components/shadcn/use-toast";
import { db } from "@/lib/prisma";

import { redirect } from "next/navigation";
import React from "react";

import HouseDetails from "@/components/house/HouseDetails";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";



interface HouseDetailsProps {
   params: {
      houseId: string;
      title: string;
   };
}
export const generateMetadata = ({ params }: HouseDetailsProps): Metadata => {
   return {
      title: `${params.title} `,
      description: `Page de l'annonce ${params.title}.`,
   };
};


export default async function HousePage({ params }: HouseDetailsProps) {
   // Utilisateur connecté
   const { userId } = auth();
   const currentUser = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
      },
   })
   // Données annonce
   const house = await db.house.findUnique({
      where: {
         id: params.houseId,
      },
      select: {
         id: true,
         country: true,
         state: true,
         city: true,
         address: true,
         createdAt: true,
         title: true,
         image: true,
         introduction: true,
         description: true,
         price: true,
         bedroom: true,
         kitchen: true,
         bathroom: true,
         isAvailable: true,
         ownerId: true,
         userId: true,
         types: {
            select: {
               type: {
                  select: {
                     name: true,
                     image: true,
                  },
               },
            },
         },
         categories: {
            select: {
               category: {
                  select: {
                     name: true,
                     image: true,
                  },
               },
            },
         },
         features: {
            select: {
               feature: {
                  select: {
                     name: true,
                     image: true,
                  },
               },
            },
         },
         user: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
         rates: {
            select:{
               rate: true,
            }
         },
         favourites: {
            select: {
               userId: true,
            },
         }
      },
   });
   if (!house) {
      redirect("/");
   }

   const propositionHouse = await db.house.findMany({
      where: {
         city: house.city,
      },
      select: {
         id: true,
         title: true,
         image: true,
         price: true,
         city: true,
      },
   });

   /** Contient toutes les réservations d'une maison */
   const bookings = await db.booking.findMany({
      where: {
         houseId: params.houseId,
      },
   });


   // Données des 10 derniers avis
   const lastOpinions = await db.opinion.findMany({
      where: {
         houseId: params.houseId,
      },
      take: 10,
      select: {
         title: true,
         content: true,
         createdAt: true,
         author: {
            select: {
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
      },
   });

   // Données avis de la maison
   const allOpinions = await db.opinion.findMany({
      where: {
         houseId: params.houseId,
      },
      select: {
         title: true,
         content: true,
         createdAt: true,
         author: {
            select: {
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
      },
   });

   return (
      <div>
         <HouseDetails
            house={house}
            allOpinions={allOpinions}
            lastOpinions={lastOpinions}
            propositionHouse={propositionHouse}
            totalPrice={0}
            startDate={new Date}
            endDate={new Date}
            user={currentUser}
            bookings={bookings}
         />
      </div>
   );
}
