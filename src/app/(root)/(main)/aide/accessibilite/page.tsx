import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Accessibilité",
   description: "Page d'accueil d'Holydevs",
};

export default function Accessibility() {
   return (
      <section className="mt-5 lg:mt-10 max-w-[1200px] mx-auto px-3 lg:px-0">
         <Breadcrumb />

         <h1 className="text-xl md:text-3xl font-medium my-5">Accessibilité</h1>

         <p>
            Ce site web a été conçu dans l'optique de répondre à un maximum de
            points de la norme WCAG-2.0
         </p>

         <div className="border border-foreground/20 p-3 lg:p-5 rounded-lg mt-10 text-sm">
            <p className="text-xl text-center mb-2 font-medium">
               Retour d'expérience utilisateur
            </p>
            <p>
               Nous mettons tout en œuvre pour accroître l’accessibilité et la
               convivialité de notre site web et sommes donc ouverts aux
               recommandations des utilisateurs.
               <br />
               <br />
               Ainsi, si malgré le soin apporté à l’accessibilité du site, des
               contenus/informations ne vous apparaissent pas correctement ou ne
               vous sont pas accessibles vous pouvez nous joindre en utilisant
               notre formulaire de contact.
            </p>
         </div>

         <div className="my-10">
            <p className="mb-2">
               Cette norme est issue notamment des instances et référentiels
               suivants :
            </p>
            <ul className="list-disc text-sm list-inside space-y-1">
               <li>
                  <span className="font-bold">W3C</span> (World Wide Web
                  Consortium) : organisme de standardisation des normes pour le
                  web, consortium international et indépendant.
               </li>
               <li>
                  <span className="font-bold">WAI</span> (Web Accessibility
                  Initiative) : groupe de travail de la W3C spécialisé sur
                  l’accessibilité.
               </li>
               <li>
                  <span className="font-bold">WCAG 2.0</span> (Web Content
                  Accessibility Guidelines) : ensemble de recommandations pour
                  rendre le web plus accessible.
               </li>
               <li>
                  <span className="font-bold">RGAA 3.0 et Accessiweb</span>{" "}
                  référentiels qui traduisent la norme WCAG 2.0 pour les sites
                  internet du Service public français. Les sites Internet sont
                  dits accessibles quand tous les utilisateurs peuvent consulter
                  l’intégralité des pages et des contenus. Il s’agit donc de
                  rendre le web et ses services accessibles à tous, quels que
                  soient :
               </li>
            </ul>
         </div>

         <div className="my-10">
            <p className="mb-2">les outils et technologies utilisés;</p>
            <ul className="list-disc text-sm list-inside space-y-1">
               <li>les capacités physiques ou mentales des utilisateurs ;</li>
               <li>les conditions d’utilisation et l’environnement ;</li>
               <li>la zone géographique, etc.</li>
            </ul>
         </div>

         <div className="my-10">
            <p className="mb-2">
               Afin d’optimiser l’accessibilité web, l’organisme de
               standardisation W3C regroupe les recommandations en trois
               catégories d’intervention :v
            </p>
            <ul className="list-disc text-sm list-inside space-y-1">
               <li>le design du site web;</li>
               <li>le développement technique de la page web ;</li>
               <li>la rédaction de contenus web.</li>
            </ul>
         </div>

         <div className="grid md:grid-cols-5 md:gap-10">
            {/* Left */}
            <div className="flex flex-col gap-5 col-span-2">
               <div>
                  <h4 className="text-lg font-medium">
                     MENU : affichage permanent des menus de navigation
                  </h4>
                  <p className="text-sm">
                     Le menu principal, situé en haut de page, est affiché en
                     permanence sur toutes les pages du site vous permet d’en
                     atteindre les rubriques principales. Le logo situé en haut
                     de page permet également de revenir à la page d’accueil.
                     <br />
                     <br />
                     Le plan du site est présent en bas de chaque page et permet
                     d’accéder à toutes les rubriques et sous-rubriques du site.
                  </p>
               </div>
               <div>
                  <h4 className="text-lg font-medium">
                     Navigation par tabulation
                  </h4>
                  <p className="text-sm">
                     Il vous est possible de naviguer entre les liens du site ou
                     au cœur d’ une page du site d’un lien à l’autre à l’aide de
                     la touche de tabulation (Appuyez sur Tab et répétez jusqu’à
                     sélectionner le lien désiré, validez par la touche Entrée).
                     Ceci permet de naviguer sans souris.
                  </p>
               </div>
               <div>
                  <h4 className="text-lg font-medium">Fil d’ariane</h4>
                  <p className="text-sm">
                     Le fil d’ariane présent en haut de chaque page interne vous
                     indique le chemin de navigation que vous avez emprunté en
                     situant la page affichée à l’écran et vous permet de
                     remonter dans l’arborescence.
                  </p>
               </div>
               <div>
                  <h4 className="text-lg font-medium">
                     Lien « haut de page » ou « accès rapide »
                  </h4>
                  <p className="text-sm">
                     Le lien « Haut de page » (situé en bas de page à droite et
                     matérialisé par l’icône “flèche haute”) permet, comme son
                     nom et/ou visuel l’indique, de retourner tout en haut de la
                     page en un seul clic.
                  </p>
               </div>
            </div>
            {/* Right */}
            <div className="flex flex-col gap-7 col-span-3">
               <div>
                  <h4 className="text-lg font-medium">Zoom et adaptabilité</h4>
                  <p className="text-sm">
                     Le site a été conçu pour être accessible avec les outils de
                     zoom des navigateurs et est adapté aux différentes tailles
                     d’écran en mode portrait et paysage.
                     <br />
                     La taille de caractère des contenus peut être modifiée dans
                     la plupart des navigateurs. Pour cela utilisez les
                     commandes suivantes :
                  </p>
                  <ul className="list-disc text-sm list-inside space-y-1">
                     <li>Touche « CTRL » et « molette de la souris »</li>
                     <li>
                        Touches « CTRL » et « + » (agrandir la taille du texte)
                        ou « – » (diminuer la taille du texte)
                     </li>
                     <li>Menus du navigateur : Affichage, Taille du texte</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-lg font-medium">Moteur de recherche</h4>
                  <p className="text-sm">
                     Il vous est possible d’effectuer une recherche par mot clé
                     dans le site. Les résultats sont affichés selon la
                     pertinence des mots clés tapés par rapport aux titres et
                     contenus des pages. Les 5 premiers résultats présentés par
                     le moteur sont les résultats les plus susceptibles de
                     répondre à votre recherche.
                  </p>
               </div>
               <div>
                  <h4 className="text-lg font-medium">
                     Liens Hypertextes et médias
                  </h4>
                  <p className="text-sm">
                     Les titres et les images présentés sur le site comportent
                     les balises META Titre et répondent donc aux normes
                     d’accessibilité.
                  </p>
               </div>
               <div>
                  <h4 className="text-lg font-medium">
                     Téléchargement de documents
                  </h4>
                  <p className="text-sm">
                     Vous pourrez éventuellement trouver dans ce site des
                     documents téléchargeables au format PDF. Si vous n’avez pas
                     de logiciel de lecture PDF, nous vous conseillons
                     d’installer « Acrobat Reader ». Vous pouvez également
                     transformer les PDF en format HTML classique en utilisant
                     le moteur de conversion en ligne d’Adobe. Pour cela copiez
                     l’adresse du lien vers le fichier en PDF et collez-la dans
                     le champ prévu à cet effet de l’outil de conversion.
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}
