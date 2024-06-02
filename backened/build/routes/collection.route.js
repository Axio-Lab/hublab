"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collection_controller_1 = __importDefault(require("../controllers/collection.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
// import { projectSchema } from "../schemas/project.schema";
const router = (0, express_1.Router)();
const { createProject, createNFT, generateNftClaimLink, getUserNFTS } = new collection_controller_1.default();
//create a project
router.post("/:userId", createProject);
//create an NFT
router.post("/nft/:projectId", authentication_middleware_1.default, createNFT);
//get users projects
router.get("/nft/:userId", getUserNFTS);
//generate NFT claim link
router.get("/:projectId/nft/:nftId", authentication_middleware_1.default, generateNftClaimLink);
exports.default = router;
