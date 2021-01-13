"use strict";

const gql = require('graphql-tag');

const typeDefs = gql`


`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers
};