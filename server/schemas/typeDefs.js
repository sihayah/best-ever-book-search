const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Book {
    bookId: ID
    authors: [Author]
    description: String
    image: String
    link: String
    title: String
}

type Author {
    name: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!): User
    deleteBook(bookId: ID!): User

}
`;

module.exports = typeDefs;