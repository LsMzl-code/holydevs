import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { FirstStepForm } from "@/components/user/onboarding/FirstStepForm";
import { UserOnboardingTypes } from "@/types/user/onboarding";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
   title: "Onboarding - 1ère étape",
   description: "Première étape de l'onboarding pour l'inscription utilisateur",
};

export default async function UserOnboarding1() {
   // Identifiant Clerk de l'utilisateur connecté
   const user = await currentUser();
   if (!user) return;

   // Informations utilisateur depuis la base de données
   const dbUser = await getUserByClerkId(user.id);
   
   // Onboarding complété => redirection
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
      },
   };

   return (
      <section className="flex m-auto h-screen max-sm:mx-5">
         <div className="flex flex-col md:flex-row justify-center items-center m-auto w-7xl">
            {/* Left section */}
            <div className="mb-3 md:mb-6 lg:mb-0 flex-1 flex flex-col rounded-l-xl py-5 bg-gradient-to-b from-foreground/10 to-transparent self-start">
               <div className=" md:w-[350px] m-auto ">
                  <h1 className=" text-center md:text-start text-3xl md:text-4xl font-medium mb-3">
                     Bienvenue sur <br /> Holydevs !
                  </h1>
                  <p className="text-sm">
                     Pour finaliser votre inscription, merci de compléter les
                     informations demandées. Elles serviront à vous connecter et
                     permettront aux autres utilisateurs d'entrer en contact
                     avec vous.
                  </p>
               </div>
            </div>
            {/* Right section */}
            <div className="flex-1 flex flex-col gap-3 items-center justify-center rounded-b-xl rounded-l-none md:ml-5">
               <FirstStepForm user={userData.user}/>
            </div>
         </div>
      </section>
   )
}
