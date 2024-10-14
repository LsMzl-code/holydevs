export interface HouseBookingTypes {
   user: {
      username: string | null;
   };
}

export interface ReservationCardTypes {
   house: {
      image: string | null;
      title: string;
      city: string;
      country: string;
      bookings: {
         bookedAt: Date;
         userName: string;
         totalPrice: number;
         paymentStatus: boolean;
         startDate: Date;
         endDate: Date;
         houseId: string | null;
         userId: string;
      }[];
   };
}
