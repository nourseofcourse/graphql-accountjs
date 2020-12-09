const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const sgMail = require('@sendgrid/mail')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging')
const { AccountsModule } = require('@accounts/graphql-api')
const mongoose = require('mongoose')
const { Mongo } = require('@accounts/mongo')
const { AccountsServer } = require('@accounts/server')
const { AccountsPassword } = require('@accounts/password')
const { DatabaseManager } = require('@accounts/database-manager')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const start = async () => {
  // Create database connection
  mongoose.connect('mongodb+srv://mgauser:zllfiXurdnpArPKy@megastar.tx4dl.mongodb.net/portal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const mongoConn = mongoose.connection

  // Build a storage for storing users
  const userStorage = new Mongo(mongoConn)

  // create database manager ( create user, find users, sessions etc)
  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage
  })

  const accountsPassword = new AccountsPassword({
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
  })

  // Create accounts server that holds a lower level of all accounts operations
  const accountsServer = new AccountsServer({
    db: accountsDb,
    tokenSecret: 'mgaSecretToken',
    sendMail: ({ from, subject, to, text, html }) => {
      sgMail.send({ to, from: "FFEBA <booking@thefederaledge.com>", subject, text, html })
    }
  },
  {
    password: accountsPassword
  })

  const typeDefs = gql`

    type Query {
      sensitiveInformation: String @auth
    }

    type User {
      first_name: String
      last_name: String
    }

    type CreateUserInput {
      first_name: String
      last_name: String
    }
  `;

  const resolvers = {
    Query: {
      sensitiveInformation: () => 'Sensitive Info'
    }
  }

  const accountsGraphQL = AccountsModule.forRoot({ accountsServer })

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([ typeDefs, accountsGraphQL.typeDefs ]),
    resolvers: mergeResolvers([ accountsGraphQL.resolvers, resolvers ]),
    schemaDirectives: {
      ...accountsGraphQL.schemaDirectives
    }
  })
  const server = new ApolloServer({ schema, context: accountsGraphQL.context })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

start()