import React from "react";

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "../shadcn/accordion";

export const FAQ = () => {
   return (
      <div className="flex border border-border rounded-md divide-x-2">
         <div className="bg-border pl-5 w-[30%] pt-5">
            <h3 className="font-semibold">FAQ sur la location de logements</h3>
         </div>
         {/* Accordion */}
         <div className="w-[70%]">
            <Accordion type="single" collapsible className="h-full px-2">
               <AccordionItem value="item-1">
                  <AccordionTrigger>
                     Combien coûte une nuit dans un logement sur Holydevs ?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                     Le prix des nuits de chaque logement est indiqué dans
                     l'annonce. Vous pouvez contacter directement le
                     propriétaire du logement afin d'avoir plus de
                     renseignements
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2">
                  <AccordionTrigger>
                     Quels sont les meilleurs logements de ma région ?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                     Vous pouvez vous référer à la section{" "}
                     <span className="font-semibold">Avis clients</span> de
                     chaque annonce afin de pouvoir lire les avis de clients
                     ayant loué le logement auparavant. Un classement des
                     meilleurs logements est alors établit selon la note moyenne
                     de chaque logement.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-3">
                  <AccordionTrigger className="text-start">
                     Parmis les logements disponibles dans ma région, lesquels
                     sont adaptés aux séjours en famille ?
                  </AccordionTrigger>
                  <AccordionContent>
                     Le nombre de pièces et les équipements disponibles sont
                     indiqués dans l'annonce du logement. Pour de plus amples
                     informations, vous pouvez contacter directement le
                     propriétaire.
                  </AccordionContent>
               </AccordionItem>
               {/* // TODO Nom région et nombre de logements dynamiques */}
               <AccordionItem value="item-4">
                  <AccordionTrigger>
                     Combien de logements sont inscrits dans ma région ?
                  </AccordionTrigger>
                  <AccordionContent>
                     Vous pouvez réserver (Nombre de logement) dans la région
                     (nom de la région)
                  </AccordionContent>
               </AccordionItem>
               {/* // TODO Nom des villes et région dynamiques */}
               <AccordionItem value="item-5">
                  <AccordionTrigger>
                     Quelles sont les meilleures destinations de ma région ?
                  </AccordionTrigger>
                  <AccordionContent>
                     (Ville, ville et ville) sont des villes populaires auprès
                     des voyageurs se rendant dans la région (nom de la région).
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </div>
   );
};
