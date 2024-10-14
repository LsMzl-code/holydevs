import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Inscription",
   description: "Page d'inscription ",
};

export default function Page() {
   return (
      <div className="h-screen w-full flex items-center">
         <div className="max-w-[350px] mx-auto">
            <SignUp />
         </div>
      </div>
   );
}
