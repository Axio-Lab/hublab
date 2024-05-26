import { model, Schema } from "mongoose";
import { DATABASES } from "../configs/constants.configs";
import IProduct from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>({
    type: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    payAnyPrice: {
        type: Boolean,
        required: false,
        default: false
    },
    price: {
        type: Number,
        required: false
    },
    nftBasedDiscount: {
        type: Boolean,
        required: false,
        default: false
    },
    enableNftSelection: {
        type: Boolean,
        required: false,
        default: false
    },
    nftSelection: {
        address: String,
        name: String,
        imageUrl: String
    },
    discountAmount: {
        type: Number,
        required: false,
        default: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unlimitedQuantity: {
        type: Boolean,
        required: false,
        default: false
    },
    pop: {
        type: String,
        required: true,
        trim: true
    },
    purchaseXP: {
        type: Number,
        required: true,
        default: 50
    },
    product: {
        type: String,
        required: true,
        trim: true
    }
}, {
    strict: true,
    timestamps: false,
    versionKey: false
});

const Product = model(DATABASES.PRODUCT, productSchema);
export default Product;