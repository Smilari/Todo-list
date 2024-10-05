import { TaskSchema } from '../schemas/tasks.js'

export class TaskModel {
  static async getAll () {
    return TaskSchema.find({})
  }

  static async getById ({ id }) {
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async create ({ input }) {
    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}
