"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../controllers/project.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
// import { projectSchema } from "../schemas/project.schema";
const router = (0, express_1.Router)();
const { createProject, createNFT, getUserNFTS } = new project_controller_1.default();
//create a project
router.post("/", authentication_middleware_1.default, createProject);
//create an NFT
router.post("/nft/:projectId", authentication_middleware_1.default, createNFT);
//get users nfts
router.get("/nft", authentication_middleware_1.default, getUserNFTS);
exports.default = router;
