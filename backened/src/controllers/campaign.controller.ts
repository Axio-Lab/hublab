import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.configs";
import CampaignService from "../services/campaign.service";
import ProfileService from "../services/profile.services";
const {
  create,
  findOne,
  find,
  count,
  updateOne
} = new CampaignService();
const {findOne: findProfile} = new ProfileService();
const {
    DUPLICATE_TITLE,
    CREATED,
    FETCHED,
    NOT_FOUND,
    FETCHED_COUNT,
    UPDATED_CAMPAIGN
} = MESSAGES.CAMPAIGN;

export default class CampaignController {
    async createCampaign(req: Request, res: Response) {
        const {profileId, title} = req.body;

        //checks if profile exists
        const profile = await findProfile({_id: profileId})
        if(!profile) {
            return res.status(409)
            .send({
                success: false,
                message: MESSAGES.PROFILE.NOT_FOUND
            });
        }

        //checks if title is unique
        const campaign = await findOne({title: title})
        if(campaign) {
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_TITLE
            });
        }
    
        const createdCampaign = await create(req.body);
        return res.status(201)
        .send({
            success: true,
            message: CREATED,
            campaignId: createdCampaign?._id
        })
    }

    async getCampaign(req: Request, res: Response) {
        const capmaign = await findOne({_id: req.params.id});
        if (capmaign) {
            return res.status(200)
            .send({
                success: true,
                message: FETCHED,
                capmaign: capmaign
            });
        }
        return res.status(404)
            .send({
                success: false,
                message: NOT_FOUND
        });    
    }

    async getAllCampaign(req: Request, res: Response) {
        const capmaigns = await find({});
        return res.status(200)
        .send({
            success: true,
            message: FETCHED,
            capmaign: capmaigns
        });
    }

    async getAllUsersCampaign(req: Request, res: Response) {
        //checks if profile exists
        const profile = await findProfile({_id: req.params.profileId})
        if(!profile) {
            return res.status(409)
            .send({
                success: false,
                message: MESSAGES.PROFILE.NOT_FOUND
            });
        }
        
        const capmaigns = await find({profileId: req.params.profileId});
        if (capmaigns) {
            return res.status(200)
            .send({
                success: true,
                message: FETCHED,
                capmaign: capmaigns
            });
        }
        return res.status(404)
            .send({
                success: false,
                message: NOT_FOUND
        });
    }

    async getCampaignCount(req: Request, res: Response) {
        //checks if profile exists
        const profile = await findProfile({_id: req.params.profileId})
        if(!profile) {
            return res.status(409)
            .send({
                success: false,
                message: MESSAGES.PROFILE.NOT_FOUND
            });
        }
        const campaignCount = await count({profileId: req.params.profileId});
        return res.status(200)
        .send({
            success: true,
            message: FETCHED_COUNT,
            count: campaignCount
        });

    }

    async participate(req: Request, res: Response) {
        const campaignId = req.params.id;
        const profileId = req.params.profileId;
        const capmaign = await findOne({_id: campaignId});
        if (!capmaign) {
            return res.status(404)
            .send({
                success: false,
                message: NOT_FOUND
            }); 
        }
        const profile = await findProfile({_id: profileId})
        if(!profile) {
            return res.status(409)
            .send({
                success: false,
                message: MESSAGES.PROFILE.NOT_FOUND
            });
        }
        const updatedCampaign = await updateOne({
            $push: { 
                winners: req.body 
            }
        })
        return res.status(200)
        .send({
            success: true,
            message: UPDATED_CAMPAIGN,
            count: updatedCampaign
        });
    }
}