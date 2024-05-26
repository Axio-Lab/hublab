import profileRouter from "./profile.routes";
import campaignRouter from "./campaign.routes";
import projectRouter from "./project.route";
import paymentRouter from "./payment.route";
import productRouter from "./product.routes";
import docRouter from "./doc.routes";
import { basePath } from "../configs/constants.configs";
import { Request, Response } from "express";

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/profiles`, profileRouter);
    app.use(`${basePath}/campaigns`, campaignRouter);
    app.use(`${basePath}/projects`, projectRouter);
    app.use(`${basePath}/payment`, paymentRouter);
    app.use(`${basePath}/product`, productRouter);
    app.use(`${basePath}/docs`, docRouter);
    app.use(`${basePath}/`, (req: Request, res: Response) => {
        res.send("Welcome to Verxio API");
    });
};