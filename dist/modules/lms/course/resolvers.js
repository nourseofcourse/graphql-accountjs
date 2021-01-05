"use strict";

var _course = require("../../../models/course");

const resolvers = {
  Query: {
    async getCourse(_, {
      id
    }) {
      try {
        const course = await _course.Course.findOne(id);
        return course;
      } catch (e) {
        return e.message;
      }
    },

    async getCourses(_, __) {
      try {
        const courses = await _course.Course.find();
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
        const course = await _course.Course.create(input);
        return course;
      } catch (e) {
        return e.message;
      }
    }

  }
};
module.exports = resolvers;