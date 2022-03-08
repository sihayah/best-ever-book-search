const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
}

type Book {
    bookId: ID
    authors: [Author]
    description: String
    image: String
    link: String
    title: String
}

type BookInput {
    bookId: ID
    authors: [Author]
    description: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    deleteBook(bookId: ID!): User

}
`;

module.exports = typeDefs;