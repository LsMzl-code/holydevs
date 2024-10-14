/**
 * Fichier contenant les méthodes permattent la mise à jour et la suppression d'une annonce.
 * 1 Méthode PATCH pour la mise à jour.
 * 1 Méthode DELETE pour la supression.
 * @creation 02.06.2024 Louis Mazzella
 */

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
   req: Request,
   { params }: { params: { houseId: string } }
) {
   try {
      // Récuperation des informations de l'annonce depuis le body.
      const body = await req.json();
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      //! Pas d'annonce trouvée
      if (!params.houseId) {
         return new NextResponse("Identifiant de l'annonce non trouvé", {
            status: 401,
         });
      }

      //! Pas d'utilisateur trouvé
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      // Update house
      const house = await db.house.update({
         where: {
            id: params.houseId,
         },
         data: {
            image: body.image,
            bedroom: body.bedroom,
            kitchen: body.kitchen,
            bathroom: body.bathroom,
            price: body.price,
            isAvailable: body.isAvailable,
         },
      });

      //? Passage de l'utilisateur à propriétaire si maison disponible
      if (body.isAvailable === true) {
         await db.user.update({
            where: {
               clerkId: userId,
            },
            data: {
               isOwner: true,
            },
         });
      }

      await db.typesOnHouses.create({
         data: {
            houseId: params.houseId,
            typeId: body.types,
         },
      });

      await db.categoriesOnHouses.create({
         data: {
            houseId: params.houseId,
            categoryId: body.categories,
         },
      });

      await db.featuresOnHouses.createMany({
         data: body.features.map((feature: string) => ({
            houseId: params.houseId,
            featureId: feature,
         })),
      });

      return NextResponse.json(house);
   } catch (error) {
      console.log("Error at api/annonce/annonceId PATCH", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
export async function DELETE(
   req: Request,
   { params }: { params: { houseId: string } }
) {
   try {
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();
      const user = await db.user.findFirst({
         where: {
            clerkId: userId,
         },
         select: {
            houses: {
               select: {
                  id: true,
               },
            },
         },
      });

      //! Pas d'annonce trouvée
      if (!params.houseId) {
         return new NextResponse("Identifiant de l'annonce non trouvé", {
            status: 401,
         });
      }

      //! Pas d'utilisateur trouvé
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      await db.typesOnHouses.deleteMany({
         where: {
            houseId: params.houseId,
         },
      });

      await db.categoriesOnHouses.deleteMany({
         where: {
            houseId: params.houseId,
         },
      });

      await db.featuresOnHouses.deleteMany({
         where: {
            houseId: params.houseId,
         },
      });

      // suppression maison
      const house = await db.house.delete({
         where: {
            id: params.houseId,
         },
      });

      //? Si plus de maison, passage de propriétaire à false
      if (user?.houses.length === 0) {
         await db.user.update({
            where: {
               clerkId: userId,
            },
            data: {
               isOwner: false,
            },
         });
      }

      return NextResponse.json("");
   } catch (error) {
      console.log("Error at api/annonce/annonceId DELETE", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
