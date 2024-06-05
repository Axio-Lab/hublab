import ICampaign from "../interfaces/campaign.interface";
import Campaign from "../models/campaign.model";

export default class CampaignService {
    async create(campaign: Partial<ICampaign>) {
        const createdCampaign = await Campaign.create(campaign);
        return await Campaign.findOne({ _id: createdCampaign.id}, "-__v");
    }

    async findOne(param: {}) {
        return await Campaign.findOne(param, "-__v");
    }

    async find(filter: {}) {
        return await Campaign.find(filter, "-__v");
    }

    async updateOne(filter: {}) {
        return await Campaign.updateOne(filter);
    }

    async count(filter: {}) {
        return await Campaign.countDocuments(filter);
    }
}