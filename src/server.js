const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const sgMail = require('@sendgrid/mail')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging')
const { AccountsModule } = require('@accounts/graphql-api')
const mongoose = require('mongoose')
const { Mongo } = require('@accounts/mongo')
const { AccountsServer } = require('@accounts/server')
const { AccountsPassword } = require('@accounts/password')
const { DatabaseManager } = require('@accounts/database-manager')
const { renderString, renderTemplateFile } = require('template-file')
import config from './config'

sgMail.setApiKey('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')

export const start = async () => {
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
    sendMail: async ({ from, subject, to, text, html }) => {
      const email = await html
      sgMail.send({ to, from: "Megastar Advisors Portal <info@megastaradvisors.com>", subject, text, html: email  })
    },
    emailTemplates: {
      from: 'Megastar Advisors Portal <info@megastaradvisors.com>',
      verifyEmail: {
        subject: (user) => 'Verify your account email',
        text: (user, url) => `To verify your account email please click on this link2: ${url}`,
        html: async (user, url) => {
          const data = {
            email: user.emails[0].address.replace(/([@\.:])/g, '<span>$1</span>'),
            url
          }
          const template = await renderTemplateFile('./templates/verify.html', data).then((render) => {
            return render
          })
          return template
        }
      },
      resetPassword: {
        html: async (user, url) => {
          const data = {
            email: user.emails[0].address.replace(/([@\.:])/g, '<span>$1</span>'),
            url
          }
          const template = await renderTemplateFile('./templates/password.html', data).then((render) => {
            return render
          })
          return template
        }
      },
      enrollAccount: {
        subject: (user) => 'Welcome to Megastar Advisors.',
        text: (user, url) => `Welcome to Megastar Advisors.`,
        html: async (user, url) => {
          const data = {
            email: user.emails[0].address.replace(/([@\.:])/g, '<span>$1</span>'),
            url
          }
          const template = await renderTemplateFile('./templates/password.html', data).then((render) => {
            return render
          })
          return template
        }
      }
    }
  },
  {
    password: accountsPassword
  })

  const typeDefs = gql`

    type Query {
      sensitiveInformation: String @auth
      getUsers: [User]
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
      sensitiveInformation: () => 'Sensitive',
      async getUsers(_, __, {models}) {
        try {
          console.log(_)
          const users = await models.User.find()
          return users
        } catch (e) {
          return e.message
        }
      }
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

  try {
    //await mongoose.connect()
    server.listen(config.port).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  } catch (e) {
    console.error(e)
  }
}