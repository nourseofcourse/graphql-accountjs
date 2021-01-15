const mongoose = require('mongoose')

const stateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    code: {
      type: String,
      maxlength: 255,
      trim: true
    }
  },
  { timestamps: true }
)
   
stateSchema.index({ code: 1 }, { unique: true })
export const State = mongoose.model('State', stateSchema)

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    code: {
      type: String,
      maxlength: 255,
      trim: true
    }
  },
  { timestamps: true }
)

countrySchema.index({ code: 1 }, { unique: true })
export const Country = mongoose.model('Country', countrySchema)

const workshopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date
    },
    venues: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue"
    }],
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template"
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'FUTURE', 'DRAFT', 'TRASH', 'INACTIVE']
    },
    organizers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkshopAttendee"
    }]
  },
  { timestamps: true }
)

//workshopSchema.index({ code: 1 }, { unique: true })
workshopSchema.virtual('total_attendess')
  .get(function() {
    return this.attendees.length + this.attendees.guests.length
  })

workshopSchema.virtual('attendee_count')
  .get(function() {
    return this.attendees.length
  })
workshopSchema.virtual('attendee_guests_count')
  .get(function() {
    return this.attendees.guests.length
  })
export const Workshop = mongoose.model('Workshop', workshopSchema)

const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    about: {
      type: String
    },
    image: {
      type: String,
      maxlength: 255
    },
    address: {
      type: String,
      maxlength: 255
    },
    address_2: {
      type: String,
      maxlength: 255
    },
    city: {
      type: String,
      maxlength: 255
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State"
    },
    zip: {
      type: Number,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country"
    }
  },
  { timestamps: true }
)
    
venueSchema.index({ code: 1 }, { unique: true })
export const WorkshopVenue = mongoose.model('WorkshopVenue', venueSchema)

const templateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    preview_url: {
      type: String,
      maxlength: 255,
      trim: true
    },
    fields: {
      type: Array
    }
  },
  { timestamps: true }
)
    
templateSchema.index({ code: 1 }, { unique: true })
export const WorkshopTemplate = mongoose.model('WorkshopTemplate', templateSchema)

const attendeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    workshop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop"
    },
    status: {
      type: String,
      default: 'REGISTERED',
      enum: ['REGISTERED', 'ABANDONED', 'CANCELLED']
    },
    first_name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    last_name: {
      type: String,
      maxlength: 255,
      trim: true
    },
    phone: {
      type: String,
      maxlength: 255,
      trim: true
    },
    email: {
      type: String,
      maxlength: 255,
      trim: true
    },
    guests: {
      type: Array
    }
  },
  { timestamps: true }
)
    
attendeeSchema.index({ code: 1 }, { unique: true })
export const WorkshopAttendee = mongoose.model('WorkshopAttendee', attendeeSchema)