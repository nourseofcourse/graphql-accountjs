"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accountSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 125
  }
});

const Account = _mongoose.default.model('Account', accountSchema);

exports.Account = Account;