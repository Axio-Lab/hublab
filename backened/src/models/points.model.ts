import { model, Schema } from "mongoose";
import { DATABASES } from "../configs/constants.configs";

const profileSchema = new Schema({
    profileId: {
        type: String,
        ref: DATABASES.PROFILE,
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

const Profile = model(DATABASES.POINTS, profileSchema);
export default Profile;