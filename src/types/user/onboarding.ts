
export interface UserOnboardingTypes {
   user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      username: string | null;
      email?: string | null;
      phone?: string | null;
      image?: string | null;
   };
}
