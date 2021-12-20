import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import { db } from "./db.js";
import User from "./user.js";
import ServiceCategory from "./serviceCategory.js";
import AllCategories from "./allCategories.js";
import Canton from "./canton.js";
import Asked_service from "./asked_service.js";
import Message from "./message.js";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    ServiceCategory,
    AllCategories,
    Canton,
    Asked_service,
    Message,
  },
});
db();
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`listening on ${url}`);
});
