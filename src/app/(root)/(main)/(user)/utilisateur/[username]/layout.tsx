// Clerk
import { auth } from "@clerk/nextjs/server";

// Database
import { db } from "@/lib/prisma";

// React / Next
import Link from "next/link";
import Image from "next/image";

// UI Components
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shadcn/badge";
import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import { buttonVariants } from "@/components/shadcn/button";

// Images
import Banner from "../../../../../../../public/img/banniere.jpg";
import Message from "../../../../../../../public/icon/comments.png";
import House from "../../../../../../../public/icon/house.png";

// Queries
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { BlockAndFollowInteraction } from "@/components/social/BlockAndFollowInteraction";
import { redirect } from "next/navigation";

interface ProfilPageProps {
   params: {
      username: string;
   };
   children: React.ReactNode;
}

export default async function FriendLayout({
   params,
   children,
}: ProfilPageProps) {
   /** Utilisateur du profil */
   const user = await db.user.findUnique({
      where: {
         username: params.username,
      },
      include: {
         houses: true,
         opinions: {
            select: {
               id: true,
            },
         },
      },
   });
   if (!user) redirect("/utilisateurs");

   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return <p>Vous n'êtes pas connecté</p>;

   const currentUser = await getUserByClerkId(userId);
   if (!currentUser) return null;

   // Blocage utilisateur
   let isUserBlocked: boolean = false;
   // Amis ?
   let isFollowing: boolean = false;
   // Demande d'amis envoyée ?
   let isFollowingRequestSent: boolean = false;

   if (userId) {
      // Blocage utilisateur
      const blockResponse = await db.block.findFirst({
         where: {
            // Utilisateur qui bloque (utilisateur connecté)
            blockerId: currentUser.id,
            // Utilisateur bloqué (utilisateur du profil visité)
            blockedId: user.id,
         },
      });
      blockResponse ? (isUserBlocked = true) : (isUserBlocked = false);

      // Amis ?
      const followingResponse = await db.friend.findFirst({
         where: {
            followerId: currentUser.id,
            followingId: user.id,
         },
      });
      followingResponse ? (isFollowing = true) : (isFollowing = false);

      // Demande d'amis envoyée ?
      const followingRequestResponse = await db.friendRequest.findFirst({
         where: {
            senderId: currentUser.id,
            receiverId: user.id,
         },
      });
      followingRequestResponse
         ? (isFollowingRequestSent = true)
         : (isFollowingRequestSent = false);
   }

   return (
      <main className="flex flex-col items-center gap-5">
         {/* Haut de la page */}
         <div className="bg-gradient-to-b from-gray-500 to-background w-full border-b pb-5">
            <div className="w-full max-w-[1200px] mx-auto">
               {/* Cover picture & informations */}
               <section>
                  {/* Cover picture */}
                  <div className="h-[200px] lg:h-[400px] relative">
                     <Image
                        src={user?.coverPicture ? user?.coverPicture : Banner}
                        fill
                        className="object-cover rounded-b-md"
                        alt=""
                        sizes="100%"
                        priority
                     />
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
                                    : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
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

                     {/* Menu Buttons Screen / Affichage seulement si connecté */}
                     {currentUser && (
                        <div className=" mt-2 items-center gap-2 hidden md:flex ">
                           <Link
                              href={`/utilisateur/${user.username}/annonces`}
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

                           <Link
                              href={`/${currentUser.username}/messages`}
                              title="Envoyer un message"
                              className={cn(
                                 buttonVariants({ variant: "secondary" })
                              )}
                           >
                              <Image
                                 src={Message}
                                 alt="Envoyer un message"
                                 width={20}
                                 height={20}
                                 className="w-6 h-6 mr-1"
                              />
                              Contacter
                           </Link>

                           <BlockAndFollowInteraction
                              currentUserId={currentUser.id}
                              userId={user.id}
                              isUserBlocked={isUserBlocked}
                              isFollowing={isFollowing}
                              isFollowingRequestSent={isFollowingRequestSent}
                           />
                        </div>
                     )}
                  </div>

                  {/* Menu Buttons Mobile / Affichage seulement si connecté */}
                  {currentUser && (
                     <div className="items-center flex justify-between mx-2 md:hidden pb-5">
                        <Link
                           href={`/utilisateur/${user.username}/annonces`}
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
                           <Link
                              href={`${currentUser.username}/messages`}
                              title="Envoyer un message"
                              className={cn(
                                 buttonVariants({ variant: "secondary" })
                              )}
                           >
                              <Image
                                 src={Message}
                                 alt="Envoyer un message"
                                 width={20}
                                 height={20}
                                 className="w-6 h-6"
                              />
                           </Link>

                           <BlockAndFollowInteraction
                              currentUserId={currentUser.id}
                              userId={user.id}
                              isUserBlocked={isUserBlocked}
                              isFollowing={isFollowing}
                              isFollowingRequestSent={isFollowingRequestSent}
                           />
                        </div>
                     </div>
                  )}

                  {/* Tabs/Onglets */}
                  <div className="md:mx-10">
                     <ul className="flex items-center gap-2">
                        <li>
                           <Link
                              href={`/utilisateur/${user.username}`}
                              className={cn(
                                 buttonVariants({ variant: "ghost" })
                              )}
                              title="Page des publications utilisateur"
                           >
                              Publications
                           </Link>
                        </li>
                        <li>
                           <Link
                              href={`/utilisateur/${user.username}/amis`}
                              className={cn(
                                 buttonVariants({ variant: "ghost" })
                              )}
                              title="Page des amis utilisateur"
                           >
                              Amis
                           </Link>
                        </li>
                     </ul>
                  </div>
               </section>
            </div>
         </div>
         {/* Bas de la page */}
         <div className="max-w-[1400px] w-full">{children}</div>
      </main>
   );
}
