import { Router } from "express";
import PaymentController from '../controllers/payment.controller';
const router = Router();
const {
    createPayment,
    createPaymentAPI
} = new PaymentController();

//create a payment
router.post("/", createPayment);

//create a payment API
router.post("/api", createPaymentAPI);

export default router;