import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server'
import sgMail from '@sendgrid/mail'
import { mergeTypeDefs, mergeResolvers } from '@graphql-toolkit/schema-merging'
import { AccountsModule } from '@accounts/graphql-api'
import mongoose from 'mongoose'
import { Mongo } from '@accounts/mongo'
import { AccountsServer } from '@accounts/server'
import { AccountsPassword } from '@accounts/password'
import { DatabaseManager } from '@accounts/database-manager'
import { renderString, renderTemplateFile } from 'template-file'
import { ApolloServerPluginInlineTrace } from 'apollo-server-core'
import Scheduler from './scheduler'

import modules from './modules'
import config from './config'

sgMail.setApiKey('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')

export const start = async () => {
  // Create database connection
  mongoose.connect('mongodb+srv://mgauser:zllfiXurdnpArPKy@megastar.tx4dl.mongodb.net/portal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
    validateNewUser: (user) => {
      if(!user.first_name) {
        throw new Error('First name is required')
      }

      if(!user.last_name) {
        throw new Error('Last name is required')
      }
      user.short_name = (user.first_name.charAt(0) + user.last_name).toLowerCase()

      return user
    }
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
    }
  `;

  const resolvers = {
    Query: {
      sensitiveInformation: () => 'Sensitive',
    }
  }

  
  const accountsGraphQL = AccountsModule.forRoot({ accountsServer })

  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([ typeDefs, modules.typeDefs, accountsGraphQL.typeDefs ]),
    resolvers: mergeResolvers([ accountsGraphQL.resolvers, resolvers, modules.resolvers ]),
    schemaDirectives: {
      ...accountsGraphQL.schemaDirectives
    }
  })
  const server = new ApolloServer({ 
    schema, 
    context: accountsGraphQL.context,
    plugins: [
      require('./plugins/apollo-server-plugin-operation-registry'),
      ApolloServerPluginInlineTrace()
    ],
    cors: {
      origin: '*',
      credentials: true
    }
  })

  try {
    //await mongoose.connect()
    //server.listen({port: config.port, host: '192.168.1.163'}).then(({ url }) => {
    server.listen(config.port).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
    //Scheduler.start()
  } catch (e) {
    console.error(e)
  }
}