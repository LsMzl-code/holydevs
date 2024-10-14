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
      // Maison à modifier
      const currentHouse = await db.house.findFirst({
         where: {
            id: params.houseId,
         },
         select: {
            features: true,
            ownerId: true,
         },
      });
      //! Pas de maison trouvée
      if (!currentHouse) {
         return new NextResponse("Annonce non trouvée", {
            status: 401,
         });
      }
      //! Utilisateur pas propriétaire
      if (currentHouse.ownerId != userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const bodyFeatures = body.features.map((feature: string) => feature);
      const houseDbFeatures = currentHouse.features.map(
         (feature) => feature.featureId
      );
      const addedFeatures = bodyFeatures.filter(
         (feature: string) => !houseDbFeatures.includes(feature)
      );
      const removedFeatures = houseDbFeatures.filter(
         (feature: string) => !bodyFeatures.includes(feature)
      );

      // Modification des types
      await db.typesOnHouses.updateMany({
         where: {
            houseId: params.houseId,
         },

         data: {
            houseId: params.houseId,
            typeId: body.types,
         },
      });
      // Modification des équipements
      await db.categoriesOnHouses.updateMany({
         where: {
            houseId: params.houseId,
         },
         data: {
            houseId: params.houseId,
            categoryId: body.categories,
         },
      });
      // Nouvelles features
      if (addedFeatures.length >= 1) {
         await db.featuresOnHouses.createMany({
            data: addedFeatures.map((feature: string) => ({
               houseId: params.houseId,
               featureId: feature,
            })),
         });
      }
      // Features retirées
      if (removedFeatures.length >= 1) {
         await db.featuresOnHouses.deleteMany({
            where: {
               houseId: params.houseId,
               featureId: { in: removedFeatures },
            },
         });
      }
      // Update house
      const house = await db.house.update({
         where: {
            id: params.houseId,
         },
         data: {
            title: body.title,
            introduction: body.introduction,
            description: body.description,

            country: body.country,
            state: body.state,
            city: body.city,
            address: body.address,

            bedroom: body.bedroom,
            kitchen: body.kitchen,
            bathroom: body.bathroom,

            image: body.image,
            price: body.price,
            isAvailable: body.isAvailable,
         },
      });

      return NextResponse.json(house);
   } catch (error) {
      console.log("Error at api/house/update/houseId PATCH", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
