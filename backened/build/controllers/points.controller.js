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
const points_service_1 = __importDefault(require("../services/points.service"));
const profile_services_1 = __importDefault(require("../services/profile.services"));
const { find } = new points_service_1.default();
const { findOne } = new profile_services_1.default();
class PointsController {
    getTodaysPoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { profileId } = req.params;
            //checks if profile exists
            const profile = yield findOne({ _id: profileId });
            if (!profile) {
                return res.status(409)
                    .send({
                    success: false,
                    message: constants_configs_1.MESSAGES.PROFILE.NOT_FOUND
                });
            }
            const fetchedPoints = yield find(profileId);
            const sum = fetchedPoints.reduce((acc, point) => acc + point.point, 0);
            return res.status(200)
                .send({
                success: true,
                message: "Today's points fetched successfully",
                points: sum
            });
        });
    }
}
exports.default = PointsController;
