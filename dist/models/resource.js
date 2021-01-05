"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resource = void 0;

const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    trim: true
  },
  slug: {
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
  link: {
    type: String,
    maxlength: 255,
    default: ""
  },
  context_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  context: {
    type: String,
    required: true,
    enum: ['Course', 'Lesson']
  }
}, {
  timestamps: true
});
resourceSchema.index({
  slug: 1
}, {
  unique: true
});
const Resource = mongoose.model('Resource', resourceSchema);
exports.Resource = Resource;