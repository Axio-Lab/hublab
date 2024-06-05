import Joi from "joi";

const campaignSchema = Joi.object({
    title: Joi.string().required().trim(),
    profileId: Joi.string().required().trim(),
    coverBannerUrl: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    startDate: Joi.string().required().trim(),
    endDate: Joi.string().required().trim(),
    questions: Joi.object({
        pickAnswer: Joi.object({
            value: Joi.array()
        }),
        chooseImg: Joi.object({
            value: Joi.array()
        }),
        submitUrl: Joi.object({
            value: Joi.array()
        }),
        openEndedQuestion: Joi.object({
            value: Joi.array()
        }),
        performAction: Joi.object({
            value: Joi.array()
        })
    }).required(),
    eligibility: Joi.required(),
    participants: Joi.number().required(),
    methodOfReward: Joi.string().required().trim(),
    rewardCoin: Joi.string().required().trim(),
    totalRewardPoint: Joi.number().required(),
    rewardWith: Joi.string().required().trim()
});

export {
    campaignSchema
}