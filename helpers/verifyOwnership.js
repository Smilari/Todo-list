import { Forbidden } from "./ErrorHandler.js";
import { messagesByLang as msg } from "./messages.js";

export const verifyOwnership = async (model, itemId, userId) => {
  const item = await model.getById({ id: itemId });
  if (item.owner.toString() !== userId.toString()) {
    throw new Forbidden(msg.error.forbidden);
  }
  return item;
};