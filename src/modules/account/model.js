import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 125
    }
  }
)

export const Account = mongoose.model('Account', accountSchema)