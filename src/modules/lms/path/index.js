const gql = require('graphql-tag')

const typeDefs = gql`
  enum PathStatus {
    ACTIVE
    FUTURE
    DRAFT
    TRASH
    INACTIVE
  }

  type Path {
    id: ID!
    name: String!
    description: String
    slug: String!
    thumbnail: String
    public: Boolean
    status: PathStatus
    courses: [Course]
    course_count: Int
  }

  input CreatePathInput {
    name: String!
    description: String
    slug: String
    thumbnail: String
    public: Boolean
    status: PathStatus
    courses: [String]
  }

  extend type Query {
    getPath(id: ID!): Path!
    getPaths: [Path]
  }

  extend type Mutation {
    createPath(input: CreatePathInput): Path!
  }
`

const resolvers = require('./resolvers')

module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
