"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  username: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true
  },
  short_name: {
    type: String,
    limit: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  roles: [{
    type: _mongoose.default.Schema.ObjectId,
    ref: "role"
  }],
  avatar: {
    type: String,
    maxlength: 255,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  timeZone: {
    type: String,
    required: false
  },
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
      default: 'DARK'
    },
    emailNotifications: {
      type: Boolean,
      required: false
    },
    pushNotification: {
      type: Boolean,
      required: false
    }
  }
}, {
  timestamps: true
});
const roleSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  descriptiong: {
    type: String
  },
  permissions: [{
    type: _mongoose.default.Schema.ObjectId,
    ref: 'prermission'
  }]
});
const permissionSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});
userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  _bcryptjs.default.genSalt(10, function (err, salt) {
    if (err) return next(err);

    _bcryptjs.default.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('first_name') || !user.isModified('last_name')) return next();
  user.short_name = (user.first_name.charAt(0) + user.last_name).toLowerCase();
  next();
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    _bcryptjs.default.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

const User = new _mongoose.default.model('user', userSchema);
const Role = new _mongoose.default.model('role', roleSchema);
const Permissions = new _mongoose.default.model('permission', permissionSchema);
module.export = [User, Role, Permissions];