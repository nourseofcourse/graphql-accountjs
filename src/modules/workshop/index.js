const gql = require('graphql-tag')

const typeDefs = gql`
  scalar DateTime
  enum WorkshopStatus {
    ACTIVE
    FUTURE
    DRAFT
    TRASH
    INACTIVE
  }

  enum RegistrationStatus {
    REGISTERED
    ABANDONED
    CANCELLED
  }

  type Workshop {
    id: ID!
    name: String!
    agent: User!
    start_date: DateTime
    end_date: DateTime
    venues: [Venue]
    template: WorkshopTemplate
    status: WorkshopStatus
    organizers: [User]
    attendees: [WorkshopAttendee]
    attendee_count: Int
  }

  type WorkshopAttendee {
    id: ID!
    workshop_id: Workshop!
    status: RegistrationStatus
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
    guests: String
  }

  type WorkshopTemplate {
    id: ID!
    name: String!
    preview_url: String
    fields: String
  }

  type Country {
    id: ID!
    name: String!
    code: String!
  }

  type State {
    id: ID!
    name: String!
    code: String!
  }

  type Venue {
    id: ID!
    name: String!
    about: String
    image: String
    address: String!
    address_2: String
    city: String
    state: State
    zip: Int
    country: Country
    google_maps_address: String
  }

  input CreateWorkshopInput {
    name: String!
    #agent: User!
    agent: String
    start_date: String
    end_date: String
    #venues: [Venue]
    venues: [String]
    #template: WorkshopTemplate
    template: String
    status: WorkshopStatus
    #organizers: [User]
    organizers: [String]
    #attendees: [WorkshopAttendee]
    attendees: [String]
  }

  input UpdateWorkshopInput {
    name: String
    #agent: User
    agent: String
    start_date: String
    end_date: String
    #venues: [Venue]
    venues: [String]
    #template: WorkshopTemplate
    template: String
    status: WorkshopStatus
    #organizers: [User]
    organizers: [String]
    #attendees: [WorkshopAttendee]
    attendees: [String]
  }

  input AddWorkshopAttendeeInput {
    #workshop_id: Workshop!
    workshop_id: String
    status: RegistrationStatus
    first_name: String!
    last_name: String!
    phone: String!
    email: String!
    guests: String
  }

  input UpdateWorkshopAttendeeInput {
    #workshop_id: Workshop!
    workshop_id: String
    status: RegistrationStatus
    first_name: String
    last_name: String
    phone: String
    email: String
    guests: String
  }

  input CreateWorkshopTemplateInput {
    name: String!
    preview_url: String
    fields: String
  }

  input UpdateWorkshopTemplateInput {
    name: String!
    preview_url: String
    fields: String
  }

  input CreateVenueInput {
    name: String!
    about: String
    image: String
    address: String!
    address_2: String
    city: String
    #state: State
    state: String
    zip: Int
    #country: Country
    country: String
  }

  input UpdateVenueInput {
    name: String
    about: String
    image: String
    address: String!
    address_2: String
    city: String
    #state: State
    state: String
    zip: Int
    #country: Country
    country: String
  }

  input CreateStateInput {
    name: String!
    code: String!
  }

  input UpdateStateInput {
    name: String
    code: String
  }

  input CreateCountryInput {
    name: String!
    code: String!
  }

  input UpdateCountryInput {
    name: String
    code: String
  }

  type Query {
    venue(id: ID!): Venue!
    venues: [Venue]
    workshop(id: ID!): Workshop!
    workshops: [Workshop]
    state(id: ID!): State!
    states: [State]
    country(id: ID!): Country!
    countries: [Country]
    template(id: ID!): WorkshopTemplate!
    templates: [WorkshopTemplate]
    attendee(id: ID!): WorkshopAttendee!
    attendees: [WorkshopAttendee]
  }

  type Mutation {
    createState(input: CreateStateInput): State!
    updateState(id: ID!, input: UpdateStateInput): State!
    deleteState(id: ID!): Boolean
    createCountry(input: CreateCountryInput): Country!
    updateCountry(id: ID!, input: UpdateCountryInput): Country!
    deleteCountry(id: ID!): Boolean
    createWorkshop(input: CreateWorkshopInput): Workshop!
    updateWorkshop(id: ID!, input: UpdateWorkshopInput): Workshop!
    deleteWorkshop(id: ID!): Boolean
    createWorkshopTemplate(input: CreateWorkshopTemplateInput): WorkshopTemplate!
    updateWorkshopTemplate(id: ID!, input: UpdateWorkshopTemplateInput): WorkshopTemplate!
    deleteWorkshopTemplate(id: ID!): Boolean
    createVenue(input: CreateVenueInput): Venue!
    updateVenue(id: ID!, input: UpdateVenueInput): Venue!
    deleteVenue(id: ID!): Boolean
    addWorkshopAttendee(input: AddWorkshopAttendeeInput): WorkshopAttendee!
    updateWorkshopAttendee(id: ID!, input: UpdateWorkshopAttendeeInput): WorkshopAttendee!
    deleteWorkshopAttendee(id: ID!): Boolean
  }
`

const resolvers = require('./resolvers')

module.exports = {
  typeDefs,
  resolvers
}