import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookHouseStore {
   bookingHouseData: HouseDataType | null;
   paymentIntentId: string | null;
   clientSecret: string | undefined;

   setHouseData: (data: HouseDataType) => void;
   setPaymentIntentId: (paymentIntentId: string) => void;
   setClientSecret: (clientSecret: string) => void;
   resetBookHouse: () => void;
}

type HouseDataType = {
   house: {
      id: string;
      country: string;
      state: string;
      city: string;
      address: string;
      createdAt: Date;
      title: string;
      image?: string | null;
      introduction?: string | null;
      description: string;
      price?: number | null;
      bedroom?: number | null;
      kitchen?: number | null;
      bathroom?: number | null;
      isAvailable: boolean;
      ownerId: string;
      userId: string;
   };
   totalPrice: number;
   startDate: Date;
   endDate: Date;
};

/**
 * Etat global permettant l'accès aux données de réservation ( paiement, prix etc...)
 * et aux fonctions permettant de mettre à jour l'état des réservations.
 */
const useBookHouse = create<BookHouseStore>()(
   persist(
      (set) => ({
         bookingHouseData: null,
         paymentIntentId: null,
         clientSecret: undefined,
         setHouseData: (data: HouseDataType) => {
            set({ bookingHouseData: data });
         },
         setPaymentIntentId: (paymentIntentId: string) => {
            set({ paymentIntentId });
         },
         setClientSecret: (clientSecret: string) => {
            set({ clientSecret });
         },
         resetBookHouse: () => {
            set({
               bookingHouseData: null,
               paymentIntentId: null,
               clientSecret: undefined,
            });
         },
      }),
      {
         // Nom des données dans le local storage
         name: "bookHouse",
      }
   )
);

export default useBookHouse;
