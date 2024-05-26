"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_service_1 = __importDefault(require("../services/payment.service"));
const axios_1 = __importDefault(require("axios"));
const { createCandypaySession, generatePaymentURL } = new payment_service_1.default();
class PaymentController {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candypaySession = yield createCandypaySession();
            return res.status(200)
                .send({
                success: true,
                message: "Payment session created successfully",
                session: candypaySession
            });
        });
    }
    createPaymentAPI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = yield axios_1.default.post("https://checkout-api.candypay.fun/api/v1/session", {
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
            });
            return res.status(200)
                .send({
                success: true,
                message: "Payment sessionId created successfully",
                sessionId
            });
        });
    }
}
exports.default = PaymentController;
