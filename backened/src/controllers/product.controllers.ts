import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
import underdog from "../configs/underdog.config";
const {
    create,
    getProducts
} = new ProductService();

export default class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const product = await create({ ...req.body, userId: req.params.userId });

            return res.status(200)
                .send({
                    success: true,
                    message: "Product created successfully",
                    product
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while ctreating product: ${error.message}`
                })
        }
    }

    async getUsersProductsInfo(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const products = await getProducts({ userId });

            return res.status(200)
                .send({
                    success: true,
                    message: "Products info fetched successfully",
                    products
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while fetching products info: ${error.message}`
                })
        }
    }

    async getUsersDashboardInfo(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const products = await getProducts({ userId });
            const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
            const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0);

            const createdCollections = await underdog.get(`/v2/projects/n`);
            const collections = createdCollections.data.results
                .filter((project: any) => {
                    return project.attributes && project.attributes.userId === req.params.userId;
                })

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
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while fetching user's dashboard info: ${error.message}`
                })
        }
    }
}