import { UserModel } from "../models/UserModel.js";
import { handleError, NotFound } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";

export class UserProfileController {
  static async getProfile (req, res) {
    try {
      const { id } = req.user;
      const user = await UserModel.getById({ id });

      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  }

  static async updateProfile (req, res) {
    try {
      const { id } = req.user;
      const { username, password } = req.body;
      const user = await UserModel.update({ id, username, password });

      if (!user) return handleError(new NotFound(msg.userNotFound), res);

      res.json(user);
    } catch (err) {
      handleError(err, res);
    }
  }
}