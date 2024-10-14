import { User } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export interface NotFoundTypes {
    label: string;
    icon: LucideIcon;
    href: string;
    user?: User
 }[]
 