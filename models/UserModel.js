import { BaseModel } from "./BaseModel.js";
import { User } from "../schemas/User.js";
import { Forbidden, ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { generateJWT } from "../helpers/generateJWT.js";

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

    const token = await generateJWT(user);

    return { user, token };
  }

  async register ({ input }) {
    const user = await this.create({ input });
    const token = await generateJWT(user);

    return { user, token };
  }

  async delete ({ id }) {
    const user = await User.findById(id);
    if (!user) throw new ValidationError(msg.userNotFound);
    if (user.isActive === false) throw new Forbidden(msg.userNotActive);
    user.isActive = false;
    await user.save();
  }
}
