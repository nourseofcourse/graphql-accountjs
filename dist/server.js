"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _modules = _interopRequireDefault(require("./modules"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  ApolloServer,
  gql,
  makeExecutableSchema
} = require('apollo-server');

const sgMail = require('@sendgrid/mail');

const {
  mergeTypeDefs,
  mergeResolvers
} = require('@graphql-toolkit/schema-merging');

const {
  AccountsModule
} = require('@accounts/graphql-api');

const mongoose = require('mongoose');

const {
  Mongo
} = require('@accounts/mongo');

const {
  AccountsServer
} = require('@accounts/server');

const {
  AccountsPassword
} = require('@accounts/password');

const {
  DatabaseManager
} = require('@accounts/database-manager');

const {
  renderString,
  renderTemplateFile
} = require('template-file');

sgMail.setApiKey('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');

const start = async () => {
  // Create database connection
  mongoose.connect('mongodb+srv://mgauser:zllfiXurdnpArPKy@megastar.tx4dl.mongodb.net/portal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const mongoConn = mongoose.connection; // Build a storage for storing users

  const userStorage = new Mongo(mongoConn); // create database manager ( create user, find users, sessions etc)

  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage
  });
  const accountsPassword = new AccountsPassword({// This option is called when a new user create an account
    // Inside we can apply our logic to validate the user fields
    // validateNewUser: (user) => {
    //   if (!user.firstName) {
    //     throw new Error('First name required');
    //   }
    //   if (!user.lastName) {
    //     throw new Error('Last name required');
    //   }
    //   // For example we can allow only some kind of emails
    //   if (user.email.endsWith('.xyz')) {
    //     throw new Error('Invalid email');
    //   }
    //   return user;
    // },
  }); // Create accounts server that holds a lower level of all accounts operations

  const accountsServer = new AccountsServer({
    db: accountsDb,
    tokenSecret: 'mgaSecretToken',
    sendMail: async ({
      from,
      subject,
      to,
      text,
      html
    }) => {
      const email = await html;
      sgMail.send({
        to,
        from: "Megastar Advisors Portal <info@megastaradvisors.com>",
        subject,
        text,
        html: email
      });
    },
    emailTemplates: {
      from: 'Megastar Advisors Portal <info@megastaradvisors.com>',
      verifyEmail: {
        subject: user => 'Verify your account email',
        text: (user, url) => `To verify your account email please click on this link2: ${url}`,
        html: async (user, url) => {
          const data = {
            email: user.emails[0].address.replace(/([@\.:])/g, '<span>$1</span>'),
            url
          };
          const template = await renderTemplateFile('./templates/verify.html', data).then(render => {
            return render;
          });
          return template;
        }
      },
      resetPassword: {
        html: async (user, url) => {
          const data = {
            email: user.emails[0].address.replace(/([@\.:])/g, '<span>$1</span>'),
            url
          };
          const template = await renderTemplateFile('./templates/password.html', data).then(render => {
            return render;
          });
          return template;
        }
      },
      enrollAccount: {
        subject: user => 'Welcome to Megastar Advisors.',
        text: (user, url) => `Welcome to Megastar Advisors.`,
        html: async (user, url) => {
          const data = {
            email: user.emails[0].address.replace(/([@\.:])/g, '<span>$1</span>'),
            url
          };
          const template = await renderTemplateFile('./templates/password.html', data).then(render => {
            return render;
          });
          return template;
        }
      }
    }
  }, {
    password: accountsPassword
  });
  const typeDefs = gql`
    type Query {
      sensitiveInformation: String @auth
      getUsers: [User]
    }
  `;
  const resolvers = {
    Query: {
      sensitiveInformation: () => 'Sensitive',

      async getUsers() {
        const users = await userStorage.db.collection('users').find().toArray();
        return users;
      }

    }
  };
  const accountsGraphQL = AccountsModule.forRoot({
    accountsServer
  });
  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefs, _modules.default.typeDefs, accountsGraphQL.typeDefs]),
    resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers, _modules.default.resolvers]),
    schemaDirectives: _objectSpread({}, accountsGraphQL.schemaDirectives)
  });
  const server = new ApolloServer({
    schema,
    context: accountsGraphQL.context
  });

  try {
    //await mongoose.connect()
    server.listen(_config.default.port).then(({
      url
    }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;