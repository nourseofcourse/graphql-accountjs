"use strict";

const gql = require('graphql-tag');

const typeDefs = gql`
  # scalar JSONObject

  # enum Theme {
  #   DARK
  #   LIGHT
  # }

  # enum Role {
  #   ADMIN
  #   MEMBER
  #   GUEST
  # }

  # type User {
  #   id: ID!
  #   email: String!
  #   password: String!
  #   first_name: String!
  #   last_name: String!
  #   settings: JSONObject
  #   avatar: String
  #   time_zone: String
  #   role: String!
  #   verified: Boolean!
  # }

  # type AuthUser {
  #   token: String!
  #   user: User!
  # }

  # type Settings {
  #   id: ID!
  #   user: User!
  #   theme: Theme!
  #   emailNotifications: Boolean!
  #   pushNotifications: Boolean!
  # }

  # type Invite {
  #   email: String!
  #   from: User!
  #   createdAt: String!
  #   role: Role!
  # }

  # input UpdateSettingsInput {
  #   theme: Theme
  #   emailNotifications: Boolean
  #   pushNotifications: Boolean
  # }

  # input UpdateUserInput {
  #   email: String
  #   avatar: String
  #   verified: Boolean
  # }

  # input CreateUserInput {
  #   first_name: String!
  #   last_name: String!
  #   email: String!
  #   password: String!
  #   username: String!
  # }

  # input CreateRoleInput {
  #   name: String!
  #   description: String
  # }

  # input InviteInput {
  #   email: String!
  #   role: Role!
  # }

  # input SignupInput {
  #   email: String!
  #   password: String!
  #   role: Role!
  # }

  # input SigninInput {
  #   email: String!
  #   password: String!
  # }

  # extend type Query {
  #   me: User!
  #   userSettings: Settings!
  #   getUsers: [User]
  #   getRoles: [Role]
  # }

  # extend type Mutation {
  #   updateMe(input: UpdateUserInput!): User
  #   signup(input: SignupInput!): AuthUser!
  #   signin(input: SigninInput!): AuthUser!
  #   createUser(input: CreateUserInput!): User!
  #   createRole(input: CreateRoleInput): Role!
  # }

  extend type Query {
    getUsers2: [User]
  }

  extend type User {
    first_name: String
    last_name: String
  }

  type CreateUserInput {
    first_name: String
    last_name: String
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs,
  resolvers
};