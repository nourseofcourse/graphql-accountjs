"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import bcrypt from 'bcryptjs'
const userSchema = new _mongoose.default.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 125
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 125
  },
  emails: {
    type: Array
  },
  username: {
    type: String,
    required: false,
    maxlength: 125
  },
  short_name: {
    type: String,
    limit: 255
  },
  // roles: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "role"
  //   }
  // ],
  lastLoginAt: {
    type: Date,
    required: false
  },
  lastLogoutAt: {
    type: Date,
    required: false
  },
  lastSigninIp: {
    type: String,
    required: false
  },
  settings: {
    theme: {
      type: String,
      required: false,
      default: 'LIGHT'
    }
  }
}, {
  timestamps: true
});
userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('first_name') || !user.isModified('last_name')) return next();
  user.short_name = (user.first_name.charAt(0) + user.last_name).toLowerCase();
  next();
});

const User = _mongoose.default.model('User', userSchema); // const roleSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     descriptiong: {
//       type: String
//     },
//     permissions: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: 'prermission'
//       }
//     ]
//   }
// )
// const permissionSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     description: {
//       type: String
//     }
//   }
// )
// userSchema.pre('save', function(next) {
//   let user = this
//   if(!user.isModified('password')) return next()
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) return next(err)
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err)
//       user.password = hash
//       next()
//     })
//   })
// })
// userSchema.methods.checkPassword = function(password) {
//   const passwordHash = this.password
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, passwordHash, (err, same) => {
//       if (err) {
//         return reject(err)
//       }
//       resolve(same)
//     })
//   })
// }
// const User = new mongoose.model('user', userSchema)
// const Role = new mongoose.model('role', roleSchema)
// const Permissions = new mongoose.model('permission', permissionSchema)
// module.export = [
//   User,
//   Role,
//   Permissions
// ]


exports.User = User;