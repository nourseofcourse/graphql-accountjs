import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 125
    },
    avatar: {
      type: String,
      maxlength: 255,
      trim: true,
      default: ""
    },
    owners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    agents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'DRAFT', 'TRASH', 'INACTIVE']
    }
  }
)

export const Account = mongoose.model('Account', accountSchema)