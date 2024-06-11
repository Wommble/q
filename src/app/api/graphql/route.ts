import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
const typeDefs = gql`
  type Query {
    starWars: [Character]
    hello: String
    test: String
  }

  type Character {
    name: String
  }
`;

const resolvers = {
  Query: {
    starWars: () => [{ name: "Din Djarin" }],
    hello: () => "Hello world!",
    test: () => "ppp",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// const servermutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
//     createReview(episode: $ep, review: $review) {
//       stars
//       commentary
//     }
//   }
//   {
//     "ep": "JEDI",
//     "review": {
//       "stars": 5,
//       "commentary": "This is a great movie!"
//     }
//   }
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
