"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const campaignSchema = joi_1.default.object({
    title: joi_1.default.string().required().trim(),
    profileId: joi_1.default.string().required().trim(),
    coverBannerUrl: joi_1.default.string().required().trim(),
    description: joi_1.default.string().required().trim(),
    startDate: joi_1.default.string().required().trim(),
    endDate: joi_1.default.string().required().trim(),
    questions: joi_1.default.array().required(),
    eligibility: joi_1.default.required(),
    participants: joi_1.default.number().required(),
    reward: joi_1.default.string().required().trim()
});
exports.campaignSchema = campaignSchema;
