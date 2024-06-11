import IProduct from "../interfaces/product.interface";
import Product from "../models/product.model";

export default class ProductService {
    async create(product: Partial<IProduct>) {
        return await Product.create(product);
    }

    async getProductById(id: string) {
        return await Product.findById(id);
    }

    async getProduct(id: string) {
        const product = await Product.findById(id).populate("userId", ["firstName", "lastName"]);
        if (!product) throw new Error("Invalid ProductId");
        return product;
    }

    async getProducts(query: Partial<IProduct>) {
        const products = await Product.find(query, "name type product sales revenue");
        return products;
    }
}