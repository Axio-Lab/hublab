"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAXAGE = exports.JWT_SECRET = exports.FRONTEND_SIGNUP_LINK = exports.INTERESTS = exports.DATABASES = exports.MESSAGES = exports.basePath = exports.SECRET = exports.PORT = void 0;
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
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
const MAXAGE = 3 * 24 * 60 * 60;
exports.MAXAGE = MAXAGE;
const MESSAGES = {
    DATABASE: {
        CONNECTED: "Connection to database has been established successfully",
        ERROR: "Unable to connect to database:"
    },
    PROFILE: {
        CREATED: "Profile created successfully.",
        FETCHED: "Profile fetched successfully.",
        INVALID_ID: "UserId doesn't exist.",
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
    },
    AUTH: {
        TOKEN_ERROR: 'Access Denied: Please login first',
        NOT_ADMIN: "Access denied: Admins only.",
        INVALID_TOKEN: 'Access Denied: Invalid token'
    },
    UNEXPECTED_ERROR: "An unexpected error occured."
};
exports.MESSAGES = MESSAGES;
const INTERESTS = ["Content", "Development", "Trading", "Earning", "Blockchain", "Bounty"];
exports.INTERESTS = INTERESTS;
const FRONTEND_SIGNUP_LINK = "";
exports.FRONTEND_SIGNUP_LINK = FRONTEND_SIGNUP_LINK;
