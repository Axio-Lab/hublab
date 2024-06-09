"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router1 = void 0;
const express_1 = require("express");
const product_controllers_1 = __importDefault(require("../controllers/product.controllers"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const product_schema_1 = require("../schemas/product.schema");
const router = (0, express_1.Router)();
const router1 = (0, express_1.Router)();
exports.router1 = router1;
const { createProduct, getUsersProductsInfo, getUsersDashboardInfo } = new product_controllers_1.default();
//create a product
router.post("/:userId", (0, validate_middleware_1.default)(product_schema_1.createProductSchema), createProduct);
//get users products info
router.get("/:userId", getUsersProductsInfo);
//get users dashboard info
router1.get("/:userId", getUsersDashboardInfo);
exports.default = router;
