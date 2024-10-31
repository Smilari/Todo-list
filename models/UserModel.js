import { BaseModel } from "./BaseModel.js";
import { User } from "../schemas/User.js";
import { Forbidden, ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { REFRESH_TOKEN_SECRET } from "../helpers/config.js";
import jwt from "jsonwebtoken";

export class UserModel extends BaseModel {
  constructor () {
    super(User, msg.userNotFound);
  }

  async login ({ input }) {
    const { username, password, email } = input;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) throw new ValidationError(msg.userNotFound);
    if (user.isActive === false) throw new Forbidden(msg.userNotActive);
    if (!await user.isPasswordCorrect(password)) throw new ValidationError(msg.validation);

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    return { user, refreshToken, accessToken };
  }

  async register ({ input }) {
    const user = await this.create({ input });
    return { user };
  }

  async logout ({ user }) {
    user.refreshToken = null;
    await user.save();
  }

  async delete ({ id }) {
    const user = await User.findById(id);
    if (!user) throw new ValidationError(msg.userNotFound);
    if (user.isActive === false) throw new Forbidden(msg.userNotActive);
    user.isActive = false;
    await user.save();
  }

  async refreshAccessToken ({ refreshToken }) {
    const { id } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = await User.findById(id);
    if (!user) throw new ValidationError(msg.userNotFound);

    if (user?.refreshToken !== refreshToken) throw new ValidationError(msg.refreshTokenNotValid);

    const newRefreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    return { accessToken, newRefreshToken };
  }
}
