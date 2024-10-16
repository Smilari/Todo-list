import { Project } from "../schemas/Project.js";

export class ProjectModel {
  static async getAll() {
    return Project.find({});
  }

  static async getById({ id }) {
    return Project.findById(id);
  }

  static async create({
    title,
    description,
    dueDate,
    status,
    category,
    tasks,
  }) {
    const session = await Project.startSession();
    session.startTransaction();

    try {
      const input = {
        title,
        description,
        dueDate,
        status,
        category,
        tasks,
      };
      const project = new Project(input);
      await project.save({ session });

      //Asignar proyecto a usuario?
      /*await UserModel.insertProjectToUser({
        id: userId,
        projectId: project.id,
        title,
        description,
        dueDate,
        status,
        category,
        tasks,
      });*/

      await session.commitTransaction();
      return project;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  static async update({
    id,
    title,
    description,
    dueDate,
    status,
    category,
    tasks,
  }) {
    const input = { title, description, dueDate, status, category, tasks };
    return Project.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    }); // new: true devuelve el objeto actualizado
  }

  static async delete({ id }) {
    return Project.findByIdAndDelete(id);
  }
}
