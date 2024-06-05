import { model, Schema } from "mongoose";

const payloadSchema = new Schema({
    paymentInfo: {
        type: {
            productId: String,
            session_id: String,
            order_id: String,
            payment_url: String
        },
        required: true
    },
    payload: {
        type: Object,
        required: false
    }
}, {
    versionKey: false
});

const Payload = model("Payload", payloadSchema);
export default Payload;