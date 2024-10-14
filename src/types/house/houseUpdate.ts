import { Category, Feature, Type } from "@prisma/client";

export interface HouseUpdateFormTypes {
    house :{
        id: string;
        country: string;
        state: string;
        city: string;
        address: string;
        title: string;
        image: string | null;
        introduction: string | null;
        description: string;
        price: number | null;
        bedroom: number | null;
        kitchen: number | null;
        bathroom: number | null;
        isAvailable: boolean;
        categories: {
            category: {
                id: string;
                name: string
            }
        }[];
        types: {
            type: {
                id: string;
                name: string
            }
        }[];
        features: {
            feature: {
                id: string;
                name: string
            }
        }[];

    }
    categories: Category[];
    types: Type[]
    features: Feature[]
}


