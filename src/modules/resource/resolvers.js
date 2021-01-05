import { Resource } from '../../models/resource'

const resolvers = {
  Query: {
    async resource(_, {id}) {
      try {
        const resource = await Resource.findById(id)
        return resource
      } catch (e) {
        return e.message
      }
    },
    async resources(_, __) {
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
    },
    async updateResource(_, {id, input}) {
      try {
        const resource = await Resource.findByIdAndUpdate(id, input)
        console.log(resource)
      } catch(e) {
        console.error(e)
      }
      console.log(input)
    }
  }
}

module.exports = resolvers