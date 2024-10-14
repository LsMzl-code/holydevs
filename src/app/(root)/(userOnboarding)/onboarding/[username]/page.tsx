import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { SecondStepForm } from "@/components/user/onboarding/SecondStepForm";
import { UserOnboardingTypes } from "@/types/user/onboarding";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
   title: "Onboarding - 2ème étape",
   description: "Deuxième étape de l'onboarding pour l'inscription utilisateur",
};

export default async function UserOnboarding2() {
   // Utilisateur connecté
   const user = await currentUser();
   if (!user) return null;

   // Utilisateur dans la database
   const dbUser = await getUserByClerkId(user.id);
   // Onboarding terminé => redirection
   if (dbUser?.isOnboardingCompleted) {
      redirect("/");
   }
   const userData: UserOnboardingTypes = {
      user: {
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName,
         username: user.username,
         email: user.emailAddresses[0].emailAddress,
         image: user.imageUrl,
      },
   };


   return (
      <section className="flex m-auto h-screen max-sm:mx-5">
         <div className="flex flex-col md:flex-row justify-center items-center m-auto w-7xl">
            {/* Left section */}
            <div className="mb-3 md:mb-6 lg:mb-0 flex-1 flex flex-col rounded-l-xl py-5 bg-gradient-to-b from-foreground/10 to-transparent self-start">
               <div className="md:w-[500px] m-auto px-5">
                  <h1 className=" text-center md:text-start text-3xl md:text-4xl font-medium mb-3">
                     Faisons un peu plus connaissance
                  </h1>
                  <p className="text-sm">
                     Vous pouvez à présent compléter votre profil en donnant
                     quelques informations vous concernant qui donneront une
                     idée de qui vous êtes aux autres utilisateurs.
                     <br />
                     Vous pourrez modifier votre informations à tout moment via
                     votre page de profil utilisateur.
                  </p>
               </div>
            </div>
            {/* Right section */}
            <div className="flex-1 flex flex-col gap-3 items-center justify-center rounded-b-xl rounded-l-none md:ml-5">
               <SecondStepForm user={userData.user} />
            </div>
         </div>
      </section>
   );
}
