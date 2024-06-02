import { Router } from "express";
import ProjectController from '../controllers/collection.controller';
import validate from "../middlewares/validate.middleware";
import authenticate from "../middlewares/authentication.middleware";
// import { projectSchema } from "../schemas/project.schema";
const router = Router();
const {
    createProject,
    createNFT,
    generateNftClaimLink,
    getUserNFTS
} = new ProjectController();

//create a project
router.post("/:userId", authenticate, createProject);

//create an NFT
router.post("/nft/:projectId", authenticate, createNFT);

//get users projects
router.get("/nft/:userId", authenticate, getUserNFTS);

//generate NFT claim link
router.get("/:projectId/nft/:nftId", authenticate, generateNftClaimLink);

export default router;