"use strict";

const gql = require('graphql-tag');

const typeDefs = gql`
  type Resource {
    id: ID!
    name: String!
    description: String
    link: String
    public: Boolean
    image_type: String
    image: String
  }

  type Query {
    getResource(id: ID!): Resource!
    getResources: [Resource]
  }

  input CreateResourceInput {
    name: String!
    description: String
    link: String
    public: Boolean
    image_type: String
    image: String
  }

  type Mutation {
    createResource(input: CreateResourceInput): Resource!
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers
};