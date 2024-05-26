"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../controllers/project.controller"));
// import { projectSchema } from "../schemas/project.schema";
const router = (0, express_1.Router)();
const { createProject, createNFT } = new project_controller_1.default();
//create a project
router.post("/", createProject);
//create an NFT
router.post("/nft/:projectId", createNFT);
exports.default = router;
