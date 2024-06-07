"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_routes_1 = __importDefault(require("./profile.routes"));
const campaign_routes_1 = __importDefault(require("./campaign.routes"));
const collection_route_1 = __importDefault(require("./collection.route"));
const payment_route_1 = __importDefault(require("./payment.route"));
const product_routes_1 = __importStar(require("./product.routes"));
const doc_routes_1 = __importDefault(require("./doc.routes"));
const constants_configs_1 = require("../configs/constants.configs");
exports.default = (app) => {
    app.use(`${constants_configs_1.basePath}/profiles`, profile_routes_1.default);
    app.use(`${constants_configs_1.basePath}/campaigns`, campaign_routes_1.default);
    app.use(`${constants_configs_1.basePath}/collection`, collection_route_1.default);
    app.use(`${constants_configs_1.basePath}/payment`, payment_route_1.default);
    app.use(`${constants_configs_1.basePath}/product`, product_routes_1.default);
    app.use(`${constants_configs_1.basePath}/dashboard`, product_routes_1.router1);
    app.use(`${constants_configs_1.basePath}/docs`, doc_routes_1.default);
    app.use(`${constants_configs_1.basePath}/`, (req, res) => {
        res.send("Welcome to Verxio API");
    });
};
