"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_configs_1 = require("../configs/constants.configs");
const campaign_service_1 = __importDefault(require("../services/campaign.service"));
const profile_services_1 = __importDefault(require("../services/profile.services"));
const getStatus_1 = require("../utils/getStatus");
const { create, findOne, find, count, updateOne } = new campaign_service_1.default();
const { findOne: findProfile } = new profile_services_1.default();
const { DUPLICATE_TITLE, CREATED, FETCHED, NOT_FOUND, FETCHED_COUNT, UPDATED_CAMPAIGN } = constants_configs_1.MESSAGES.CAMPAIGN;
class CampaignController {
    createCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { profileId, title } = req.body;
            //checks if profile exists
            const profile = yield findProfile({ _id: profileId });
            if (!profile) {
                return res.status(409)
                    .send({
                    success: false,
                    message: constants_configs_1.MESSAGES.PROFILE.NOT_FOUND
                });
            }
            //checks if title is unique
            const campaign = yield findOne({ title: title });
            if (campaign) {
                return res.status(409)
                    .send({
                    success: false,
                    message: DUPLICATE_TITLE
                });
            }
            const createdCampaign = yield create(req.body);
            return res.status(201)
                .send({
                success: true,
                message: CREATED,
                campaignId: createdCampaign === null || createdCampaign === void 0 ? void 0 : createdCampaign._id
            });
        });
    }
    getCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const capmaign = yield findOne({ _id: req.params.id });
            const status = (0, getStatus_1.getStatus)(capmaign);
            if (capmaign) {
                return res.status(200)
                    .send({
                    success: true,
                    message: FETCHED,
                    capmaign: Object.assign(Object.assign({}, capmaign), { status })
                });
            }
            return res.status(404)
                .send({
                success: false,
                message: NOT_FOUND
            });
        });
    }
    getAllCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaigns = yield find({});
            const campaignsWithStatus = campaigns.map(campaign => {
                const status = (0, getStatus_1.getStatus)(campaign);
                return Object.assign(Object.assign({}, campaign), { status });
            });
            return res.status(200)
                .send({
                success: true,
                message: FETCHED,
                capmaign: campaignsWithStatus
            });
        });
    }
    getAllUsersCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //checks if profile exists
            const profile = yield findProfile({ _id: req.params.profileId });
            if (!profile) {
                return res.status(409)
                    .send({
                    success: false,
                    message: constants_configs_1.MESSAGES.PROFILE.NOT_FOUND
                });
            }
            const campaigns = yield find({ profileId: req.params.profileId });
            if (campaigns) {
                const campaignsWithStatus = campaigns.map(campaign => {
                    const status = (0, getStatus_1.getStatus)(campaign);
                    return Object.assign(Object.assign({}, campaign), { status });
                });
                return res.status(200)
                    .send({
                    success: true,
                    message: FETCHED,
                    capmaign: campaignsWithStatus
                });
            }
            return res.status(404)
                .send({
                success: false,
                message: NOT_FOUND
            });
        });
    }
    getCampaignCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //checks if profile exists
            const profile = yield findProfile({ _id: req.params.profileId });
            if (!profile) {
                return res.status(409)
                    .send({
                    success: false,
                    message: constants_configs_1.MESSAGES.PROFILE.NOT_FOUND
                });
            }
            const campaignCount = yield count({ profileId: req.params.profileId });
            return res.status(200)
                .send({
                success: true,
                message: FETCHED_COUNT,
                count: campaignCount
            });
        });
    }
    participate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignId = req.params.id;
            const profileId = req.params.profileId;
            const capmaign = yield findOne({ _id: campaignId });
            if (!capmaign) {
                return res.status(404)
                    .send({
                    success: false,
                    message: NOT_FOUND
                });
            }
            const profile = yield findProfile({ _id: profileId });
            if (!profile) {
                return res.status(409)
                    .send({
                    success: false,
                    message: constants_configs_1.MESSAGES.PROFILE.NOT_FOUND
                });
            }
            const updatedCampaign = yield updateOne({
                $push: {
                    winners: req.body
                }
            });
            return res.status(200)
                .send({
                success: true,
                message: UPDATED_CAMPAIGN,
                count: updatedCampaign
            });
        });
    }
}
exports.default = CampaignController;
