import { ApiResponse } from "../helpers/ApiResponse.js";
import { messagesByLang as msg } from "../helpers/messages.js";


export class BaseController {
  constructor (model) {
    this.model = model;
  }

  async getAll (req, res) {
    const data = await this.model.getAll();
    res.json(new ApiResponse(data, 200, msg.success.fetch));
  }

  async getById (req, res) {
    const { id } = req.params;
    const data = await this.model.getById({ id });
    res.json(new ApiResponse(data, 200, msg.success.fetch));
  }

  async getByLoggedUser (req, res) {
    const { user } = req;
    const data = await this.model.getByFilter({ filter: { owner: user.id } });
    res.json(new ApiResponse(data, 200, msg.success.fetch));
  }

  async create (req, res) {
    const { body } = req;
    const data = await this.model.create({ input: body });
    res.status(201).json(new ApiResponse(data, 201, msg.success.create));
  }

  async update (req, res) {
    const { id } = req.params;
    const { body } = req;
    const data = await this.model.update({ id, input: body });
    res.json(new ApiResponse(data, 200, msg.success.update));
  }

  async delete (req, res) {
    const { id } = req.params;
    await this.model.delete({ id });
    res.status(204).json(new ApiResponse({}, 204, msg.success.delete));
  }
}