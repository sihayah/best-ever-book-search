const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: ID
    title: String
    description: String
    authors: [String]
    image: String
    link: String
}

input BookInput {
    bookId: ID
    title: String
    description: String
    authors: [String]
    image: String
    link: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Query {
    users: [User]
}

type Query {
    books: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    savedBooks(username: String!): [Book]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: [ID]!): User
}

`;

module.exports = typeDefs;