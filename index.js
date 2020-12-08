const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const sgMail = require('@sendgrid/mail')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging')
const { AccountsModule } = require('@accounts/graphql-api')
const mongoose = require('mongoose')
const { Mongo } = require('@accounts/mongo')
const { AccountsServer } = require('@accounts/server')
const { AccountsPassword } = require('@accounts/password')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

mongoose.connect('mongodb+srv://mgauser:zllfiXurdnpArPKy@megastar.tx4dl.mongodb.net/portal?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const accountsMongo = new Mongo(mongoose.connection)
const accountsPassword = new AccountsPassword({

})
const accountsServer = new AccountsServer({
  db: accountsMongo,
  tokenSecret: 'mgaSecretToken',
  sendMail: ({ from, subject, to, text, html }) => {
    sgMail.send({ to, from: "booking@thefederaledge.com", subject, text, html })
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