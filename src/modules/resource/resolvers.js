import { Resource } from '../../models/resource'

const resolvers = {
  Query: {
    async getResource(_, {id}) {
      try {
        const resource = await Resource.findById(id)
        return resource
      } catch (e) {
        return e.message
      }
    },
    async getResources(_, __) {
      try {
        const resources = await Resource.find()
        return resources
      } catch (e) {
        return e.message
      }
    }
  },
  Mutation: {
    async createResource(_, {input}) {
      try {
        const resource = await Resource.create(input) 
        return resource
      } catch (e) {
        return e.message
      }
    }
  }
}

module.exports = resolvers