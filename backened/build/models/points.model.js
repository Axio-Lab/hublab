"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_configs_1 = require("../configs/constants.configs");
const profileSchema = new mongoose_1.Schema({
    profileId: {
        type: String,
        ref: constants_configs_1.DATABASES.PROFILE,
        required: true,
        unique: false
    },
    point: {
        type: Number,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    strict: true,
    timestamps: false
});
const Profile = (0, mongoose_1.model)(constants_configs_1.DATABASES.POINTS, profileSchema);
exports.default = Profile;
