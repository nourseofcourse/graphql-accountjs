const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')

const lessonSchema = mongoose.Schema(
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module"
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'FUTURE', 'DRAFT', 'TRASH', 'INACTIVE']
    }
  },
  { timestamps: true }
)

lessonSchema.pre('save', function (next) {
  this.status = this.status.toUpperCase()
  next()
})
lessonSchema.plugin(URLSlugs('name', { field: 'slug' }))
lessonSchema.index({ name: 1, slug: 1 }, { unique: true })

export const Lesson = mongoose.model('Lesson', lessonSchema)
