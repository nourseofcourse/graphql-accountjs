const { makeExecutableSchemaFromModules } = require('../utils/modules')

const user = require('./user')
const email = require('./email')
const lms = require('./lms')

module.exports = makeExecutableSchemaFromModules({
  modules: [
    user,
    ...email.modules,
    ...lms.modules
  ]
})
