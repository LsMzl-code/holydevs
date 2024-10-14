'use client'
import { UserInfo } from "./userInfo/UserInfo";
import { ChatList } from "./chatList/ChatList";

interface ListProps {
   allDiscussions: {
      id: string;
      createdAt: Date;
      ownerId: string;
      friendId: string;
      owner: {
         id: string;
         username: string | null;
         firstname: string | null;
         lastname: string | null;
         profilePicture: string | null;
      },
      friend: {
         id: string;
         username: string | null;
         firstname: string | null;
         lastname: string | null;
         profilePicture: string | null;
      }
   }[];
   user: {
      id: string;
   }
}

export const List: React.FC<ListProps> = ({ allDiscussions, user }) => {

   return (
      <div className="bg-card rounded-lg flex items-center justify-between">
         <UserInfo allDiscussions={allDiscussions} user={user}/>
         {/* <ChatList /> */}
      </div>
   );
};
