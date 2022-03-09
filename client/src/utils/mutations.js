import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation ($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
                }
            
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!){
        addUser(username: $username, password: $password, email: $email){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($book: bookInput!){
        saveBook(book: $book){
            _id,
            user {
                _id
                username
                savedBooks{
                    bookId
                    title
                }
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId){
        user {
            _id
            username
            savedBooks{
                bookId
                title
            }
        }
    }
}`;

