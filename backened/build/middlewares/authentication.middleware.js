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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const profile_services_1 = __importDefault(require("../services/profile.services"));
const constants_configs_1 = require("../configs/constants.configs");
const { findOne } = new profile_services_1.default();
// check jwt exists & is valid
function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: constants_configs_1.MESSAGES.AUTH.TOKEN_ERROR
            });
        }
        jsonwebtoken_1.default.verify(token, constants_configs_1.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: constants_configs_1.MESSAGES.AUTH.INVALID_TOKEN
                });
            }
            else {
                try {
                    const authenticatedUser = yield findOne({ _id: decoded.id });
                    if (authenticatedUser && authenticatedUser !== null) {
                        req.user = authenticatedUser;
                        next();
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        if (error.message === constants_configs_1.MESSAGES.PROFILE.INVALID_ID) {
                            return res.status(404).send({
                                success: false,
                                message: constants_configs_1.MESSAGES.PROFILE.INVALID_ID
                            });
                        }
                    }
                    return res.status(505).send({
                        success: false,
                        message: `${constants_configs_1.MESSAGES.UNEXPECTED_ERROR}\n Error: ${error}`
                    });
                }
            }
        }));
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === constants_configs_1.MESSAGES.PROFILE.INVALID_ID) {
                return res.status(404).send({
                    success: false,
                    message: constants_configs_1.MESSAGES.PROFILE.INVALID_ID
                });
            }
        }
        return res.status(505).send({
            success: false,
            message: `${constants_configs_1.MESSAGES.UNEXPECTED_ERROR}\n Error: ${error}`
        });
    }
}
exports.default = authenticate;
