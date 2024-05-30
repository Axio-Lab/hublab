import { Request } from "express";
import IProfile from "./profile.interfaces";

export default interface AuthRequest extends Request {
    user: IProfile
}