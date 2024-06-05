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
const campaign_model_1 = __importDefault(require("../models/campaign.model"));
class CampaignService {
    create(campaign) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCampaign = yield campaign_model_1.default.create(campaign);
            return yield campaign_model_1.default.findOne({ _id: createdCampaign.id }, "-__v");
        });
    }
    findOne(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_model_1.default.findOne(param, "-__v");
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_model_1.default.find(filter, "-__v");
        });
    }
    updateOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_model_1.default.updateOne(filter);
        });
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_model_1.default.countDocuments(filter);
        });
    }
}
exports.default = CampaignService;
