import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
import AuthRequest from "../interfaces/auth.interface";
const {
  create
} = new ProductService();

export default class ProductController {
    async createProduct(req: Request, res: Response) {

        const product = await create({...req.body, userId: (req as AuthRequest).user._id});

        return res.status(200)
        .send({
            success: true,
            message: "Product created successfully",
            product
        })
    }
}