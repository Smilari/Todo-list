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

  async getByFilter ({ filter }) {
    return this.model.find(filter);
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
}