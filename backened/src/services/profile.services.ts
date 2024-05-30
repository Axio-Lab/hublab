import { JWT_SECRET, MAXAGE } from "../configs/constants.configs";
import IProfile from "../interfaces/profile.interfaces";
import Profile from "../models/profile.models";
import jwt from "jsonwebtoken";

export default class ProfileService {
    async create(profile: Partial<IProfile>) {
        const createdProfile = await Profile.create(profile);
        return await Profile.findOne({ _id: createdProfile.id}, "-__v");
    }

    async findOne(param: {}) {
        return await Profile.findOne(param, "-__v");
    }

    async editById(id: string, obj: Partial<IProfile>) {
        return await Profile.findByIdAndUpdate(id, { $set: obj }, { new: true });
    }

    async count() {
        return await Profile.countDocuments();
    }

    generateAuthToken (user: IProfile) {
        return jwt.sign({
            id: user._id
        }, JWT_SECRET, {
            expiresIn: MAXAGE
        });
    }
}