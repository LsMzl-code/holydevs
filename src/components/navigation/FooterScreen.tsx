import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/logo/logo.png";
import { Badge } from "../shadcn/badge";
import { Checkbox } from "../shadcn/checkbox";
import {
   EarthIcon,
   FacebookIcon,
   GithubIcon,
   LinkedinIcon,
   MailIcon,
} from "lucide-react";
import { FooterTypes } from "@/types/Footer";

export const FooterScreen = ({ currentUser }: FooterTypes) => {
   return (
      <footer className="w-full border-t bg-card mt-10 text-foreground/60">
         <div className="max-w-[1400px] flex flex-col mx-auto p-5">
            {/* Haut */}
            <div className="flex justify-center items-center gap-20 border-b">
               {/* Left */}
               <div className="flex flex-col gap-4 flex-1">
                  {/* Logo */}
                  <Link
                     href="/"
                     className="text-md "
                     title="Retour à la page d'accueil"
                  >
                     <div className="flex items-center gap-2">
                        <Image
                           src={Logo}
                           width={40}
                           height={40}
                           alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
                           className="hidden sm:block"
                        />
                        <p className="hidden lg:block text-red-500 uppercase font-semibold text-lg">
                           Holydevs
                        </p>
                     </div>
                  </Link>
                  {/* Links */}
                  <div className="grid grid-cols-2 text-sm">
                     <Link
                        href={`/${currentUser?.username}/reservations`}
                        title="Voir mes réservations"
                        className="hover:font-medium hover:underline hover:underline-offset-2"
                     >
                        Réservations
                     </Link>
                     <Link
                        href={`/${currentUser?.username}/annonces`}
                        title="Voir mes annonces"
                        className="hover:font-medium hover:underline hover:underline-offset-2"
                     >
                        Annonces
                     </Link>

                     <Link
                        href={`/${currentUser?.username}`}
                        title="Voir mon profil"
                        className="hover:font-medium hover:underline hover:underline-offset-2"
                     >
                        Profil
                     </Link>
                     <Link
                        href="/posts"
                        title="Réseau social"
                        className="hover:font-medium hover:underline hover:underline-offset-2"
                     >
                        Réseau social
                     </Link>
                     <Link
                        href="/"
                        title="Retour à l'accueil"
                        className="hover:font-medium hover:underline hover:underline-offset-2"
                     >
                        Accueil
                     </Link>
                  </div>
                  {/* Réseaux sociaux */}
                  <div className="flex items-center gap-2 mb-10 mt-6">
                     <a
                        href="https://www.facebook.com/ls.mzl"
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Facebook"
                        target="_blank"
                     >
                        <FacebookIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href="https://github.com/LsMzl"
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Github"
                        target="_blank"
                     >
                        <GithubIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href="https://www.linkedin.com/in/louis-mazzella-5509292a2/"
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="LinkedIn"
                        target="_blank"
                     >
                        <LinkedinIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href=""
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Email"
                     >
                        <MailIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href="https://louismzl.web.app/"
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Portfolio"
                        target="_blank"
                     >
                        <EarthIcon className="group-hover:animate-spin-fast" />
                     </a>
                  </div>
               </div>
               {/* Right */}
               <div className="flex-1">
                  <p className="text-xs font-semibold mb-3">
                     Etre informé des dernières annonces autour de chez moi
                  </p>
                  <form className="space-y-5">
                     <div className="flex items-center">
                        <label className="hidden" htmlFor="newsletter" />
                        <input
                           className="border bg-transparent px-3 py-2 w-full focus:outline-none"
                           type="email"
                           placeholder="Votre email"
                           name="newsletter"
                           id="newsletter"
                        />
                        <button className="border border-l-0 py-2 px-3">
                           Valider
                        </button>
                     </div>
                     <div className="flex items-start gap-2">
                        <label htmlFor="rgpd" />
                        <Checkbox name="rgpd" id="rgpd" />

                        <p className="text-xs">
                           En cochant cette case, vous acceptez que vos données
                           soient conservés.
                        </p>
                     </div>
                  </form>
               </div>
            </div>
            {/* Bas */}
            <div className="flex flex-col gap-3 mt-5 text-xs font-light">
               {/* top */}
               <div>
                  <Link
                     href="/aide/RGPD"
                     className="hover:underline hover:underline-offset-2"
                  >
                     Traitement de données |{" "}
                  </Link>
                  <Link
                     href="/aide/accessibilite"
                     className="hover:underline hover:underline-offset-2"
                  >
                     Accessibilité |{" "}
                  </Link>
                  <Link
                     href="/aide/conditions-generales"
                     className="hover:underline hover:underline-offset-2"
                  >
                     Conditions générales
                  </Link>
               </div>
               {/* Middle */}
               <div>
                  <Link
                     href="/aide"
                     className="hover:underline hover:underline-offset-2"
                  >
                     Centre d'aide |{" "}
                  </Link>
                  <Link
                     href="/aide/support-client"
                     className="hover:underline hover:underline-offset-2"
                  >
                     Support client |{" "}
                  </Link>
                  <Link
                     href=""
                     className="hover:underline hover:underline-offset-2"
                  >
                     Accueil des voyageurs{" "}
                  </Link>
               </div>
               {/* Bottom */}
               <div>
                  <p>
                     ©2024 Holydevs. Ceci est un site factice, ayant été réalisé
                     dans le cadre d'un projet de fin de formation.
                  </p>
                  <Badge
                     variant="outline"
                     className="hover:animate-pulse border-primary/50 mt-2"
                  >
                     <a href="" className="text-primary/80 font-semibold">
                        @LouisMzl
                     </a>
                  </Badge>
               </div>
            </div>
         </div>
      </footer>
   );
};
