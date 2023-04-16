import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;
const resolvers = {
  Query: {
    greeting: () => "hello deb!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5001 }).then(({ url }) => {
  console.log(`Listening to ${url}`);
});
