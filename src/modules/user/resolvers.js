//const { User, Role, Permission } = require('../../models/user')
//import { JSONObjectResolver } from 'graphql-scalars'
import { User } from './model'

const resolvers = {
  Query: {
    async user(_, {id}) {
      try {
        const user = await User.findById(id)
        return user
      } catch (e) {
        return e.message
      }
    },
    async users(_, __) {
      try {
        const users = await User.find()
        return users
      } catch (e) {
        return e.message
      }
    }
  }
  // JSONObject: JSONObjectResolver,

  // Query: {
  //   me() {
  //     return 'hi'
  //   },
  //   userSettings() {
  //     return 'hi'
  //   },
  //   async getUsers() {
  //     try {
  //       const users = await User.find()
  //       return users
  //     } catch (e) {
  //       console.log(e)
  //       return e.message
  //     }
  //   },
  //   async getRoles() {
  //     try {
  //       const roles = await Role.find()
  //       return roles
  //     } catch (e) {
  //       console.log(e)
  //       return e.message
  //     }
  //   }
  // },
  // Mutation: {
  //   // updateMe(_, {input}) {

  //   // },
  //   // signin(_, {input}) {

  //   // },
  //   // signup(_, {input}) {

  //   // },
  //   async createUser(_, { input }) {
  //     try {
  //       let response = await User.create(input)
  //       console.log(response)
  //       return response
  //     } catch (e) {
  //       return e.message
  //     }
  //   },
  //   async createRole(_, { input }) {
  //     try {
  //       let response = await Role.create(input)
  //       console.log(response)
  //       return response
  //     } catch (e) {
  //       return e.message
  //     }
  //   }
  // }
}

module.exports = resolvers
