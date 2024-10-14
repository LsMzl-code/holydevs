// Clerk
import { auth } from "@clerk/nextjs/server";

// Queries
import { getUserByClerkId } from "@/actions/getUserByClerkId";

// Components
import { SocialLeftNav } from "@/components/navigation/SocialLeftNav";
import { SocialRightNav } from "@/components/navigation/SocialRightNav";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SocialLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   
   // Utilisateur connecté
   const { userId } = auth();
   // Non connecté / non inscrit
   if (!userId) redirect('/');


   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         lastname: true,
         username: true,
         email: true,
         profilePicture: true,
         coverPicture: true,
      },
   });
   if (!user) return <p>Vous n'êtes pas connecté</p>;

   // Last members Datas
   const lastUsers = await db.user.findMany({
      orderBy: {
         createdAt: "desc",
      },
      take: 5,
      select: {
         id: true,
         firstname: true,
         lastname: true,
         username: true,
         profilePicture: true,
      },
   });
   if (!lastUsers) return <p>Aucun nouveau membres pour le moment</p>;

   // Friend Requests
   const requests = await db.friendRequest.findMany({
      where: {
         receiverId: user.id,
      },
      take: 5,
      include: {
         sender: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
      },
   });

   return (
      <main className="flex items-start gap-10 xl:gap-5 lg:mx-5 2xl:mx-52 mx-auto mt-5 min-h-screen">
         <div className="max-lg:hidden lg:w-[20%] xl:w-[20%] h-screen">
            <SocialLeftNav user={user} />
         </div>
         <div className="max-lg:mx-2 max-lg:w-[100%] lg:w-[70%] mx-auto">
            {children}
         </div>
         <div className="max-xl:hidden w-[20%] min-h-[500px]">
            <SocialRightNav lastUsers={lastUsers} requests={requests} />
         </div>
      </main>
   );
}
