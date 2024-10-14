import { FAQ } from "@/components/legal/FAQ";
import { Separator } from "@/components/shadcn/separator";
import Link from "next/link";
import React from "react";

export default function Help() {
   return (
      <section className="max-w-[1200px] mx-auto">
         <div className="text-center space-y-2">
            <h1 className="text-2xl mt-10 md:text-4xl lg:text-5xl font-semibold">
               Centre d'aide
            </h1>
            <p>Retrouvez l'ensemble des informations dont vous pourriez avoir besoin pour profiter pleinement d'Holydevs.</p>
         </div>
         {/* Main */}
         <div className="md:grid md:grid-cols-5 my-10">
            {/* Navigation */}
            <div className="flex flex-col max-sm:items-center max-sm:pb-5 gap-3 md:border-r col-span-1">
               <Link href="/aide/accessibilite" className="hover:underline hover:underline-offset-2">Accessibilité</Link>
               <Link href="/aide/conditions-generales" className="hover:underline hover:underline-offset-2">
                  Conditions générales
               </Link>
               <Link href="/aide/RGPD" className="hover:underline hover:underline-offset-2">Traitement des données</Link>
               <Link href="/aide/support-client" className="hover:underline hover:underline-offset-2">Support client</Link>
            </div>
            {/* Main */}
            <div className="col-span-4 px-5 space-y-5">
               <div>
                  <h2 className="text-2xl font-semibold">
                     Bienvenue Voyageurs !
                  </h2>
                  <p className="mt-2 my-5">
                     Nous sommes ravis de vous accueillir sur notre site de
                     locations de maisons entre particuliers. Que vous
                     planifiiez une escapade de week-end, des vacances
                     prolongées ou un voyage d'affaires, vous trouverez ici le
                     logement idéal pour répondre à vos besoins. Notre
                     plateforme vous offre une expérience unique et conviviale,
                     avec un large éventail de maisons disponibles dans des
                     destinations variées.
                  </p>
               </div>
               {/* Découvrez Nos Avantages */}
               <div className="space-y-5">
                  <h3 className="text-lg font-medium mb-2">
                     Découvrez Nos Avantages
                  </h3>
                  {/* 1 */}
                  <div>
                     <p className="font-medium">
                        1. Large Sélection de Logements
                     </p>
                     <p>
                        Explorez une vaste gamme de maisons, des charmantes
                        maisons de campagne aux élégantes villas de bord de mer.
                        Chaque logement est unique, offrant un confort et un
                        caractère distincts pour rendre votre séjour
                        inoubliable.
                     </p>
                  </div>
                  {/* 2 */}
                  <div>
                     <p className="font-medium">
                        2. Réservation Simple et Sécurisée
                     </p>
                     <p>
                        Notre processus de réservation est conçu pour être
                        rapide et facile. Grâce à notre système de paiement
                        sécurisé, vous pouvez réserver votre logement en toute
                        confiance.
                     </p>
                  </div>
                  {/* 3 */}
                  <div>
                     <p className="font-medium">3. Expérience Authentique</p>
                     <p>
                        Vivez comme un local ! Nos logements sont situés dans
                        des quartiers authentiques, vous permettant de découvrir
                        la culture et les traditions locales de manière
                        immersive.
                     </p>
                  </div>
                  {/* 4 */}
                  <div>
                     <p className="font-medium">4. Support Client 24/7</p>
                     <p>
                        Notre équipe de support client est disponible 24h/24 et
                        7j/7 pour répondre à vos questions et vous aider en cas
                        de besoin. Vous pouvez nous contacter par chat en
                        direct, email ou téléphone.
                     </p>
                  </div>
                  {/* 5 */}
                  <div>
                     <p className="font-medium">5. Avis et Évaluations</p>
                     <p>
                        Consultez les avis et évaluations laissés par d'autres
                        voyageurs pour vous aider à choisir le logement qui vous
                        convient le mieux. Partagez également votre expérience
                        pour aider les futurs voyageurs.
                     </p>
                  </div>
               </div>
               <Separator />
               {/* Comment Ça Marche */}
               <div className="space-y-5">
                  <h3 className="text-lg font-medium mb-2">
                     Comment Ça Marche
                  </h3>
                  {/* 1 */}
                  <div>
                     <p className="font-medium">1. Rechercher</p>
                     <p>
                        Entrez votre destination, vos dates de voyage et le
                        nombre de personnes pour trouver les maisons
                        disponibles. Utilisez les filtres pour affiner votre
                        recherche selon vos préférences (prix, équipements,
                        etc.).
                     </p>
                  </div>
                  {/* 2 */}
                  <div>
                     <p className="font-medium">2. Choisir</p>
                     <p>
                        Parcourez les résultats de recherche, consultez les
                        photos, lisez les descriptions détaillées et les avis
                        des précédents locataires. Sélectionnez la maison qui
                        répond à vos besoins et à votre budget.
                     </p>
                  </div>
                  {/* 3 */}
                  <div>
                     <p className="font-medium">3. Réserver</p>
                     <p>
                        Cliquez sur "Réserver" pour envoyer une demande de
                        réservation. Une fois votre demande acceptée par le
                        propriétaire, vous recevrez une confirmation et pourrez
                        procéder au paiement sécurisé en ligne.
                     </p>
                  </div>
                  {/* 4 */}
                  <div>
                     <p className="font-medium">4. Profiter</p>
                     <p>
                        Profitez de votre séjour dans une maison confortable et
                        bien équipée. En cas de besoin, notre support client est
                        à votre disposition pour vous assister.
                     </p>
                     <p className="font-medium my-3">
                        Nos Destinations Populaires
                     </p>
                     <ul className="list-disc text-sm list-inside space-y-1">
                        <li>
                           <span className="font-semibold">Paris</span> :
                           Découvrez la Ville Lumière avec ses monuments
                           emblématiques et ses charmants quartiers.
                        </li>
                        <li>
                           <span className="font-semibold">Provence</span> :
                           Profitez du soleil, des paysages pittoresques et des
                           champs de lavande.
                        </li>
                        <li>
                           <span className="font-semibold">Côte d'Azur</span> :
                           Détendez-vous sur les plages méditerranéennes et
                           explorez les villes glamour.
                        </li>
                        <li>
                           <span className="font-semibold">Alpes</span> : Partez
                           à l'aventure dans les montagnes, été comme hiver,
                           pour des activités en plein air.
                        </li>
                     </ul>
                     {/* Inscription & connexion */}
                     <p className="font-medium mt-3">
                        Inscription et Connexion
                     </p>
                     <p className="mt-1 mb-3">
                        Pour profiter pleinement de notre site, créez un compte
                        en quelques clics :
                     </p>
                     <ul className="list-disc text-sm list-inside space-y-1">
                        <li>
                           <span className="font-semibold">Inscription</span> :
                           Fournissez votre nom, adresse email et créez un mot
                           de passe.
                        </li>
                        <li>
                           <span className="font-semibold">Connexion</span> :
                           Accédez à votre compte pour gérer vos réservations,
                           enregistrer vos favoris et bien plus encore.
                        </li>
                     </ul>
                     {/* Rejoignez Notre Communauté */}
                     <p className="font-medium mt-3">
                        Rejoignez Notre Communauté
                     </p>
                     <p className="mt-1 mb-3">
                        Rejoignez notre communauté de voyageurs et de
                        propriétaires en suivant nos réseaux sociaux. Partagez
                        vos expériences, trouvez de l'inspiration pour vos
                        futurs voyages et restez informé des dernières offres et
                        nouveautés.
                     </p>
                     <ul className="list-disc text-sm list-inside space-y-1">
                        <li>
                           <a href="#" className="font-bold">
                              Facebook
                           </a>
                        </li>
                        <li>
                           <a href="#" className="font-bold">
                              Instagram
                           </a>
                        </li>
                        <li>
                           <a href="#" className="font-bold">
                              Twitter
                           </a>
                        </li>
                     </ul>
                     {/* Besoin d'aide ? */}
                     <p className="font-medium mt-3">Besoin d'aide ?</p>
                     <p className="mt-1 mb-5">
                        Visitez notre Centre d'Aidepour trouver des réponses aux
                        questions fréquentes, des guides d'utilisation et des
                        conseils pratiques. Vous pouvez également contacter
                        notre support client via le Formulaire de Contact.
                     </p>

                     <Separator />
                     <p className="my-5">
                        Nous espérons que vous trouverez la maison parfaite pour
                        votre prochain voyage et que vous vivrez une expérience
                        mémorable. Merci de choisir notre site de locations de
                        maisons entre particuliers pour vos aventures. Bon
                        voyage !
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <FAQ />
      </section>
   );
}
