import { Category, Feature, House, Type } from "@prisma/client";

export interface HouseOnboardingTypes {
   house: {
      id: string;
   } | null;
   categories?: Category[];
   features?: Feature[];
   types?: Type[];
}

export interface HouseOnboardingFirstStepTypes {
   house: {
      title: string;
      introduction: string | null;
      description: string;
      country: string;
      state: string;
      city: string;
      address: string;
   };
}
