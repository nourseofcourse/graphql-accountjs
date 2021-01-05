"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attachment = void 0;

const mongoose = require('mongoose');

const attachmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: false
  },
  alt: {
    type: String,
    required: false,
    trim: true
  },
  context_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'context'
  },
  context: {
    type: String,
    required: true,
    enum: ['Path', 'Course', 'Lesson']
  }
}, {
  timestamps: true
});
attachmentSchema.index({
  slug: 1
}, {
  unique: true
});
const Attachment = mongoose.model('Attachment', attachmentSchema);
exports.Attachment = Attachment;