import Router from "express";
import { CommentsController } from "../controllers/CommentsController.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const commentsController = new CommentsController();
export const commentsRouter = Router();

commentsRouter.disable("x-powered-by"); // Desactiva el header 'express'

commentsRouter.get("/", asyncHandler(commentsController.getAll));
commentsRouter.get("/:id", asyncHandler(commentsController.getById));
commentsRouter.post("/", asyncHandler(commentsController.create));
commentsRouter.delete("/:id", asyncHandler(commentsController.delete));
commentsRouter.patch("/:id", asyncHandler(commentsController.update));
