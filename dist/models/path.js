"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = void 0;

const mongoose = require('mongoose');

const URLSlugs = require('mongoose-url-slugs');

const pathSchema = mongoose.Schema({
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
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  status: {
    type: String,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'FUTURE', 'DRAFT', 'TRASH', 'INACTIVE']
  }
}, {
  timestamps: true
});
pathSchema.pre('save', function (next) {
  this.status = this.status.toUpperCase();
  next();
});
pathSchema.virtual('course_count').get(function () {
  return this.courses.length;
});
pathSchema.plugin(URLSlugs('name', {
  field: 'slug'
}));
pathSchema.index({
  name: 1,
  slug: 1
}, {
  unique: true
});
const Path = mongoose.model('Path', pathSchema);
exports.Path = Path;