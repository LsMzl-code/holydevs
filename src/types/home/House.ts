export interface LastHousesTypes {
   houses: {
      id: string;
      country: string;
      image: string | null;
      title: string;
      city: string;
      price: number | null;
   }[];
}
export interface LastHouseCardTypes {
   house: {
      id: string;
      country: string;
      image: string | null;
      title: string;
      city: string;
      price: number | null;
   };
}

export interface HouseListTypes {
   categories: {
      name: string;
      id: string;
   }[];
   types: {
      name: string;
      id: string;
   }[];
   houses: {
      id: string;
      image: string | null;
      title: string;
      city: string;
      state: string;
      country: string;
      price: number | null;
      user: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         id: string;
      };
      categories: {
         category: {
            name: string;
            id: string;
         };
      }[];
      types: {
         type: {
            name: string;
            id: string;
         };
      }[];
      rates: {
         rate: number;
      }[];
   }[];
   user: {
      id: string;
   } | null;
}

export interface HouseCardTypes {
   house: {
      id: string;
      image: string | null;
      title: string;
      city: string;
      country: string;
      price: number | null;
      user: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         id: string;
      };
      categories: {
         category: {
            name: string;
            id: string;
         };
      }[];
      types: {
         type: {
            name: string;
            id: string;
         };
      }[];
      rates: {
         rate: number;
      }[];
   };
   user: {
      id: string;
   } | null;
}

export interface CategoryCarouselTypes {
   categories: {
      name: string;
      id: string;
   }[];
   types: {
      name: string;
      id: string;
   }[];
   
}
