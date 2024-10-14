export interface PublicationsSideNavTypes {
   user: {
      id: string;
      firstname: string | null;
      username: string | null;
      profilePicture: string | null;
      biography: string | null;
      languages: string | null;
      interests: string | null;
      houses: {
         id: string;
         image: string | null;
         title: string;
         price: number | null;
      }[];
      opinions: {
         id: string;
      }[];
      followers: {
         id: string;
         follower: {
            id: string;
            firstname: string | null;
            lastname: string | null;
            username: string | null;
            profilePicture: string | null;
         };
      }[];
      followings: {
         id: string;
         following: {
            id: string;
            firstname: string | null;
            lastname: string | null;
            username: string | null;
            profilePicture: string | null;
         };
      }[];
   };
}

export interface SocialLeftNavTypes {
   user: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      email: string;
      profilePicture: string | null;
      coverPicture: string | null;
   };
}

export interface SocialRightNavTypes {
   lastUsers: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      profilePicture: string | null;
   }[];
   requests: {
      id: string;
      sender: {
         id: string;
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
}

export interface FriendSideNavTypes {
   user: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      profilePicture: string | null;
      biography: string | null;
      languages: string | null;
      interests: string | null;
      houses: {
         id: string;
         image: string | null;
         title: string;
         price: number | null;
      }[];
      opinions: {
         id: string;
      }[];
      followers: {
         id: string;
         follower: {
            id: string;
            firstname: string | null;
            lastname: string | null;
            username: string | null;
            profilePicture: string | null;
         };
      }[];
      followings: {
         id: string;
         following: {
            id: string;
            firstname: string | null;
            lastname: string | null;
            username: string | null;
            profilePicture: string | null;
         };
      }[];
   };
}
