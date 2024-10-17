import { NotFound } from "../helpers/ErrorHandler.js";

export class BaseController {
  constructor (model, notFoundMsg) {
    this.model = model;
    this.notFoundMsg = notFoundMsg;
  }

  async getAll (req, res) {
    const data = await this.model.getAll();
    res.json(data);
  }

  async getById (req, res) {
    const { id } = req.params;
    const data = await this.model.getById({ id });
    if (!data) throw new NotFound(this.notFoundMsg);

    res.json(data);
  }

  async create (req, res) {
    const { body } = req;
    const data = await this.model.create({ ...body });
    res.status(201).json(data);
  }

  async update (req, res) {
    const { id } = req.params;
    const { body } = req;
    const data = await this.model.update({ id, ...body });
    if (!data) throw new NotFound(this.notFoundMsg);

    res.json(data);
  }

  async delete (req, res) {
    const { id } = req.params;
    const data = await this.model.delete({ id });
    if (!data) throw new NotFound(this.notFoundMsg);

    res.status(204).send();
  }
}