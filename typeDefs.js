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
  }
  type Message {
    _id: ID
    price: String
    message: String!
    senderID: ID!
    receiverID: ID!
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
    getUserInfo(_id: ID!): User!
  }

  type Mutation {
    createMessage(
      message: String!
      price: String
      receiverID: ID!
      senderID: ID!
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

