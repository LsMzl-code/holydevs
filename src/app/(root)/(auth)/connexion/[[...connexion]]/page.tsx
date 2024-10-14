import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Connexion",
   description: "Page de connexion utilisateur",
};

export default function ConnexionPage() {
   return (
      <div className="h-screen w-full flex items-center">
         <div className="max-w-[350px] mx-auto">
            <SignIn />
         </div>
      </div>
   );
}
