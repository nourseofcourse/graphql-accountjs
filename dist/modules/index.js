"use strict";

// const { makeExecutableSchemaFromModules } = require('../utils/modules')
const {
  mergeTypeDefs,
  mergeResolvers
} = require('@graphql-toolkit/schema-merging');

const user = require('./user'); // const user = require('./user')
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
  typeDefs: mergeTypeDefs([user.typeDefs]),
  resolvers: mergeResolvers([user.resolvers])
};