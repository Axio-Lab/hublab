import candypay from "../configs/candypay.config";
import IProduct from "../interfaces/product.interface";

export default class PaymentService {

    async createCandypaySession(product: IProduct) {
        return await candypay.session.create({
            success_url: "https://www.google.com",
            cancel_url: "https://www.jumia.ng",
            tokens: ["bonk"],
            items: [
                {
                    name: product.name,
                    price: product.price || 20,
                    image: product.product,
                    quantity: 1
                }
            ],
            discounts: {
                collection_id: product.nftSelection.address,
                discount: (product.discountAmount || 0) / 100,
                name: product.nftSelection.name,
                image: product.nftSelection.imageUrl,
            },
        });
    }
}