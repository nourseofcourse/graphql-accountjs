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
    resource(id: ID!): Resource!
    resources: [Resource]
  }

  input CreateResourceInput {
    name: String!
    description: String
    link: String
    public: Boolean
    image_type: String
    image: String
  }

  input UpdateResourceInput  {
    name: String
    description: String
    link: String
    public: Boolean
    image_type: String
    image: String
  }

  type Mutation {
    createResource(input: CreateResourceInput): Resource!
    updateResource(id: ID!, input: UpdateResourceInput): Resource!
    deleteResource(id: ID!): Boolean
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers
};