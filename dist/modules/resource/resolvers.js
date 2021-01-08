"use strict";

var _model = require("./model");

const resolvers = {
  Query: {
    async resource(_, {
      id
    }) {
      try {
        const resource = await _model.Resource.findById(id);
        return resource;
      } catch (e) {
        return e.message;
      }
    },

    async resources(_, __) {
      try {
        const resources = await _model.Resource.find();
        return resources;
      } catch (e) {
        return e.message;
      }
    }

  },
  Mutation: {
    async createResource(_, {
      input
    }) {
      try {
        const resource = await _model.Resource.create(input);
        return resource;
      } catch (e) {
        return e.message;
      }
    },

    async updateResource(_, {
      id,
      input
    }) {
      try {
        const resource = await _model.Resource.findByIdAndUpdate(id, input);
        return resource;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteResource(_, {
      id
    }) {
      try {
        await _model.Resource.findByIdAndDelete(id);
        return true;
      } catch (e) {
        console.log(e);
      }
    }

  }
};
module.exports = resolvers;