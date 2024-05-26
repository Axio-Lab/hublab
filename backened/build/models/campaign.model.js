"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_configs_1 = require("../configs/constants.configs");
const campaignSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    profileId: {
        type: String,
        ref: constants_configs_1.DATABASES.PROFILE,
        required: true,
        unique: false
    },
    coverBannerUrl: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        trim: true
    },
    endDate: {
        type: Date,
        required: true,
        trim: true
    },
    questions: {
        type: {
            pickAnswer: {
                type: {
                    value: [{
                            question: String,
                            options: {
                                a: String,
                                b: String,
                                c: String,
                                d: String
                            },
                            answer: String,
                            points: Number
                        }]
                },
                required: false
            },
            chooseImg: {
                type: {
                    value: [{
                            question: String,
                            options: {
                                a: String,
                                b: String,
                                c: String,
                                d: String
                            },
                            answer: String,
                            points: Number
                        }]
                },
                required: false
            },
            submitUrl: {
                type: {
                    value: [{
                            question: String,
                            points: Number
                        }]
                },
                required: false
            },
            openEndedQuestion: {
                type: {
                    value: [{
                            question: String,
                            points: Number
                        }]
                },
                required: false
            },
            performAction: {
                type: {
                    value: [{
                            question: String,
                            points: Number
                        }]
                },
                required: false
            }
        },
        required: true
    },
    eligibility: {
        type: String,
        required: true,
        trim: true
    },
    participants: {
        type: Number,
        required: true,
        trim: true
    },
    methodOfReward: {
        type: String,
        required: true,
        trim: true
    },
    rewardCoin: {
        type: String,
        required: true,
        trim: true
    },
    totalRewardPoint: {
        type: Number,
        required: true
    },
    rewardWith: {
        type: String,
        required: true,
        trim: true
    },
    winners: {
        type: {
            value: [{
                    userId: String,
                    amount: Number
                }]
        }
    }
}, {
    strict: false,
    timestamps: true
});
const Campaign = (0, mongoose_1.model)(constants_configs_1.DATABASES.CAMPAIGN, campaignSchema);
exports.default = Campaign;
