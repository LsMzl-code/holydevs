export interface UpdateProfileTypes {
   biography: string;
   avatar: string;
   email: string;
   coverPicture: string;
   createdAt: Date | undefined;
   languages: string;
   interests: string;
}

export interface UpdateBiographyTypes {
   biography: string;
}
export interface UpdateAvatarTypes {
   avatar: string;
}
export interface UpdateLanguagesTypes {
   languages: string;
}
export interface UpdateInterestsTypes {
   interests: string;
}
