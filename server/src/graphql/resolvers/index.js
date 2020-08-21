import user from './user'

const resolvers = {
    Query: {
        hello: () => `Hello world!`,
    },

    Mutation: {
        hi: () => 'hey',
        createUser: user.createUser,
    }
    
}

export { resolvers as default };