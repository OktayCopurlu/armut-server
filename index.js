import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import db from "./db.js";
import User from "./models/user.js";
import ServiceCategory from "./models/serviceCategory.js";
import AllCategories from "./models/allCategories.js";
import Canton from "./models/canton.js";
import Asked_service from "./models/asked_service.js";
import Message from "./models/message.js";
import Given_Offer from "./models/given_offer.js";
const port = process.env.PORT || 4000;

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
    Given_Offer,
  },
});
db();
server.listen({ port }).then(({ url }) => {
  console.log(`listening on ${url}`);
});

