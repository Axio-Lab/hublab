import { Router } from "express";
import ProductController from '../controllers/product.controllers';
import validate from "../middlewares/validate.middleware";
import { createProductSchema } from "../schemas/product.schema";
const router = Router();
const {
    createProduct
} = new ProductController();

//create a product
router.post("/", validate(createProductSchema), createProduct);

export default router;