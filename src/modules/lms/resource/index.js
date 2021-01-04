const gql = require('graphql-tag')

const typeDefs = gql`
  type Resource {
    name: String
    slug: String
    description: String
    link: String
    context_id: Int
    context: String
  }

  input uploadSingleResourceInput {
    name: String
    slug: String!
    description: String
    link: String
    context_id: Int
    context: String
  }

  extend type Query {
    getResource(id: ID!): Resource!
    getResources(id: ID): [Resource]
  }

  extend type Mutation {
    uploadSingleResource(input: uploadSingleResourceInput!): Resource!
  }
`

const resolvers = require('./resolvers')

module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
