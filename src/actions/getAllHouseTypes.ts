import { db } from "@/lib/prisma";


export const getAllHouseTypes = async () => {
   try {
     const houseTypes = db.type.findMany()
     return houseTypes;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
