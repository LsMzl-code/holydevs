import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Traitement des données",
   description: "Page d'accueil d'Holydevs",
};

export default function RGPD() {
   return (
      <section className="mt-5 lg:mt-10 max-w-[1200px] mx-auto px-3 lg:px-0">
         <Breadcrumb />

         <h1 className="text-xl md:text-3xl font-medium my-5">
            Politique de Traitement des Données et Conformité au RGPD
         </h1>
         <p>
            Bienvenue sur Holydevs, site de location de logement entre
            particuliers. La protection de vos données personnelles est une
            priorité pour nous. Cette page décrit comment nous collectons,
            utilisons, stockons et protégeons vos informations, tout en
            respectant les exigences du Règlement Général sur la Protection des
            Données (RGPD).
         </p>

         <div className="border border-foreground/20 p-3 lg:p-5 rounded-lg mt-10 text-sm">
            <p className="text-center mb-2 font-medium">
               Cette politique de traitement des données et de conformité au
               RGPD est susceptible d'être mise à jour régulièrement pour
               refléter les changements législatifs ou les améliorations de nos
               services. Nous vous invitons à consulter cette page
               périodiquement pour rester informé(e) des éventuelles
               modifications.
            </p>
         </div>
         <div className="my-10 space-y-10">
            {/* 1 */}
            <div>
               <h2 className="font-medium text-xl mb-3">
                  1. Collecte des Données
               </h2>
               <p className="mb-2">
                  Nous collectons les données suivantes lorsque vous utilisez
                  notre site :
               </p>
               <ul className="list-disc text-sm list-inside space-y-1">
                  <li>
                     <span className="font-semibold">
                        Informations d'identification
                     </span>{" "}
                     : nom, prénom, adresse email, numéro de téléphone.
                  </li>
                  <li>
                     <span className="font-semibold">
                        Données de transaction
                     </span>{" "}
                     : informations sur les réservations, paiements, et
                     historiques de location.
                  </li>
                  <li>
                     <span className="font-semibold">
                        Données de navigation
                     </span>{" "}
                     : adresse IP, cookies, logs de connexion, pages visitées.
                  </li>
               </ul>
            </div>
            {/* 2 */}
            <div>
               <h2 className="font-medium text-xl mb-3">
                  2. Utilisation des Données
               </h2>
               <p className="mb-2">
                  Les données collectées sont utilisées pour :
               </p>
               <ul className="list-disc text-sm list-inside space-y-1">
                  <li>
                     <span className="font-semibold">
                        Gérer vos réservations
                     </span>{" "}
                     : traitement des réservations et communications
                     nécessaires.
                  </li>
                  <li>
                     <span className="font-semibold">
                        Améliorer nos services
                     </span>{" "}
                     : analyser les tendances d'utilisation pour optimiser nos
                     fonctionnalités.
                  </li>
                  <li>
                     <span className="font-semibold">Sécurité</span> : prévenir
                     la fraude et assurer la sécurité des transactions.
                  </li>
                  <li>
                     <span className="font-semibold">Marketing</span> : avec
                     votre consentement, vous envoyer des offres et des
                     newsletters.
                  </li>
               </ul>
            </div>
            {/* 3 */}
            <div>
               <h2 className="font-medium text-xl mb-3">
                  3. Base Légale du Traitement
               </h2>
               <p className="mb-2">
                  Le traitement de vos données repose sur les bases légales
                  suivantes :
               </p>
               <ul className="list-disc text-sm list-inside space-y-1">
                  <li>
                     <span className="font-semibold">Consentement</span> : pour
                     les activités de marketing et l'utilisation de cookies non
                     essentiels.
                  </li>
                  <li>
                     <span className="font-semibold">
                        Exécution d’un contrat
                     </span>{" "}
                     : pour la gestion des réservations et des paiements.
                  </li>
                  <li>
                     <span className="font-semibold">Intérêt légitime</span> :
                     pour la sécurité, l'amélioration du service et les
                     communications nécessaires.
                  </li>
               </ul>
            </div>
            {/* 4 */}
            <div>
               <h2 className="font-medium text-xl mb-3">
                  4. Partage des Données
               </h2>
               <p className="mb-2">Nous pouvons partager vos données avec :</p>
               <ul className="list-disc text-sm list-inside space-y-1">
                  <li>
                     <span className="font-semibold">
                        Prestataires de services
                     </span>{" "}
                     : pour le traitement des paiements, l'hébergement de
                     données, et le support client.
                  </li>
                  <li>
                     <span className="font-semibold">Autorités légales</span> :
                     si requis par la loi ou pour protéger nos droits.
                  </li>
               </ul>
            </div>
            {/* 5 */}
            <div>
               <h2 className="font-medium text-xl mb-3">
                  5. Protection des Données
               </h2>
               <p className="mb-2">
                  Nous mettons en œuvre des mesures de sécurité appropriées pour
                  protéger vos données contre l'accès non autorisé, la perte, la
                  destruction ou l'altération. Cela inclut l'utilisation de
                  technologies de chiffrement, de pare-feu et de contrôles
                  d'accès stricts.
               </p>
            </div>
            {/* 6 */}
            <div>
               <h2 className="font-medium text-xl mb-3">
                  6. Conservation des Données
               </h2>
               <p className="mb-2">
                  Vos données personnelles sont conservées aussi longtemps que
                  nécessaire pour les finalités décrites dans cette politique,
                  ou pour se conformer à des obligations légales. Les données de
                  navigation sont conservées pendant une durée maximale de 12
                  mois.
               </p>
            </div>
            {/* 7 */}
            <div>
               <h2 className="font-medium text-xl mb-3">7. Vos Droits</h2>
               <p className="mb-2">
                  En vertu du RGPD, vous disposez des droits suivants :
               </p>
               <ul className="list-disc text-sm list-inside space-y-1">
                  <li>
                     <span className="font-semibold">Accès</span> : vous pouvez
                     demander l'accès à vos données personnelles.
                  </li>
                  <li>
                     <span className="font-semibold">Rectification</span> : vous
                     pouvez demander la correction de données inexactes ou
                     incomplètes.
                  </li>
                  <li>
                     <span className="font-semibold">Suppression </span> : vous
                     pouvez demander la suppression de vos données dans
                     certaines conditions.
                  </li>
                  <li>
                     <span className="font-semibold">Limitation </span> : vous
                     pouvez demander la limitation du traitement de vos données.
                  </li>
                  <li>
                     <span className="font-semibold">Portabilité </span> : vous
                     pouvez recevoir vos données dans un format structuré et
                     lisible par machine.
                  </li>
                  <li>
                     <span className="font-semibold">Opposition </span> : vous
                     pouvez vous opposer au traitement de vos données pour des
                     motifs légitimes.
                  </li>
               </ul>
            </div>
            {/* 8 */}
            <div>
               <h2 className="font-medium text-xl mb-3">8. Cookies</h2>
               <p className="mb-2">
                  Notre site utilise des cookies pour améliorer votre expérience
                  utilisateur. Vous pouvez gérer vos préférences en matière de
                  cookies via les paramètres de votre navigateur. Pour plus de
                  détails, veuillez consulter notre [Politique de Cookies](lien
                  vers la politique de cookies).
               </p>
            </div>
            {/* 9 */}
            <div>
               <h2 className="font-medium text-xl mb-3">9. Contact</h2>
               <p className="mb-2">
                  Pour exercer vos droits ou pour toute question concernant
                  cette politique de traitement des données, vous pouvez nous
                  contacter à l'adresse suivante :
               </p>
            </div>
            <div>
               <p>
                  <span className="font-semibold">Email</span> :
                  support@holydevs.com
               </p>
               <p>
                  <span className="font-semibold">Adresse postale</span> :
                  [Adresse de l'entreprise]
               </p>
            </div>
            <div className="space-y-3">
               <p>
                  Nous nous engageons à répondre à vos demandes dans les
                  meilleurs délais et à vous fournir toute l'assistance
                  nécessaire pour la gestion de vos données personnelles.
               </p>
               <p>Merci de votre confiance.</p>
            </div>
         </div>
      </section>
   );
}
