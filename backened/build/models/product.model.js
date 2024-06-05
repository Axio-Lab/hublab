"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_configs_1 = require("../configs/constants.configs");
const productSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        ref: "Profile"
    },
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
        address: String,
        name: String,
        imageUrl: String,
        projectId: Number
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
const Product = (0, mongoose_1.model)(constants_configs_1.DATABASES.PRODUCT, productSchema);
exports.default = Product;
