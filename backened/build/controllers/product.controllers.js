"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_servicee_1 = __importDefault(require("../services/product.servicee"));
const underdog_config_1 = __importDefault(require("../configs/underdog.config"));
const { create, getProducts, getProductById } = new product_servicee_1.default();
class ProductController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield create(Object.assign(Object.assign({}, req.body), { userId: req.params.userId }));
                return res.status(200)
                    .send({
                    success: true,
                    message: "Product created successfully",
                    product
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while ctreating product: ${error.message}`
                });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield getProductById(req.params.productId);
                if (!product) {
                    return res.status(404)
                        .send({
                        success: false,
                        message: "Product with the Id not found"
                    });
                }
                return res.status(200)
                    .send({
                    success: true,
                    message: "Product fetched successfully",
                    product
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while fetching product: ${error.message}`
                });
            }
        });
    }
    getUsersProductsInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const products = yield getProducts({ userId });
                return res.status(200)
                    .send({
                    success: true,
                    message: "Products info fetched successfully",
                    products
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while fetching products info: ${error.message}`
                });
            }
        });
    }
    getUsersDashboardInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const products = yield getProducts({ userId });
                const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
                const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0);
                const createdCollections = yield underdog_config_1.default.get(`/v2/projects/n`);
                const collections = createdCollections.data.results
                    .filter((project) => {
                    return project.attributes && project.attributes.userId === req.params.userId;
                });
                return res.status(200)
                    .send({
                    success: true,
                    message: "Dashoard info fetched successfully",
                    dashboardInfo: {
                        allProducts: products.length,
                        totalSales,
                        totalRevenue,
                        numberOfAssets: collections.length
                    }
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while fetching user's dashboard info: ${error.message}`
                });
            }
        });
    }
}
exports.default = ProductController;
