import { Request, Response } from "express";
import { MESSAGES } from "../configs/constants.configs";
import PointsService from "../services/points.service";
import ProfileService from "../services/profile.services";
const {
  find
} = new PointsService();
const {findOne} = new ProfileService();

export default class PointsController {
    async getTodaysPoints(req: Request, res: Response) {
        const {profileId} = req.params;
        //checks if profile exists
        const profile = await findOne({_id: profileId})
        if(!profile) {
            return res.status(409)
            .send({
                success: false,
                message: MESSAGES.PROFILE.NOT_FOUND
            });
        }
        const fetchedPoints = await find(profileId);
        const sum = fetchedPoints.reduce((acc, point) => acc + point.point!, 0);
        return res.status(200)
        .send({
            success: true,
            message: "Today's points fetched successfully",
            points: sum
        })
    }
}