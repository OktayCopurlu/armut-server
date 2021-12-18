import { gql } from "graphql-tag";
export const typeDefs = gql`
  type User {
    _id: ID
    fullname: String!
    email: String!
    password: String!
    address: String!
    tel: String!
    category: String!
    status: String!
    photo: String
  }
  type AllCategories {
    _id: ID!
    name: String!
    categories: [String]!
  }
  type Category {
    mainCategory: String!
    category: String!
    users: [User]
    photo: String
  }

  type Token {
    token: String!
  }
  type Query {
    getUsers: [User]!
    getAllCategories:[AllCategories]!
  }


  type Mutation {
    login(email: String!, password: String!): Token!
    register(
      fullname: String!
      email: String!
      password: String!
      category: String!
      status: String!
      address: String!
      tel: String!
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
  }
`;
