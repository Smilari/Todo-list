export class BaseController {
  constructor (model) {
    this.model = model;
  }

  async getAll (req, res) {
    const data = await this.model.getAll();
    res.json(data);
  }

  async getById (req, res) {
    const { id } = req.params;
    const data = await this.model.getById({ id });
    res.json(data);
  }

  async create (req, res) {
    const { body } = req;
    const data = await this.model.create({ input: body });
    res.status(201).json(data);
  }

  async update (req, res) {
    const { id } = req.params;
    const { body } = req;
    const data = await this.model.update({ id, input: body });
    res.json(data);
  }

  async delete (req, res) {
    const { id } = req.params;
    await this.model.delete({ id });
    res.status(204).send();
  }
}