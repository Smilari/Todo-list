import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const commentsController = new CommentsController();
export const commentRouter = Router();

commentRouter.disable("x-powered-by"); // Desactiva el header 'express'

commentRouter.get("/", asyncHandler(commentsController.getAll));
commentRouter.get("/:id", asyncHandler(commentsController.getById));
commentRouter.post("/", asyncHandler(commentsController.create));
commentRouter.delete("/:id", asyncHandler(commentsController.delete));
commentRouter.patch("/:id", asyncHandler(commentsController.update));
