"use strict";

const gql = require('graphql-tag');

const typeDefs = gql`
  enum AccountStatus {
    ACTIVE
    DRAFT
    TRASH
    INACTIVE
  }

  type Account {
    id: ID!
    name: String!
    avatar: String
    owners: [User]
    agents: [User]
    status: AccountStatus
  }

  input CreateAccountInput {
    name: String!
    avatar: String
    owners: [String]
    agents: [String]
    status: AccountStatus
  }

  input UpdateAccountInput {
    name: String
    avatar: String
    owners: [String]
    agents: [String]
    status: AccountStatus
  }

  type Query {
    account(id: ID!): Account!
    accounts: [Account]
  }

  type Mutation {
    createAccount(input: CreateAccountInput): Account!
    updateAccount(id: ID!, input: UpdateAccountInput): Account!
    deleteAccount(id: ID!): Boolean
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers
};