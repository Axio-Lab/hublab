import { Router } from "express";
import PaymentController from '../controllers/payment.controller';
const router = Router();
const {
    createPayment,
    sendPaymentMail
} = new PaymentController();

//create a payment
router.get("/:productId", createPayment);

//send mail
router.post("/mail", sendPaymentMail);

// //create a payment API
// router.post("/api", createPaymentAPI);

export default router;