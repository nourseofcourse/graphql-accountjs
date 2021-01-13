import Course from './model'

const resolvers = {
  Query: {
    async getCourse(_, {id}) {
      try {
        const course = await Course.findOne(id)
        return course
      } catch (e) {
        return e.message
      }
    },
    async getCourses(_, __) {
      try {
        const courses = await Course.find()
        return courses
      } catch (e) {
        return e.message
      }
    }
  },
  Mutation: {
    async createCourse(_, {input}) {
      try {
        const course = await Course.create(input)
        return course
      } catch(e) {
        return e.message
      }
    }
  }
}

module.exports = resolvers