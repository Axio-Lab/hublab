"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createProductSchema = joi_1.default.object({
    type: joi_1.default.string().required().trim(),
    name: joi_1.default.string().required().trim(),
    image: joi_1.default.string().required().trim(),
    description: joi_1.default.string().required().trim(),
    payAnyPrice: joi_1.default.boolean().optional().default(false),
    price: joi_1.default.number().optional(),
    nftSelection: joi_1.default.object({
        address: joi_1.default.string().required().trim(),
        name: joi_1.default.string().required().trim(),
        imageUrl: joi_1.default.string().required().trim()
    }).optional(),
    discountAmount: joi_1.default.number().optional().default(0),
    category: joi_1.default.string().required().trim(),
    quantity: joi_1.default.number().required(),
    unlimitedQuantity: joi_1.default.boolean().optional().default(false),
    pop: joi_1.default.object({
        address: joi_1.default.string().required().trim(),
        name: joi_1.default.string().required().trim(),
        imageUrl: joi_1.default.string().required().trim(),
        productId: joi_1.default.number().required()
    }).optional(),
    purchaseXP: joi_1.default.number().required().default(50),
    product: joi_1.default.string().required().trim()
});
exports.createProductSchema = createProductSchema;
