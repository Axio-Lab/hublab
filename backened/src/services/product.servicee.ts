import IProduct from "../interfaces/product.interface";
import Product from "../models/product.model";

export default class ProductService {
    async create(product: Partial<IProduct>) {
        return await Product.create(product);
    }

    async getProduct(id: string) {
        const product = await Product.findById(id);
        if(!product) throw new Error("Invalid ProductId");
        return product;
    }
}