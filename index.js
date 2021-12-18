import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import { db } from "./db.js";
import User from "./user.js";
import Category from "./category.js";
import AllCategories from "./allCategories.js";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Category,
    AllCategories,
  },
});
db();
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`listening on ${url}`);
});
