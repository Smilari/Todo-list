import { BaseController } from "./BaseController.js";
import { UserModel } from "../models/UserModel.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import autoBind from "auto-bind";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { NODE_ENV } from "../helpers/config.js";
import { accessTokenMaxAge, refreshTokenMaxAge } from "../helpers/parseExpiry.js";

export class UsersController extends BaseController {
  constructor () {
    super(new UserModel(), msg.error.userNotFound);
    autoBind(this);
  }

  async getByLoggedUser (req, res) {
    const { user } = req;
    res.json(new ApiResponse(user, 200, msg.success.fetch));
  }

  async updateByLoggedUser (req, res) {
    const { id } = req.user;
    const { username, password, email } = req.body;
    const user = await this.model.update({ id, input: { username, password, email } });
    res.json(new ApiResponse(user, 200, msg.success.update));
  }

  async register (req, res) {
    const { body } = req;
    const { user } = await this.model.register({ input: body });
    res.status(201).json(new ApiResponse(user, 201, msg.success.create));
  }

  async login (req, res) {
    const { body } = req;
    const { user, refreshToken, accessToken } = await this.model.login({ input: body });
    const isProduction = NODE_ENV === "production";
    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none", secure:isProduction, maxAge: refreshTokenMaxAge }).
      cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none", secure:isProduction, maxAge: accessTokenMaxAge }).
      json(new ApiResponse(user, 200, msg.success.login));
  }

  async logout (req, res) {
    const { user } = req;
    await this.model.logout({ user });
    res.clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse({}, 204, msg.success.logout));
  }

  async refreshAccessToken (req, res) {
    const { refreshToken } = req.cookies;
    const { accessToken, newRefreshToken } = await this.model.refreshAccessToken({ refreshToken });

    const isProduction = NODE_ENV === "production";
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, sameSite: "none", secure:isProduction, maxAge: refreshTokenMaxAge }).
      cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none", secure:isProduction, maxAge: accessTokenMaxAge }).
      json(new ApiResponse({}, 200, msg.success.refreshAccessToken));
  }

  async validateAccessToken (req, res) {
    res.json(new ApiResponse({}, 200));
  }
}