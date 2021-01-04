const mongoose = require('mongoose')

const accountUserSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
      required: true
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      refs: "user",
      required: true
    },
    role_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "roles",
      required: true
    }
  },
  {
    timestamps: true
  }
)

const accountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255
    },
    default_time_zone: {
      type: String,
      maxlength: 255
    },
    allowed_services: {
      type: String,
      maxlength: 255
    }
  }
)

const Account = mongoose.model('account', accountSchema)
const AccountUser = mongoose.model('account_user', accountUserSchema)

modeule.export = {
  Account,
  AccountUser
}
