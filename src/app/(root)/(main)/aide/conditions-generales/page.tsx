import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
   title: "Conditions de services",
   description: "Page d'accueil d'Holydevs",
};

export default function Conditions() {
   return (
      <div className="mt-5 lg:mt-10 max-w-[1200px] mx-auto px-3 lg:px-0">
         <Breadcrumb/>

         <div className="mt-5">
            <p className="font-medium text-sm">Mentions légales</p>
            <h1 className="text-xl md:text-3xl font-medium">
               Conditions de service
            </h1>
         </div>

         <div className="border border-foreground/20 rounded-lg lg:p-5 p-3 my-5 md:my-10 text-sm space-y-1">
            <p>
               Si votre pays de résidence ou d'établissement se trouve dans
               l'Espace économique européen (« EEE »), en Suisse ou au
               Royaume-Uni, les Conditions de service pour les utilisateurs
               européens s'appliquent à vous.
            </p>
            <p>
               Si votre pays de résidence ou d'établissement se trouve en dehors
               de l'EEE, de la Suisse, de l'Australie et du Royaume-Uni, les
               Conditions de service pour les utilisateurs situés en dehors de
               l'EEE, du Royaume-Uni et de l'Australie s'appliquent à vous.
            </p>
            <p>
               Si votre pays de résidence ou d'établissement est l'Australie,
               les Conditions de service pour les utilisateurs australiens
               s'appliquent à vous.
            </p>
         </div>

         {/* Conditions de service pour les utilisateurs en Europe */}
         <div>
            <h2 className="text-xl font-medium mb-2">
               Conditions de service pour les utilisateurs en Europe
            </h2>
            <p>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem,
               ratione quod. Excepturi sit veniam animi? Alias nam cum nihil
               asperiores quasi voluptatibus harum cupiditate animi officiis,
               sint quis dolorum, enim molestias assumenda dolore deserunt
               quisquam incidunt magnam. Labore, atque iure. Officia eius sunt
               dicta, minus optio qui error nemo quidem! Lorem ipsum dolor sit
               amet, consectetur adipisicing elit. Nam, eveniet.
            </p>
            <p className="my-3 font-semibold">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Laudantium aperiam officiis quae? Voluptas quibusdam tenetur
               modi, aspernatur deserunt amet? Nam maiores facere suscipit
               repellendus necessitatibus.
            </p>
            <p>Dernière mise à jour : 11 juillet 2024</p>
            <p className="my-3">Merci d'utiliser Airbnb !</p>

            <p>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,
               esse pariatur placeat blanditiis sapiente mollitia? Neque, nisi
               quaerat error doloremque molestias, iste necessitatibus dolor
               voluptatum adipisci odio praesentium, ipsa ut natus unde
               molestiae! Alias placeat dicta, pariatur deleniti nostrum debitis
               optio voluptatibus reprehenderit fuga officia non praesentium?
               Cum, corporis minima.
               <br />
               <br />
               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
               Expedita alias aliquam, est autem hic dolores magnam officia
               neque sequi eveniet dignissimos voluptatum ex incidunt facere
               veniam, praesentium sint quas illum eum molestias. Porro deleniti
               tenetur assumenda exercitationem reiciendis enim, repellat fugit
               perferendis officia provident quaerat ducimus amet consequuntur
               nesciunt aliquid, minima in saepe. Unde, quam a iusto sunt vitae
               amet porro? Omnis, quis dolore deserunt repellendus hic beatae
               molestias error. Expedita ea culpa eveniet maxime, vitae debitis
               vero explicabo maiores fugiat, at ducimus! Quos provident id
               magni earum iure sed numquam, animi, maxime quidem autem
               reprehenderit atque. Soluta obcaecati rem quibusdam sed.
               Blanditiis, rerum provident vel, rem perspiciatis voluptatum ea
               ullam, enim quo perferendis fugit illum quaerat optio nesciunt
               ratione nulla inventore officiis mollitia molestiae!
               <br />
               <br />
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
               quasi molestiae dolore possimus odio tenetur nesciunt. Et nostrum
               ab dicta eum esse voluptatum nesciunt consequatur? Lorem ipsum
               dolor sit amet consectetur adipisicing elit. Incidunt temporibus
               eveniet beatae iusto facilis nulla distinctio nam a quam
               pariatur?
            </p>
         </div>

         {/* Contenu pour les utilisateurs européens */}
         <div className="">
            <h2 className="text-xl font-medium my-5 md:my-8">
               Contenu pour les utilisateurs européens
            </h2>

            <div className="mb-10">
               <h3 className="font-bold text-lg mb-2">
                  Conditions relatives aux voyageurs
               </h3>
               <ul className="underline flex flex-col font-medium gap-2 text-sm">
                  <Link href="#EU1">
                     1. Recherche et réservation sur Holydevs
                  </Link>
                  <Link href="#EU2">
                     2. Annulations, problèmes de réservation, remboursements et
                     modifications de réservation
                  </Link>
                  <Link href="#EU3">3. Vos responsabilités</Link>
               </ul>
            </div>

            <div className="mb-10">
               <h3 className="font-bold text-lg mb-2">
                  Conditions relatives aux hôtes
               </h3>
               <ul className="underline flex flex-col font-medium gap-2 text-sm">
                  <Link href="#EU4">4. Accueil de voyageurs avec Holydevs</Link>
                  <Link href="#EU5">5. Gestion de votre annonce</Link>
                  <Link href="#EU6">
                     6. Annulations, problèmes de réservation et modifications
                     de réservation
                  </Link>
                  <Link href="#EU7">7. Taxes et impôts</Link>
               </ul>
            </div>

            <div className="mb-10">
               <h3 className="font-bold text-lg mb-2">
                  Conditions d'application générale
               </h3>
               <ul className="underline flex flex-col font-medium gap-2 text-sm">
                  <Link href="#">8. Commentaires</Link>
                  <Link href="#">9. Contenu</Link>
                  <Link href="#">10. Frais</Link>
                  <Link href="#">11. Règlement de la plateforme Airbnb</Link>
                  <Link href="#">
                     12. Notifications de contenu et modération de contenu
                  </Link>
                  <Link href="#">
                     13. Résiliation, suspension et autres mesures
                  </Link>
                  <Link href="#">
                     14. Système de traitement des réclamations
                  </Link>
                  <Link href="#">
                     15. Modification des présentes Conditions
                  </Link>
               </ul>
            </div>
         </div>

         {/* Conditions relatives aux voyageurs*/}
         <div>
            <h2 className="font-medium text-xl mb-5">
               Conditions relatives aux voyageurs
            </h2>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU1">
                  1. Recherche et réservation sur Holydevs
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU3">
                  3. Vos responsabilités
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU2">
                  2. Annulations, problèmes de réservation, remboursements et
                  modifications de réservation
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
         </div>

         {/* Conditions relatives aux hôtes */}
         <div>
            <h2 className="font-medium text-xl mb-5">
               Conditions relatives aux hôtes
            </h2>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU4">
                  4. Accueil de voyageurs avec Holydevs
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU5">
                  5. Gestion de votre annonce
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU6">
                  6. Annulations, problèmes de réservation et modifications de
                  réservation
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU7">
                  7. Taxes et impôts
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
         </div>

         {/* Conditions d'application générale */}
         <div>
            <h2 className="font-medium text-xl mb-5">
               Conditions d'application générale
            </h2>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU8">
                  8. Commentaires
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU9">
                  9. Contenu
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU10">
                  10. Frais
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>

            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU11">
                  11. Règlement de la plateforme Airbnb
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU12">
                  12. Notifications de contenu et modération de contenu
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU13">
                  13. Résiliation, suspension et autres mesures
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU14">
                  14. Système de traitement des réclamations
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
            <div className="mb-10">
               <h3 className="font-medium text-xl mb-5" id="EU15">
                  15. Modification des présentes Conditions
               </h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt assumenda et dolorem veritatis culpa, consequuntur
                  illo totam quaerat temporibus natus minus hic, cupiditate
                  tempore asperiores sed laboriosam est excepturi blanditiis
                  voluptate. Voluptas magni molestias fuga ipsam fugit soluta
                  non mollitia, similique beatae ea accusantium, omnis maiores
                  doloremque magnam nesciunt cum est aut tempore harum culpa eos
                  debitis. Animi cum sit ratione magnam quo itaque explicabo
                  illo mollitia eaque culpa, harum maiores perferendis quas
                  tenetur quaerat at quasi perspiciatis vero excepturi! Odio,
                  quasi. Molestiae sit ex praesentium repellendus nesciunt
                  officiis quaerat nobis facilis sed error enim aliquid ipsum
                  fugit, amet quos possimus quae ad repellat perferendis
                  explicabo facere deserunt voluptates fuga id. Iste,
                  consequatur deleniti cum velit inventore quas, eaque tempore,
                  iure ipsum sit repellat minus vitae voluptas sint explicabo
                  obcaecati minima cumque eos! Natus, eius quo repudiandae,
                  quidem quasi a blanditiis quos voluptate, voluptatum
                  voluptatem maiores ipsam dignissimos molestias ea.
               </p>
            </div>
         </div>
      </div>
   );
}
