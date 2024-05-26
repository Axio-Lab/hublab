import candypay from "../configs/candypay.config";

export default class PaymentService {

    async createCandypaySession() {
        return await candypay.session.create({
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
            ],
            metadata: {
                customer_name: "Jon Doe",
            }  // optional 
        });
    }

    async generatePaymentURL(session_id: string) {
        return candypay.session.generatePaymentURL({
            session_id,
        });
    }

}