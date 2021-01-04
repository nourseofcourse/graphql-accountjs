import { Path } from '../../../models/path'

const resolvers = {
  Query: {
    async getPath(_, {id}) {
      try {
        const path = await Path.findOne(id)
        return path
      } catch (e) {
        return e.message
      }
    },
    async getPaths(_, __) {
      try {
        const paths = await Path.find()
          .populate('courses')
        console.log(paths)
        return paths
      } catch (e) {
        console.log(e)
        return e.message
      }
    }
  },
  Mutation: {
    async createPath(_, {input}) {
      try {
        const path = await Path.create(input)
        return path
      } catch(e) {
        return e.message
      }
    }
  }
}

module.exports = resolvers
