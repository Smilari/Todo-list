import mongoose from 'mongoose'
// eslint-disable-next-line camelcase
import mongoose_sequence from 'mongoose-sequence'

const AutoIncrement = mongoose_sequence(mongoose)

const Schema = mongoose.Schema

export const taskSchema = new Schema(
  {
    _id: {
      type: Number
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    creationDate: {
      type: Date,
      default: Date.now,
      required: true
    },
    limitDate: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      enum: ['Pendiente', 'En Progreso', 'Terminado'],
      required: true
    },
    priority: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false, // Esto oculta el campo __v
    _id: false // Esto oculta el campo _id (ObjectId de la BD)
  }
)

// AutoIncrement al campo `id`
taskSchema.plugin(AutoIncrement, { inc_field: '_id' })
