"use strict";

const gql = require('graphql-tag');

const typeDefs = gql`

  enum WorkshopStatus {
    ACTIVE
    FUTURE
    DRAFT
    TRASH
    INACTIVE
  }

  enum WorkshopType {
    SOCIALSECURITY
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
    start_date: String
    end_date: String
    type: WorkshopType
    venues: [Venue]
    template: WorkshopTemplate
    status: WorkshopStatus
    organizers: [User]
    attendees: [WorkshopAttendee]
  }

  type WorkshopAttendee {
    id: ID!
    workshop_id: Workshop!
    status: RegistrationStatus
  }

  type WorkshopTemplate {
    id: ID!
    name: String!
    preview_url: String
    fields: Array
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
    zip: int
    country: Country
  }

  type Query {
    venue(id: ID!): Venue!
    venues: [Venue]
    workshop(id: ID!): Workshop!
    workshops: [Workshop]
    state(id: ID!): State!
    states: [States]
    country(id: ID!): Country!
    countries: [Country]
    template(id: ID!): WorkshopTemplate!
    templates: [WorkshopTemplate]
    attendee(id: ID!): WorkshopAttendee!
    attendees: [WorkshopAttendee]
  }

  type Mutation {

  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers
};