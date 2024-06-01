export default interface IProduct {
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
    };
    purchaseXP: number;
    product: string;
}