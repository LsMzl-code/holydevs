export interface PostTypes {
   post: {
      id: string;
      content: string;
      image: string | null;
      createdAt: Date;
      author: {
         id: string;
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
      likes: {
         userId: string;
      }[];
      comments: {
         id: string;
         content: string;
         author: {
            id: string;
            firstname: string | null;
            lastname: string | null;
            username: string | null;
            profilePicture: string | null;
         };
      }[];
   };
   user?: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      profilePicture: string | null;
   };
}
export interface CommentInteractionTypes {
   user?: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      profilePicture: string | null;
   };
   post: {
      id: string;
      content: string;
      image: string | null;
      createdAt: Date;
      author: {
         id: string;
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
      likes: {
         userId: string;
      }[];
      comments: {
         id: string;
      }[];
   };
}

export interface PostUserInteractionTypes {
   user: {
      id: string;
      firstname: string | null;
      profilePicture: string | null;
   };
}
