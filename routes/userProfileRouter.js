import Router from "express";
import { UserProfileController } from "../controllers/UserProfileController.js";

export const userProfileRouter = Router();

userProfileRouter.disable("x-powered-by"); // Desactiva el header 'express'

userProfileRouter.get("/", UserProfileController.getProfile);
userProfileRouter.patch("/", UserProfileController.updateProfile);
