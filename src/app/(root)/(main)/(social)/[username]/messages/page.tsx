import { Chat } from "@/components/social/message/chat/Chat";
import { List } from "@/components/social/message/list/List";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Messagerie",
   description: "Page de messagerie utilisateur",
};

export default async function Messenger({
   params,
}: {
   params: { username: string };
}) {
   const { userId } = auth();
   if (!userId) return;
   const user = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
      },
   });
   if (!user) return;

   // All user discussions
   const allDiscussions = await db.discussion.findMany({
      where: {
         OR: [
            {
               ownerId: {
                  contains: user.id,
               },
            },
            {
               friendId: {
                  contains: user.id,
               },
            },
         ],
      },
      select: {
         id: true,
         createdAt: true,
         ownerId: true,
         friendId: true,
         owner: {
            select: {
               id: true,
               username: true,
               firstname: true,
               lastname: true,
               profilePicture: true,
            },
         },
         friend: {
            select: {
               id: true,
               username: true,
               firstname: true,
               lastname: true,
               profilePicture: true,
            },
         },
      },
   });


   //? Messages in current discussion
   const messages = await db.message.findMany({
      orderBy: {
         sendAt: "asc",
      },
      select: {
         id: true,
         discussionId: true,
         content: true,
         sendAt: true,
         receiver: {
            select: {
               id: true,
               username: true,
               firstname: true,
               lastname: true,
               profilePicture: true,
            },
         },
         sender: {
            select: {
               id: true,
               username: true,
               firstname: true,
               lastname: true,
               profilePicture: true,
            },
         },
      },
   });

   return (
      <div className="flex flex-col gap-2">
         <List allDiscussions={allDiscussions} user={user} />
         <Chat
            allDiscussions={allDiscussions}
            messages={messages}
            connectedUser={user}
         />
      </div>
   );
}
