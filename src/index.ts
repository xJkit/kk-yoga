import { GraphQLServer } from 'graphql-yoga';
import axios from 'axios';
import auth from './resolvers/auth';

const typeDefs = `
  type Query {
    hello(name: String!): String!
    auth(id: String!, secret: String!): Auth!
  }

  type Auth {
    status: Int
    token: String
  }
`;

const resolvers = {
  Query: {
    auth
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log('server is running...');
});
