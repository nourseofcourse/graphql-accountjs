"use strict";

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Query: {
    async getCourse(_, {
      id
    }) {
      try {
        const course = await _model.default.findOne(id);
        return course;
      } catch (e) {
        return e.message;
      }
    },

    async getCourses(_, __) {
      try {
        const courses = await _model.default.find();
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
        const course = await _model.default.create(input);
        return course;
      } catch (e) {
        return e.message;
      }
    }

  }
};
module.exports = resolvers;