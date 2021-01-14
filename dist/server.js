"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _apolloServer = require("apollo-server");

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _schemaMerging = require("@graphql-toolkit/schema-merging");

var _graphqlApi = require("@accounts/graphql-api");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongo = require("@accounts/mongo");

var _server = require("@accounts/server");

var _password = require("@accounts/password");

var _databaseManager = require("@accounts/database-manager");

var _templateFile = require("template-file");

var _apolloServerCore = require("apollo-server-core");

var _modules = _interopRequireDefault(require("./modules"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_mail.default.setApiKey('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');

const start = async () => {
  // Create database connection
  _mongoose.default.connect('mongodb+srv://mgauser:zllfiXurdnpArPKy@megastar.tx4dl.mongodb.net/portal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const mongoConn = _mongoose.default.connection; // Build a storage for storing users

  const userStorage = new _mongo.Mongo(mongoConn); // create database manager ( create user, find users, sessions etc)

  const accountsDb = new _databaseManager.DatabaseManager({
    sessionStorage: userStorage,
    userStorage
  });
  const accountsPassword = new _password.AccountsPassword({
    // This option is called when a new user create an account
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
    validateNewUser: user => {
      if (!user.first_name) {
        throw new Error('First name is required');
      }

      if (!user.last_name) {
        throw new Error('Last name is required');
      }

      user.short_name = (user.first_name.charAt(0) + user.last_name).toLowerCase();
      return user;
    }
  }); // Create accounts server that holds a lower level of all accounts operations

  const accountsServer = new _server.AccountsServer({
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

      _mail.default.send({
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
          const template = await (0, _templateFile.renderTemplateFile)('./templates/verify.html', data).then(render => {
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
          const template = await (0, _templateFile.renderTemplateFile)('./templates/password.html', data).then(render => {
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
          const template = await (0, _templateFile.renderTemplateFile)('./templates/password.html', data).then(render => {
            return render;
          });
          return template;
        }
      }
    }
  }, {
    password: accountsPassword
  });
  const typeDefs = (0, _apolloServer.gql)`
    type Query {
      sensitiveInformation: String @auth
    }
  `;
  const resolvers = {
    Query: {
      sensitiveInformation: () => 'Sensitive'
    }
  };

  const accountsGraphQL = _graphqlApi.AccountsModule.forRoot({
    accountsServer
  });

  const schema = (0, _apolloServer.makeExecutableSchema)({
    typeDefs: (0, _schemaMerging.mergeTypeDefs)([typeDefs, _modules.default.typeDefs, accountsGraphQL.typeDefs]),
    resolvers: (0, _schemaMerging.mergeResolvers)([accountsGraphQL.resolvers, resolvers, _modules.default.resolvers]),
    schemaDirectives: _objectSpread({}, accountsGraphQL.schemaDirectives)
  });
  const server = new _apolloServer.ApolloServer({
    schema,
    context: accountsGraphQL.context,
    plugins: [require('./plugins/apollo-server-plugin-operation-registry'), (0, _apolloServerCore.ApolloServerPluginInlineTrace)()],
    cors: {
      origin: '*',
      credentials: true
    }
  });

  try {
    //await mongoose.connect()
    //server.listen({port: config.port, host: '192.168.1.163'}).then(({ url }) => {
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