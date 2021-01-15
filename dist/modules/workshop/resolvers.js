"use strict";

var _model = require("./model");

var _model2 = require("../user/model");

var _graphqlScalars = require("graphql-scalars");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const resolvers = _objectSpread(_objectSpread({}, _graphqlScalars.scalars), {}, {
  Query: {
    // States
    async state(_, {
      id
    }) {
      try {
        const state = await _model.State.findById(id);
        return state;
      } catch (e) {
        return e.message;
      }
    },

    async states(_, __) {
      try {
        const states = await _model.State.find();
        return states;
      } catch (e) {
        return e.message;
      }
    },

    // Countries
    async country(_, {
      id
    }) {
      try {
        const country = await _model.Country.findById(id);
        return country;
      } catch (e) {
        return e.message;
      }
    },

    async countries(_, __) {
      try {
        const countries = await _model.Country.find();
        return countries;
      } catch (e) {
        return e.message;
      }
    },

    // Workshops
    async workshop(_, {
      id
    }) {
      try {
        const workshop = await _model.Workshop.findById(id);
        return workshop;
      } catch (e) {
        return e.message;
      }
    },

    async workshops(_, __) {
      try {
        const workshops = await _model.Workshop.find();
        return workshops;
      } catch (e) {
        return e.message;
      }
    },

    // Venues
    async venue(_, {
      id
    }) {
      try {
        const venue = await _model.WorkshopVenue.findById(id);
        return venue;
      } catch (e) {
        return e.message;
      }
    },

    async venues(_, __) {
      try {
        const venues = await _model.WorkshopVenue.find();
        return venues;
      } catch (e) {
        return e.message;
      }
    },

    // Templates
    async template(_, {
      id
    }) {
      try {
        const template = await _model.WorkshopTemplate.findById(id);
        return template;
      } catch (e) {
        return e.message;
      }
    },

    async templates(_, __) {
      try {
        const templates = await _model.WorkshopTemplate.find();
        return templates;
      } catch (e) {
        return e.message;
      }
    },

    // Attendees
    async attendee(_, {
      id
    }) {
      try {
        const attendee = await _model.WorkshopAttendee.findById(id);
        return attendee;
      } catch (e) {
        return e.message;
      }
    },

    async attendees(_, __) {
      try {
        const attendees = await _model.WorkshopAttendee.find();
        return attendees;
      } catch (e) {
        return e.message;
      }
    }

  },
  Mutation: {
    async createState(_, {
      input
    }) {
      try {
        const state = await _model.State.create(input);
        return state;
      } catch (e) {
        return e.message;
      }
    },

    async updateState(_, {
      id,
      input
    }) {
      try {
        const state = await _model.State.findByIdAndUpdate(id, input);
        return state;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteState(_, {
      id
    }) {
      try {
        await _model.State.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    },

    async createCountry(_, {
      input
    }) {
      try {
        const country = await _model.Country.create(input);
        return country;
      } catch (e) {
        return e.message;
      }
    },

    async updateCountry(_, {
      id,
      input
    }) {
      try {
        const country = await _model.Country.findByIdAndUpdate(id, input);
        return country;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteCountry(_, {
      id
    }) {
      try {
        await _model.Country.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    },

    async createVenue(_, {
      input
    }) {
      try {
        const venue = await _model.WorkshopVenue.create(input);
        return venue;
      } catch (e) {
        return e.message;
      }
    },

    async updateVenue(_, {
      id,
      input
    }) {
      try {
        const venue = await _model.WorkshopVenue.findByIdAndUpdate(id, input);
        return venue;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteVenue(_, {
      id
    }) {
      try {
        await _model.WorkshopVenue.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    },

    async createWorkshop(_, {
      input
    }) {
      try {
        const workshop = await _model.Workshop.create(input);
        return workshop;
      } catch (e) {
        return e.message;
      }
    },

    async updateWorkshop(_, {
      id,
      input
    }) {
      try {
        const workshop = await _model.Workshop.findByIdAndUpdate(id, input);
        return workshop;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteWorkshop(_, {
      id
    }) {
      try {
        await _model.Workshop.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    },

    async addWorkshopAttendee(_, {
      input
    }) {
      try {
        const attendee = await _model.WorkshopAttendee.create(input);
        return attendee;
      } catch (e) {
        return e.message;
      }
    },

    async updateWorkshopAttendee(_, {
      id,
      input
    }) {
      try {
        const attendee = await _model.WorkshopAttendee.findByIdAndUpdate(id, input);
        return attendee;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteWorkshopAttendee(_, {
      id
    }) {
      try {
        await _model.WorkshopAttendee.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    }

  },
  Venue: {
    state(venue, __) {
      return _model.State.findById(venue.state);
    },

    country(venue, __) {
      return _model.Country.findById(venue.country);
    }

  },
  Workshop: {
    agent(workshop, __) {
      return _model2.User.findById(workshop.agent);
    },

    organizers(workshop, __) {
      return _model2.User.find({
        '_id': {
          $in: workshop.organizers
        }
      });
    },

    venues(workshop, __) {
      return _model.WorkshopVenue.find({
        '_id': {
          $in: workshop.venues
        }
      });
    },

    attendees(workshop, __) {
      return _model.WorkshopAttendee.find({
        '_id': {
          $in: workshop.attendees
        }
      });
    }

  }
});

module.exports = resolvers;