const { SchemaDirectiveVisitor, AuthenticationError } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver

    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthenticationError('Not authorized')
      }
      return resolver(root, args, ctx, info)
    }
  }
}

class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver
    const {role} = this.args

    field.resolve = async (root, args, ctx, info) => {
      if (ctx.user.role != role) {
        throw new AuthenticationError('Insufficient Permissions.')
      }
      return resolver(root, args, ctx, info)
    }
  }
}

module.exports = {
  AuthenticationDirective,
  AuthorizationDirective
}
