"use client"
import clsx from "clsx";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Library
import { v4 as uuidv4 } from "uuid";

export const Breadcrumb = () => {
   // Récupération de la route
   const getPathname = usePathname();

   // Placement des routes dans un tableau
   const segmentsArray = getPathname.split("/");
   console.log('split', segmentsArray)

   // Renommage du premier élément
   segmentsArray[0] = "accueil"

   // Récupération du dernier élément du tableau
   const getLastPath = segmentsArray[segmentsArray.length - 1];

   

   const view = segmentsArray.map((segment, index) => (
      <div key={uuidv4()} className="flex items-center">
         <Link
            href={
               index > 0
                  ? `/${segmentsArray.slice(1, index + 1).join("/")}`
                  : "/"
            }
            className="flex items-center"
         >
            <p
            // Si le lien n'est pas celui de la page en cours, couleur grise, sinon couleur noire
               className={clsx(
                  segment !== getLastPath ? "text-gray-600" : "text-black",
                  "capitalize hover:text-black hover:transition-colors cursor-pointer text-sm"
               )}
            >
               {segment !== "accueil" ? (
                  // Remplacement des tirets dans l'url par des espaces
                  segment.replace(/-/g, " ")
               ) : (
                  // Affichage d'une icone pour la page d'accueil du blog
                  <Home className="inline mb-0.5" size={20} href="/blog" />
               )}
            </p>
            {/* Ajout des "/" entre les éléments */}
            {segment !== getLastPath && <p className="mx-2"> &#62; </p>}
         </Link>
      </div>
   ));

   return <div className="flex items-center my-10 ">{view}</div>;
};
