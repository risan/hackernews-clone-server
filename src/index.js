require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const AuthPayload = require('./resolvers/AuthPayload');
const Feed = require('./resolvers/Feed');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  AuthPayload,
  Feed
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: process.env.PRISMA_DEBUG === 'true'
    })
  })
});

server.start(
  {
    port:
      (process.env.PORT ? parseInt(process.env.PORT, 10) : undefined) || 4000
  },
  ({ port }) => console.log(`️⚡ Server is running on port ${port}.`)
);
