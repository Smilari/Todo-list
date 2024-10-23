import { NotFound } from "../helpers/ErrorHandler.js";

export class BaseModel {
  constructor (model, notFoundMessage) {
    this.model = model;
    this.notFoundMessage = notFoundMessage;
  }

  async getAll () {
    return this.model.find({});
  }

  async getById ({ id }) {
    const doc = await this.model.findById(id);
    if (!doc) throw new NotFound(this.notFoundMessage);

    return doc;
  }

  async create ({ input, session }) {
    const doc = new this.model(input);

    return doc.save({ session });
  }

  async update ({ id, input, session }) {
    const doc = await this.model.findByIdAndUpdate(id, input,
      { session, new: true, runValidators: true });
    if (!doc) throw new NotFound(this.notFoundMessage);

    return doc;
  }

  async delete ({ id, session }) {
    const doc = await this.model.findByIdAndDelete(id, { session });
    if (!doc) throw new NotFound(this.notFoundMessage);

    return doc;
  }

  async insertItemInArray ({ id, arrayName, item, session }) {
    return this.model.findByIdAndUpdate(id, { $push: { [arrayName]: item } },
      { session, new: true, runValidators: true });
  }

  async updateItemInArray ({ id, arrayName, item, session }) {
    const doc = await this.model.findOneAndUpdate({ _id: id, [`${arrayName}._id`]: item.id },
      { $set: { [`${arrayName}.$`]: item } },
      { session, new: true, runValidators: true });
    if (!doc) throw new NotFound(this.notFoundMessage);

    return doc;
  }

  async deleteItemInArray ({ id, arrayName, item, session }) {
    const doc = await this.model.findOneAndUpdate({ _id: id, [`${arrayName}._id`]: item.id },
      { $pull: { [arrayName]: { _id: item.id } } },
      { session, new: true, runValidators: true });
    if (!doc) throw new NotFound(this.notFoundMessage);

    return doc;
  }
}