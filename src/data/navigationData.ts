import { MainSideNavData } from "@/types/MainSideNav";
import { Calendar } from "lucide-react";

export const sideNavLinks: MainSideNavData[] = [
    {
       title: "Mes annonces",
       logo: '/public/icon/house.png',
       variant: "ghost",
       href: "/mes-annonces",
    },
    {
       title: "Réservations",
       logo: '/public/icon/booking.png',
       variant: "ghost",
       href: "/mes-reservations",
    },
    {
       title: "Favoris",
       logo: '/public/icon/favourite.png',
       variant: "ghost",
       href: "/mes-reservations",
    },
   //  {
   //     title: "Favoris",
   //     logo: Calendar,
   //     variant: "ghost",
   //     href: "/mes-reservations",
   //  },
];

export const topNavLinks = []