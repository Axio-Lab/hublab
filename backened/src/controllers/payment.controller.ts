import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import axios from "axios";
import ProductService from "../services/product.servicee";
const { getProduct } = new ProductService();
const { createCandypaySession } = new PaymentService();

export default class PaymentController {

    async createPayment(req: Request, res: Response) {
        try {
            const productId = req.params.productId;
            const product = await getProduct(productId);
            const candypaySession = await createCandypaySession(product!);

            return res.status(200)
                .send({
                    success: true,
                    message: "Payment session url returned successfully",
                    data: candypaySession.payment_url
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while creating a candy pay session\nError: ${error.message}`
                })
        }
    }

}