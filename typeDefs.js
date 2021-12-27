import { gql } from "graphql-tag";
export const typeDefs = gql`
  type User {
    _id: ID
    fullname: String!
    email: String!
    password: String!
    address: String!
    tel: String!
    category: String
    status: String
    photo: String
    provider: Boolean!
    messages: [ID!]
    asked_service: [ID!]
    given_service: [ID!]
    given_offer: [ID!]
    given_offer_service: [ID!]
  }
  type AllCategories {
    _id: ID!
    name: String!
    categories: [String]!
  }

  type ServiceCategory {
    _id: ID!
    mainCategory: String!
    category: String!
    users: [ID]!
    photo: String
  }

  type Canton {
    _id: ID!
    canton: String!
    gemainde: [String!]!
  }
  type Given_Offer {
    _id: ID!
    message: [String!]!
    price: String!
    clientID: ID!
    bidderID: ID!
    serviceID: ID!
  }
  type Asked_service {
    _id: ID!
    fullname: String!
    email: String!
    tel: String!
    canton: String!
    city: String!
    date: String!
    message: String!
    category: String!
    asked_service_user: ID!
    offer: [ID!]
  }
  type Message {
    _id: ID
    price: String
    message: String!
    senderID: ID!
    receiverID: ID!
    asked_service_id: ID
  }
  type Token {
    token: String!
  }

  type Subscription {
    createMessage: Message!
  }
  type Query {
    getUsers: [User]!
    getAllCategories: [AllCategories]!
    getServiceCategory(mainCategory: String!): [ServiceCategory]!
    getAsked_service(category: String!): [Asked_service]!
    getCantons: [Canton]!
    getCities(canton: String!): [Canton]!
    getUserMessages(_id: ID!): [Message]!
    getUserRezervations(_id: ID!): [Asked_service]!
    getUserInfo(_id: ID!): User!
    getOffer(bidderID: ID!): [Given_Offer]!
    getRezervationsOffers(_id: ID!): [Given_Offer]!
    getOfferMessages(_id: ID!): [Message]!
  }

  type Mutation {
    forgotPassword(email: String!): Token!
    resetPassword(
      email: String!
      RESET_PASSWORD_KEY: String!
      token: String!
      password: String!
    ): User!
    createOffer(
      price: String!
      clientID: ID!
      bidderID: ID!
      serviceID: ID!
    ): Given_Offer!
    createMessage(
      message: String!
      price: String
      receiverID: ID!
      senderID: ID!
      asked_service_id: ID
    ): Message!
    login(email: String!, password: String!): Token!
    register(
      fullname: String!
      email: String!
      password: String!
      category: String
      status: String
      address: String!
      tel: String!
      provider: Boolean!
    ): Token!
    editUser(
      address: String!
      email: String!
      fullname: String!
      tel: String!
      _id: ID!
    ): Token!
    addPhoto(_id: ID!, photo: String!): Token!
    setUpCategories(name: String!, categories: [String]!): [AllCategories]!
    setUpCanton(canton: String!, gemainde: [String]!): Canton!
    createAsked_service(
      fullname: String!
      email: String!
      tel: String!
      canton: String!
      city: String!
      date: String!
      message: String!
      category: String!
      asked_service_user: ID!
    ): Asked_service!
  }
`;
