import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/profile.services";
import AuthRequest from "../interfaces/auth.interface";
import { JWT_SECRET, MESSAGES } from "../configs/constants.configs";
const {
    findOne
} = new UserService();


// check jwt exists & is valid
export default function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: MESSAGES.AUTH.TOKEN_ERROR
            });
        }
        jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: MESSAGES.AUTH.INVALID_TOKEN
                });
            } else {
                try {
                    const authenticatedUser = await findOne({ _id: decoded.id });
                    if(authenticatedUser && authenticatedUser !== null) {
                        (req as AuthRequest).user = authenticatedUser;
                        next();
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.message === MESSAGES.PROFILE.INVALID_ID) {
                            return res.status(404).send({
                                success: false,
                                message: MESSAGES.PROFILE.INVALID_ID
                            });
                        }
                    }
                    return res.status(505).send({
                        success: false,
                        message: `${MESSAGES.UNEXPECTED_ERROR}\n Error: ${error}`
                    });
                }
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === MESSAGES.PROFILE.INVALID_ID) {
                return res.status(404).send({
                    success: false,
                    message: MESSAGES.PROFILE.INVALID_ID
                });
            }
        }
        return res.status(505).send({
            success: false,
            message: `${MESSAGES.UNEXPECTED_ERROR}\n Error: ${error}`
        });
    }
}