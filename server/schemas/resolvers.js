const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .populate('savedBooks')
        },
        books: async () => {
            return Book.find()
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findById({ _id: context.user._id })
                .select('-__v -password')
                .populate('savedBooks')
                console.log(userData)
                return userData;    
            }
            throw new AuthenticationError('Not logged in');
            
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { user, token };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { user, token };
        },
        // createBook: async (parent, args) => {
        //     return Book.create(args)
        // },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                console.log(input)
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: input.bookId } },
                    { new: true }
                    ).populate('savedBooks');
                    return updatedUser;
            }
            throw new AuthenticationError('You are not logged in')
        },
        removeBook: async (parent, { bookId }) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true } 
                );

                return updatedUser;
            }
            throw new AuthenticationError('You are not logged in')
        }
    }
}

module.exports = resolvers;