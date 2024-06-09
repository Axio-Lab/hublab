import { ObjectId } from "mongoose";

export default interface IProduct {
    _id?: string;
    userId: string;
    type: string;
    name: string;
    image: string;
    description: string;
    payAnyPrice?: boolean;
    price?: number;
    nftSelection: {
        address: string;
        name: string;
        imageUrl: string;
    };
    discountAmount?: number;
    category: string;
    quantity: number;
    unlimitedQuantity?: boolean;
    pop: {
        address: string;
        name: string;
        imageUrl: string;
        collectionId: Number;
    };
    purchaseXP: number;
    product: string;
    sales: number;
    revenue: number;
}