import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typeDefs.js";
import db from "./db.js";
import User from "./models/user.js";
import ServiceCategory from "./models/serviceCategory.js";
import AllCategories from "./models/allCategories.js";
import Canton from "./models/canton.js";
import Asked_service from "./models/asked_service.js";
import Message from "./models/message.js";
import Given_Offer from "./models/given_offer.js";
import { authResolvers } from "./resolvers/auth.js";
import { messageResolvers } from "./resolvers/message.js";
import { userResolvers } from "./resolvers/user.js";
import { otherQueries } from "./resolvers/otherQueries.js";
import { otherMutations } from "./resolvers/otherMutations.js";
import { cantonAndCategoryResolvers } from "./resolvers/cantonAndCategory.js";
import _ from "lodash";
const port = process.env.PORT || 4000;

const resolvers = _.merge(
  userResolvers,
  authResolvers,
  messageResolvers,
  cantonAndCategoryResolvers,
  otherQueries,
  otherMutations
);


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
