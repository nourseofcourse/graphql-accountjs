const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')

const moduleSchema = mongoose.Schema(
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    }],
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'FUTURE', 'DRAFT', 'TRASH', 'INACTIVE']
    }
  },
  { timestamps: true }
)

moduleSchema.pre('save', function (next) {
  this.status = this.status.toUpperCase()
  next()
})
moduleSchema.plugin(URLSlugs('name', { field: 'slug' }))
moduleSchema.index({ name: 1, slug: 1 }, { unique: true })

export const Module = mongoose.model('Module', moduleSchema)
