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
const profile_services_1 = __importDefault(require("../services/profile.services"));
const points_service_1 = __importDefault(require("../services/points.service"));
const cloudinary_configs_1 = __importDefault(require("../configs/cloudinary.configs"));
const generateReferralCode_utils_1 = __importDefault(require("../utils/generateReferralCode.utils"));
const getBonus_utils_1 = __importDefault(require("../utils/getBonus.utils"));
const { create, findOne, editById, generateAuthToken } = new profile_services_1.default();
const { create: createPoint } = new points_service_1.default();
const { DUPLICATE_EMAIL, CREATED, FETCHED, UPDATED, NOT_FOUND } = constants_configs_1.MESSAGES.PROFILE;
class ProfileController {
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { email } = req.body;
            //checks if profile with email and id exists
            if (email) {
                const profileFromEmail = yield findOne({ email: email });
                if (profileFromEmail) {
                    if (profileFromEmail._id !== id) {
                        //sends an error if the email exists
                        return res.status(409)
                            .send({
                            success: false,
                            message: DUPLICATE_EMAIL
                        });
                    }
                }
            }
            const profileFromId = yield findOne({ _id: id });
            if (profileFromId) {
                const updatedProfile = yield editById(id, req.body);
                const token = generateAuthToken(updatedProfile);
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: constants_configs_1.MAXAGE * 1000
                });
                return res.status(201)
                    .send({
                    success: true,
                    message: UPDATED,
                    profile: updatedProfile
                });
            }
            else {
                const code = yield (0, generateReferralCode_utils_1.default)();
                req.body.referralCode = code;
                const bonus = yield (0, getBonus_utils_1.default)();
                yield createPoint({ point: bonus.signUp, profileId: id });
                //creates a profile if the email and id doesn't exist
                const createdProfile = yield create(Object.assign({ _id: id, points: { totalPoints: bonus.signUp, referalPoints: 0, rewardPoints: bonus.signUp } }, req.body));
                if (req.query) {
                    const { referralCode } = req.query;
                    const referredUser = yield findOne({ referralCode: referralCode });
                    if (referredUser && referredUser.points) {
                        const totalReferralPoints = referredUser.points.referalPoints + bonus.referral;
                        const updatedProfile = yield editById(referredUser._id, { points: { totalPoints: referredUser.points.totalPoints, referalPoints: totalReferralPoints, rewardPoints: referredUser.points.rewardPoints } });
                        yield createPoint({ point: bonus.referral, profileId: referredUser._id });
                    }
                }
                const token = generateAuthToken(createdProfile);
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: constants_configs_1.MAXAGE * 1000
                });
                return res.status(201)
                    .send({
                    success: true,
                    message: CREATED,
                    profile: createdProfile
                });
            }
        });
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imageUrl;
                if (req.file) {
                    // Upload file to Cloudinary
                    const result = yield cloudinary_configs_1.default.uploader.upload(req.file.path, { folder: "Verxio" });
                    imageUrl = result.secure_url;
                    if (!imageUrl) {
                        return res.status(409).send({
                            success: false,
                            message: "File Upload Failed"
                        });
                    }
                    return res.status(201)
                        .send({
                        success: true,
                        message: "Image uploaded successfully",
                        imageUrl
                    });
                }
                return res.status(409).send({
                    success: false,
                    message: "Include an Image file"
                });
            }
            catch (err) {
                return res.status(409).send({
                    success: false,
                    message: "Error while uploading file"
                });
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield findOne({ _id: req.params.id });
            if (profile) {
                const token = generateAuthToken(profile);
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: constants_configs_1.MAXAGE * 1000
                });
                return res.status(200)
                    .send({
                    success: true,
                    message: FETCHED,
                    profile: profile
                });
            }
            return res.status(404)
                .send({
                success: false,
                message: NOT_FOUND
            });
        });
    }
    claimPoints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const profile = yield findOne({ _id: id });
            if (profile) {
                const updatedProfile = yield editById(id, {
                    points: {
                        totalPoints: 0,
                        rewardPoints: 0,
                        referalPoints: 0
                    }
                });
                return res.status(200)
                    .send({
                    success: true,
                    message: "Points successfully claimed",
                    profile: updatedProfile
                });
            }
            return res.status(404)
                .send({
                success: false,
                message: NOT_FOUND
            });
        });
    }
    getReferralLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const profile = yield findOne({ _id: id });
            if (!profile) {
                return res.status(404)
                    .send({
                    success: false,
                    message: NOT_FOUND
                });
            }
            return res.status(200)
                .send({
                success: true,
                message: "Referral link successfully fetched",
                profile: `${constants_configs_1.FRONTEND_SIGNUP_LINK}?referral=${profile.referralCode}`
            });
        });
    }
}
exports.default = ProfileController;
