// Clerk
import { auth } from "@clerk/nextjs/server";

// Database
import { db } from "@/lib/prisma";

// Icons
import { CameraIcon, Eye } from "lucide-react";

// React / Next
import Link from "next/link";
import Image from "next/image";

// Components
import SettingsMenu from "@/components/user/profile/SettingsMenu";
import UpdateProfileForm from "@/components/user/profile/UpdateProfileForm";

// UI Components
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shadcn/badge";
import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import { Button, buttonVariants } from "@/components/shadcn/button";

// Images
import Banner from "../../../../../../public/img/banniere.jpg";
import { UserTabs } from "@/components/navigation/components/UserTabs";
import House from "../../../../../../public/icon/house.png";

export default async function MainLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
   });
   if (!user) return <h1>Vous n'êtes pas connecté</h1>;

   return (
      <main className="flex flex-col items-center gap-5">
         {/* Haut de la page */}
         <div className="bg-gradient-to-b from-gray-500 to-background w-full border-b pb-5">
            <div className="w-full max-w-[1200px] mx-auto">
               {/* Cover picture & informations */}
               <section>
                  {/* Cover picture */}
                  <div className="h-[200px] lg:h-[400px] relative group">
                     <Image
                        src={user?.coverPicture ? user?.coverPicture : Banner}
                        fill
                        className="object-cover rounded-b-md"
                        alt=""
                        sizes="100%"
                        priority
                     />
                     <Button className="absolute z-10 items-center gap-2 right-1 bottom-1 hidden group-hover:flex">
                        <CameraIcon size={20} />
                        Changer de photo
                     </Button>
                  </div>

                  <div className="flex justify-between items-start mx-2 md:mx-10 h-16 md:h-20 2xl:h-28 md:mb-2">
                     <div className="flex items-end relative -top-10 gap-2 ">
                        {/* Avatar */}
                        <Avatar className="bg-gradient-to-b from-purple-800 via-pink-500 to-indigo-400 w-24 h-24 2xl:w-[140px] 2xl:h-[140px] shadow">
                           <AvatarImage
                              className="object-cover rounded-full w-[88px] h-[88px]  2xl:w-[132px] 2xl:h-[132px] absolute bottom-1 right-1"
                              src={
                                 user?.profilePicture
                                    ? user?.profilePicture
                                    : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.email}`
                              }
                           />
                        </Avatar>
                        {/* Name, Hashtag */}
                        <div className="flex flex-col items-start pb-2 2xl:pb-6">
                           <div className="flex items-center gap-2">
                              <p className="font-semibold text-xl 2xl:text-3xl capitalize">
                                 {user?.firstname} {user?.lastname}
                              </p>
                              {user?.isOwner && (
                                 <Badge variant="success">Propriétaire</Badge>
                              )}
                           </div>
                           <p className="text-xs 2xl:text-md">
                              @{user?.username}
                           </p>
                        </div>
                     </div>

                     {/* Menu Buttons Screen */}
                     <div className=" mt-2 items-center gap-2 hidden md:flex ">
                        <Link
                           href={`/${user.username}/annonces`}
                           className={cn(
                              buttonVariants(),
                              "flex gap-1 font-semibold"
                           )}
                           title="Annonces utilisateur"
                        >
                           <Image
                              src={House}
                              alt="Envoyer un message"
                              width={20}
                              height={20}
                              className="w-5 h-5 mr-1"
                           />
                           Annonces
                        </Link>

                        <UpdateProfileForm
                           biography={user?.biography ?? ""}
                           avatar={user?.profilePicture ?? ""}
                           email={user?.email ?? ""}
                           coverPicture={user?.coverPicture ?? ""}
                           createdAt={user?.createdAt}
                           languages={user?.languages ?? ""}
                           interests={user?.interests ?? ""}
                        />

                        <SettingsMenu
                           firstname={user?.firstname ?? ""}
                           lastname={user?.lastname ?? ""}
                           country={user?.country ?? ""}
                           state={user?.state ?? ""}
                           city={user?.city ?? ""}
                           address={user?.address ?? ""}
                           email={user?.email ?? ""}
                           phone={user?.phone ?? ""}
                        />
                     </div>
                  </div>
                  {/* Menu Buttons Mobile */}
                  <div className="items-center flex justify-between mx-2 md:hidden pb-5">
                     <Link
                        href="/mes-annonces"
                        className={cn(
                           buttonVariants(),
                           "flex gap-1 font-semibold"
                        )}
                        title="Annonces utilisateur"
                     >
                        <Image
                           src={House}
                           alt="Envoyer un message"
                           width={20}
                           height={20}
                           className="w-5 h-5 mr-1"
                        />
                        Annonces
                     </Link>
                     <div className="flex items-center gap-2">
                        <UpdateProfileForm
                           biography={user?.biography ?? ""}
                           avatar={user?.profilePicture ?? ""}
                           email={user?.email ?? ""}
                           coverPicture={user?.coverPicture ?? ""}
                           createdAt={user?.createdAt}
                           languages={user?.languages ?? ""}
                           interests={user?.interests ?? ""}
                        />
                        <SettingsMenu
                           firstname={user?.firstname ?? ""}
                           lastname={user?.lastname ?? ""}
                           country={user?.country ?? ""}
                           state={user?.state ?? ""}
                           city={user?.city ?? ""}
                           address={user?.address ?? ""}
                           email={user?.email ?? ""}
                           phone={user?.phone ?? ""}
                        />
                     </div>
                  </div>
                  {/* Tabs/Onglets */}
                  <UserTabs user={user} />
               </section>
            </div>
         </div>
         {/* Bas de la page */}
         <div className="max-w-[1200px] w-full">{children}</div>
      </main>
   );
}
