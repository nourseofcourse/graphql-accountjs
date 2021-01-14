"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Course = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const URLSlugs = require('mongoose-url-slugs');

const courseSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    maxlength: 255,
    trim: true
  },
  description: {
    type: String,
    maxlength: 16777215,
    trim: true,
    default: ""
  },
  thumbnail: {
    type: String,
    maxlength: 255,
    trim: true,
    default: ""
  },
  public: {
    type: Boolean,
    default: false
  },
  modules: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Module"
  }],
  lessons: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Lesson"
  }],
  status: {
    type: String,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'FUTURE', 'DRAFT', 'TRASH', 'INACTIVE']
  }
}, {
  timestamps: true
});
courseSchema.pre('save', function (next) {
  this.status = this.status.toUpperCase();
  next();
});
courseSchema.virtual('lesson_count').get(function () {
  return this.lessons.length;
});
courseSchema.virtual('module_count').get(function () {
  return this.modules.length;
});
courseSchema.plugin(URLSlugs('name', {
  field: 'slug'
}));
courseSchema.index({
  name: 1,
  slug: 1
}, {
  unique: true
});

const Course = _mongoose.default.model('Course', courseSchema);

exports.Course = Course;