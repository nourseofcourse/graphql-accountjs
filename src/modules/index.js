// const { makeExecutableSchemaFromModules } = require('../utils/modules')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging')
const user = require('./user')
const resource = require('./resource')
const course = require('./course')
const account = require('./account')
const workshop = require('./workshop')
// const user = require('./user')
// const email = require('./email')
// const lms = require('./lms')

// module.exports = makeExecutableSchemaFromModules({
//   modules: [
//     user,
//     ...email.modules,
//     ...lms.modules
//   ]
// })

module.exports = {
  typeDefs: mergeTypeDefs([ user.typeDefs, account.typeDefs, resource.typeDefs, course.typeDefs, workshop.typeDefs ]),
  resolvers: mergeResolvers([ user.resolvers, account.resolvers, resource.resolvers, course.resolvers, workshop.resolvers ]),
}