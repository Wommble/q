import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";

// const typeDefs = gql`
//   type Query {
//     starWars: [Character]
//     hello: String
//     test: String
//   }

//   type Character {
//     name: String
//   }
// `;

// const resolvers = {
//   Query: {
//     starWars: () => [{ name: "Din Djarin" }],
//     hello: () => "Hello world!",
//     test: () => "ppp",
//   },
// };


// // const servermutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
// //     createReview(episode: $ep, review: $review) {
// //       stars
// //       commentary
// //     }
// //   }
// //   {
// //     "ep": "JEDI",
// //     "review": {
// //       "stars": 5,
// //       "commentary": "This is a great movie!"
// //     }
// //   }


const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Jim', email: 'jim@example.com' },
];

class UserAPI {
  getUsers() {
    return users;
  }

  getUserById(id : String ) {
    return users.find(user => user.id === id);
  }

}
 const userAPI = new UserAPI();

 const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
}

`;

const resolvers = {
  Query: {
    users: () => userAPI.getUsers(),
    user: (parent :any, { id } :{id: any}) => userAPI.getUserById(id),
    
  },
 
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };