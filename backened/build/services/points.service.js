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
const points_model_1 = __importDefault(require("../models/points.model"));
class PointsService {
    create(points) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPoints = yield points_model_1.default.create(points);
            return yield points_model_1.default.findOne({ _id: createdPoints.id }, "-__v");
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
            const filter = {
                profileId: id,
                createdAt: { $gte: twentyFourHoursAgo }
            };
            return yield points_model_1.default.find(filter, "-__v");
        });
    }
}
exports.default = PointsService;
