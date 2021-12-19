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

  type Offer {
    _id: ID!
    canton: String!
    city: String!
    date: String!
    more_info: String!
    category: String!
    offeredUser: ID!
  }
  type Token {
    token: String!
  }
  type Query {
    getUsers: [User]!
    getAllCategories: [AllCategories]!
    getServiceCategory(mainCategory: String!): [ServiceCategory]!
    getOpportunity(category: String!): [Offer]!
  }

  type Mutation {
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
    createOffer(
      canton: String!
      city: String!
      date: String!
      more_info: String!
      category: String!
      offeredUser: ID!
    ): Offer!
  }
`;
