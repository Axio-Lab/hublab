"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_routes_1 = __importDefault(require("./profile.routes"));
const campaign_routes_1 = __importDefault(require("./campaign.routes"));
const project_route_1 = __importDefault(require("./project.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const product_routes_1 = __importDefault(require("./product.routes"));
const doc_routes_1 = __importDefault(require("./doc.routes"));
const constants_configs_1 = require("../configs/constants.configs");
exports.default = (app) => {
    app.use(`${constants_configs_1.basePath}/profiles`, profile_routes_1.default);
    app.use(`${constants_configs_1.basePath}/campaigns`, campaign_routes_1.default);
    app.use(`${constants_configs_1.basePath}/projects`, project_route_1.default);
    app.use(`${constants_configs_1.basePath}/payment`, payment_route_1.default);
    app.use(`${constants_configs_1.basePath}/product`, product_routes_1.default);
    app.use(`${constants_configs_1.basePath}/docs`, doc_routes_1.default);
    app.use(`${constants_configs_1.basePath}/`, (req, res) => {
        res.send("Welcome to Verxio API");
    });
};
