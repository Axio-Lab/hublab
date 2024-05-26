import { Router } from "express";
import ProjectController from '../controllers/project.controller';
import validate from "../middlewares/validate.middleware";
// import { projectSchema } from "../schemas/project.schema";
const router = Router();
const {
    createProject,
    createNFT
} = new ProjectController();

//create a project
router.post("/", createProject);

//create an NFT
router.post("/nft/:projectId", createNFT);

export default router;