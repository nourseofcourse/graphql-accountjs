"use strict";

var _model = require("./model");

const resolvers = {
  Query: {
    async account(_, {
      id
    }) {
      try {
        const account = await _model.Account.findById(id);
        return account;
      } catch (e) {
        return e.message;
      }
    },

    async accounts(_, __) {
      try {
        const accounts = await _model.Account.find();
        return accounts;
      } catch (e) {
        return e.message;
      }
    }

  },
  Mutation: {
    async createAccount(_, {
      input
    }) {
      try {
        const account = await _model.Account.create(input);
        return account;
      } catch (e) {
        return e.message;
      }
    },

    async updateAccount(_, {
      id,
      input
    }) {
      try {
        const account = await _model.Account.findByIdAndUpdate(id, input);
        return account;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteAccount(_, {
      id
    }) {
      try {
        await _model.Account.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    }

  }
};
module.exports = resolvers;