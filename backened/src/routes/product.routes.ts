import { Router } from "express";
import ProductController from '../controllers/product.controllers';
import validate from "../middlewares/validate.middleware";
import { createProductSchema } from "../schemas/product.schema";
import validateEmptyString from "../middlewares/validateEmptyString.middleware";
const router = Router();
const router1 = Router();
const {
    createProduct,
    getUsersProductsInfo,
    getUsersDashboardInfo
} = new ProductController();

//create a product
router.post("/:userId", validateEmptyString, validate(createProductSchema), createProduct);

//get users products info
router.get("/:userId", getUsersProductsInfo);

//get users dashboard info
router1.get("/:userId", getUsersDashboardInfo);

export default router;
export { router1 }