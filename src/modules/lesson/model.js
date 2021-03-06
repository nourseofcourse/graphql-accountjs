import mongoose from 'mongoose'
const URLSlugs = require('mongoose-url-slugs')

const courseSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module"
    }],
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    }],
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'FUTURE', 'DRAFT', 'TRASH', 'INACTIVE']
    }
  }, { timestamps: true }
)

courseSchema.pre('save', function (next) {
  this.status = this.status.toUpperCase()
  next()
})
courseSchema.virtual('lesson_count')
  .get(function() {
    return this.lessons.length
  })

courseSchema.virtual('module_count')
  .get(function() {
    return this.modules.length
  })
courseSchema.plugin(URLSlugs('name', { field: 'slug' }))
courseSchema.index({ name: 1, slug: 1 }, { unique: true })

export const Course = mongoose.model('Course', courseSchema)