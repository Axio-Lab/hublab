import { Router } from "express";
import ProductController from '../controllers/product.controllers';
import validate from "../middlewares/validate.middleware";
import { createProductSchema } from "../schemas/product.schema";
import authenticate from "../middlewares/authentication.middleware";
const router = Router();
const {
    createProduct
} = new ProductController();

//create a product
router.post("/:userId", validate(createProductSchema), createProduct);

export default router;