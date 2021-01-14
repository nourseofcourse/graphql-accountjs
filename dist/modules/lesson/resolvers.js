"use strict";

var _model = require("./model");

const resolvers = {
  Query: {
    async course(_, {
      id
    }) {
      try {
        const course = await _model.Course.findById(id);
        return course;
      } catch (e) {
        return e.message;
      }
    },

    async courses(_, __) {
      try {
        const courses = await _model.Course.find();
        return courses;
      } catch (e) {
        return e.message;
      }
    }

  },
  Mutation: {
    async createCourse(_, {
      input
    }) {
      try {
        const course = await _model.Course.create(input);
        console.log(course);
        return course;
      } catch (e) {
        return e.message;
      }
    }

  }
};
module.exports = resolvers;