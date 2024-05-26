export default interface IProduct {
    type: string;
    name: string;
    image: string;
    description: string;
    payAnyPrice?: boolean;
    price?: number;
    nftBasedDiscount?: boolean;
    enableNftSelection?: boolean;
    nftSelection?: {
        address?: string;
        name?: string;
        imageUrl?: string;
    };
    discountAmount?: number;
    category: string;
    quantity: number;
    unlimitedQuantity?: boolean;
    pop: string;
    purchaseXP: number;
    product: string;
}