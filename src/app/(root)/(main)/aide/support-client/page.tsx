import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Separator } from "@/components/shadcn/separator";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
   title: "Support client",
   description: "Page d'accueil d'Holydevs",
};

export default function Support() {
   return (
      <section className="mt-5 lg:mt-10 max-w-[1200px] mx-auto px-3 lg:px-0">
         <Breadcrumb />

         <h1 className="text-xl md:text-3xl font-medium my-5">
            Support client
         </h1>
         <p>
            Bienvenue sur la page de support client de notre site de locations
            de maisons entre particuliers. Nous sommes ici pour vous aider à
            tirer le meilleur parti de votre expérience de location. Si vous
            avez des questions, des préoccupations ou besoin d'assistance, notre
            équipe de support est à votre disposition.
         </p>

         <div className="my-10 space-y-10">
            {/* 1 */}
            <div>
               <h2 className="font-medium text-xl mb-3">1. FAQ</h2>
               <p className="mb-2">
                  Avant de nous contacter, consultez notre{" "}
                  <Link
                     href="/aide"
                     className="font-bold"
                     title="Lien vers la foire aux questions"
                  >
                     FAQ
                  </Link>
                  , où vous trouverez les réponses aux questions les plus
                  fréquentes concernant :
               </p>
               <ul className="list-disc text-sm list-inside space-y-1">
                  <li className="font-semibold">Création de compte</li>
                  <li className="font-semibold">Réservations</li>
                  <li className="font-semibold">Paiements et facturation</li>
                  <li className="font-semibold">Politiques d'annulation</li>
                  <li className="font-semibold">Sécurité et confidentialité</li>
               </ul>
            </div>
            {/* 2 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">
                     2. Contactez-nous
                  </h2>
                  <p className="mb-2">
                     Si vous ne trouvez pas la réponse à votre question dans la
                     FAQ, vous pouvez nous contacter via les moyens suivants :
                  </p>
               </div>
               {/* Email */}
               <div>
                  <p className="font-semibold">Email</p>
                  <p>
                     Envoyez-nous un email à :{" "}
                     <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
                        support@holydevs.com
                     </span>
                  </p>
                  <p>
                     Nous nous efforçons de répondre à tous les emails dans un
                     délai de 24 heures.
                  </p>
               </div>
               {/* Phone */}
               <div>
                  <p className="font-semibold">Téléphone</p>
                  <p>Appelez notre service client au : XX XX XX XX XX</p>
                  <p>Disponible du lundi au vendredi, de 9h00 à 18h00.</p>
               </div>
               {/* Chat */}
               <div>
                  <p className="font-semibold">Chat en direct</p>
                  <p>
                     Utilisez notre chat en direct disponible sur le site pour
                     obtenir une assistance instantanée.{" "}
                  </p>
                  <p>
                     Le chat est ouvert du lundi au vendredi, de 9h00 à 18h00.
                  </p>
               </div>
               {/* Formulaire */}
               <div>
                  <p className="font-semibold">Formulaire de contact</p>
                  <p className="mb-2">
                     Remplissez notre{" "}
                     <Link
                        href="#"
                        className="font-bold"
                        title="Lien vers la foire aux questions"
                     >
                        formulaire de contact{" "}
                     </Link>
                     et nous vous répondrons dans les plus brefs délais.
                  </p>
               </div>
            </div>
            {/* 3 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">
                     3. Centre d'Aide en Ligne
                  </h2>
                  <p className="mb-2">
                     Visitez notre{" "}
                     <Link
                        href="/aide"
                        className="font-bold"
                        title="Lien vers la foire aux questions"
                     >
                        Centre d'Aide en Ligne{" "}
                     </Link>
                     pour accéder à des articles détaillés, des guides
                     d'utilisation et des vidéos explicatives sur divers sujets,
                     y compris :
                  </p>
                  <ul className="list-disc text-sm list-inside space-y-1">
                     <li>Comment réserver une maison</li>
                     <li>Comment devenir hôte</li>
                     <li>Gestion des paiements</li>
                     <li>Politique de sécurité et de confidentialité</li>
                  </ul>
               </div>
            </div>
            {/* 4 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">4. Communauté</h2>
                  <p className="mb-2">
                     Rejoignez notre{" "}
                     <Link
                        href="/aide"
                        className="font-bold"
                        title="Lien vers la foire aux questions"
                     >
                        Communauté en Ligne{" "}
                     </Link>
                     pour échanger avec d'autres utilisateurs, partager des
                     expériences, et obtenir des conseils. Vous pouvez
                     participer à des discussions sur :
                  </p>
                  <ul className="list-disc text-sm list-inside space-y-1">
                     <li>
                        Les meilleures pratiques pour les hôtes et les
                        locataires
                     </li>
                     <li>Résolution des problèmes courants</li>
                     <li>Conseils de sécurité et recommandations</li>
                  </ul>
               </div>
            </div>
            {/* 5 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">
                     5. Suivi de votre Demande
                  </h2>
                  <p>
                     Après avoir contacté notre support, vous recevrez un numéro
                     de ticket de suivi par email. Utilisez ce numéro pour
                     suivre l'avancement de votre demande via notre
                     <Link
                        href="#"
                        className="font-bold"
                        title="Lien vers la foire aux questions"
                     >
                        {" "}
                        outil de suivi.
                     </Link>
                  </p>
               </div>
            </div>
            {/* 6 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">
                     6. Politiques et Procédures
                  </h2>
                  <p className="mb-2">
                     Pour des informations détaillées sur nos politiques et
                     procédures, veuillez consulter les sections suivantes :
                  </p>
                  <ul className="list-disc text-sm list-inside space-y-1">
                     <li>
                        <Link
                           href="/aide/conditions-generales"
                           className="hover:underline hover:underline-offset-2 font-bold"
                        >
                           Conditions générales
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/aide/RGPD"
                           className="hover:underline hover:underline-offset-2 font-bold"
                        >
                           Traitement des données
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/aide/accessibilite"
                           className="hover:underline hover:underline-offset-2 font-bold"
                        >
                           Accessibilité
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
            {/* 7 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">
                     7. Résolution des Litiges
                  </h2>
                  <p>
                     Si vous rencontrez un problème qui ne peut être résolu par
                     notre équipe de support client, nous vous invitons à
                     utiliser notre procédure de résolution des litiges.
                     Contactez notre service de médiation à :{" "}
                     <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
                        mediation@holydevs.com
                     </span>
                  </p>
               </div>
            </div>
            {/* 8 */}
            <div className="space-y-5">
               <div>
                  <h2 className="font-medium text-xl mb-3">
                     8. Retour d'Expérience
                  </h2>
                  <p>
                     Votre avis est précieux pour nous. Pour nous aider à
                     améliorer nos services, veuillez prendre quelques minutes
                     pour remplir notre
                     <Link
                        href="/aide/conditions-generales"
                        className="hover:underline hover:underline-offset-2 font-bold"
                     >
                        {" "}
                        formulaire de retour d'expérience
                     </Link>
                     .
                  </p>
                  <br />
                  <p>
                     Merci d'utiliser notre site de locations de maisons entre
                     particuliers. Nous sommes déterminés à vous offrir le
                     meilleur service possible et nous apprécions votre
                     confiance. Si vous avez des suggestions ou des commentaires
                     supplémentaires, n'hésitez pas à nous en faire part.
                  </p>
               </div>
            </div>
            <Separator />
            <p>
               Nous espérons que cette page de support client vous fournira
               toutes les informations et l'assistance nécessaires pour une
               expérience de location sans souci.
            </p>
         </div>
      </section>
   );
}
