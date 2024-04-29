import { Router } from "express";
import CampaignController from '../controllers/campaign.controller';
import validate from "../middlewares/validate.middleware";
import { campaignSchema } from "../schemas/campaign.schemas";
const router = Router();
const {
    createCampaign,
    getCampaign,
    getAllCampaign,
    getAllUsersCampaign,
    getCampaignCount,
    participate
} = new CampaignController();

//create or update a campaign
router.post("/", validate(campaignSchema), createCampaign);

//get a campaign
router.get("/:id", getCampaign);

//get all campaign
router.get("/", getAllCampaign);

//get all user's campaign count
router.get("/profile/count/:profileId", getCampaignCount);

//get all user's campaign
router.get("/profile/:profileId", getAllUsersCampaign);

//participants to participate
router.patch("/:id/:profileId", participate);

export default router;