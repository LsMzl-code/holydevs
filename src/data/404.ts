import { NotFoundTypes } from "@/types/404";
import { Home, LayoutGrid, User } from "lucide-react";

export const NotFoundLinks: NotFoundTypes[] = [
    {
        label: "Accueil",
        icon: Home,
        href: "/"
    },
    {
        label: "Réseau social",
        icon: LayoutGrid,
        href: "/posts"
    },
    // {
    //     label: "Profil",
    //     icon: User,
    //     href: `/profil/${user.username}`
    // },
]