export interface PublicationsPageType {
   currentUser: {
      id: string;
      firstname: string | null;
      profilePicture: string | null;
   };
}

export interface FriendsPageType {
   followers: {
      id: string;
      follower: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
   followings: {
      following: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
}

export interface ProfileHouseCardTypes {
   house: {
      id: string;
      image: string | null;
      title: string;
      price: number | null;
      description: string;
      country: string;
      city: string;
      types: {
         type: {
            name: string;
         };
      }[];
      categories: {
         category: {
            name: string;
         };
      }[];
      Opinions: {
         id: string;
      }[];
   };
}
