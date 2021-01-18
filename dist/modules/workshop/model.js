"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkshopAttendee = exports.WorkshopTemplate = exports.WorkshopVenue = exports.Workshop = exports.Country = exports.State = void 0;

var _twilio = _interopRequireDefault(require("twilio"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoose = require('mongoose');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioRegion = process.env.TWILIO_REGION;
const twilioEdge = process.env.TWILIO_EDGE;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const stateSchema = mongoose.Schema({
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
}, {
  timestamps: true
});
stateSchema.index({
  code: 1
}, {
  unique: true
});
const State = mongoose.model('State', stateSchema);
exports.State = State;
const countrySchema = mongoose.Schema({
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
}, {
  timestamps: true
});
countrySchema.index({
  code: 1
}, {
  unique: true
});
const Country = mongoose.model('Country', countrySchema);
exports.Country = Country;
const workshopSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    trim: true
  },
  start_date: {
    type: Date
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
}, {
  timestamps: true
}); //workshopSchema.index({ code: 1 }, { unique: true })

workshopSchema.virtual('total_attendess').get(function () {
  return this.attendees.length + this.attendees.guests.length;
});
workshopSchema.virtual('attendee_count').get(function () {
  return this.attendees.length;
});
workshopSchema.virtual('attendee_guests_count').get(function () {
  return this.attendees.guests.length;
});

workshopSchema.methods.requiresNotification = function (date) {
  return Math.round(_moment.default.duration((0, _moment.default)(this.start_date).tz(this.timeZone).utc().diff((0, _moment.default)(date).utc())).asMinutes()) === this.notifcations;
};

workshopSchema.statics.sendNotifications = function (callback) {
  // now
  const searchDate = new Date();
  Workshop.find().then(function (workshops) {
    workshops = workshops.filter(function (workshop) {
      return workshop.requiresNotification(searchDate);
    });
  });
  /**
   * Send messages to all attendees via Twilio
   * @param array workshops list of attendees
   */

  function sendNotifications(workshops) {
    const client = (0, _twilio.default)(accountSid, authToken, {
      lazyLoading: true,
      region: twilioRegion,
      edge: twilioEdge
    });
    workshops.forEach(workshop => {
      // create options to send message
      const options = {
        to: `+1${workshop.phone}`,
        from: twilioNumber,

        /* eslint-disable max-len */
        body: `Hi ${appointment.first_name}. Just a reminder that you have an workshop tomorrow at 5pm.`
        /* eslint-enable max-len */

      }; // Send the message!

      client.messages.create(options, (err, response) => {
        if (err) {
          console.error(err);
        } else {
          // Log the last few difits of a phone number
          let masked = workshop.phone.substr(0, workshop.phone.length - 5);
          masked += '*****';
          console.log(`Message sent to ${masked}`);
        }
      });
    }); // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery

    if (callback) {
      callback.call();
    }
  }
};

const Workshop = mongoose.model('Workshop', workshopSchema);
exports.Workshop = Workshop;
const venueSchema = mongoose.Schema({
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
    type: Number
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country"
  }
}, {
  timestamps: true
});
venueSchema.virtual('google_maps_address').get(function () {
  return `${this.address} ${this.address_2}, ${this.city}, ${this.state.name} ${this.zip}`;
});
venueSchema.index({
  code: 1
}, {
  unique: true
});
const WorkshopVenue = mongoose.model('WorkshopVenue', venueSchema);
exports.WorkshopVenue = WorkshopVenue;
const templateSchema = mongoose.Schema({
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
}, {
  timestamps: true
});
templateSchema.index({
  code: 1
}, {
  unique: true
});
const WorkshopTemplate = mongoose.model('WorkshopTemplate', templateSchema);
exports.WorkshopTemplate = WorkshopTemplate;
const attendeeSchema = mongoose.Schema({
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
}, {
  timestamps: true
});
attendeeSchema.index({
  code: 1
}, {
  unique: true
});
const WorkshopAttendee = mongoose.model('WorkshopAttendee', attendeeSchema);
exports.WorkshopAttendee = WorkshopAttendee;