import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { validateTaskIsFromUser } from "../middlewares/validations.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const commentsController = new CommentsController();
export const userCommentsRouter = Router();

userCommentsRouter.disable("x-powered-by"); // Desactiva el header 'express'

userCommentsRouter.get("/", asyncHandler(commentsController.getByLoggedUser));
userCommentsRouter.get("/:id", [validateTaskIsFromUser], asyncHandler(commentsController.getById));
userCommentsRouter.post("/", asyncHandler(commentsController.createByLoggedUser));
userCommentsRouter.patch("/:id", [validateTaskIsFromUser], asyncHandler(commentsController.update));    
userCommentsRouter.delete("/:id", [validateTaskIsFromUser], asyncHandler(commentsController.delete));