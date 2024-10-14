import { Metadata } from "next";

/**
 * Generate dynamic Metadata
 * @param name Name of the route 
 * @param param1 Dynamic params
 * @returns 
 */
export const generateMetadata = (name: string, { params }: any): Metadata => {
   return {
      title: `${name} ${params}`,
   };
};
