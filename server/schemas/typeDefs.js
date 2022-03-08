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
`;

module.exports = typeDefs;