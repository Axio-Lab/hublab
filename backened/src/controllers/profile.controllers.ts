import { Request, Response } from "express";
import { FRONTEND_SIGNUP_LINK, MAXAGE, MESSAGES } from "../configs/constants.configs";
import ProfileService from "../services/profile.services";
import PointsService from "../services/points.service";
import cloudinary from "../configs/cloudinary.configs";
import generateReferralCode from "../utils/generateReferralCode.utils";
import getBonus from "../utils/getBonus.utils";
const {
  create,
  findOne,
  editById,
  generateAuthToken
} = new ProfileService();
const {
  create: createPoint
} = new PointsService();
const {
  DUPLICATE_EMAIL,
  CREATED,
  FETCHED,
  UPDATED,
  NOT_FOUND
} = MESSAGES.PROFILE;

export default class ProfileController {
  async createProfile(req: Request, res: Response) {
    const { id } = req.params;
    const { email } = req.body;

    //checks if profile with email and id exists
    if (email) {
      const profileFromEmail = await findOne({ email: email });
      if (profileFromEmail) {
        if (profileFromEmail._id !== id) {
          //sends an error if the email exists
          return res.status(409)
            .send({
              success: false,
              message: DUPLICATE_EMAIL
            });
        }
      }
    }

    const profileFromId = await findOne({ _id: id });
    if (profileFromId) {

      const updatedProfile = await editById(id, req.body);
      const token = generateAuthToken(updatedProfile as any);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: MAXAGE * 1000
      });
      return res.status(201)
        .send({
          success: true,
          message: UPDATED,
          profile: updatedProfile
        });
    } else {
      const code = await generateReferralCode();
      req.body.referralCode = code;

      const bonus = await getBonus();
      await createPoint({ point: bonus.signUp, profileId: id })
      //creates a profile if the email and id doesn't exist
      const createdProfile = await create({ _id: id, points: { totalPoints: bonus.signUp, referalPoints: 0, rewardPoints: bonus.signUp }, ...req.body });

      if (req.query) {
        const { referralCode } = req.query;
        const referredUser = await findOne({ referralCode: referralCode });
        if (referredUser && referredUser.points) {
          const totalReferralPoints = referredUser.points.referalPoints + bonus.referral;
          const updatedProfile = await editById(referredUser._id, { points: { totalPoints: referredUser.points.totalPoints, referalPoints: totalReferralPoints, rewardPoints: referredUser.points.rewardPoints } });
          await createPoint({ point: bonus.referral, profileId: referredUser._id })
        }
      }
      const token = generateAuthToken(createdProfile as any);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: MAXAGE * 1000
      });
      return res.status(201)
        .send({
          success: true,
          message: CREATED,
          profile: createdProfile
        });
    }
  }

  async uploadImage(req: Request, res: Response) {
    try {
      let imageUrl;
      if (req.file) {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "Verxio" });
        imageUrl = result.secure_url;
        if (!imageUrl) {
          return res.status(409).send({
            success: false,
            message: "File Upload Failed"
          });
        }
        return res.status(201)
          .send({
            success: true,
            message: "Image uploaded successfully",
            imageUrl
          });
      }
      return res.status(409).send({
        success: false,
        message: "Include an Image file"
      });
    } catch (err) {
      return res.status(409).send({
        success: false,
        message: "Error while uploading file"
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    const profile = await findOne({ _id: req.params.id });
    if (profile) {
      const token = generateAuthToken(profile as any);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: MAXAGE * 1000
      });
      return res.status(200)
        .send({
          success: true,
          message: FETCHED,
          profile: profile
        });
    }
    return res.status(404)
      .send({
        success: false,
        message: NOT_FOUND
      });
  }

  async claimPoints(req: Request, res: Response) {
    const { id } = req.params
    const profile = await findOne({ _id: id });
    if (profile) {
      const updatedProfile = await editById(id, {
        points: {
          totalPoints: 0,
          rewardPoints: 0,
          referalPoints: 0
        }
      });
      return res.status(200)
        .send({
          success: true,
          message: "Points successfully claimed",
          profile: updatedProfile
        });
    }
    return res.status(404)
      .send({
        success: false,
        message: NOT_FOUND
      });
  }

  async getReferralLink(req: Request, res: Response) {
    const { id } = req.params
    const profile = await findOne({ _id: id });
    if (!profile) {
      return res.status(404)
        .send({
          success: false,
          message: NOT_FOUND
        });
    }
    return res.status(200)
      .send({
        success: true,
        message: "Referral link successfully fetched",
        profile: `${FRONTEND_SIGNUP_LINK}?referral=${profile.referralCode}`
      });
  }
}