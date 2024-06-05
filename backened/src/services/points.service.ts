import IPoints from "../interfaces/points.interface";
import Points from "../models/points.model";

export default class PointsService {
    async create(points: Partial<IPoints>) {
        const createdPoints = await Points.create(points);
        return await Points.findOne({ _id: createdPoints.id}, "-__v");
    }

    async find(id: string) {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
        const filter = {
            profileId: id,
            createdAt:  { $gte: twentyFourHoursAgo }
        };
        return await Points.find(filter, "-__v");
    }
}