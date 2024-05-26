"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_SIGNUP_LINK = exports.INTERESTS = exports.DATABASES = exports.MESSAGES = exports.basePath = exports.SECRET = exports.PORT = void 0;
const PORT = process.env.PORT || 9871;
exports.PORT = PORT;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;
const basePath = "/api/v1";
exports.basePath = basePath;
const DATABASES = {
    PROFILE: "profile",
    POINTS: "point",
    CAMPAIGN: "campaign",
    PRODUCT: "product"
};
exports.DATABASES = DATABASES;
const MESSAGES = {
    DATABASE: {
        CONNECTED: "Connection to database has been established successfully",
        ERROR: "Unable to connect to database:"
    },
    PROFILE: {
        CREATED: "Profile created successfully.",
        FETCHED: "Profile fetched successfully.",
        DUPLICATE_EMAIL: "Email already exist.",
        UPDATED: "Profile details updated successfully.",
        NOT_FOUND: "Profile not found."
    },
    CAMPAIGN: {
        DUPLICATE_TITLE: "Title already exist.",
        CREATED: "Campaign created successfully.",
        FETCHED: "Campaign fetched successfully.",
        NOT_FOUND: "Campaign not found.",
        UPDATED_CAMPAIGN: "Campaign updated.",
        FETCHED_COUNT: "User's campaign count fetched successfully."
    }
};
exports.MESSAGES = MESSAGES;
const INTERESTS = ["Content", "Development", "Trading", "Earning", "Blockchain", "Bounty"];
exports.INTERESTS = INTERESTS;
const FRONTEND_SIGNUP_LINK = "";
exports.FRONTEND_SIGNUP_LINK = FRONTEND_SIGNUP_LINK;
