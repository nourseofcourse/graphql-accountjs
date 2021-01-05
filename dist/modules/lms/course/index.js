"use strict";

const gql = require('graphql-tag');

const typeDefs = gql`
  enum CourseStatus {
    ACTIVE
    FUTURE
    DRAFT
    TRASH
    INACTIVE
  }

  type Course {
    id: ID!
    name: String!
    description: String
    slug: String!
    thumbnail: String
    public: Boolean
    status: CourseStatus
    lesson_count: Int
  }

  input CreateCourseInput {
    name: String!
    description: String
    slug: String
    thumbnail: String
    public: Boolean
    status: CourseStatus
  }

  extend type Query {
    getCourse(id: ID!): Course!
    getCourses: [Course]
  }

  extend type Mutation {
    createCourse(input: CreateCourseInput): Course!
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers
};