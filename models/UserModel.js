import { BaseModel } from "./BaseModel.js";
import { User } from "../schemas/User.js";
import { ValidationError } from "../helpers/ErrorHandler.js";
import { messagesByLang as msg } from "../helpers/messages.js";
import { generateJWT } from "../helpers/generateJWT.js";

export class UserModel extends BaseModel {
  constructor () {
    super(User, msg.userNotFound);
  }

  async login ({ input }) {
    const { username, password } = input;
    const user = await User.findOne({ username });
    if (!user) throw new ValidationError(msg.validation);

    if (!await user.isPasswordCorrect(password)) throw new ValidationError(msg.validation);

    const token = await generateJWT(user);

    return { user, token };
  }

  async register ({ input }) {
    const user = await this.create({ input });
    const token = await generateJWT(user);

    return { user, token };
  }
}
