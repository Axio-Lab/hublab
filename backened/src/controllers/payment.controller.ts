import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import axios from "axios";
const { createCandypaySession, generatePaymentURL } = new PaymentService();

export default class PaymentController {

    async createPayment(req: Request, res: Response) {
        const candypaySession = await createCandypaySession();

        return res.status(200)
            .send({
                success: true,
                message: "Payment session created successfully",
                session: candypaySession
            })
    }

    async createPaymentAPI(req: Request, res: Response) {
        
        const sessionId = await axios.post("https://checkout-api.candypay.fun/api/v1/session", {
            network: "devnet",
            success_url: "https://www.google.com",
            cancel_url: "https://www.jumia.ng",
            tokens: ["bonk"],
            items: [
                {
                    name: "Throwback Hip Bag",
                    price: 0.0001,
                    image: "https://imgur.com/EntGcVQ.png",
                    quantity: 1
                }
            ]
        }, {
            headers: { Authorization: `Bearer ${process.env.CANDYPAY_PUBLIC_API_KEY}` }
        })
        return res.status(200)
            .send({
                success: true,
                message: "Payment sessionId created successfully",
                sessionId
            })
    }

}