import Joi from "joi";

const createProductSchema = Joi.object({
    type: Joi.string().required().trim(),
    name: Joi.string().required().trim(),
    image: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    payAnyPrice: Joi.boolean().optional().default(false),
    price: Joi.number().optional(),
    nftBasedDiscount: Joi.boolean().optional().default(false),
    enableNftSelection: Joi.boolean().optional().default(false),
    nftSelection: Joi.object({
        address: Joi.string().required().trim(),
        name: Joi.string().required().trim(),
        imageUrl: Joi.string().required().trim()
    }).optional(),
    discountAmount: Joi.number().optional().default(0),
    category: Joi.string().required().trim(),
    quantity: Joi.number().required(),
    unlimitedQuantity: Joi.boolean().optional().default(false),
    pop: Joi.string().required().trim(),
    purchaseXP: Joi.number().required().default(50),
    product: Joi.string().required().trim()
});

export {
    createProductSchema
}