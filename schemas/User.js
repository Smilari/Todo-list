import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
// eslint-disable-next-line camelcase

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
    },
  },
  {
    versionKey: false, // Esto oculta el campo __v
    timestamps: true,
  },
)

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  const user = this

  // Si la contraseña no ha sido modificada, no necesitamos encriptarla de nuevo
  if (!user.isModified('password')) return next()

  // Encripta la contraseña antes de guardar el usuario
  try {
    user.password = await bcrypt.hash(user.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

export const User = mongoose.model('User', userSchema)