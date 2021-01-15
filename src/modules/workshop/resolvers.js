import { Country, State, Workshop, WorkshopVenue, WorkshopTemplate, WorkshopAttendee } from './model'
import { User } from '../user/model'
import { scalars } from 'graphql-scalars'
const resolvers = {
  ...scalars,
  Query: {
    // States
    async state(_, {id}) {
      try {
        const state = await State.findById(id)
        return state
      } catch (e) {
        return e.message
      }
    },
    async states(_, __) {
      try {
        const states = await State.find()
        return states
      } catch (e) {
        return e.message
      }
    },
    // Countries
    async country(_, {id}) {
      try {
        const country = await Country.findById(id)
        return country
      } catch (e) {
        return e.message
      }
    },
    async countries(_, __) {
      try {
        const countries = await Country.find()
        return countries
      } catch (e) {
        return e.message
      }
    },
    // Workshops
    async workshop(_, {id}) {
      try {
        const workshop = await Workshop.findById(id)
        return workshop
      } catch (e) {
        return e.message
      }
    },
    async workshops(_, __) {
      try {
        const workshops = await Workshop.find()
        return workshops
      } catch (e) {
        return e.message
      }
    },
    // Venues
    async venue(_, {id}) {
      try {
        const venue = await WorkshopVenue.findById(id)
        return venue
      } catch (e) {
        return e.message
      }
    },
    async venues(_, __) {
      try {
        const venues = await WorkshopVenue.find()
        return venues
      } catch (e) {
        return e.message
      }
    },
    // Templates
    async template(_, {id}) {
      try {
        const template = await WorkshopTemplate.findById(id)
        return template
      } catch (e) {
        return e.message
      }
    },
    async templates(_, __) {
      try {
        const templates = await WorkshopTemplate.find()
        return templates
      } catch (e) {
        return e.message
      }
    },
    // Attendees
    async attendee(_, {id}) {
      try {
        const attendee = await WorkshopAttendee.findById(id)
        return attendee
      } catch (e) {
        return e.message
      }
    },
    async attendees(_, __) {
      try {
        const attendees = await WorkshopAttendee.find()
        return attendees
      } catch (e) {
        return e.message
      }
    },
  },
  Mutation: {
    async createState(_, {input}) {
      try {
        const state = await State.create(input) 
        return state
      } catch (e) {
        return e.message
      }
    },
    async updateState(_, {id, input}) {
      try {
        const state = await State.findByIdAndUpdate(id, input)
        return state
      } catch(e) {
        console.error(e)
      }
    },
    async deleteState(_, {id}) {
      try {
        await State.findByIdAndDelete(id)
        return true
      } catch(e) {
        console.log(e)
      }
    },
    async createCountry(_, {input}) {
      try {
        const country = await Country.create(input) 
        return country
      } catch (e) {
        return e.message
      }
    },
    async updateCountry(_, {id, input}) {
      try {
        const country = await Country.findByIdAndUpdate(id, input)
        return country
      } catch(e) {
        console.error(e)
      }
    },
    async deleteCountry(_, {id}) {
      try {
        await Country.findByIdAndDelete(id)
        return true
      } catch(e) {
        console.log(e)
      }
    },
    async createVenue(_, {input}) {
      try {
        const venue = await WorkshopVenue.create(input) 
        return venue
      } catch (e) {
        return e.message
      }
    },
    async updateVenue(_, {id, input}) {
      try {
        const venue = await WorkshopVenue.findByIdAndUpdate(id, input)
        return venue
      } catch(e) {
        console.error(e)
      }
    },
    async deleteVenue(_, {id}) {
      try {
        await WorkshopVenue.findByIdAndDelete(id)
        return true
      } catch(e) {
        console.log(e)
      }
    },
    async createWorkshop(_, {input}) {
      try {
        const workshop = await Workshop.create(input) 
        return workshop
      } catch (e) {
        return e.message
      }
    },
    async updateWorkshop(_, {id, input}) {
      try {
        const workshop = await Workshop.findByIdAndUpdate(id, input)
        return workshop
      } catch(e) {
        console.error(e)
      }
    },
    async deleteWorkshop(_, {id}) {
      try {
        await Workshop.findByIdAndDelete(id)
        return true
      } catch(e) {
        console.log(e)
      }
    },
    async addWorkshopAttendee(_, {input}) {
      try {
        const attendee = await WorkshopAttendee.create(input) 
        return attendee
      } catch (e) {
        return e.message
      }
    },
    async updateWorkshopAttendee(_, {id, input}) {
      try {
        const attendee = await WorkshopAttendee.findByIdAndUpdate(id, input)
        return attendee
      } catch(e) {
        console.error(e)
      }
    },
    async deleteWorkshopAttendee(_, {id}) {
      try {
        await WorkshopAttendee.findByIdAndDelete(id)
        return true
      } catch(e) {
        console.log(e)
      }
    }
  },
  Venue: {
    state(venue, __) {
      return State.findById(venue.state)
    },
    country(venue, __) {
      return Country.findById(venue.country)
    }
  },
  Workshop: {
    agent(workshop, __) {
      return User.findById(workshop.agent)
    },
    organizers(workshop, __) {
      return User.find({
        '_id': { $in: workshop.organizers }
      })
    },
    venues(workshop, __) {
      return WorkshopVenue.find({
        '_id': { $in: workshop.venues }
      })
    },
    attendees(workshop, __) {
      return WorkshopAttendee.find({
        '_id': {
          $in: workshop.attendees
        }
      })
    }
  }
}

module.exports = resolvers