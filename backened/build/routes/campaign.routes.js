"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaign_controller_1 = __importDefault(require("../controllers/campaign.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const campaign_schemas_1 = require("../schemas/campaign.schemas");
const router = (0, express_1.Router)();
const { createCampaign, getCampaign, getAllCampaign, getAllUsersCampaign, getCampaignCount, participate } = new campaign_controller_1.default();
//create a campaign
router.post("/", (0, validate_middleware_1.default)(campaign_schemas_1.campaignSchema), createCampaign);
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
exports.default = router;
